Get-ChildItem .. -Filter python.exe -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match '\\.venv\\Scripts\\python\.exe$' } | Select-Object -ExpandProperty FullName


Get-ChildItem .. -Filter python.exe -Recurse -ErrorAction SilentlyContinue | Where-Object { 


$_.FullName -match '\\.venv\\Scripts\\python\.exe$' } | Select-Object -ExpandProperty FullName


"$_.FullName -match '\\.venv\\Scripts\\python\.exe$' } "

Get-ChildItem .. -Filter python.exe -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*\.venv\Scripts\python.exe" } | Select-Object -ExpandProperty FullName
