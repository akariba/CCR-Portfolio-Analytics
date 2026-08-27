Run these one at a time, exactly as written:

python -m pip config debug

Then:

env | grep PIP

Then:

find "$HOME" -name pip.conf -print

Then:

find "$HOME" -name .pypirc -print

Then check whether the server already has the packages globally:

/usr/bin/python -c 'import fastapi; print("fastapi",fastapi.__version__)'
/usr/bin/python -c 'import uvicorn; print("uvicorn",uvicorn.__version__)'
/usr/bin/python -c 'import pandas; print("pandas",pandas.__version__)'
