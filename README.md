In your second MarketDev terminal, run:

while :
do
    date '+%H:%M:%S'
    ss -tnp 2>/dev/null | grep 8822
    sleep 1
done

You should already see the Helix LISTEN line.

Then, while that loop is running, go back to Windows PowerShell and run exactly:

Test-NetConnection 127.0.0.1 -Port 8822
