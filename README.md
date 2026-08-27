Run exactly these commands, one line at a time:

head -1 /home/ak54743/.local/bin/fastapi
head -1 /home/ak54743/.local/bin/uvicorn
ls -la /home/ak54743/.local/lib

Then:

find /home/ak54743/.local/lib -type d -name 'fastapi*' -print 2>/dev/null
find /home/ak54743/.local/lib -type d -name 'uvicorn*' -print 2>/dev/null
find /home/ak54743/.local/lib -type d -name 'pandas*' -print 2>/dev/null
