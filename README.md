Good—this confirms the next step.

The backup succeeded and contains all five protected files.
Helix CLI exists at /home/ak54743/helix-cli/helix.
helix-adk-adapter is absent only from the new .venv.
The lockfiles require exactly version 2.6.2.
That package is stored in internal pypi-prod-rcmd, while the failed installation searched pypi-3rdparty.
The final find syntax error is harmless.

First preserve the current environment:

./.venv/bin/python -m pip freeze > "$BACKUP_DIR/pip-freeze-before-helix.txt"

Check that the authenticated index variable exists without displaying its credentials:

./.venv/bin/python -c "import os; print('PIP_INDEX_URL SET' if os.getenv('PIP_INDEX_URL') else 'PIP_INDEX_URL NOT SET')"

If it prints PIP_INDEX_URL SET, run:

RCMD_INDEX="${PIP_INDEX_URL/pypi-3rdparty/pypi-prod-rcmd}"

Then install the exact locked version from the correct internal repository:

./.venv/bin/python -m pip install --extra-index-url "$RCMD_INDEX" "helix-adk-adapter==2.6.2"

Do not display $RCMD_INDEX, because it may contain your Artifactory credentials.

After installation, verify it:

./.venv/bin/python -c "import helix_adk_adapter; print('PASS:', helix_adk_adapter.__file__)"
./.venv/bin/python -c "from helix_adk_adapter.custom_google_llm import HelixGemini; print('PASS: HelixGemini')"

Send the output after these commands. Do not change the RPR Python files or start the application yet.
