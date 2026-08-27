Do only this now. These commands are deliberately compatible with your ksh shell and avoid the syntax problems we had earlier:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

if [ -r /env ]; then
  . /env
  echo "ENV LOADED"
else
  echo "BLOCKER: /env does not exist or is not readable"
fi

for v in ARTIFACTORY_USERNAME ARTIFACTORY_API_KEY ARTIFACTORY_IDENTITY_TOKEN PIP_INDEX_URL
do
  if printenv "$v" >/dev/null 2>&1; then
    echo "$v=SET"
  else
    echo "$v=MISSING"
  fi
done
What I want to see

Ideally:

ENV LOADED
ARTIFACTORY_USERNAME=SET
ARTIFACTORY_API_KEY=SET
ARTIFACTORY_IDENTITY_TOKEN=SET
PIP_INDEX_URL=SET

It is possible only one of ARTIFACTORY_API_KEY / ARTIFACTORY_IDENTITY_TOKEN is used; that's fine. Do not show me the actual values.

If /env loads and PIP_INDEX_URL plus authentication are set, continue immediately:

. .venv/bin/activate
python -m pip install -r deploy/requirements-unix.txt
Then there are only two outcomes

If installation starts downloading/installing packages: excellent. Let it finish. Then run:

python -c 'import fastapi, uvicorn, pandas, openpyxl, httpx; import google.adk; print("RPR CORE DEPENDENCIES OK")'

If you still get 401 Credentials not correct: stop there. Do not search directories, reinstall Python, alter pip files, modify RPR, or create another venv. It means the server/account is missing the Citi-supported Artifactory/FID provisioning described in the screenshots. That becomes a MarketDev platform-support issue.

Also, Citi Assist confirmed an important point: /env is probably session-scoped. So after a new SSH login you may need:

. /env
