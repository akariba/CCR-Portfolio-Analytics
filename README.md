python -c "import server; print('SERVER IMPORT OK')"


python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000


Do this now

Keep the server running for the moment, open a second PowerShell, go to the project root:

cd "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

Then run:

python -c "import sys; print(sys.executable)"

Then:

python -m pip show anthropic

And then this, which will look for existing project Python environments without changing anything:

Get-ChildItem . -Recurse -Filter python.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
What I expect

The first command will probably show something similar to:

...\AppData\Local\CitiSoftware\CTC7013_PYTHON_3.14.4\...\python.exe

The second will probably say:

WARNING: Package(s) not found: anthropic
