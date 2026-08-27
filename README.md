I need help with one very specific MarketDev UNIX environment problem. Please do not troubleshoot or modify my application code.

I have deployed a FastAPI/Python application to:
/home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

Python 3.11.5 is available and I successfully created a .venv.

The blocker is dependency installation. Running:

python -m pip install -r deploy/requirements-unix.txt

reaches Citi Artifactory but returns:

401 Error: Credentials not correct

against:
www.artifactrepository.citigroup.net/artifactory/api/pypi/pypi-dev/simple

Therefore pip reports no matching versions even though the real issue appears to be repository authentication.

Please tell me the official supported MarketDev method to authenticate pip/Artifactory and install Python packages for this account/server.

I specifically need packages including FastAPI, Uvicorn, pandas, openpyxl, httpx, Google ADK / Google GenAI and the existing application dependencies.

Please check whether MarketDev requires:

an approved pip configuration/bootstrap command,
refreshed Artifactory credentials/token,
a module/environment already provisioned on the server,
a service account,
or another Citi-supported package repository.

Do not change application source, model configuration, prompts, ports, or deployment architecture.

Please execute/verify the correct setup end-to-end if you have access rather than sending me a sequence of speculative commands.

At the end give me a short report containing:

root cause,
exact authentication/setup performed,
Python environment used,
packages successfully installed,
exact command to activate/start the application,
anything I must repeat after logout/reboot,
remaining blocker, if any.
