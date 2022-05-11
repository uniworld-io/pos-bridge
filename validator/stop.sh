
#!/bin/bash
cd /home/ubuntu/pos-bridge
test=`ps aux | grep ValidatorApp.js | grep -v grep -c`
if [ $test -eq 0 ]; then
   echo "[INFO] Service is already stopped"
else
    pids=(`ps aux | grep ValidatorApp.js | grep -v grep | awk '{print $2}'`)
    for i in ${pids[@]}
    do
      sudo kill -9 $i
    echo "[WARN] Service is stopping"
exit

