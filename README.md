RPR REAL-DATA INTEGRATION — STEP 2.2 AND DOWNSTREAM USE

Work only in the current working RPR project:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

The current application is already working. Do not refactor, redesign, delete, or replace working code. Preserve the existing frontend/v31 design, APIs, Step 1, Step 2.1, Step 2.3, Step 2.4 V6, feedback controls, and all current behavior. Use the existing implementation as immutable bone and make the minimum additive changes required.

Goal

Replace the synthetic/demo portfolio data used by Step 2.2 Portfolio Selection with the newly provided real internal data files already located in:

backend\data\step22\

Real files now present:

relationship_meta_data (1) (version 1).xlsx
mle_data_20260731.xlsx
new_mapping_code_20231204 5.xlsx

Existing fallback/demo files must remain untouched:

rpr_company_master.csv
rpr_country_geography.csv
rpr_mle_reference.csv
rpr_sector_hierarchy.csv
existing assumptions files

Do not modify anything under backend\data\step24.

FIRST: inspect before coding

Before changing code, inspect:

the exact sheet names and column headers of all three new XLSX files;
the current Step 2.2 backend loader/service/routes;
the exact schema currently returned by the Step 2.2 catalog/search/finalize endpoints;
how the frontend consumes those fields.

Do not guess column names.

Produce a short mapping:

real source column → existing RPR field → transformation/join rule.

Then implement the smallest compatible adapter.

DATA RESPONSIBILITIES
A. relationship_meta_data...xlsx — PRIMARY STEP 2.2 PORTFOLIO MASTER

Use this as the authoritative relationship/company universe.

From the actual headers, map the available equivalents of:

CAGID
relationship/company name
L1 industry
L2 industry
L3 industry
L4 industry if available
current RRR / risk rating
credit classification
country / country-of-risk code
relationship-level exposure fields if present

This file should drive:

Step 2.2 sector filtering → matching real CAGIDs/companies → selected portfolio.

Preserve existing Step 2.2 behavior:

hierarchical sector selection;
OR within a dimension;
AND across dimensions;
select all matching CAGIDs;
optional uploaded portfolio path;
existing catalog/search/finalize APIs.

Do not introduce an LLM into Step 2.2. This remains deterministic data logic.

B. new_mapping_code_20231204 5.xlsx — COUNTRY / GEOGRAPHY REFERENCE

Inspect actual headers. The visible source contains concepts such as:

country_code, country_name, region, country_code_std, cluster.

Use this as a reference/enrichment table only.

Join the relationship country/risk code to this mapping where possible and expose normalized:

country name
region
cluster

Do not discard a relationship if the mapping is missing. Preserve the original source country value and mark normalized geography as unavailable.

C. mle_data_20260731.xlsx — CCR / EXPOSURE ENRICHMENT

Inspect exact headers first.

The visible file contains concepts including:

CAGID
CAGID name
GFCID
GFCID name
MLE
OSUC
PSE
TFA
issuer MTM
as-of date

Treat this as an enrichment source, not as the primary company universe.

Join to the Step 2.2 selected portfolio using the safest available key, preferably CAGID. Preserve multiple MLE/GFCID rows when a relationship has multiple legal entities; do not silently collapse them unless the current UI needs a relationship-level aggregate.

If relationship-level aggregation is needed, calculate it deterministically and document the rule.

Do not infer or fabricate missing exposure values.

USE BY RPR STEP
Step 1

No change.

Do not use these files for market-event discovery or evidence enrichment.

Step 2.1 — Scenario & Assumptions

No change to the existing prompt or business objective.

The new portfolio files should not influence scenario generation unless the application already explicitly passes portfolio context.

Step 2.2 — Portfolio Selection

This is the main integration point.

Replace the synthetic company universe with the real relationship master through an additive real-data adapter.

Initial UI/output should expose only fields that are useful and already compatible with the Step 2.2 design:

CAGID | Company | L1 | L2 | L3 | Country | RRR | Classification | OSUC

Add region/cluster only if this can be done without changing the existing UI structure.

Keep richer MLE information in the backend response/model for downstream use rather than cluttering the UI.

Add a clear source/as-of indicator if available.

Step 2.3 — Event-Driven Risk Factors

Do not change the Step 2.3 business prompt because of these files.

Step 2.3 identifies event-driven factors from the scenario.

The selected Step 2.2 portfolio can continue downstream as context if the current implementation already supports it, but OSUC/PSE/TFA/MLE values must not be used to invent or alter event-factor scores.

Step 2.4 — Sector-Inherent Risk Factors

No change.

Step 2.4 V6 is sector-based and must remain independent of company exposure amounts.

Do not modify backend\data\step24, the V6 methodology, or the V5.2 rollback path.

Step 2.5 / Step 3a–3b — Name-Level Assessment

Make the real Step 2.2 company identity fields available downstream:

CAGID
company name
sector hierarchy
country
RRR
classification

Existing Step 3a/3b credit methodology must remain unchanged.

Do not feed OSUC/PSE/TFA/issuer MTM into the LLM's residual-credit-risk calculation unless the existing business prompt explicitly requires them.

They may be carried as portfolio context/output metadata for later CCR analytics.

Step 4 — Portfolio / Sector Impact

The existing Step 4 business prompt already requires portfolio exposure information.

Where the source semantics are confirmed, make the appropriate real relationship-level exposure field available to Step 4 instead of synthetic/demo exposure.

Do not assume OSUC = another exposure measure without checking the current source/business definition.

Preserve current Step 4 scoring and aggregation methodology.

If multiple MLE rows exist under one CAGID, aggregate only with an explicitly documented deterministic rule.

DATA QUALITY / GOVERNANCE RULES
Do not fabricate missing values.
Do not silently drop unmatched rows.
Preserve original CAGID strings exactly.
Preserve source as-of dates.
Log duplicate CAGIDs and one-to-many CAGID→MLE relationships.
Validate numeric fields before aggregation.
Do not allow NaN, Excel errors, or malformed numeric values to break APIs.
Keep the existing CSV dataset as fallback/rollback.
No public web access and no new external dependencies unless already approved in the environment.
Do not expose internal file-system paths in the browser output.
IMPLEMENTATION APPROACH

Prefer an additive structure such as:

backend/step22_real_data_loader.py

or equivalent, rather than rewriting the existing Step 2.2 service.

The loader should:

Excel sources → normalization → joins → existing Step2.2 internal schema

Then the existing Step 2.2 APIs and frontend should continue working with minimal/no changes.

Include a simple configuration switch/fallback such that:

real data available → use real source

real data unavailable/error → fail clearly or use existing fallback according to current application behavior

Do not silently substitute demo data in a production-looking result.

VALIDATION REQUIRED

Before considering the work complete, demonstrate:

backend loads all three XLSX files successfully;
sector hierarchy returns real L1/L2/L3 values;
selecting one real sector returns real CAGIDs/company names;
RRR/classification/country map correctly;
CAGID joins to MLE data correctly;
one-to-many MLE relationships are handled correctly;
geography mapping works;
Step 2.2 finalize still works;
Step 2.3 and Step 2.4 still run unchanged;
no existing frontend layout or behavior is broken.

At the end, report only:

files inspected;
discovered sheet names and exact relevant headers;
mapping used;
files changed/added;
deterministic aggregation rules;
tests performed/results;
exact restart command.

Do not redesign anything else. Do not modify prompts outside this scope. Do not replace the working RPR backbone.
