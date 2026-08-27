echo "=== PIP CONFIG ==="
python -m pip config debug

echo "=== PIP ENV NAMES ==="
env | grep -Ei '^(PIP_|PYPI|ARTIFACT|ARTIFACTORY)' | sed 's/=.*$/=<set>/'

echo "=== POSSIBLE PIP CONFIG FILES ==="
find "$HOME" -maxdepth 4 \( -name "pip.conf" -o -name ".pypirc" \) -print 2>/dev/null

echo "=== GLOBAL PYTHON PACKAGE CHECK ==="
/usr/bin/python - <<'PY'
mods = ["fastapi","uvicorn","pydantic","httpx","pandas","openpyxl"]
for m in mods:
    try:
        x=__import__(m)
        print("OK ", m, getattr(x,"__version__",""))
    except Exception as e:
        print("MISS", m, type(e).__name__, str(e))
PY
