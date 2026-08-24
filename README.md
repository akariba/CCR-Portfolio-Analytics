Get-ChildItem -Path . -Recurse -Filter python.exe -File -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName }
