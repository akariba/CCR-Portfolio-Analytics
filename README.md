python -c "import server; print('SERVER IMPORT OK')"


python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
