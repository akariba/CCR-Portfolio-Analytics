Get-ChildItem "$HOME\Downloads" -Directory -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq "Rapid Portfolio Review_AI" } | Select-Object -ExpandProperty FullName
