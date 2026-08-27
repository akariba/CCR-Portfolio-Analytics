3. Terminal 1 — verify Helix

Run:

helix --version
helix plugins ls
helix auth --help

We expect Helix and the auth plugin to be available.

Then:

ls -la ~/.helix/

Do not cat any .cred file.

If there is no *-oidc.cred, that is expected at this stage.

4. Terminal 1 — start the one-time Helix login

Run:

export BROWSER=echo

Then:

helix auth access-token set --scope coinscope0aaa6ae8-6e52-4dce-bd57-71ca19c63d12

Helix should print a long Citi authorization URL.

STOP THERE.

Do not press Ctrl+C.

Do not close Terminal 1.

Do not run another command in Terminal 1.

Leave it sitting there waiting.

5. Terminal 2 — prove Helix is listening on 8822

While Terminal 1 is still waiting, run in Terminal 2:

ss -ltnp 2>/dev/null | grep ':8822'

If ss gives nothing, try:

netstat -ltnp 2>/dev/null | grep ':8822'

And if necessary:

lsof -i TCP:8822 -s TCP:LISTEN 2>/dev/null
Do not continue until one of them shows a listener on port 8822.

Something similar to:

127.0.0.1:8822    LISTEN

is what we want.

If nothing is listening, stop at this point and show me the Terminal 1 + Terminal 2 output. Do not open the OAuth URL yet.

6. Windows — verify the Tectia side

While Helix is still waiting, open normal Windows PowerShell and run:

netstat -ano | findstr :8822

We want Windows localhost:8822 to be listening because Tectia is exposing the local side of the tunnel.

At this stage we ideally have both:

Windows localhost:8822      → Tectia
MarketDev 127.0.0.1:8822    → Helix
7. Complete Citi SSO

Now copy the authorization URL printed in MarketDev Terminal 1.

Paste it into Edge/Chrome on Windows.

Complete normal Citi authentication/SSO/MFA.

The final redirect will be to something like:

http://localhost:8822/callback?code=...

That is correct.

Do not manually modify that URL.

Tectia should forward the callback:

Windows localhost:8822
→ MarketDev localhost:8822
→ waiting Helix process
8. Watch Terminal 1

After the browser authentication completes, go back to Terminal 1.

The helix auth access-token set ... command should finish by itself and return you to:

$

Do not Ctrl+C it.

If the browser says CONNECTION_RESET or CONNECTION_REFUSED, do not restart random things. Keep the terminals and show me:

ss -ltnp | grep 8822

plus what Terminal 1 shows.

9. Verify the credential was persisted

In Terminal 2:

ls -la ~/.helix/

We expect a new file resembling:

<client-id>-oidc.cred

Do not display its contents.

Then safely test Helix without showing the token:

TOKEN_OUTPUT="$(helix auth access-token print -a 2>/dev/null)"
echo "EXIT_CODE=$?"
echo "TOKEN_PRESENT=$([ -n "$TOKEN_OUTPUT" ] && echo yes || echo no)"
echo "TOKEN_LENGTH=${#TOKEN_OUTPUT}"
unset TOKEN_OUTPUT

Success should look approximately like:

EXIT_CODE=0
TOKEN_PRESENT=yes
TOKEN_LENGTH=...

That is the critical milestone.

10. Only after Helix works — start RPR

Go to:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

Then:

./marketdev_start.sh

Do not launch:

main:app

Your real RPR application is:

server:app

and the MarketDev application port is:

8010

Port 8822 has nothing to do with the RPR web server. It is only the temporary Helix OAuth callback port.

Your application URL remains approximately:

http://sd-f34e-972f.nam.nsroot.net:8010/ui/index.html
11. Test Step 1

Open RPR in the browser and run the Market Scanner again.

Previously the failure was:

No existing H2M token was available...

That error should now disappear.

We want to see:

Gemini discovery
→ evidence enrichment
→ Opus refinement

rather than discovery_api_failed.

12. After authentication is proven, fix the separate static-file issue

You also have four independent 404s:

/ui/rpr_step24_append.js
/ui/rpr_step22_step23_append.js
/ui/rpr_step22_step23_append.css
/ui/rpr_step24_append.css

Do not mix this problem with Helix authentication.

First get Helix working. Then we will locate those four files in the deployed package and put them under the exact app/backend/public/ static-serving directory without changing the v31 frontend logic.

So for now, do Steps 1–5 only. Once Terminal 1 is waiting and Terminal 2 shows whether 8822 is actually LISTENING, send me a photo. That checkpoint determines the next action.
