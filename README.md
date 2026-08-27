export BROWSER=echo
helix auth access-token set --scope coinscope0aaa6ae8-6e52-4dce-bd57-71ca19c63d12

Helix should print a browser URL and then remain running. Do not press Ctrl+C.

Copy that URL into your normal Windows browser. Complete Citi SSO/MFA completely. The browser should eventually redirect through:

http://localhost:8822/callback...

Because of the Tectia tunnel, that callback should reach the waiting Helix process on MarketDev.

The important success condition is not merely seeing the login page. The Helix command in Terminal 2 must finish successfully and return you to $.

Then verify without exposing the token:

TOKEN="$(helix auth access-token print -a 2>/dev/null)"
if [ -n "$TOKEN" ]; then
    echo "HELIX AUTH OK - token length ${#TOKEN}"
else
    echo "HELIX AUTH FAILED - no token"
fi
unset TOKEN

We want:

HELIX AUTH OK - token length ...

Do not paste the token here.

Then perform one persistence test:

exit

Reconnect to MarketDev with a fresh Tectia terminal and run the same safe check:

TOKEN="$(helix auth access-token print -a 2>/dev/null)"
if [ -n "$TOKEN" ]; then
    echo "HELIX PERSISTENCE OK - token length ${#TOKEN}"
else
    echo "HELIX PERSISTENCE FAILED"
fi
unset TOKEN

If that says:

HELIX PERSISTENCE OK
