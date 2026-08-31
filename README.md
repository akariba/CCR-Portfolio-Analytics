STOP THE CURRENT LOOP AND CONTINUE FROM THE EXISTING WORKTREE.

This is a corrective implementation task, not another investigation-only task.

FINAL OBJECTIVE

Deliver one genuinely working Windows Step 2.5 “SEC + Web” vertical slice in the real active RPR application:

* active frontend: `UI Design\step23.html`
* backend: the existing real `server.py` application
* SEC source: real SEC EDGAR data
* web source: the existing approved enterprise web-evidence adapter
* assessment model: the existing approved live model route
* result presentation: the useful Step 2.5 table, scoring, commentary, citations, evidence, conflicts, and interaction concepts from v31
* v31 is read-only reference material only
* no demo, mock, fixture, canned, fallback, or synthetic runtime result

Do not stop merely because production approval flags remain unset. Complete every technical component that does not require inventing an approval. If an external decision remains, produce the exact Stylus escalation described below after completing the implementation.

CRITICAL FACTS FROM THE LATEST EXECUTION

1. Windows SEC connectivity is now technically proven through Fiddler at `127.0.0.1:8888`.
2. Live SEC submissions were returned through that path.
3. The proxy/config tests passed: 18 passed.
4. The browser screenshot used the wrong file:
   `rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html`
5. The only active frontend is:
   `UI Design\step23.html`
6. The active frontend must be served by the backend and opened through its HTTP URL. Do not test it using a `file:///C:/...` URL.
7. The new smoke script used AAPL. That violates the explicit project rule and must be corrected.
8. The screenshot shows inconsistent workflow state: the system log reports portfolio confirmation, while the sidebar still displays Portfolio Selection as “In Progress.”
9. The SEC connectivity work does not prove that the complete SEC + Web assessment, approved model call, persistence, and v31-style rendering work.
10. Do not claim completion until the real browser flow is executed in `step23.html`.

NON-NEGOTIABLE RULES

* Windows only.
* Do not discuss or implement another operating system or deployment environment.
* Do not modify Steps 1–2.4 except for a narrowly proven compatibility defect required for Step 2.5.
* Do not replace or rewrite existing working components.
* Do not modify, serve, rename, or execute v31.
* Use v31 only as a read-only specification for Step 2.5 visualization and intended PoC behavior.
* Do not modify the old consolidated test HTML.
* Do not create a second active frontend.
* Do not add another Run Assessment button.
* Do not use Apple, AAPL, or a fabricated portfolio company anywhere.
* Remove AAPL/MSFT/TSLA from the newly added smoke script. The script must accept explicit user-supplied identifiers or use a real confirmed Step 2.2 company.
* Never use `verify=False`, `--insecure`, certificate-warning suppression, or TLS bypass.
* Do not hardcode credentials, tokens, personal emails, proxy credentials, approval IDs, or approval booleans.
* Do not commit the personal test User-Agent shown in the terminal.
* Do not set production approval variables to true without documented authorization.
* Do not add mock, demo, fixture, sample, canned, or rule-based runtime assessment paths.
* Test doubles are permitted only inside isolated automated tests.
* Do not alter the existing global LLM routing.
* Preserve the existing Step 2.3/2.4 model behavior.
* Never show raw stack traces or configuration secrets in the browser.
* Do not report success based only on direct API calls.
* Do not report success based only on the SEC connectivity script.
* Do not mark the task complete without testing the real browser page.

PHASE 1 — PRESERVE AND AUDIT THE NEW PROXY WORK

Inspect the six changed files before making further edits.

Preserve the useful implementation if correct:

* opt-in Windows local-development SEC proxy support
* proxy settings exposed in preflight
* TLS verification through a normal SSL context
* optional CA bundle support
* fail-closed production gates
* mocked transport/config tests
* implementation documentation

Correct these problems:

1. Remove the implicit hardcoded proxy fallback if it can activate without an explicit URL. Proxy routing must require an explicit, validated proxy URL unless an existing application convention clearly defines the default.
2. Validate that the proxy URL permits only expected HTTP/HTTPS proxy schemes.
3. Ensure proxy credentials and full sensitive URLs are never logged.
4. Ensure `RPR_SEC_DEV_CA_BUNDLE`, when supplied:

   * resolves to an existing regular file;
   * fails clearly when invalid;
   * is used for TLS verification;
   * never silently falls back to unverified TLS.
5. Ensure local-development proxy configuration cannot satisfy or bypass any production approval gate.
6. Ensure production mode cannot accidentally inherit the local-development proxy flag.
7. Ensure the application transport, not only the standalone script, handles compressed SEC responses correctly.
8. Add tests for invalid proxy URL, missing CA file, malformed CA configuration, production-mode isolation, compressed response handling, and secret redaction.

Do not treat the internal Apollo/Confluence implementation as reusable application code or as production authorization. It is evidence of a Windows local connectivity pattern only.

PHASE 2 — REMOVE STRICT-RULE VIOLATIONS

Fix the newly added manual smoke script:

* no AAPL;
* no Apple;
* no MSFT/TSLA hardcoded list;
* no personal email hardcoded as the SEC User-Agent;
* no default company;
* no automatic execution during tests, startup, or production runtime;
* require explicit command-line company name/ticker/CIK;
* require explicit User-Agent input through configuration;
* print no secrets;
* include an unmistakable “local connectivity diagnostic only” label;
* keep it outside the production runtime dependency graph.

Delete the earlier loose diagnostic script in Downloads if it is still present and was created only for this investigation. Do not delete unrelated user files.

Search the entire Step 2.5 production path for:

* `mock`
* `fixture`
* `demo`
* `canned`
* `stand-in`
* `Mock assessment`
* `LLM_PROVIDER=mock`
* hardcoded Apple/AAPL
* `verify=False`
* `CERT_NONE`
* disabled TLS warnings
* fabricated evidence
* fabricated approvals

Remove every runtime-reachable fallback. Preserve isolated tests and clearly marked test fixtures only.

PHASE 3 — USE THE CORRECT FRONTEND

The browser must use the backend-served active page:

`UI Design\step23.html`

Find and report its exact backend URL, expected to resemble:

`http://127.0.0.1:<port>/ui-design/step23.html`

Do not open it using `file:///`.

Do not open:

`rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html`

Do not open or serve v31.

Verify through real HTTP that:

* `step23.html` returns 200;
* the Step 2.5 JavaScript returns 200;
* the Step 2.5 CSS returns 200;
* the preflight endpoint returns structured JSON;
* the browser connects to the correct backend origin;
* no old consolidated page is involved.

Add a visible development-only diagnostic identifying the active page as `step23.html` and the backend base URL if this can be done without cluttering production UI. Never display secrets.

PHASE 4 — FIX WORKFLOW-STATE CONSISTENCY

The latest screenshot shows a real state mismatch:

* the system log says portfolio selection was confirmed;
* the sidebar says Portfolio Selection is “In Progress”;
* Step 2.3 and Step 2.4 appear confirmed;
* Step 2.5 readiness may still report upstream confirmation as incomplete.

Trace the authoritative persisted state used by:

* Step 2.2 confirmation;
* the sidebar;
* Step 2.5 preflight;
* Step 2.5 selected-company dropdown;
* page reload/restoration.

Identify whether the mismatch is caused by:

* different storage keys;
* stale in-memory state;
* different company or portfolio IDs;
* different page versions;
* localStorage/sessionStorage mismatch;
* missing restore call;
* non-awaited confirmation persistence;
* a selector reading display state instead of authoritative state.

Fix the narrow root cause.

Requirements:

* one authoritative portfolio/run identifier;
* one authoritative selected-company identity;
* one authoritative confirmation status per upstream step;
* refresh must preserve the same state;
* Step 2.5 must not claim an upstream step is unconfirmed when the authoritative persisted record says it is confirmed;
* Step 2.5 must not silently infer confirmation when it is genuinely absent.

Add regression tests covering confirm → navigate → reload → Step 2.5 preflight.

PHASE 5 — COMPLETE THE REAL SEC + WEB PIPELINE

Trace the existing Run Assessment click from `step23.html` to the backend.

The pipeline must execute:

1. Read the selected assessment type.
2. Require `SEC + Web`.
3. Read the real confirmed Step 2.2 portfolio.
4. Read the real selected company and immutable identity.
5. Read confirmed Step 2.3 factors.
6. Read confirmed Step 2.4 factors.
7. Resolve the legal entity to a CIK deterministically.
8. Retrieve real SEC submissions/filings and relevant XBRL facts.
9. Retrieve real approved public-web evidence using the existing enterprise adapter.
10. Preserve SEC and web evidence as separate provenance lanes.
11. Detect contradictions without silently resolving them.
12. Build the assessment prompt from real upstream factors and real evidence.
13. Call the existing approved live model route.
14. Validate the model’s structured response.
15. Persist run, evidence, conflicts, assessment, model metadata, citations, and timestamps.
16. Return the result.
17. Render the result in the active `step23.html`.
18. Restore the same result after refresh using the persisted run ID.

Do not implement only the SEC half.

Do not replace the approved web adapter with direct arbitrary crawling.

Do not create a new model client if an existing approved client exists.

PHASE 6 — SEC FILING ALIGNMENT

Make the SEC path deterministic and auditable.

For every SEC filing used, retain:

* CIK;
* legal entity name;
* form type;
* accession number;
* filing date;
* report/period date where applicable;
* primary document;
* canonical SEC URL;
* retrieval timestamp;
* extraction method;
* excerpt or normalized fact;
* XBRL concept, unit, period, and dimensions where applicable;
* amendment/supersession status.

Requirements:

* exact ticker/CIK match must outrank name matching;
* name-only ambiguity must stop for analyst review;
* amendments must supersede earlier filings only according to deterministic rules;
* do not combine different reporting periods as duplicates;
* do not treat missing SEC evidence as proof of absence;
* the model must not invent metrics;
* every material SEC-backed statement must link to stored SEC evidence;
* SEC fair-access rate limiting and retry behavior must remain enforced;
* identify the exact filing forms used and justify their relevance to the assessment.

PHASE 7 — V31 VISUALIZATION AND POC LOGIC

Inspect the v31 Step 2.5 implementation read-only.

Create a written mapping before porting:

| v31 behavior | v31 source | step23 destination | backend/API field | action |
| ------------ | ---------- | ------------------ | ----------------- | ------ |

Port the useful Step 2.5 concepts into `step23.html` and its existing append assets, including where present:

* assessment-type selector;
* Run/Re-run Assessment behavior;
* portfolio/company summary;
* company identity columns;
* factor groups;
* event-driven factor scores;
* sector-inherent factor scores;
* weights;
* weighted/composite score;
* residual rating;
* credit-impact rating;
* current and recommended actions/classes;
* key risk driver;
* evidence-grounded narrative;
* factor commentary;
* analyst commentary controls;
* evidence/citation drill-down;
* SEC versus web provenance labels;
* conflict/review indicators;
* loading, partial, blocked, failed, and completed states;
* sortable/filterable result presentation where v31 provides it.

Do not copy static v31 rows, companies, scores, or narratives.

All displayed values must come from the current Step 2.2–2.5 run.

If the current backend schema lacks a v31 field:

* add a properly typed field when it is genuinely part of Step 2.5;
* compute deterministic fields in code;
* generate qualitative reasoning through the approved live model;
* never fill gaps with placeholder values.

PHASE 8 — HONEST EXECUTION MODES

Separate these states explicitly:

* `LOCAL_SEC_CONNECTIVITY_READY`
* `UPSTREAM_WORKFLOW_READY`
* `SEC_AUTHORIZATION_READY`
* `APPROVED_WEB_READY`
* `MODEL_AUTH_READY`
* `FULL_STEP25_READY`

Local SEC connectivity must not imply full Step 2.5 readiness.

If external authorization is missing, the UI must show the exact remaining authorization requirement. It must not display a generic blank panel, endless “Processing,” or raw environment-variable dump.

If the complete pipeline is blocked only by an external decision, all implemented components must still be testable independently without fabricating successful runtime results.

PHASE 9 — TESTING

Run the narrow tests first, then the full relevant suite.

Required automated coverage:

* proxy opt-in and isolation;
* TLS verification and CA bundle behavior;
* gzip/compressed SEC response handling;
* production gates unchanged;
* CIK exact match and ambiguity;
* SEC access failure;
* fair-access throttling;
* amendment/supersession logic;
* evidence provenance;
* approved web adapter success/failure;
* SEC/web conflict preservation;
* runtime rejection of mock/fixture providers;
* model authentication failure;
* invalid model output;
* evidence-grounded assessment validation;
* Step 2.2 confirmation persistence;
* sidebar/preflight state consistency;
* correct `step23.html` wiring;
* correct browser API request;
* result rendering;
* citation interaction;
* persistence and refresh restoration;
* v31 file hash unchanged;
* old consolidated HTML not used.

Do not classify pre-existing failures as unrelated until you have shown the exact failing tests and demonstrated that they predate or cannot be caused by the changed files.

PHASE 10 — REAL WINDOWS BROWSER VERIFICATION

Start the backend using the approved project virtual environment and existing Windows startup path.

Open the backend-served `step23.html`.

Complete or restore Steps 1–2.4 using a real confirmed portfolio company.

Select `SEC + Web`.

Click the actual visible Run Assessment button.

Capture and report:

* browser URL;
* active HTML filename;
* selected company and stable ID;
* upstream confirmation IDs;
* request URL and HTTP status;
* run ID;
* CIK resolution status;
* SEC evidence count;
* web evidence count;
* conflict count;
* assessment ID;
* live model provider/model metadata;
* final phase;
* rendered result sections;
* citation behavior;
* refresh/restoration result.

Direct API success is useful diagnostic evidence but does not replace this browser verification.

If browser automation is unavailable, do not claim browser success. Produce exact manual verification steps and label the browser action unverified.

STYLUS ESCALATION — ONLY FOR REAL REMAINING DECISIONS

Do not ask Stylus whether Windows can reach SEC. That is already proven.

After completing all safe technical work, if authorization is still blocking the real run, produce one copy-ready Stylus prompt containing:

1. A concise implementation report.
2. Files changed.
3. Tests executed and exact results.
4. Proof that live SEC connectivity works through the local Windows proxy.
5. Explicit statement that this proves technical reachability, not production authorization.
6. Exact remaining decisions, limited to:

   * the approved SEC User-Agent application/team name and monitored contact;
   * whether this Windows/Fiddler pattern is approved for RPR local execution;
   * the approved CA/trust configuration for RPR;
   * the SEC egress approval record and metadata;
   * whether the existing enterprise web-evidence adapter is approved for Step 2.5;
   * whether a separate Step 2.5 web-mode approval is required;
   * policy for a confirmed company that is not an SEC filer.
7. Ask Stylus to cite the exact internal policy, owner, approval record, or source for every answer.
8. Ask Stylus not to invent approval values.
9. Do not mention unrelated platforms or teams.

FINAL REPORT FORMAT

Return:

A. VERDICT
Choose exactly one:

* `COMPLETE — REAL WINDOWS SEC+WEB VERIFIED`
* `CODE COMPLETE — EXTERNAL AUTHORIZATION REQUIRED`
* `PARTIAL — TECHNICAL BLOCKER REMAINS`
* `NOT IMPLEMENTED`

B. CORRECT ACTIVE FRONTEND
State the exact backend-served URL and prove it is `UI Design\step23.html`.

C. ROOT CAUSES
One entry per observed defect.

D. FILES CHANGED
File-by-file explanation.

E. FILES PRESERVED
Include Steps 1–2.4 and v31 hash proof.

F. SEC CONNECTIVITY
Distinguish local technical reachability from production authorization.

G. END-TO-END PIPELINE
State which stages were genuinely executed.

H. UI/V31 PORT
Provide the mapping and rendered features.

I. TESTS
Commands, counts, failures, and evidence.

J. REAL BROWSER PROOF
Do not substitute direct API testing.

K. REMAINING BLOCKERS
Only blockers that genuinely remain.

L. STYLUS PROMPT
Include only if an internal decision is still required.

Do not stop after adding more configuration. Continue through the frontend, orchestration, approved model, persistence, and rendering work until either the real browser flow succeeds or one precisely documented external authorization decision prevents it.
