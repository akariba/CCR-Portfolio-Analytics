From exactly this project root:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

run these three lines exactly:

$py = (Resolve-Path ".\portfolio-agent\.venv\Scripts\python.exe").Path
$py
& $py --version

The second command should print something like:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\portfolio-agent\.venv\Scripts\python.exe

Then, only if & $py --version works, run:

& $py -m pip show anthropic
Important

Do not run:

python -m pip install anthropic
