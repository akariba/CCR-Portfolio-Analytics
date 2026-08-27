MarketDev Terminal 1 — OAuth command

Run:

export BROWSER=echo
helix auth access-token set --scope coinscope0aaa6ae8-6e52-4dce-bd57-71ca19c63d12

The long authorization URL should appear.

Important: leave this terminal completely untouched after the URL appears. Do not press Enter, Ctrl+C, or type another command there.

MarketDev Terminal 2 — listener verification

Immediately after Terminal 1 displays the URL, run:

ss -ltnp 2>/dev/null | grep 8822

You must see a listening entry for 8822.

If you do not, stop there and show me the output.

If you do see it, leave Terminal 1 running.

Before pasting the OAuth URL, test the Windows end of the tunnel

Open Windows PowerShell, not MarketDev, and run:

Test-NetConnection 127.0.0.1 -Port 8822

Look specifically for:

TcpTestSucceeded : True

This check is crucial.

There are now only two branches:

True → Tectia tunnel + MarketDev Helix listener are connected correctly. Immediately paste the fresh authorization URL into Edge and complete SSO.
False → do not continue OAuth. The Tectia local tunnel is not active even though its profile contains the configuration. We fix Tectia first.
If Windows reports True

Paste the fresh URL from this exact Helix run into Edge. Do not reuse the callback URL currently visible in your screenshot; each OAuth attempt has a new PKCE challenge/state.

Complete SSO promptly.

Then watch Terminal 1, not the browser.

A browser page after callback is secondary. What matters is that Terminal 1 finishes without:

session timed out
signal: interrupt
exit status 1

Once it returns naturally to $, run:

ls -la ~/.helix/

We want a newly created file ending in:

-oidc.cred

Do not display its contents.

Then verify authentication safely:

TOKEN_OUTPUT=$(helix auth access-token print -a 2>/tmp/helix_err)
RC=$?

echo "EXIT_CODE=$RC"
echo "TOKEN_LENGTH=${#TOKEN_OUTPUT}"

if [ -s /tmp/helix_err ]; then
    echo "HELIX_ERROR_PRESENT"
    cat /tmp/helix_err
else
    echo "NO_HELIX_ERROR"
fi

unset TOKEN_OUTPUT
rm -f /tmp/helix_err
Most important next action

For now, don't redo everything.

Run the OAuth command again in Terminal 1, verify 8822 in Terminal 2, and before opening the URL run this on Windows:

Test-NetConnection 127.0.0.1 -Port 8822
