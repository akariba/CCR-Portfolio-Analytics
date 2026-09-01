STOP CHANGING STEP 2.5 EXECUTION LOGIC.

We are finally at the real root cause.

The current evidence proves:

INITIAL_TOKEN_LOADED = YES
AUTO_REFRESH = YES
401_REFRESH_RETRY = YES
RUNNER_SERVICE_REACHED = YES
RUNNER_HTTP_STATUS = 401 TOKEN_EXPIRED

The only remaining auth failure is:

NO REFRESH TOKEN AVAILABLE.

Do not redesign runner_client.py.
Do not redesign runner_token_manager.py.
Do not change the preset.
Do not change Steps 1–2.4.
Do not ask me for another temporary browser bearer token yet.
Do not create another auth framework.

TASK A — FIND HOW THE WORKING PE SPONSOR APP WAS ACTUALLY SEEDED

The PE Sponsor app.py is known to have worked on this workstation.

Its code checks:

GENAI_BEARER_TOKEN
GENAI_REFRESH_TOKEN
pe-sponsor-search/.token
pe-sponsor-search/.refresh_token

Today these sources are apparently empty.

Therefore find HOW they were populated when app.py actually worked.

Search the working project and launch environment for:

GENAI_BEARER_TOKEN
GENAI_REFRESH_TOKEN
.token
.refresh_token
TOKEN_URL
CLIENT_ID
setx
$env:
Environment.SetEnvironmentVariable
RUNTIME_ENV
Start-Process
streamlit run
app 1.py
TOKEN_URL
refresh_token

Specifically inspect:

1. RUNTIME_ENV.ps1
2. all *.ps1 launch/start scripts
3. *.bat / *.cmd files
4. VS Code launch.json/tasks.json
5. project README/start instructions
6. any wrapper that launched app 1.py
7. current-user environment variables
8. machine environment variables
9. the parent shell/startup configuration used for the PE Sponsor app

Do NOT print any credential values.

I only want the SOURCE/MECHANISM.

Report:

PE_SPONSOR_WORKING_BOOTSTRAP_SOURCE =
HOW_INITIAL_ACCESS_TOKEN_WAS_CREATED =
HOW_REFRESH_TOKEN_WAS_CREATED =
IS_REFRESH_TOKEN_REUSABLE =
CAN_STEP25_USE_SAME_SOURCE =

TASK B — TLS CLEANUP

Do not maintain a custom/dynamically-extracted TLS certificate chain if
the existing working company CA bundle can be reused.

The proven app.py uses:

CitiInternalCAChain_PROD.pem

with REQUESTS_CA_BUNDLE / SSL_CERT_FILE.

Find that exact existing PEM file and configure the Step 2.5 Runner
client to use the same approved CA bundle.

Do not modify the certificate itself.

TASK C — FINAL AUTH DESIGN

The desired design is:

approved initial credential source
        ↓
refresh token
        ↓
TOKEN_URL refresh_token grant
        ↓
new access token
        ↓
in-memory current token
        ↓
Step 2.5 Runner
        ↓
401 TOKEN_EXPIRED
        ↓
refresh once
        ↓
retry same request

Access tokens should NOT need manual replacement every ~30 minutes.

Once a valid refresh token exists, the existing auto-refresh mechanism
should maintain access automatically.

TASK D — IMPORTANT DECISION

If after tracing the actual PE Sponsor launch environment you prove that
the PE Sponsor app also depended on an externally supplied initial
credential and there is NO automated supported source of a refresh
token, say so explicitly:

INITIAL_BOOTSTRAP_REQUIRES_EXTERNAL_LOGIN = YES

Do not pretend Python can manufacture a refresh token.

In that case identify the minimum ONE-TIME supported bootstrap required,
after which the existing refresh-token lifecycle should operate
automatically.

TASK E — DO NOT RUN STEP 2.5 YET

First return only:

PE_SPONSOR_WORKING_BOOTSTRAP_SOURCE =
REFRESH_TOKEN_SOURCE =
CA_BUNDLE_SOURCE =
STEP25_CODE_READY = YES/NO
ONLY_REMAINING_BLOCKER =

FILES_THAT_STILL_REQUIRE_CHANGE =

No additional architecture work.

Execute the investigation now.
