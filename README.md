CONTINUE IMPLEMENTATION. DO NOT RUN ANOTHER TEST-ONLY OR DOCUMENTATION-ONLY PASS.

Your latest result—73 targeted tests passing—is accepted, but Step 2.5 is still not implemented end to end.

The current objective is:

REAL-DATA WINDOWS LOCAL POC SUCCESS

It is not a production deployment. Do not confuse “local” with “demo,” “fixture,” or “mock.”

The local Windows execution must use:

* real selected Step 2.2 portfolio company;
* real SEC EDGAR data through the proven Windows/Fiddler connection;
* real existing enterprise web-evidence adapter already used by Steps 2.3/2.4;
* real existing approved model routes;
* real evidence persistence;
* real assessment generation;
* real rendering in `UI Design\step23.html`.

STRICT RULES

* Windows only.
* Active frontend only: `UI Design\step23.html`.
* Serve it through the real backend HTTP route.
* Never use the old consolidated test HTML.
* Never modify or run v31.
* v31 is read-only visual/PoC reference.
* No demo mode.
* No fixture mode.
* No mock model.
* No canned assessment.
* No fabricated evidence.
* No fabricated approval.
* No Apple/AAPL.
* No TLS bypass.
* No `verify=False`.
* Do not modify working Steps 1–2.4.
* Preserve all currently passing behavior.
* Do not add more tests unless they cover an actual implementation change.
* Do not stop after configuration, tests, documentation, or preflight.
* Do not ask whether to continue. Continue.

IMPORTANT CORRECTION TO THE CURRENT GATING MODEL

Do not require local Windows PoC execution to claim that the application is production-certified.

Separate these two concepts:

1. `local_live_ready`

   * real SEC connectivity available;
   * real approved web adapter callable;
   * real model authentication callable;
   * real confirmed upstream state available;
   * no mock/fixture/demo components.

2. `production_deployment_ready`

   * formal production authorization and deployment-governance status.

The user currently requires `local_live_ready`, not production deployment certification.

Inspect every current Step 2.5 blocker. For each blocker, provide:

| Blocker | Source file/function | Original project requirement or newly introduced? | Needed for real local execution? | Needed only for production deployment? |

If any blocker was introduced during Step 2.5 implementation without an existing internal requirement, policy reference, or pre-existing application convention, do not let that invented blocker prevent the local real-data PoC.

Specifically inspect:

* `RPR_STEP25_LIVE_SEC_ENABLED`
* `RPR_SEC_EGRESS_APPROVED`
* `RPR_STEP25_SEC_MODE`
* `RPR_STEP25_WEB_MODE`
* `RPR_SEC_USER_AGENT`
* any model-auth “readiness” gate
* `production_blockers()`
* router preflight rejection
* orchestration run rejection

Do not blindly delete legitimate production protections. Scope them correctly:

* production deployment remains fail-closed;
* local live Windows execution may proceed only with genuine live providers and actual successful connectivity/authentication;
* local mode must never substitute mock/fixture results.

SEC USER-AGENT

For local live execution, accept the User-Agent from an environment variable.

Requirements:

* non-empty;
* contains an application/team identifier;
* contains a contact address;
* never hardcoded;
* never logged in full if considered sensitive;
* do not claim it has formal production approval.

Use the configured value for the actual SEC call. Do not use Apple/AAPL anywhere.

SEC CONNECTIVITY

The real Windows SEC path is already proven through Fiddler.

Use the implementation now present in `sec_transport.py`.

Verify:

* proxy use is explicitly enabled;
* proxy URL is explicit;
* TLS verification remains enabled;
* optional CA bundle is validated when supplied;
* gzip responses are decoded in the production transport;
* SEC fair-access rate limiting remains active;
* failures are returned as structured errors.

Do not spend another pass rebuilding the connectivity test.

APPROVED WEB PATH

Trace the real working enterprise web-evidence route used by Steps 2.3/2.4.

Step 2.5 must reuse that exact adapter and authentication path.

Do not build another web client.

Do not require a newly invented `WEB_MODE=approved` flag if the existing enterprise adapter already establishes the provider and route. If the flag came from an actual existing governance requirement, cite its source and keep it. Otherwise replace the artificial flag with a real technical readiness check against the configured adapter.

MODEL PATH

Reuse the actual working project model routing:

* existing Gemini enterprise-web route for evidence retrieval where applicable;
* existing approved assessment/refinement route;
* no mock provider;
* no rule-based fallback;
* no second client;
* no alteration of global Step 2.3/2.4 routing.

A missing or failed live model call must produce a clear failure. It must never generate a stand-in assessment.

UPSTREAM STATE DEFECT

Fix the observed inconsistency where:

* the system log says Step 2.2 portfolio confirmation succeeded;
* Step 2.3 and Step 2.4 succeeded;
* the sidebar still shows Portfolio Selection “In Progress”;
* Step 2.5 may read upstream state as incomplete.

Trace the actual persisted portfolio/run identifier through:

* Step 2.2 confirmation;
* sidebar status;
* Step 2.3;
* Step 2.4;
* Step 2.5 preflight;
* Step 2.5 run request;
* refresh/restoration.

Use one authoritative persisted workflow state. Do not infer confirmation from display text, and do not introduce another state store.

ACTIVE FRONTEND

Use only:

`http://127.0.0.1:<actual-port>/ui-design/step23.html`

The browser screenshot that showed:

`rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html`

was the wrong page. Do not use that file for any verification.

Confirm `step23.html` loads:

* Step 2.5 JS;
* Step 2.5 CSS;
* correct backend origin;
* correct API prefix;
* existing Run Assessment button;
* Step 2.5 result container.

ACTUAL IMPLEMENTATION REQUIRED NOW

Complete this real execution chain:

1. Restore confirmed Steps 2.2, 2.3, and 2.4 state.
2. Select one real confirmed Step 2.2 company.
3. Carry its real company name, internal ID, ticker where available, and legal identity into Step 2.5.
4. Resolve the company’s CIK deterministically.
5. Retrieve its real SEC submissions.
6. Select credit-relevant filings.
7. Retrieve relevant filing text and/or XBRL facts.
8. Retrieve approved-web evidence through the existing enterprise adapter.
9. Store SEC and web evidence separately with provenance.
10. Detect SEC/web conflicts.
11. Construct the Step 2.5 assessment input from:

    * Step 2.3 confirmed event factors;
    * Step 2.4 confirmed sector factors;
    * real SEC evidence;
    * real web evidence;
    * selected company identity.
12. Call the real configured assessment model.
13. Reject any response without evidence linkage.
14. Persist the assessment.
15. Return the assessment ID and run ID.
16. Render the result in `step23.html`.
17. Restore the same result after browser refresh.

V31 RESULT LOGIC

Inspect v31 read-only and port its useful Step 2.5 visualization logic into `step23.html` and the existing Step 2.5 append assets.

The rendered result must include, when supported by the actual assessment schema:

* company identity;
* event-driven factors and weights;
* sector-inherent factors and weights;
* factor scores;
* weighted/composite score;
* residual rating;
* credit-impact rating;
* current and recommended actions;
* key risk drivers;
* assessment narrative;
* analyst commentary;
* SEC evidence;
* approved-web evidence;
* source links;
* accession numbers;
* conflicts requiring analyst review;
* provider/model metadata;
* assessment timestamp;
* Run/Re-run behavior.

Do not copy any v31 company, score, narrative, or static row.

Remove all placeholder text and blank-panel behavior after a successful run.

REAL BROWSER EXECUTION

After implementing, start the actual backend and open the backend-served `step23.html`.

Use the real browser Run Assessment button.

A direct POST using PowerShell does not replace this requirement.

Report:

* exact browser URL;
* selected real company;
* company/internal ID;
* CIK resolution;
* actual SEC forms/accession numbers;
* SEC evidence count;
* web evidence count;
* conflicts;
* model provider/model;
* run ID;
* assessment ID;
* final orchestration phase;
* rendered result sections;
* refresh/restoration outcome.

If literal browser automation is unavailable, state that limitation, but still finish the code and provide exact manual click instructions. Do not claim the click occurred if it did not.

REMOVE REMAINING PROHIBITED CONTENT

Search the production runtime and newly added diagnostic script for:

* Apple
* AAPL
* MSFT
* TSLA
* mock assessment
* fixture assessment
* rule-based stand-in
* canned response
* `verify=False`
* `CERT_NONE`

Remove prohibited runtime behavior.

The manual SEC script must require an explicitly supplied real company identifier. It must not contain a default issuer list.

WHEN TO ASK STYLUS

Only ask Stylus if, after completing the entire technical implementation, one exact internal fact is still required.

Do not ask generic questions.

Produce a Stylus prompt containing:

* what is implemented;
* files changed;
* real SEC connectivity proof;
* web/model reuse proof;
* tests;
* exact remaining blocker;
* the exact internal source or approval needed;
* a request for a source citation and accountable owner.

Do not mention unrelated infrastructure or another operating system.

FINAL VERDICT

Choose exactly one:

* `COMPLETE — REAL WINDOWS LOCAL SEC+WEB VERIFIED`
* `CODE COMPLETE — MANUAL BROWSER CLICK REQUIRED`
* `CODE COMPLETE — ONE NAMED INTERNAL DECISION REQUIRED`
* `PARTIAL — TECHNICAL IMPLEMENTATION REMAINS`
* `NOT IMPLEMENTED`

The latest status is currently `PARTIAL — TECHNICAL IMPLEMENTATION REMAINS`.

Do not return another “tests passed” report as completion. Step 2.5 is complete only when the real selected company produces a real SEC + approved-web + live-model assessment and the result renders in the backend-served `step23.html`.
