Create ONE new deployment file for me:

marketdev_start.sh

I will manually copy this file to:

/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/

DO NOT execute it. DO NOT modify any existing RPR source file. DO NOT modify the Windows application. Your task is only to create this new shell file.

Use the forensic evidence you just collected from the actual working Windows RPR source as authoritative.

Critical requirements

The target server shell is ksh/UNIX. The script must therefore be valid ksh and must not depend on PowerShell or Windows commands. Avoid bash-only syntax unless it is also valid in ksh.

Project root on MarketDev:

/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

Python interpreter:

/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/.venv/bin/python

Backend:

/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/app/backend

Frontend deployment copy:

/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/app/backend/public/index.html

Live application:

server:app

Do NOT use main:app.

Do NOT use --reload.

Runtime configuration

Reproduce the current Windows RUNTIME_ENV.ps1 non-secret runtime configuration in UNIX export statements.

Specifically ensure:

LLM_PROVIDER=r2d2

R2D2_AUTH_MODE=h2m

RPR_APPROVED_SONNET5_MODEL=claude-sonnet-5

STEP2_SONNET_MODEL=claude-sonnet-5

RPR_THEME_GATE_MODEL=claude-sonnet-5

STEP23_REVISION_MODEL=claude-sonnet-5

STEP23_REPAIR_MODEL=claude-sonnet-5

RPR_FEEDBACK_MODEL=claude-sonnet-5

RPR_STEP1_REFINEMENT_MODEL=claude-opus-4-6

STEP2_OPUS_MODEL=claude-opus-4-6

STEP23_REASONING_MODEL=claude-opus-4-6

Gemini discovery/evidence/theme/base model variables must reproduce the actual Windows values you just verified, using gemini-3.5-flash.

Preserve the actual current Windows worker counts, timeout values, cache TTL, max-event count and token/character limits verbatim from RUNTIME_ENV.ps1 rather than guessing them from this prompt.

RPR_HOST=0.0.0.0

Use:

RPR_PORT=8010

because we previously detected a collision/check failure on 8000 on MarketDev.

Set:

CITI_CERT_PATH=/etc/pki/citi/CitiInternalCAChain_PROD.pem

Do not embed Artifactory credentials, identity tokens, COIN secrets, API keys or any other secrets in this file.

For h2m authentication, rely on the existing Helix CLI mechanism already implemented by llm_gateway.py.

Do not set COIN_CLIENT_ID or COIN_CLIENT_SECRET because this deployment is using h2m, not m2m.

Keep existing R2D2/Vertex endpoint/project defaults in Python unless the actual Windows RUNTIME_ENV.ps1 explicitly overrides them. Do not invent new endpoint values.

Multi-user frontend fix

This is deployment-specific and must operate ONLY on the copied UNIX frontend:

$ROOT/app/backend/public/index.html

The Windows source contains:

const API = 'http://127.0.0.1:8000';

This is incompatible with remote multi-user MarketDev access.

In marketdev_start.sh, before starting the application:

Verify public/index.html exists.
Make a backup once, for example index.html.marketdev-backup, if the backup does not already exist.
Replace ONLY the exact hardcoded API declaration with:

const API = window.location.origin;

Do not modify route suffixes or any other HTML/CSS/JS.
Make the operation idempotent: running the script again must not progressively alter the file.
Print PASS if the frontend already contains window.location.origin.
Fail rather than making a broad replacement if neither the original exact line nor the already-patched line is found.

This is intentionally a modification only to the deployment copy under app/backend/public; the Windows v31/RPR source remains untouched.

Pre-start validation

Before launching, validate:

$ROOT/.venv/bin/python exists and is executable.
app/backend/server.py exists.
app/backend/public/index.html exists.
/etc/pki/citi/CitiInternalCAChain_PROD.pem exists and is readable.
helix exists on PATH.
Python imports for the packages required by the live RPR app succeed.
Do not display access tokens or secret values.

If a validation fails, print one clear ERROR: line and exit non-zero.

Do not run pip install. Dependencies have already been successfully installed on MarketDev.

Do not touch Artifactory configuration.

Startup

The final startup must effectively be:

cd "$ROOT/app/backend"

exec "$ROOT/.venv/bin/python" -m uvicorn server:app --host "$RPR_HOST" --port "$RPR_PORT"

No reload.

Before exec, print the expected browser URL:

http://<MarketDev-hostname>:8010/ui/index.html

Do not claim that network/firewall access is proven merely because uvicorn starts.

Preservation rule

This migration follows the RPR bone + append rule.

Do not refactor application Python.
Do not modify prompts.
Do not modify Step 1–Step 2.4 business logic.
Do not modify model-routing implementation.
Do not modify the original Windows frontend.
Do not touch main.py.
Do not delete anything.

Only create marketdev_start.sh.

Final response

After creating the file, report:

exact created path,
file size,
a syntax-check result appropriate for ksh if you can perform one locally without executing application logic,
every environment variable the script exports, with secret names only, never secret values,
exact files the script could modify when executed — this should be only the UNIX deployment copy of public/index.html plus its one-time backup,
exact command I will run on MarketDev:

chmod 700 marketdev_start.sh

./marketdev_start.sh

Do not execute the deployment yourself.

One thing I would not let Claude change: don't let it use port 8010 while leaving the browser tied to 127.0.0.1:8000. The window.location.origin deployment patch is what makes 8010 and true remote-user access work together.
