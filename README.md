cd "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

& ".\portfolio-agent\.venv\Scripts\python.exe" -m pip install python-multipart



Get-Content ".\RUNTIME_ENV.ps1" -Raw | Invoke-Expression


cd ".\backend"

& "..\portfolio-agent\.venv\Scripts\python.exe" -m uvicorn server:app --reload --host 127.0.0.1 --port 8000


777777777777777777777777
@router.post("/upload")
async def portfolio_upload(request: Request) -> Dict[str, Any]:
    try:
        payload = await request.body()

        file_name = (
            request.headers.get("X-File-Name")
            or request.headers.get("x-file-name")
            or "portfolio_upload"
        )

        content_type = request.headers.get("content-type", "")

        if not payload:
            raise Step22DataError("Uploaded portfolio file is empty.")

        return get_step22_service().ingest_upload(
            file_name=file_name,
            content_type=content_type,
            payload=payload,
        )

    except Step22DataError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
