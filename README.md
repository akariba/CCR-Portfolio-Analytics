The new forensic report is useful, but do not apply any of its proposed fixes yet. There is one important inconsistency in it: saying Helix listens on *:8822 while Tectia forwards to 127.0.0.1:8822 is not itself a bind mismatch. *:8822 normally means a wildcard listener. The report itself later correctly says that this should work.

The most valuable thing it identified is the IPv4 vs IPv6 localhost question. Your browser callback is always:

http://localhost:8822/callback

but your Tectia listener we have actually confirmed as:

127.0.0.1:8822

So check that first. It takes about 30 seconds and requires no configuration changes.

In Windows PowerShell, with Tectia connected, run exactly:

[System.Net.Dns]::GetHostAddresses("localhost") | ForEach-Object { $_.ToString() }

Test-NetConnection 127.0.0.1 -Port 8822

Test-NetConnection ::1 -Port 8822

netstat -ano | findstr ":8822"

I expect one of two outcomes.

If you get something like:

localhost:
::1
127.0.0.1

127.0.0.1:8822  -> True
::1:8822         -> False

netstat:
127.0.0.1:8822 LISTENING

then we have probably found the problem: Tectia exposes the tunnel only on IPv4 while Edge's localhost callback is attempting IPv6.

If both 127.0.0.1 and ::1 succeed, IPv6 is eliminated and we move immediately to the SSH-forwarding path.

Do not edit the Windows hosts file, /etc/ssh/sshd_config, firewall rules, Tectia settings, or the RPR code yet.

Also, don't start another Helix OAuth attempt for this test. These four commands can be run now.

One more correction to Claude's report: this statement:

*:8822 vs 127.0.0.1:8822 = root cause

is not established. What we actually know is:

Windows browser
     ↓
localhost:8822
     ↓
Tectia local listener
     ↓
SSH forwarding channel
     ↓
MarketDev
     ↓
Helix callback listener :8822

We have confirmed the two listeners individually. We have not yet proved which hop resets the actual callback.

Send me the output of those four commands. From that single result I can tell you whether to investigate IPv6 or the SSH forwarding channel next.
