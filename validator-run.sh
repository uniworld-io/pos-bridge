#!/bin/bash
cd /home/ubuntu/pos-bridge
git pull
cd validator
test=`ps aux | grep /home/ubuntu/pos-bridge/validator | grep ValidatorApp.js | grep -v grep -c`
if [ $test -eq 0 ]; then
   npm install && npm start >> nohup.out
   echo "[INFO] Service is starting"
   exit
else
  echo "[WARN] Service is already running"
fi






