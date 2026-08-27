cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

echo "=== PYTHON REFERENCES INSIDE DEPLOYMENT SCRIPTS ==="
grep -nH -E 'python3|python |PYTHON' deploy/*.sh deploy/*.optional 2>/dev/null || true

echo
echo "=== REAL PREFLIGHT START ==="
bash deploy/preflight_unix.sh
RC=$?

echo
echo "=== PREFLIGHT EXIT CODE: $RC ==="
