Get-NetTCPConnection -LocalPort 8822 -State Listen -ErrorAction SilentlyContinue |
Select-Object LocalAddress,LocalPort,OwningProcess,@{Name="Process";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}

Test-NetConnection 127.0.0.1 -Port 8822
