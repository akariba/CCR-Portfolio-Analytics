Send this exact request to the MarketDev/platform support person or to the internal assistant that actually knows the server provisioning:

I am deploying a Python FastAPI application on MarketDev UNIX.
Python is available, but pip installation from the Citi Artifactory fails with HTTP 401 “Credentials not correct”.

The server currently has an Artifactory index configured through pip configuration, but the supported authentication bootstrap is missing:

/env does not exist or is not readable
ARTIFACTORY_USERNAME is not set
ARTIFACTORY_API_KEY is not set
ARTIFACTORY_IDENTITY_TOKEN is not set
PIP_INDEX_URL is not set in the shell

Please tell me the official MarketDev-specific command or provisioning procedure to authenticate this server/user to Citi Artifactory/PyPI. If a Functional ID, service account, environment bootstrap file, module, Kerberos step, token command, or generated pip configuration is required, please identify exactly which one applies to this MarketDev host.

I need to install Python packages including FastAPI, Uvicorn, pandas, openpyxl, httpx, Google ADK/Google GenAI and existing application dependencies.

Please do not give generic public pip instructions. I specifically need the Citi-supported MarketDev Artifactory authentication procedure.
