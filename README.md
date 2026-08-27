cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE || exit 1

TS=$(date +%Y%m%d_%H%M%S)
mkdir -p "_pre_m2m_backup_$TS"

cp -p marketdev_start.sh "_pre_m2m_backup_$TS/"
cp -p app/backend/rpr_search_agent.py "_pre_m2m_backup_$TS/"
cp -p app/backend/llm_gateway.py "_pre_m2m_backup_$TS/"
cp -p app/backend/web_search_agent.py "_pre_m2m_backup_$TS/"
cp -p app/backend/market_event_scout.py "_pre_m2m_backup_$TS/"
cp -p app/backend/narrative_enricher.py "_pre_m2m_backup_$TS/"

echo "BACKUP=$PWD/_pre_m2m_backup_$TS"
