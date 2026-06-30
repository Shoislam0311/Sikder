#!/bin/bash
set +e
cd /home/z/my-project

echo "===== STARTING SERVER ====="
setsid bash -c 'exec bunx next dev -p 3000 > /home/z/my-project/dev.log 2>&1' < /dev/null &
sleep 12
ss -tlnp 2>/dev/null | grep 3000 >/dev/null && echo "LISTENING" || { echo "NOT LISTENING"; exit 1; }

echo "===== OPEN PAGE ====="
agent-browser open http://localhost:3000/ 2>&1 | head -1
sleep 4

echo "===== BOOKING FLOW ====="
# 1. Open dialog
agent-browser find role button click --name "Book Your Stay" 2>&1 | head -1
sleep 2
echo "Dialog open:" $(agent-browser eval "!!document.querySelector('[role=dialog]')" 2>&1 | head -1)

# 2. Click the room card whose text includes "Deluxe Room with View"
agent-browser eval "
var btns = document.querySelectorAll('[role=dialog] button');
var found = null;
for(var i=0;i<btns.length;i++){ if(btns[i].textContent.indexOf('Deluxe Room with View')>-1 && btns[i].textContent.indexOf('night')>-1){ found=btns[i]; break; } }
if(found){ found.click(); 'clicked room card' } else { 'room card not found, total btns='+btns.length }
" 2>&1 | head -1
sleep 1
# Verify selection (a check mark or selected state)
echo "Room selected:" $(agent-browser eval "!!document.querySelector('[role=dialog] button[class*=ring], [role=dialog] button[aria-pressed=true]') || document.querySelector('[role=dialog]')?.innerText?.includes('12,650')" 2>&1 | head -1)
agent-browser screenshot /tmp/verify-booking1.png 2>&1 | head -1

# 3. Click Continue (enabled now)
agent-browser eval "
var btns = document.querySelectorAll('[role=dialog] button');
var cont = null;
for(var i=0;i<btns.length;i++){ if(btns[i].textContent.trim()==='Continue' && !btns[i].disabled){ cont=btns[i]; break; } }
if(cont){ cont.click(); 'clicked continue' } else { 'continue not enabled' }
" 2>&1 | head -1
sleep 2
echo "Step2 (Check-in):" $(agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.includes('Check-in')" 2>&1 | head -1)
agent-browser screenshot /tmp/verify-booking2.png 2>&1 | head -1

# 4. Click Continue again (dates pre-filled to today/tomorrow)
agent-browser eval "
var btns = document.querySelectorAll('[role=dialog] button');
var cont = null;
for(var i=0;i<btns.length;i++){ if(btns[i].textContent.trim()==='Continue' && !btns[i].disabled){ cont=btns[i]; break; } }
if(cont){ cont.click(); 'clicked continue 2' } else { 'continue 2 not enabled' }
" 2>&1 | head -1
sleep 2
echo "Step3 (Full Name):" $(agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.includes('Full Name')" 2>&1 | head -1)
agent-browser screenshot /tmp/verify-booking3.png 2>&1 | head -1

# 5. Fill guest details with React-compatible value setter
agent-browser eval "
var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
var inputs = document.querySelectorAll('[role=dialog] input');
var vals=['Tanvir Ahmed','tanvir@example.com','+8801712345678'];
for(var i=0;i<inputs.length&&i<vals.length;i++){setter.call(inputs[i],vals[i]);inputs[i].dispatchEvent(new Event('input',{bubbles:true}));}
'filled '+inputs.length+' inputs'
" 2>&1 | head -1
sleep 1
# Verify canNext by checking Confirm button is enabled
echo "Confirm enabled:" $(agent-browser eval "var b=document.querySelectorAll('[role=dialog] button');var c;for(var i=0;i<b.length;i++){if(b[i].textContent.indexOf('Confirm Booking')>-1)c=b[i];}c?!c.disabled:'no confirm'" 2>&1 | head -1)

# 6. Click Confirm Booking
agent-browser eval "
var btns = document.querySelectorAll('[role=dialog] button');
var conf = null;
for(var i=0;i<btns.length;i++){ if(btns[i].textContent.indexOf('Confirm Booking')>-1 && !btns[i].disabled){ conf=btns[i]; break; } }
if(conf){ conf.click(); 'clicked confirm' } else { 'confirm not found/enabled' }
" 2>&1 | head -1
sleep 6
echo "--- booking result ---"
agent-browser eval "document.querySelector('[role=dialog]')?.innerText?.substring(0,300)" 2>&1 | head -4
agent-browser screenshot /tmp/verify-booking-result.png 2>&1 | head -1

echo ""
echo "===== DB CHECK ====="
bun -e "const{db}=require('./src/lib/db');db.booking.findMany({take:3,orderBy:{createdAt:'desc'}}).then(b=>{console.log('Bookings:',b.length);b.forEach(x=>console.log('  -',x.guestName,'|',x.roomName,'|',x.status,'| BDT '+x.totalAmount,'|',x.checkIn,'->',x.checkOut))}).then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)})" 2>&1 | head -8

echo "===== CONSOLE ERRORS ====="
agent-browser console 2>&1 | grep -iv "devtools\|HMR" | head -10

echo "===== DEV LOG (errors) ====="
grep -iE "error|warn|fail" /home/z/my-project/dev.log | grep -iv "prisma:query\|warn.*deprecat" | head -10
echo "===== DONE ====="
