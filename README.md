First, create the backup correctly. Run each line separately:

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$PWD/pre_m2m_backup_$TS"
mkdir -p "$BACKUP_DIR"
cp -p marketdev_start.sh "$BACKUP_DIR/"
cp -p app/backend/rpr_search_agent.py "$BACKUP_DIR/"
cp -p app/backend/web_search_agent.py "$BACKUP_DIR/"
cp -p app/backend/llm_gateway.py "$BACKUP_DIR/"
cp -p app/backend/market_event_scout.py "$BACKUP_DIR/"
ls -la "$BACKUP_DIR"

Then run these read-only checks:

command -v helix
./.venv/bin/python -m pip show helix-adk-adapter
grep -RIn "helix_adk_adapter" requirements*.txt app 2>/dev/null
find . -maxdepth 4 -type f \( -iname '*helix*' -o -iname '*.whl' \) -print
