Stop the current backend with Ctrl+C, then in the same PowerShell window that will start the backend run:

cd "C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

. .\RUNTIME_ENV.ps1

$env:STEP24_REASONING_MODEL = $env:STEP2_OPUS_MODEL
$env:STEP24_REVISION_MODEL  = $env:STEP2_SONNET_MODEL
$env:STEP24_REPAIR_MODEL    = $env:STEP2_SONNET_MODEL

Write-Host "STEP2_OPUS=$env:STEP2_OPUS_MODEL"
Write-Host "STEP24_REASONING=$env:STEP24_REASONING_MODEL"
Write-Host "STEP24_REVISION=$env:STEP24_REVISION_MODEL"
Write-Host "STEP24_REPAIR=$env:STEP24_REPAIR_MODEL"

You should see approximately:

STEP2_OPUS=claude-opus-4-6
STEP24_REASONING=claude-opus-4-6
STEP24_REVISION=<your approved Sonnet 5 identifier>
STEP24_REPAIR=<your approved Sonnet 5 identifier>

Then, without closing that PowerShell, go into backend:

cd .\backend

and start Uvicorn using the same existing command/environment you normally use to successfully start server:app.

Then retry Generate Sector Factors once.

What I expect

If the error changes from:

No approved model configured for step24_sector_inherent_reasoning
