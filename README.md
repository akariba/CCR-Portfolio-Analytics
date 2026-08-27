cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE || exit 1

echo "================================================"
echo "RPR MARKETDEV PRE-IMPLEMENTATION CHECK"
echo "================================================"

echo
echo "=== LOCATION ==="
pwd

echo
echo "=== TARGET FILES ==="
find . -maxdepth 4 -type f \( \
  -name "marketdev_start.sh" -o \
  -name "llm_gateway.py" -o \
  -name "rpr_search_agent.py" -o \
  -name "market_event_scout.py" -o \
  -name "narrative_enricher.py" -o \
  -name "web_search_agent.py" \
\) -print

echo
echo "=== VIRTUAL ENVIRONMENT ==="
if [ -x ./.venv/bin/python ]; then
    ./.venv/bin/python --version
else
    echo "NO .venv/bin/python"
fi

echo
echo "=== AUTH / M2M / HELIX REFERENCES ==="
grep -RniE \
'R2D2_AUTH_MODE|RUN_MODE|COIN_CLIENT_ID|COIN_CLIENT_SECRET|R2D2_CLIENT_ID|R2D2_CLIENT_SECRET|CITI_CERT_PATH|R2D2_CERT_FILE|helix auth|access-token|helix_adk_adapter|HelixGemini|verify=False' \
./app ./backend ./marketdev_start.sh 2>/dev/null | head -250

echo
echo "=== ADAPTER IMPORT TEST ==="
if [ -x ./.venv/bin/python ]; then
./.venv/bin/python - <<'PY'
mods = [
    "helix_adk_adapter",
    "helix_adk_adapter.models",
    "helix_adk_adapter.custom_google_llm",
    "google.adk",
]
for m in mods:
    try:
        mod = __import__(m, fromlist=["*"])
        print("PASS:", m, getattr(mod, "__file__", "built-in"))
    except Exception as e:
        print("FAIL:", m, type(e).__name__, str(e))
PY
fi

echo
echo "=== CURRENT START SCRIPT AUTH SECTION ==="
grep -nE \
'R2D2_AUTH_MODE|RUN_MODE|COIN_CLIENT|R2D2_CLIENT|CITI_CERT|R2D2_CERT|helix|8822|RPR_HOST|RPR_PORT|uvicorn' \
./marketdev_start.sh 2>/dev/null

echo
echo "================================================"
echo "CHECK COMPLETE - NOTHING MODIFIED"
echo "================================================"
