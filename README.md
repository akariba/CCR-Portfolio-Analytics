MarketDev Terminal 1 — start Helix and leave it waiting

export BROWSER=echo

helix auth access-token set --scope coinscope0aaa6ae8-6e52-4dce-bd57-71ca19c63d12

It should print the authorization URL. Do not paste it into Edge yet. Leave Terminal 1 untouched.

MarketDev Terminal 2 — while Terminal 1 is still waiting

Run:

ss -ltnp 2>/dev/null | grep 8822

We want to see the auth process still listening.

Then run:

curl -4 -v --max-time 5 http://127.0.0.1:8822/ 2>&1 | head -30

Do not worry if you get 404, 400, or another HTTP error. What matters is whether you see something like:

Connected to 127.0.0.1 ... port 8822

or instead:

Connection refused
Connection reset

Then, while Helix is still waiting, go to Windows PowerShell and run:

try {
    Invoke-WebRequest `
      -Uri "http://127.0.0.1:8822/" `
      -UseBasicParsing `
      -TimeoutSec 5
} catch {
    $_.Exception.Message
}

This request goes through the Tectia tunnel.

How we interpret it

If MarketDev curl connects successfully but the Windows request gets connection reset, we have essentially isolated the problem to:

Tectia local forwarding / SSH server forwarding policy, not Helix, not RPR, not OAuth, and not IPv6.

Then run this read-only command on MarketDev:

grep -RniE '^[[:space:]]*(AllowTcpForwarding|PermitOpen|GatewayPorts)' \
  /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null

Do not edit anything.

If both MarketDev and Windows requests connect, then the tunnel itself works and the remaining issue is specifically the OAuth callback request/timing, which is a much narrower problem.

If even MarketDev's own curl cannot connect while ss shows Helix listening, then we investigate the Helix listener itself.

Important

Don't run another full OAuth login yet.

First give me only these three outputs:

1. MarketDev: ss -ltnp | grep 8822
2. MarketDev: curl -4 -v ...
3. Windows: Invoke-WebRequest result

We are now testing the exact failing hop instead of changing configurations blindly.
