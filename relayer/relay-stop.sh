#!/bin/bash
test=`ps aux | grep RelayApp.js | grep -v grep -c`
if [ $test -eq 0 ]; then
   echo "[INFO] Service is already stopped"
   exit
else
  pids = `ps aux | grep RelayApp.js | grep -v grep | awk '{print $2}'`
    for id in $pids
    do
      sudo kill -9 id
  echo "[WARN] Service is stopping"
  exit
fi