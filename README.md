cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

echo "=== BUILD UNIX VENV ==="
/usr/bin/python -m venv .venv
. .venv/bin/activate

echo "=== PYTHON ==="
python --version
which python

echo "=== INSTALL RPR DEPENDENCIES ==="
python -m pip install -r deploy/requirements-unix.txt

echo "=== VERIFY CERTIFICATE ==="
ls -l /etc/pki/citi/CitiInternalCAChain_PROD.pem 2>&1 || true

echo "=== CREATE LOCAL ENV CONFIG ==="
cp -n deploy/env.example deploy/env.sh.local

echo "=== MOVE RPR OFF OCCUPIED PORT 8000 ==="
sed -i 's/^RPR_PORT=.*/RPR_PORT=8010/' deploy/env.sh.local

echo "=== SHOW IMPORTANT NON-SECRET CONFIG ==="
grep -E '^(RPR_HOST|RPR_PORT|R2D2_AUTH_MODE|CITI_CERT_PATH|RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL|RPR_STEP1_REFINEMENT_MODEL|STEP23_REASONING_MODEL|RPR_GEMINI_MODEL)' deploy/env.sh.local

echo "=== INSTALL PHASE COMPLETE ==="
