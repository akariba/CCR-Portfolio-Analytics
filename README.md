MarketDev Terminal — run this entire block first. It only checks configuration; it does not print credentials.
cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE || exit 1

echo "=== 1. M2M CODE SUPPORT ==="
grep -nE 'R2D2_AUTH_MODE|COIN_CLIENT_ID|COIN_CLIENT_SECRET|R2D2_CLIENT_ID|R2D2_CLIENT_SECRET|_get_m2m_token|client_credentials' \
  app/backend/llm_gateway.py | head -80

echo
echo "=== 2. CREDENTIAL PRESENCE — VALUES WILL NOT BE PRINTED ==="

[ -n "${COIN_CLIENT_ID:-}" ] && echo "COIN_CLIENT_ID=SET" || echo "COIN_CLIENT_ID=MISSING"
[ -n "${COIN_CLIENT_SECRET:-}" ] && echo "COIN_CLIENT_SECRET=SET" || echo "COIN_CLIENT_SECRET=MISSING"
[ -n "${R2D2_CLIENT_ID:-}" ] && echo "R2D2_CLIENT_ID=SET" || echo "R2D2_CLIENT_ID=MISSING"
[ -n "${R2D2_CLIENT_SECRET:-}" ] && echo "R2D2_CLIENT_SECRET=SET" || echo "R2D2_CLIENT_SECRET=MISSING"

echo
echo "R2D2_AUTH_MODE=${R2D2_AUTH_MODE:-NOT_SET}"

echo
echo "=== 3. STATIC FILES ==="
for f in \
 rpr_step22_step23_append.js \
 rpr_step22_step23_append.css \
 rpr_step24_append.js \
 rpr_step24_append.css
do
    echo "--- $f"
    find app -type f -name "$f" -print 2>/dev/null
done

echo
echo "=== 4. PUBLIC DIRECTORY ==="
ls -l app/backend/public/ | head -80

echo
echo "=== 5. START SCRIPT AUTH SETTINGS ==="
grep -nE 'R2D2_AUTH_MODE|COIN_CLIENT|R2D2_CLIENT|RUN_MODE|RPR_PORT|RPR_HOST|8010|8822' \
  marketdev_start.sh 2>/dev/null

Send me a photo of that output immediately. Do not show any secret values.

If the output shows either COIN_CLIENT_ID + COIN_CLIENT_SECRET = SET or the equivalent R2D2_CLIENT_* = SET, we can switch immediately to M2M.

If M2M credentials are already present, run:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE || exit 1

export R2D2_AUTH_MODE=m2m

./marketdev_start.sh

Do not set RUN_MODE, change ports, or modify Python yet. Keep:

server:app
port 8010

Then in another MarketDev terminal:

curl -sS -i http://127.0.0.1:8010/health | head -20

You want:

HTTP/... 200

Then open:



http://sd-f34e-972f.nam.nsroot.net:8010/ui/index.html



Static files — fix them now if they exist elsewhere in the package

If the first command shows the four files somewhere under app/ but not under app/backend/public/, use this safe copy script:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE || exit 1

PUB="app/backend/public"

for f in \
 rpr_step22_step23_append.js \
 rpr_step22_step23_append.css \
 rpr_step24_append.js \
 rpr_step24_append.css
do
    if [ -f "$PUB/$f" ]; then
        echo "PASS already deployed: $f"
        continue
    fi

    SRC=$(find app -type f -name "$f" ! -path "$PUB/*" -print 2>/dev/null | head -1)

    if [ -z "$SRC" ]; then
        echo "MISSING FROM PACKAGE: $f"
    else
        echo "COPY: $SRC -> $PUB/$f"
        cp "$SRC" "$PUB/$f" || exit 1
    fi
done

echo
echo "FINAL:"
ls -l "$PUB"/rpr_step*.js "$PUB"/rpr_step*.css 2>/dev/null

Restart:

./marketdev_start.sh

Then verify all four over HTTP:

for f in \
 rpr_step22_step23_append.js \
 rpr_step22_step23_append.css \
 rpr_step24_append.js \
 rpr_step24_append.css
do
    printf "%-35s " "$f"
    curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:8010/ui/$f"
done

All four must say:

200
