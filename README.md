Please finish the current Step 2.2 real-data integration, then give me two deliverables only:

1. Short implementation summary

files inspected
files added/changed
which real XLSX file is used as the main portfolio source
how CAGID/company/sector/RRR/classification/country/OSUC are mapped
how mle_data_20260731.xlsx and new_mapping_code_20231204 5.xlsx are used
whether the existing Step 2.2 APIs/UI were preserved
fallback behavior
tests run and result
exact backend restart command

Keep this summary concise and client-readable.

2. Generate a real sample upload Excel for Step 2.2

Using the actual real source files already under:

backend\data\step22\

create:

backend\data\step22\step22_real_upload_test.xlsx

Requirements:

use real rows from the source files, not synthetic/demo data
rank relationships by OSUC descending
select the top 20 unique CAGIDs with non-zero OSUC
if OSUC appears on multiple MLE/GFCID rows for a CAGID, aggregate only if that is consistent with the source semantics; document the aggregation rule
include at minimum:
CAGID
CAGID Name
OSUC
also include, if reliably available:
L1
L2
L3
Country
RRR
Credit Classification
preserve CAGID as text so Excel does not alter it
no formulas, no fabricated values
make the file directly compatible with the existing Step 2.2 portfolio upload functionality
if the existing upload endpoint expects different exact column names, use the exact headers expected by the current code rather than the names above
after generating it, test the file against the Step 2.2 upload/finalize path and report whether it is accepted

Do not modify Steps 1, 2.1, 2.3, 2.4, frontend styling, or any unrelated files.

At the end tell me:
SUMMARY
SAMPLE FILE CREATED
UPLOAD TEST RESULT
FILES CHANGED
RESTART COMMAND
