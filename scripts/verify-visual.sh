#!/bin/bash
set +e
cd /home/z/my-project

setsid bash -c 'exec bunx next dev -p 3000 > /home/z/my-project/dev.log 2>&1' < /dev/null &
sleep 12
ss -tlnp 2>/dev/null | grep 3000 >/dev/null && echo "LISTENING" || { echo "NOT LISTENING"; exit 1; }

echo "===== DESKTOP VIEW ====="
agent-browser set viewport 1440 900 2>&1 | head -1
agent-browser open http://localhost:3000/ 2>&1 | head -1
sleep 4
agent-browser screenshot --full /tmp/verify-full-desktop.png 2>&1 | head -1

echo "===== SECTION SCREENSHOTS ====="
for sec in about rooms dining wellness events discover gallery contact; do
  agent-browser eval "document.querySelector('#$sec').scrollIntoView({behavior:'instant',block:'start'})" >/dev/null 2>&1
  sleep 1
  agent-browser screenshot /tmp/verify-sec-$sec.png 2>&1 | head -1
done

echo "===== GALLERY LIGHTBOX TEST ====="
agent-browser eval "document.querySelector('#gallery').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser eval "document.querySelectorAll('#gallery button')[3].click()" 2>&1 | head -1
sleep 2
echo "Lightbox open:" $(agent-browser eval "!!document.querySelector('img[alt*=\"gallery\"]') && document.querySelectorAll('img').length>20" 2>&1 | head -1)
agent-browser screenshot /tmp/verify-lightbox.png 2>&1 | head -1
agent-browser eval "document.body.click()" >/dev/null 2>&1
sleep 1

echo "===== MOBILE VIEW ====="
agent-browser set viewport 390 844 2>&1 | head -1
agent-browser open http://localhost:3000/ 2>&1 | head -1
sleep 3
agent-browser screenshot /tmp/verify-mobile-hero.png 2>&1 | head -1
# Open mobile menu
agent-browser eval "var b=document.querySelectorAll('button');for(var i=0;i<b.length;i++){if(b[i].getAttribute('aria-label')==='Toggle menu'){b[i].click();break}}" 2>&1 | head -1
sleep 1
agent-browser screenshot /tmp/verify-mobile-menu.png 2>&1 | head -1
agent-browser eval "document.querySelector('#rooms').scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
agent-browser screenshot /tmp/verify-mobile-rooms.png 2>&1 | head -1

echo "===== CONSOLE ERRORS (final) ====="
agent-browser console 2>&1 | grep -iv "devtools\|HMR\|Fast Refresh" | head -10
agent-browser errors 2>&1 | head -5

echo "===== DONE ====="
ls -la /tmp/verify-*.png 2>&1 | awk '{print $5, $9}'
