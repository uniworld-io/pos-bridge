#!/bin/bash
cd /home/ubuntu/pos-bridge
test=`ps aux | grep RelayApp.js | grep -v grep -c`
if [ $test -eq 0 ]; then
   echo "[INFO] Service is already stopped"
   exit
else
  ps aux | grep RelayApp.js | grep -v grep | awk '{print $2}' | /usr/bin/xargs /bin/kill -9
  echo "[WARN] Service is stopping"
  exit
fi