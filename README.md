cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

echo "=== DEPLOY FILES ==="
find deploy -maxdepth 2 -type f -print | sort

echo
echo "=== DEPLOY PERMISSIONS ==="
ls -la deploy

echo
echo "=== APP TOP LEVEL ==="
find app -maxdepth 2 -type f | head -80
