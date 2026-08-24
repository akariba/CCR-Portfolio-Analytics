STOP before further changes. There are 4 changed files shown. First list the 4 files and their diffs in max 6 lines. Preserve all accepted working bone and do not revert any previously explicitly approved fix, but remove any unapproved diagnostic/temp changes.

For Step 2.4, root cause is confirmed missing backend/data/step24/sector_inherent_factors.csv. Do NOT change the existing Step2.4 service/routes/prompts or the two approved HTML fixes. Inspect step24_sector_factors_service.py to derive the exact required CSV schema, then search existing project/demo/prompt/reference files for the governed sector-factor source.

If the source/schema is sufficient, create ONLY the missing CSV as an additive file using existing approved business definitions — no invented factors. If information is insufficient, STOP and tell me exactly what is missing. Then run one live Step2.4 generate → render → finalize test. Max tokens.
