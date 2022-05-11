pids=(`ps aux | grep RelayApp.js | grep -v grep | awk '{print $2}'`)
for i in ${pids[@]}
do
  sudo kill -9 $i
done
echo "[WARN] Service is stopping"
exit

