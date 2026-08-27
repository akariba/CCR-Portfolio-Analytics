2. On Windows, open PowerShell or Command Prompt and run:

netstat -ano | findstr :8822

We want to see a line similar to:

TCP    127.0.0.1:8822    ...    LISTENING

That confirms the Tectia LOCAL tunnel is listening on Windows and forwarding Windows localhost:8822 → MarketDev 127.0.0.1:8822.

3. If Windows shows LISTENING, immediately copy the authorization URL currently printed in Terminal 1 and paste it into your normal Windows Edge browser.

Complete the normal Citi SSO/MFA flow.

Do not manually alter the callback URL. The browser should eventually redirect itself to something like:

http://localhost:8822/callback?code=...

This time, because Helix is visibly listening on MarketDev at the same time, the callback should travel:

Windows browser
    ↓
Windows localhost:8822
    ↓
Tectia LOCAL tunnel
    ↓
MarketDev 127.0.0.1:8822
    ↓
Helix auth process
What success should look like

After completing SSO, look at Terminal 1.

The helix auth access-token set ... command should finish instead of showing signal: interrupt, and you should get your $ prompt back.

Then do not print any token. Run:

ls -la ~/.helix/

We should see a new file ending approximately in:

-oidc.cred

If that appears, the difficult authentication problem is essentially solved.

For the moment, only run the Windows netstat -ano | findstr :8822 check and show me the result before opening the OAuth URL.
