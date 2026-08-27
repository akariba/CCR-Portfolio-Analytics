Run each command separately. The first command captures the configured URL silently:

BASE_INDEX="$(./.venv/bin/python -m pip config get global.index-url 2>/dev/null)"

Export it without displaying it:

export BASE_INDEX

Verify only that it was captured:

./.venv/bin/python -c "import os; print('BASE INDEX CAPTURED' if 'pypi-3rdparty' in os.getenv('BASE_INDEX','') else 'BASE INDEX NOT FOUND')"

If it prints BASE INDEX CAPTURED, continue:

RCMD_INDEX="${BASE_INDEX/pypi-3rdparty/pypi-prod-rcmd}"
export RCMD_INDEX

Verify the replacement without exposing credentials:

./.venv/bin/python -c "import os; print('RCMD INDEX READY' if 'pypi-prod-rcmd' in os.getenv('RCMD_INDEX','') else 'RCMD INDEX FAILED')"

If it prints RCMD INDEX READY, install the locked dependency:

./.venv/bin/python -m pip install --extra-index-url "$RCMD_INDEX" "helix-adk-adapter==2.6.2"

Then verify:

./.venv/bin/python -c "import helix_adk_adapter; print('PASS:', helix_adk_adapter.__file__)"
./.venv/bin/python -c "from helix_adk_adapter.custom_google_llm import HelixGemini; print('PASS: HelixGemini')"

If the capture check says BASE INDEX NOT FOUND, stop there and send the screenshot. Do not print $BASE_INDEX or $RCMD_INDEX, and do not start RPR yet.
