cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

cat > setup_rpr_packages.sh <<'SCRIPT'
#!/bin/sh

ROOT="/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE"
PIPDIR="$HOME/.pip"
PIPCONF="$PIPDIR/pip.conf"
USERNAME="ak54743"
REPO="pypi-3rdparty"
HOST="www.artifactrepository.citigroup.net"
CERT="/etc/pki/citi/CitiInternalCAChain_PROD.pem"

echo "=================================================="
echo "RPR UNIX PACKAGE INSTALL"
echo "=================================================="

cd "$ROOT" || exit 1

if [ ! -x ".venv/bin/python" ]; then
    echo "ERROR: $ROOT/.venv/bin/python does not exist"
    exit 1
fi

echo
echo "Python:"
.venv/bin/python --version

echo
echo "Paste your NEW Artifactory identity token."
echo "Nothing will be displayed while you paste."
printf "TOKEN: "

stty -echo < /dev/tty
IFS= read -r TOKEN < /dev/tty
stty echo < /dev/tty
echo

if [ -z "$TOKEN" ]; then
    echo "ERROR: empty token"
    exit 1
fi

mkdir -p "$PIPDIR"
chmod 700 "$PIPDIR"

umask 077

{
    echo "[global]"
    echo "index-url = https://${USERNAME}:${TOKEN}@${HOST}/artifactory/api/pypi/${REPO}/simple"
    echo "disable-pip-version-check = true"
    echo "timeout = 120"

    if [ -r "$CERT" ]; then
        echo "cert = $CERT"
    fi
} > "$PIPCONF"

chmod 600 "$PIPCONF"

unset TOKEN

unset PIP_INDEX_URL
unset PIP_EXTRA_INDEX_URL
unset PIP_CONFIG_FILE

export PIP_CONFIG_FILE="$PIPCONF"

echo
echo "=================================================="
echo "ARTIFACTORY AUTH TEST"
echo "=================================================="

.venv/bin/python -m pip index versions fastapi >/tmp/rpr_pip_auth_test.log 2>&1

if [ $? -ne 0 ]; then
    echo "ERROR: Artifactory authentication test failed."
    echo "Last lines:"
    tail -20 /tmp/rpr_pip_auth_test.log | sed -E 's#(https://[^:]+:)[^@]+@#\1***@#g'
    exit 2
fi

echo "PASS: Artifactory authentication works."

echo
echo "=================================================="
echo "INSTALLING RPR DEPENDENCIES"
echo "=================================================="

.venv/bin/python -m pip install \
    --disable-pip-version-check \
    --no-input \
    -r deploy/requirements-unix.txt

RC=$?

if [ "$RC" -ne 0 ]; then
    echo
    echo "ERROR: dependency installation failed. RC=$RC"
    exit "$RC"
fi

echo
echo "=================================================="
echo "VERIFYING PACKAGES"
echo "=================================================="

.venv/bin/python -m pip check

.venv/bin/python -c "import fastapi,uvicorn,pydantic,starlette,httpx,pandas,openpyxl; print('CORE PYTHON PACKAGES: OK')"

.venv/bin/python -c "import google.adk; print('GOOGLE ADK: OK')"

.venv/bin/python -c "import google.genai; print('GOOGLE GENAI: OK')"

echo
echo "=================================================="
echo "PACKAGE INSTALLATION SUCCESSFUL"
echo "=================================================="
echo "Python: $ROOT/.venv/bin/python"
echo "Pip config: $PIPCONF"
echo "Repository: $REPO"
echo
echo "Now running RPR preflight..."
echo

chmod +x deploy/*.sh 2>/dev/null || true

bash deploy/preflight_unix.sh
PREFLIGHT_RC=$?

echo
echo "=================================================="

if [ "$PREFLIGHT_RC" -eq 0 ]; then
    echo "RPR PREFLIGHT: PASS"
    echo "Dependencies and deployment prerequisites are ready."
else
    echo "RPR PREFLIGHT: remaining configuration blockers above."
    echo "Python/package installation itself completed successfully."
fi

echo "=================================================="

exit "$PREFLIGHT_RC"
SCRIPT

chmod 700 setup_rpr_packages.sh

echo "INSTALLER CREATED:"
ls -l setup_rpr_packages.sh
