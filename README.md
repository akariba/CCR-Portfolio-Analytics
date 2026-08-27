cd /home/ak54743

ls -l /usr/bin/python3.9

/usr/bin/python3.9 --version

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import fastapi; print("fastapi", fastapi.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import uvicorn; print("uvicorn", uvicorn.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import pydantic; print("pydantic", pydantic.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import starlette; print("starlette", starlette.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import httpx; print("httpx", httpx.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import openpyxl; print("openpyxl", openpyxl.__version__)'

PYTHONPATH=/home/ak54743/.local/lib/python3.9/site-packages /usr/bin/python3.9 -c 'import pandas; print("pandas", pandas.__version__)'

Then also run this single simple inventory command:

ls -1 /home/ak54743/.local/lib/python3.9/site-packages | head -100
