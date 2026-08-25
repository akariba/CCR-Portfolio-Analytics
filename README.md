Do not type that path manually again. We’ll let PowerShell carry it so there can’t be another typo.

In the same PowerShell window, run these one at a time.

First:

$root = Get-ChildItem "$HOME\Downloads" -Directory -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq "Rapid Portfolio Review_AI" } | Select-Object -First 1 -ExpandProperty FullName

Then:

$root

Then:

Test-Path (Join-Path $root "backend")

Then:

Test-Path (Join-Path $root "UI Design")
Stop there.

I expect:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI
True
True
