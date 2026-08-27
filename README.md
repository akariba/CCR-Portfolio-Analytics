Go to the package:
cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE
Fix host:
sed -i '/^RPR_HOST=/c\RPR_HOST=0.0.0.0' deploy/env.sh.local
Fix port:
sed -i '/^RPR_PORT=/c\RPR_PORT=8010' deploy/env.sh.local
Fix certificate:
sed -i '/^CITI_CERT_PATH=/c\CITI_CERT_PATH=/etc/pki/citi/CitiInternalCAChain_PROD.pem' deploy/env.sh.local
Verify only those three:
grep -E '^(RPR_HOST|RPR_PORT|CITI_CERT_PATH)=' deploy/env.sh.local
