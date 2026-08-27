cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

cp -n deploy/env.example deploy/env.sh.local

sed -i 's/^RPR_HOST=.*/RPR_HOST=0.0.0.0/' deploy/env.sh.local
sed -i 's/^RPR_PORT=.*/RPR_PORT=8010/' deploy/env.sh.local
sed -i 's|^CITI_CERT_PATH=.*|CITI_CERT_PATH=/etc/pki/citi/CitiInternalCAChain_PROD.pem|' deploy/env.sh.local

echo "=== CERT ==="
test -r /etc/pki/citi/CitiInternalCAChain_PROD.pem && echo "CERT OK" || echo "CERT MISSING"

echo "=== WINDOWS APPROVED MODEL VALUES ==="
grep -nE 'RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL|RPR_THEME_GATE_MODEL|RPR_STEP1_REFINEMENT_MODEL|STEP23_REASONING_MODEL|STEP23_REVISION_MODEL|STEP23_REPAIR_MODEL' app/RUNTIME_ENV.ps1.windows-reference
