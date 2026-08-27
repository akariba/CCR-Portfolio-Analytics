Do this next. These are deliberately simple commands that work in your shell — no parentheses-heavy find, no complicated chaining.

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

First test whether the actual RPR source is even syntactically compatible with Python 3.9:

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -m py_compile app/backend/server.py

Then obtain the real installed versions correctly:

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import importlib.metadata as m; print("fastapi",m.version("fastapi")); print("uvicorn",m.version("uvicorn")); print("pydantic",m.version("pydantic")); print("starlette",m.version("starlette")); print("httpx",m.version("httpx")); print("anthropic",m.version("anthropic"))'

Then check the remaining critical RPR dependencies one by one:

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import pandas; print("PANDAS OK")'
PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import openpyxl; print("OPENPYXL OK")'
PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import google.adk; print("GOOGLE ADK OK")'
PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import google.genai; print("GOOGLE GENAI OK")'

And finally test the actual RPR backend import, which is much more valuable than testing random packages:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/app/backend
PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import server; print("RPR SERVER IMPORT OK")'
