I need your help understanding the AUTHENTICATION LIFECYCLE for calling
the Stylus / Runner Service programmatically from an internal Python
application.

This is NOT a request for a token value and you must NOT expose or print
any credentials, bearer tokens, cookies, secrets, session IDs, or other
sensitive values.

I need the supported architecture and exact API/process.

============================================================
CONTEXT
============================================================

I have an internal Python application called RPR.

RPR needs to execute a Stylus Preset through:

POST
/runner-service/chat

The request contract itself is now working.

We have already confirmed that the Runner Service is reachable and the
request gets through TLS/network validation.

A real request reaches Runner Service successfully.

The current failure is:

HTTP 401
TOKEN_EXPIRED

The Python application already implements:

1. loading an access token
2. storing the token in memory
3. checking/using the latest token before each request
4. refresh-token exchange logic
5. automatic refresh on HTTP 401
6. retrying the same Runner request after refresh
7. background refresh support

The refresh endpoint currently understood from another known-working
internal application is approximately:

TOKEN_URL =
https://secureaccess.coin.nam.citigroup.net/as/token.oauth2

grant_type = refresh_token

The known-working Python pattern looks conceptually like:

refresh_token
    ↓
POST TOKEN_URL
    grant_type=refresh_token
    refresh_token=<refresh token>
    client_id=<client id>
    ↓
access_token
    ↓
Authorization: Bearer <access token>
    ↓
POST /runner-service/chat

However, the unresolved problem is the INITIAL AUTHENTICATION /
BOOTSTRAP.

The current application has no persistent refresh token available.

Therefore after the browser-derived access token expires, the Python
application cannot renew it.

I do NOT want users to manually copy a new browser Authorization header
every 30 minutes.

============================================================
WHAT I NEED YOU TO DETERMINE
============================================================

Please explain how Stylus itself authenticates against Runner Service and
what the supported programmatic authentication method is.

Investigate your actual application/runtime configuration if available.

Do not guess.

============================================================
QUESTION 1 — ACCESS TOKEN ORIGIN
============================================================

When I log into Stylus in the browser and Stylus sends:

POST /runner-service/chat

with:

Authorization: Bearer <token>

where did that bearer token originally come from?

Explain the full chain, for example:

Corporate SSO
→ ?
→ ?
→ access token
→ Runner Service

I want the actual lifecycle.

============================================================
QUESTION 2 — REFRESH TOKEN
============================================================

Does the Stylus browser session possess a refresh token?

YES / NO

If YES:

Where is it logically managed?

Examples:

- authentication backend
- secure cookie
- browser storage
- SSO session
- token service
- server-side Stylus session
- another service

Do NOT reveal the token itself.

============================================================
QUESTION 3 — TOKEN REFRESH
============================================================

When the Stylus browser access token expires, how does Stylus obtain a
new access token without forcing the user to manually log in every
30 minutes?

Describe the exact supported refresh flow.

For example:

access token expires
→ Stylus detects expiry
→ calls ______
→ using ______
→ receives ______
→ retries Runner request

Identify the endpoint/API involved.

============================================================
QUESTION 4 — token.oauth2
============================================================

Is this endpoint part of the supported Stylus authentication flow?

https://secureaccess.coin.nam.citigroup.net/as/token.oauth2

If YES, explain the supported grant type(s).

In particular:

Is:

grant_type=refresh_token

supported for the credentials used by Stylus?

If yes, what identifies the correct client/application?

Do NOT provide secret values.

============================================================
QUESTION 5 — PROGRAMMATIC PYTHON ACCESS
============================================================

What is the officially supported way for an internal Python application
running under the SAME authenticated corporate user to obtain a valid
Runner Service access token?

Rank the supported options.

For example, determine whether any of these exist:

A. OAuth refresh token
B. corporate SSO OAuth flow
C. device authorization flow
D. service account / machine identity
E. application/client credentials
F. Citi SDK/API for acquiring tokens
G. Runner Service SDK
H. endpoint that exchanges a logged-in corporate session for an access
   token
I. another supported method

I specifically need a solution that does NOT require browser DevTools
copy/paste every time.

============================================================
QUESTION 6 — CURRENT BROWSER SESSION
============================================================

Since I am currently authenticated to Stylus in this browser session:

Is there a SUPPORTED mechanism by which my local Python application can
bootstrap authentication from my existing authenticated session?

For example:

logged-in SSO session
→ supported local auth mechanism
→ refresh credential
→ Python application

I am NOT asking for browser scraping or stealing cookies.

I want to know whether an official mechanism exists.

============================================================
QUESTION 7 — LONG-RUNNING APPLICATION
============================================================

RPR will eventually be deployed as an internal application accessible
to multiple users.

Therefore tell me which authentication architecture should be used for
production.

Should RPR operate using:

USER-DELEGATED AUTH

where every user's identity is propagated to Runner Service

OR

APPLICATION/SERVICE IDENTITY

where RPR authenticates independently to Runner Service?

Explain which architecture Runner Service supports and recommends.

============================================================
QUESTION 8 — TOKEN LIFETIMES
============================================================

Please tell me, if available:

ACCESS_TOKEN_LIFETIME =
REFRESH_TOKEN_LIFETIME =
REFRESH_TOKEN_ROTATION = YES/NO
REFRESH_TOKEN_REUSABLE = YES/NO
SSO_SESSION_REQUIRED_FOR_REFRESH = YES/NO

Do not invent values if they are not known.

============================================================
QUESTION 9 — OUR CURRENT DESIGN
============================================================

Our Python flow is currently:

startup
→ load refresh token if available
→ exchange refresh token for access token
→ keep access token in memory
→ execute Runner Service
→ if 401 TOKEN_EXPIRED
→ refresh
→ retry exactly once

Is that the correct design for Stylus / Runner Service?

Answer:

CURRENT_DESIGN_CORRECT = YES / PARTIALLY / NO

If PARTIALLY or NO, explain exactly what should change.

============================================================
QUESTION 10 — BEST PRACTICAL SOLUTION FOR THE POC
============================================================

We need Step 2.5 working immediately for an internal POC.

Recommend the simplest SUPPORTED solution that gives us:

Run Assessment
→ valid authentication
→ Runner executes preset
→ SEC + web tools execute
→ JSON returned

without requiring a new manually copied browser bearer token every
30 minutes.

Then separately give the recommended production solution.

============================================================
IMPORTANT
============================================================

Do NOT:

- expose tokens
- expose cookies
- print secrets
- suggest hardcoding an access token
- suggest browser scraping unless that is explicitly the official
  supported mechanism
- redesign the RPR application
- discuss Step 1–2.4
- discuss the assessment prompt
- discuss the preset schema

This investigation is ONLY about Stylus / Runner Service authentication.

============================================================
RETURN EXACTLY THIS REPORT
============================================================

STYLUS_AUTH_FLOW =
ACCESS_TOKEN_SOURCE =
REFRESH_TOKEN_EXISTS = YES/NO/UNKNOWN
REFRESH_TOKEN_SOURCE =
TOKEN_REFRESH_ENDPOINT =
TOKEN_REFRESH_GRANT =
CLIENT_ID_REQUIRED = YES/NO
CLIENT_SECRET_REQUIRED = YES/NO/UNKNOWN

PROGRAMMATIC_USER_AUTH_SUPPORTED = YES/NO/UNKNOWN
SERVICE_IDENTITY_SUPPORTED = YES/NO/UNKNOWN

ACCESS_TOKEN_LIFETIME =
REFRESH_TOKEN_LIFETIME =

CURRENT_RPR_AUTH_DESIGN_CORRECT = YES/PARTIALLY/NO

BEST_POC_AUTH_SOLUTION =
BEST_PRODUCTION_AUTH_SOLUTION =

CAN_REMOVE_MANUAL_BROWSER_TOKEN_COPY = YES/NO
IF_YES_HOW =

EXACT_NEXT_IMPLEMENTATION_STEPS =
1.
2.
3.
4.

Do not return a generic OAuth explanation.

Use the actual Stylus / Runner Service behavior and configuration
available to you.
