cd "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

Get-Content ".\RUNTIME_ENV.ps1" -Raw | Invoke-Expression


cd ".\backend"

python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
