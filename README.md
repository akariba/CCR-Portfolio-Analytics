cd "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

& ".\portfolio-agent\.venv\Scripts\python.exe" -m pip install python-multipart



Get-Content ".\RUNTIME_ENV.ps1" -Raw | Invoke-Expression


cd ".\backend"

& "..\portfolio-agent\.venv\Scripts\python.exe" -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
