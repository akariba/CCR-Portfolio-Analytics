Get-ChildItem .. -Filter python.exe -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match '\\.venv\\Scripts\\python\.exe$' } | Select-Object -ExpandProperty FullName
