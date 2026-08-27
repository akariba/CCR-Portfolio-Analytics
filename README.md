Connected to 127.0.0.1:8822
GET / HTTP/1.1
Request completely sent off
Recv failure: Connection was reset

So Windows → Tectia local listener is PASS. Earlier, on MarketDev, direct curl http://127.0.0.1:8822/ reached Helix and returned 404, so MarketDev loopback → Helix is also PASS.

The failing part is now isolated to:

Windows browser/curl
      ↓ PASS
Tectia Windows listener :8822
      ↓
   ❌ HERE
SSH forwarding channel
      ↓
MarketDev 127.0.0.1:8822
      ↓ PASS
Helix

Do not repeat the OAuth flow again yet. It will just time out until this is resolved.

One diagnostic I want next

While Helix is waiting on MarketDev in Terminal 1, run this in Terminal 2 on MarketDev:

ps -ef | grep '[s]shd'

and then:

ss -tnp 2>/dev/null | grep -E '(:22|:8822)'

Then on Windows, while those two terminals remain open, run:

curl.exe -v --max-time 5 http://127.0.0.1:8822/

Immediately afterward, rerun on MarketDev Terminal 2:

ss -tnp 2>/dev/null | grep -E '(:22|:8822)'

Show me the MarketDev output. We want to determine whether a connection to 127.0.0.1:8822 is ever created by sshd when Windows sends the request.

But there is a more important architectural point now.

For the final MarketDev application, H2M may be the wrong deployment model

Your Windows RPR can use H2M because you, as an interactive user, authenticated once and Helix persisted your credential.

A MarketDev application intended to be accessible to multiple users is different. You do not want the server fundamentally dependent on:

your Windows browser
→ Tectia
→ personal OAuth callback
→ your personal ~/.helix credential

That makes the deployed backend dependent on your personal interactive identity.

Your RPR code already supports:

R2D2_AUTH_MODE=h2m

and

R2D2_AUTH_MODE=m2m

with M2M using the approved COIN client ID/secret mechanism.

So for an actual shared MarketDev deployment, the clean architecture is likely:

Users
  ↓
MarketDev RPR UI
  ↓
MarketDev FastAPI
  ↓
approved M2M/service identity
  ↓
R2D2 / Claude
