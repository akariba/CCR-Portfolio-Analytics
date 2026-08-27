cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

echo "===== 1. EXISTING SERVICE ON 8000 ====="
curl -sS http://127.0.0.1:8000/openapi.json | head -c 1000
echo

echo "===== 2. PROCESS USING 8000 ====="
command -v lsof >/dev/null 2>&1 && lsof -iTCP:8000 -sTCP:LISTEN || true
command -v fuser >/dev/null 2>&1 && fuser -v 8000/tcp || true

echo "===== 3. PYTHON 3.11 VENV SUPPORT ====="
/usr/bin/python -c "import sys; print(sys.executable); print(sys.version)"
/usr/bin/python -m venv --help >/dev/null 2>&1
echo "venv support rc=$?"

echo "===== 4. PIP SUPPORT ====="
/usr/bin/python -m pip --version 2>&1 || true

echo "===== 5. DEPLOY ENV TEMPLATE ====="
sed -n '1,240p' deploy/env.example

echo "===== 6. AUTH/CERT REFERENCES IN PACKAGE ====="
grep -RniE 'CITI_CERT_PATH|SONNET5_MODEL|R2D2_AUTH|COIN|HELIX|certificate|token|refresh' deploy app/backend 2>/dev/null | head -120
