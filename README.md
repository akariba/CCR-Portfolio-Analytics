READ-ONLY DIAGNOSIS — DO NOT MODIFY ANY FILE.

Step 2.4 browser POST currently reaches /api/v1/rpr/step24/sector-factors/generate but returns HTTP 502. Browser message says no approved model is configured for step24_sector_inherent_reasoning.

The newly approved business prompt is “Enhanced Prompt: Sector-Inherent Factor Identification, Metrics and Weighting — V6.0”. Its input is only Sector L1/L2/L3 (+ optional as-of date), and it independently researches and generates 4–5 sector-inherent risk factors. Pre-defined Risk Factor Name/Details are no longer inputs.

DO NOT EDIT. Diagnose only.

Inspect:
server.py
all step24* Python files
RUNTIME_ENV.ps1
model gateway/configuration used by Step 2.4
Step 2.4 prompt loader/prompt files
any backend/data/step24/* dependencies.

Report:

Exact Step 2.4 route function handling /api/v1/rpr/step24/sector-factors/generate.
Exact call chain from route → service → prompt/model gateway.
Exact line/function generating the current “No approved model configured for step24_sector_inherent_reasoning” error.
Every environment variable checked for the Step 2.4 reasoning model, in priority order.
Current runtime values, or empty/unset status, for:
STEP24_REASONING_MODEL
STEP24_OPUS_MODEL
STEP24_SONNET_MODEL
STEP2_OPUS_MODEL
STEP2_SONNET_MODEL
RPR_APPROVED_SONNET5_MODEL
and any other Step 2.4 model variables actually referenced.
Whether the running backend appears to have sourced RUNTIME_ENV.ps1.
Why Step 2.3 can call claude-opus-4-6 successfully while Step 2.4 reports no approved model.
Identify every current Step 2.4 dependency on sector_inherent_factors.csv or any pre-defined factor taxonomy.
State exactly whether the current backend generates factor names itself or requires governed factor rows first.
Identify the exact prompt file currently used by Step 2.4 and whether it is V5.x/old taxonomy architecture or V6.0.
Compare the current service contract with V6.0 and list the minimum backend changes required to support:
L1/L2/L3 → research → 4–5 generated structural factors → metrics/scoring/weights.
Confirm which existing deterministic rules can remain unchanged:
HIGH=2, MEDIUM=1, weights sum 100%, buffer credits, floor/ceiling, Score-5 critical-condition rule.

End with a maximum 12-line diagnosis containing:
ROOT CAUSE
WHY 502
CURRENT MODEL RESOLUTION
CURRENT PROMPT
OLD TAXONOMY DEPENDENCY
V6 GAP
SMALLEST CORRECT FIX

ABSOLUTE RULE: ZERO FILES MODIFIED.
