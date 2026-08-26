RPR GLOBAL QUALITY + LATENCY STABILIZATION PASS

Do not redesign the application and do not change the business/credit objectives of any existing prompt.

Preserve the current v31 UI, Step 1 progressive architecture, Step 2.1, real Step 2.2 portfolio logic, Step 2.3, Step 2.4 V6, AI Assist, feedback controls, model routing and all accepted working behaviour.

The objectives of this pass are:

A. MAXIMIZE EVIDENCE QUALITY

Inspect every current enterprise-web research path used by Step 1, Step 2.3 and Step 2.4.

Introduce a common evidence-quality policy, preferably through a small reusable helper rather than duplicating instructions everywhere.

Rank evidence in this order:

Primary/authoritative sources: SEC/regulatory filings, official company IR/financial releases, central banks, governments/regulators, rating agencies where accessible.
Reuters/Bloomberg/FT/WSJ and equivalent approved high-quality financial sources.
Credible institutional/industry research.
Lower-quality web sources only if stronger sources cannot evidence the claim.

Prefer recent evidence for current-event claims:

latest available source first;
generally favor last 30–90 days;
older sources allowed for historical context/methodology only.

Never fabricate missing quantitative evidence.

Preserve contradictory credible evidence rather than silently choosing one.

B. REMOVE INTERNAL/API URLs FROM ANALYST OUTPUT

Inspect the Gemini/ADK enterprise-search response and current evidence extraction.

URLs such as:

vertexaisearch.cloud.google.com/grounding-api-redirect/...

or any equivalent internal grounding/API/search infrastructure URL must never be rendered as analyst-facing citations.

Extract and retain where available:

source title
publisher
publication date
canonical original/public source URL

If only an internal redirect is available, do not expose it. Preserve publisher/title/date and mark canonical URL unavailable.

Do not remove evidence simply because URL normalization failed.

C. REDUCE RESEARCH LATENCY WITHOUT REDUCING QUALITY

For each event use a small parallel search plan rather than uncontrolled broad searching:

latest/event facts
quantitative financial/credit/market implications
disconfirming/alternative evidence

Run independent searches concurrently where current architecture permits.

Rank retrieved evidence by:

authority × recency × direct relevance × quantitative usefulness

Use approximately 4–6 genuinely useful high-quality sources per event rather than accumulating many redundant sources.

Implement an evidence-sufficiency early-stop condition once the required business sections have strong support.

Gemini remains the enterprise retrieval/evidence model.

Opus remains the refinement/synthesis model.

Do not downgrade models.

Pass Opus a compact structured evidence bundle rather than unnecessary raw search text wherever safely possible.

D. STRUCTURED EVIDENCE CONTRACT

Without changing the existing analyst-facing business sections, normalize retrieved evidence internally to fields such as:

claim
metric/value/unit where applicable
measurement period/date
publisher
publication date
canonical URL
source tier
evidence class: REPORTED / DERIVED / NOT_EVIDENCED
confidence

Existing business output remains the primary rendered output.

Do not introduce invented estimates merely to populate fields.

E. STEP 2.2 PERFORMANCE — PRIORITY DEFECT

The Step 2.2 screen repeatedly shows blank filters / Loading portfolio catalog... for too long even though the real source contains ~84k companies.

Investigate the exact live files and execution path before modifying anything:

step22_real_data_loader.py
step22_portfolio_service.py
step22_portfolio_routes.py
live Step 2.2 frontend JS
the three approved real XLSX source files

Determine whether XLSX parsing, joins, index construction or redundant service instantiation are occurring on every catalog/search request.

Target architecture:

Load and normalize the real source data once per backend process.
Build reusable in-memory indexes for geography, country, MLE, L1/L2/L3 and CAGID.
/catalog returns metadata/filter values only — never the 84k company population.
/search returns a limited preview (for example first 100) plus the exact total_count.
/finalize independently resolves the complete matching population server-side.
Never send the entire company universe to the browser merely to populate Step 2.2.
Do not silently truncate the final portfolio to the preview count.

Preserve the real-data files as source of truth.

If current repeated XLSX parsing is the bottleneck, first implement safe process-level caching. Do not introduce a new persistent datastore unless measurements prove that process caching is insufficient.

Add invalidation based on source file modification/fingerprint so a changed real-data file is reloaded.

Provide measured timings for:

cold data initialization
warm /catalog
warm no-filter /search
filtered /search
/finalize

Report source row counts and reconciled distinct CAGID counts to prove no records were silently dropped.

F. FRONTEND EXPERIENCE

Preserve v31 styling.

Add the small reusable elapsed-time indicator already requested:

Loading portfolio data… Elapsed 00:04

and after completion:

Loaded in 00:04

Use the same timer behaviour for long-running research/model operations.

Country selection must remain searchable/typeable rather than forcing users to scroll a list.

G. DO NOT CHANGE

Do not change scoring methodology.

Do not change factor definitions/business objectives.

Do not modify Step 2.5 in this pass.

Do not merge NSE into RPR.

Do not change the v31 global layout/style.

Do not create mock data or public-web fallbacks.

Do not expose internal API/search URLs.

Do not refactor unrelated working bone.

VALIDATION REQUIRED BEFORE CLAIMING SUCCESS

Test with the live backend and real data, not mocks.

Demonstrate:

Step 2.2 cold load and warm load times
filters populate correctly
country can be typed/searched
preview count vs total count
finalize preserves the full matching universe
no missing/duplicate CAGID introduced
one real Step 1 event produces recent, authoritative evidence
rendered output contains no grounding/API redirect URLs
publication/source dates are present where available
Step 2.3 still imports/works
Step 2.4 V6 remains active and intact

At the end give me a concise report containing:

root cause(s)
exact files changed
before/after timings
evidence-quality changes
source-ranking logic
URL-cleaning behaviour
data/count reconciliation for Step 2.2
regression-test results
anything still unresolved.
