Also, you accidentally pasted several commands onto the same PowerShell line afterward. Run these one at a time, pressing Enter after every line:

$py = "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\portfolio-agent\.venv\Scripts\python.exe"

Then:

Test-Path $py

I expect:

True

Then:

& $py --version

Then:

& $py -m pip show anthropic
