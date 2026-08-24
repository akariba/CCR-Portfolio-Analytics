cd "C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI"

& ".\portfolio-agent\.venv\Scripts\python.exe" -m pip install python-multipart



Get-Content ".\RUNTIME_ENV.ps1" -Raw | Invoke-Expression


cd ".\backend"

& "..\portfolio-agent\.venv\Scripts\python.exe" -m uvicorn server:app --reload --host 127.0.0.1 --port 8000




0000000

  Change the import in backend\step2_routes.py

Replace:

from fastapi import APIRouter, File, HTTPException, UploadFile

with:

from email import policy
from email.parser import BytesParser

from fastapi import APIRouter, HTTPException, Request
2. Add this helper immediately before /context/extract
def _read_uploaded_file_without_multipart(
    request: Request,
    body: bytes,
    fallback_name: str,
):
    content_type = request.headers.get("content-type", "")

    # Preserve existing browser FormData uploads without python-multipart.
    if content_type.lower().startswith("multipart/form-data"):
        raw_message = (
            f"Content-Type: {content_type}\r\n"
            "MIME-Version: 1.0\r\n\r\n"
        ).encode("utf-8") + body

        message = BytesParser(policy=policy.default).parsebytes(raw_message)

        for part in message.iter_parts():
            filename = part.get_filename()
            if filename:
                payload = part.get_payload(decode=True) or b""
                return filename, payload, part.get_content_type() or ""

        raise ValueError("No uploaded file found in multipart request.")

    # Also support direct/raw uploads.
    filename = (
        request.headers.get("X-File-Name")
        or request.headers.get("x-file-name")
        or fallback_name
    )

    return filename, body, content_type
3. Replace both offending routes

Replace the current /context/extract route with:

@step2_router.post("/context/extract")
async def context_extract(request: Request):
    try:
        body = await request.body()
        filename, payload, content_type = _read_uploaded_file_without_multipart(
            request,
            body,
            "upload",
        )
        return extract_context_file(
            filename,
            payload,
            content_type,
        )
    except Exception as exc:
        _raise_http(exc)

Replace the current /assumptions/extract route with:

@step2_router.post("/assumptions/extract")
async def assumptions_extract(request: Request):
    try:
        body = await request.body()
        filename, payload, content_type = _read_uploaded_file_without_multipart(
            request,
            body,
            "upload",
        )
        return extract_assumption_file(
            filename,
            payload,
            content_type,
        )
    except Exception as exc:
        _raise_http(exc)

Save step2_routes.py.

Then run this before restarting:

Select-String -Path ".\step2_routes.py" -SimpleMatch -Pattern "UploadFile","File(","Form("

Ideally it returns nothing.

Then:

python -c "import server; print('SERVER IMPORT OK')"

If you see:

SERVER IMPORT OK

start normally:

python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
