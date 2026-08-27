On your Windows working RPR machine, open PowerShell in the original working project and paste this single command:

Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | Select-String -Pattern 'RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL|RPR_THEME_GATE_MODEL' | Select-Object Path,LineNumber,Line

We are looking for something such as:

RPR_APPROVED_SONNET5_MODEL=<actual-company-approved-name>

or:

STEP2_SONNET_MODEL=<actual-company-approved-name>

Do not change anything there. Just find the exact identifier.

If the Windows project is still at:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

you can instead paste this:

cd "C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"; Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Select-String -Pattern 'RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL|RPR_THEME_GATE_MODEL' | Select-Object Path,LineNumber,Line
Why I am stopping here
