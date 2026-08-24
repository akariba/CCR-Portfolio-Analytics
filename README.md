Rather than typing the path again, let PowerShell find it automatically. Run these one line at a time:

$py = (Get-ChildItem -Path . -Recurse -Filter python.exe -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*portfolio-agent*\.venv\Scripts\python.exe" } | Select-Object -First 1).FullName

Then:

$py

It should print a path ending exactly like:

\portfolio-agent\.venv\Scripts\python.exe

Then:

Test-Path $py

We need this to say:

True

Only after it says True, run:

& $py --version

and:

& $py -m pip show anthropic
