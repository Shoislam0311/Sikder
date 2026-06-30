#!/bin/bash
# Comprehensive verification script - runs while server is alive in same command
set +e
cd /home/z/my-project

echo "===== STARTING SERVER ====="
setsid bash -c 'exec bunx next dev -p 3000 > /home/z/my-project/dev.log 2>&1' < /dev/null &
sleep 12

echo "===== SERVER STATUS ====="
ss -tlnp 2>/dev/null | grep 3000 && echo "LISTENING" || { echo "NOT LISTENING - ABORT"; exit 1; }

echo "===== OPENING PAGE ====="
agent-browser open http://localhost:3000/ 2>&1 | head -2
sleep 4

echo "===== CONSOLE & ERRORS ====="
agent-browser console 2>&1 | grep -iv "devtools\|HMR" | head -15
echo "--- page errors ---"
agent-browser errors 2>&1 | head -10

echo "===== HOMEPAGE CHECK ====="
agent-browser eval "JSON.stringify({title: document.title, h1: document.querySelector('h1')?.innerText, sections: Array.from(document.querySelectorAll('section[id]')).map(s=>s.id)})" 2>&1 | head -3
agent-browser screenshot /tmp/verify-home.png 2>&1 | head -1

echo "===== SCROLL: ABOUT ====="
agent-browser eval "document.querySelector('#about').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser screenshot /tmp/verify-about.png 2>&1 | head -1

echo "===== SCROLL: ROOMS ====="
agent-browser eval "document.querySelector('#rooms').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser screenshot /tmp/verify-rooms.png 2>&1 | head -1

echo "===== BOOKING FLOW TEST ====="
agent-browser eval "document.querySelector('#home').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser snapshot -i 2>&1 | grep -i "book a room\|book your stay" | head -2
# Click "Book Your Stay" hero button via ref - find it
BOOKBTN=$(agent-browser snapshot -i 2>&1 | grep -i "book your stay" | head -1 | grep -oP '@e\d+')
echo "Hero book button ref: $BOOKBTN"
agent-browser click $BOOKBTN 2>&1 | head -1
sleep 2
echo "--- dialog open? ---"
agent-browser eval "!!document.querySelector('[role=dialog]')" 2>&1 | head -1
# Snapshot dialog to find room cards
agent-browser snapshot -i -s "[role=dialog]" 2>&1 | grep -iE "button" | head -4
# Click first room card
ROOMREF=$(agent-browser snapshot -i -s "[role=dialog]" 2>&1 | grep -i "Deluxe Room with View" | head -1 | grep -oP '@e\d+')
echo "Room ref: $ROOMREF"
agent-browser click $ROOMREF 2>&1 | head -1
sleep 1
# Find and click Continue
CONTREF=$(agent-browser snapshot -i -s "[role=dialog]" 2>&1 | grep -i "Continue" | head -1 | grep -oP '@e\d+')
echo "Continue ref: $CONTREF"
agent-browser click $CONTREF 2>&1 | head -1
sleep 1
echo "--- step 2 (dates) ---"
agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.includes('Check-in')" 2>&1 | head -1
CONTREF2=$(agent-browser snapshot -i -s "[role=dialog]" 2>&1 | grep -i "Continue" | head -1 | grep -oP '@e\d+')
echo "Continue2 ref: $CONTREF2"
agent-browser click $CONTREF2 2>&1 | head -1
sleep 1
echo "--- step 3 (details) ---"
agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.includes('Full Name')" 2>&1 | head -1
# Fill the form via eval
agent-browser eval "
const inputs = document.querySelectorAll('[role=dialog] input');
inputs[0].value = 'Tanvir Ahmed'; inputs[0].dispatchEvent(new Event('input', {bubbles:true}));
inputs[1].value = 'tanvir@example.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true}));
inputs[2].value = '+8801712345678'; inputs[2].dispatchEvent(new Event('input', {bubbles:true}));
'done'
" 2>&1 | head -2
sleep 1
# Click Confirm Booking
CONFIRMREF=$(agent-browser snapshot -i -s "[role=dialog]" 2>&1 | grep -i "Confirm Booking" | head -1 | grep -oP '@e\d+')
echo "Confirm ref: $CONFIRMREF"
agent-browser click $CONFIRMREF 2>&1 | head -1
sleep 5
echo "--- booking result ---"
agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.substring(0,250)" 2>&1 | head -3

echo "===== CONTACT FORM TEST ====="
agent-browser click $CONFIRMREF 2>/dev/null
sleep 1
agent-browser eval "document.querySelector('#contact').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser eval "
const form = document.querySelector('#contact form');
const inputs = form.querySelectorAll('input');
const ta = form.querySelector('textarea');
const setVal = (el,v) => { el.value=v; el.dispatchEvent(new Event('input',{bubbles:true})); };
setVal(inputs[0],'Sadia Islam');
setVal(inputs[1],'sadia@example.com');
setVal(inputs[2],'Inquiry about villa');
setVal(ta,'I would like to know about the Premier Villa availability in December.');
'set'
" 2>&1 | head -2
sleep 1
# Submit contact form via API directly to test backend
echo "--- direct API test: contact ---"
curl -s -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"API Test","email":"api@test.com","subject":"Test Subject","message":"This is a test message from API verification."}' 2>&1 | head -2
echo ""
echo "--- direct API test: newsletter ---"
curl -s -X POST http://localhost:3000/api/newsletter -H "Content-Type: application/json" -d '{"email":"newsletter@test.com"}' 2>&1 | head -2
echo ""
echo "--- direct API test: rooms ---"
curl -s http://localhost:3000/api/rooms 2>&1 | head -c 200
echo ""

echo "===== CHECK DB BOOKINGS ====="
bun -e "const{db}=require('./src/lib/db');db.booking.findMany({take:3,orderBy:{createdAt:'desc'}}).then(b=>{console.log('Bookings in DB:',b.length);b.forEach(x=>console.log(' -',x.guestName,x.roomName,x.status,x.totalAmount));process.exit(0)})" 2>&1 | head -8

echo "===== DEV LOG (last 20) ====="
tail -20 /home/z/my-project/dev.log | grep -iv "prisma:query"

echo "===== DONE ====="
