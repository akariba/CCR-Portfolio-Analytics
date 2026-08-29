# RPR STEP 2.5 — DECISIVE WINDOWS-ONLY COMPLETION AND STYLUS ESCALATION

## THIS IS A CONTINUATION, NOT A RESTART

Continue from the current working tree. Do not repeat the previous forensic exercise and do not rebuild Step 2.5.

The previous execution produced three valid narrow changes that must be preserved:

1. `UI Design\rpr_step25_append.js`

   * Corrected the Step 2.4 confirmed-sector map lookup.
   * Added the correct sector-key construction matching Step 2.4.
2. `backend\step25\config.py`

   * Removed an irrelevant non-Windows term from a user-facing message.
3. `backend\tests\test_step25_frontend_wiring.py`

   * Added regression coverage for the Step 2.4 lookup defect.

The previous execution correctly preserved v31 and working Steps 1–2.4.

However, the previous verdict `CODE COMPLETE — EXTERNAL APPROVAL REQUIRED` was incorrect. The correct state is:

`PARTIAL — TECHNICAL AND EXTERNAL BLOCKERS REMAIN`

Do not revert the valid changes. Continue from them.

---

# 1. ABSOLUTE SCOPE

Windows project only:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI`

Active frontend only:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\UI Design\step23.html`

v31 is a read-only reference for Step 2.5 visualization and PoC logic.

Do not modify, serve, mount, rename or execute v31.

Do not perform any Unix, migration, deployment, hosting, container or server-platform work.

---

# 2. STRICT NON-NEGOTIABLE RULES

1. Preserve all accepted working bones.
2. Do not modify working Steps 1, 2.1, 2.2, 2.3 or 2.4.
3. Do not change their models, prompts, routes, scoring, confirmation workflow, visuals or persistence.
4. Do not change the existing working routing:

   * Gemini 3.5 Flash through the existing enterprise evidence adapter.
   * Existing R2D2/Opus reasoning route.
5. Do not redesign the application.
6. Do not create a second frontend.
7. Do not create another Run Assessment button.
8. Do not change CAM functionality.
9. The only target in this task is **SEC + Web**.
10. Do not silently select `CAM + SEC + Web`.
11. No runtime demo, fixture, mock, sample, canned response or rule-based fake assessment.
12. No Apple/AAPL.
13. No hardcoded test company.
14. No fabricated CIK, filing, accession number, citation, evidence, approval or assessment.
15. No subsidiary-to-parent substitution without stored authoritative linkage and analyst confirmation.
16. No fake environment variables.
17. No setting approval flags merely to make preflight green.
18. No disabling TLS, User-Agent validation, egress controls, certificate verification or provenance checks.
19. No raw access tokens in files, logs, tests, reports or chat output.
20. Test doubles are permitted only inside isolated automated tests and must not be reachable in runtime.
21. Do not claim success from test fixtures or direct API calls alone.
22. Do not run destructive Git operations or global Undo.
23. Do not stop technical implementation merely because external approval is unavailable.
24. Implement everything safely possible, then escalate only the genuinely external decisions to Stylus.

---

# 3. CURRENT OBSERVED STATE

The actual Windows workflow proves:

* Steps 1–2.4 are working.
* Real portfolio selection works.
* Real enterprise-web evidence works in Step 2.4.
* Existing R2D2/Opus reasoning works.
* Step 2.5 endpoints respond.
* The Step 2.4 map-key defect has been fixed.
* v31 remains unchanged.

The latest screen currently shows:

* A confirmed Step 2.2 portfolio with approximately 477 companies.
* A real selected company.
* Step 2.3 not yet confirmed/in progress.
* Step 2.4 not yet confirmed.
* Therefore combined upstream readiness is correctly `No`.
* This specific upstream condition is not a Step 2.5 defect and must not be bypassed.
* Production activation is also blocked by SEC and approved-web configuration.

Observed production blockers include:

* `STEP25_SEC_ACCESS_NOT_APPROVED`
* `RPR_STEP25_SEC_MODE` is not `live`
* `RPR_STEP25_LIVE_SEC_ENABLED` is not `true`
* `STEP25_SEC_EGRESS_BLOCKED`
* `RPR_SEC_EGRESS_APPROVED` is not established
* `STEP25_SEC_USER_AGENT_MISSING`
* `RPR_SEC_USER_AGENT` is not configured
* `STEP25_WEB_PROVIDER_NOT_READY`
* `RPR_STEP25_WEB_MODE` is not recognized as approved

Do not confuse upstream workflow incompleteness with production activation blockers. Report them separately.

---

# 4. PRIMARY MISSION

Complete every remaining technical Step 2.5 task that does not require an internal governance decision.

Then:

1. Produce a detailed implementation and blocker report.
2. Generate one complete, ready-to-paste prompt for Stylus.
3. Ask Stylus only for authoritative internal answers that cannot be determined from the repository.
4. Stop after producing these two deliverables.
5. Do not continue guessing, testing arbitrary environment values or repeating preflight.

When the Stylus answers are later supplied, they will be used in a separate final activation pass.

---

# 5. REMOVE ALL RUNTIME MOCK/FIXTURE ASSESSMENT BEHAVIOR

The open production `assessment_service.py` visibly contains or appears to contain behavior such as:

* `fixture evidence`
* `rule-based stand-in`
* `Mock assessment for {company...}`
* fallback assessment generation when `LLM_PROVIDER` is absent

Audit this completely.

Requirements:

1. Identify every runtime-reachable mock, fixture, rule-based fake or canned success path in Step 2.5.
2. Search Python, JavaScript, HTML, PowerShell, configuration and environment handling.
3. Remove or isolate every runtime-reachable fake-success path.
4. Test fixtures may remain only under tests or behind explicit dependency injection unavailable to production routes.
5. If the production assessment provider is missing:

   * fail closed;
   * preserve collected evidence;
   * return `EVIDENCE_COMPLETE_ASSESSMENT_FAILED`;
   * provide an actionable provider/authentication error;
   * never manufacture an assessment.
6. If SEC or web evidence is unavailable:

   * return an explicit evidence status;
   * never substitute fixture evidence.
7. No production response may contain:

   * `provider: mock`
   * `demo`
   * `fixture`
   * `Mock assessment`
   * fabricated assessment IDs
8. Add tests proving that production configuration cannot invoke these paths.

Do not claim compliance merely because preflight prevents the path today. The forbidden fallback must not be reachable after production activation either.

---

# 6. COMPLETE THE v31 STEP 2.5 VISUALIZATION PORT

The previous execution did not implement the v31 visualization. Fix that now.

Read the exact v31 Step 2.5 HTML, CSS and JavaScript.

Do not infer its behavior from screenshots.

Document:

* relevant v31 functions;
* relevant DOM containers;
* transformations;
* factor grouping;
* ED/SI weighting;
* composite calculation;
* expand/collapse logic;
* analyst commentary;
* rerun behavior;
* portfolio-summary behavior.

Port that behavior additively into:

`UI Design\step23.html`

and its existing Step 2.5 append JS/CSS files.

Requirements:

1. Do not modify v31.
2. Record the v31 hash before and after.
3. Use the existing Step 2.5 container.
4. Use the existing Run Assessment button.
5. Preserve all current navigation and workflow behavior.
6. Do not duplicate global functions or IDs.
7. Do not add sample rows or embedded sample JSON.
8. Render only actual backend responses.
9. Render:

   * company identity;
   * internal company ID/CAGID;
   * exact legal entity name;
   * ticker/CIK or unavailable state;
   * country and industry;
   * event-driven factors;
   * sector-inherent factors;
   * ED and SI scores;
   * deterministic weights;
   * composite score;
   * impact/residual rating;
   * key risk driver;
   * factor commentary;
   * overall assessment commentary;
   * analyst override/commentary where supported;
   * SEC evidence;
   * approved-web evidence;
   * conflicts;
   * missing/unresolved evidence;
   * clickable citations.
10. SEC citations must show form, filing date and accession number.
11. Web citations must show title, source domain, publication date where available and retrieval date.
12. Show evidence status separately from assessment status.
13. Show `SEC_NOT_APPLICABLE`, `CIK_UNRESOLVED` and `CIK_REVIEW_REQUIRED` honestly.
14. Never show a completed result until a real assessment has been retrieved.
15. Preserve human review and confirmation.
16. Do not automatically confirm the workflow.

---

# 7. ENFORCE THE SEC + WEB MODE

The task is only SEC + Web.

Requirements:

1. Inspect the assessment-type selection state.
2. Ensure selecting `SEC + Web` produces exactly that mode.
3. Ensure the existing Run Assessment button sends the correct mode.
4. Do not silently retain a previous CAM selection.
5. Do not invoke CAM data or CAM endpoints.
6. Do not remove or redesign CAM cards; leave them outside this implementation.
7. Clearly display the selected assessment mode before execution.
8. Add a test showing:

   * `SEC + Web` selection → SEC/Web request;
   * CAM data absent;
   * no mixed mode.

---

# 8. PRESERVE CORRECT UPSTREAM BLOCKING

The current workflow has Step 2.3 in progress and Step 2.4 pending.

Do not bypass that.

Requirements:

1. Run Assessment remains disabled until:

   * Step 2.2 portfolio is confirmed;
   * the selected company belongs to that portfolio;
   * Step 2.3 is confirmed;
   * Step 2.4 is confirmed.
2. Display each missing upstream requirement separately.
3. Do not label upstream incompleteness as an SEC configuration error.
4. Do not post `/step25/run` while upstream readiness is false.
5. Once Steps 2.3 and 2.4 are genuinely confirmed, Step 2.5 must read the same persisted confirmation state.
6. Retain the newly fixed Step 2.4 sector-key logic.
7. Add or preserve regression coverage for:

   * genuinely incomplete upstream state;
   * genuinely complete upstream state;
   * wrong company/sector key;
   * restored persisted workflow.

---

# 9. COMPLETE THE APPROVED-WEB TECHNICAL INTEGRATION

The existing working enterprise adapter is already used by Steps 2.3/2.4:

* `rpr_search_agent.run_web_search`
* role `enterprise_web_evidence`
* `citi-r2d2-vertex`
* Gemini 3.5 Flash
* Windows certificate store

Requirements:

1. Reuse this adapter.
2. Do not create another web client.
3. Do not issue uncontrolled direct public-web requests.
4. Trace `ApprovedWebEvidenceProvider` end to end.
5. Verify Step 2.5 sends:

   * exact company identity;
   * scenario;
   * confirmed Step 2.3 factors;
   * confirmed Step 2.4 factors;
   * assessment as-of date.
6. Verify normalization and persistence.
7. Preserve:

   * source URL;
   * title;
   * domain;
   * publication date;
   * retrieval timestamp;
   * excerpt/fact;
   * company and factor association;
   * evidence class/type.
8. Keep web and SEC evidence separate.
9. Never let web evidence overwrite SEC-reported facts.
10. Retain both sources and set `conflict_flag=true` when they conflict.
11. Determine whether `RPR_STEP25_WEB_MODE=approved` is:

    * a repository-defined governance control;
    * an explicit feature opt-in;
    * or an unsupported duplicate flag introduced by Step 2.5.
12. Do not guess the answer.
13. Implement adapter capability checks independently of the unresolved governance decision.
14. Put the remaining governance decision into the Stylus prompt.

---

# 10. COMPLETE THE SEC TECHNICAL PATH WITHOUT UNAUTHORIZED LIVE ACCESS

Audit the complete SEC lane:

* configuration;
* CIK resolution;
* transport;
* rate limiting;
* filing selection;
* amendments;
* Company Facts/XBRL;
* filing-text extraction;
* normalization;
* persistence;
* serialization;
* UI retrieval.

Requirements:

1. Safe CIK resolution:

   * stored confirmed CIK;
   * exact ticker;
   * exact legal name;
   * review required;
   * unresolved/not applicable.
2. No fuzzy auto-confirmation.
3. No automatic parent substitution.
4. Explicit statuses:

   * `CIK_CONFIRMED`
   * `CIK_REVIEW_REQUIRED`
   * `CIK_UNRESOLVED`
   * `SEC_NOT_APPLICABLE`
   * `SEC_ACCESS_FAILED`
5. Preserve:

   * CIK;
   * accession number;
   * filing form;
   * filing date;
   * report period;
   * primary document;
   * exact SEC URL;
   * retrieval timestamp.
6. `source_url` and `accession_number` must survive normalization, persistence and serialization together.
7. Preserve amendment-aware supersession.
8. Preserve bounded retries, backoff, caching and fair-access rate limits.
9. Preserve TLS verification.
10. Do not make a live SEC request until the internal Windows approval questions are answered.
11. Add offline technical tests without treating them as real end-to-end success.
12. Document precisely what is code-complete and what requires authorization.

---

# 11. HANDLE NON-SEC FILERS HONESTLY

The current portfolio may contain private, foreign or non-SEC entities.

Requirements:

1. Do not assume every selected company is an SEC filer.
2. Do not replace the selected entity with a parent.
3. Do not use another portfolio company secretly.
4. If no authoritative CIK exists, return:

   * review required;
   * unresolved;
   * or not applicable.
5. Continue approved-web collection only if internal policy permits it.
6. Whether SEC + Web may become web-only for a legitimate non-SEC filer is an internal methodology decision.
7. Do not make that decision yourself.
8. Ask Stylus for the authoritative policy.
9. Until answered, preserve evidence and return an explicit blocked/partial status rather than a fabricated complete assessment.

---

# 12. TEST WHAT CAN BE TESTED NOW

Run targeted tests for all implemented technical behavior.

Required areas:

* Step 2.4 map-key regression;
* upstream complete/incomplete state;
* SEC + Web mode selection;
* absence of CAM data in SEC + Web mode;
* no runtime mock/fixture fallback;
* provider failure is fail-closed;
* evidence preserved after assessment failure;
* approved-web adapter wiring;
* SEC provenance;
* URL/accession round trip;
* conflicts;
* CIK exact/review/unresolved/not-applicable states;
* parent non-substitution;
* v31 unchanged;
* v31-style Step 2.5 renderer;
* safe missing-data rendering;
* restart persistence;
* no regression in Steps 1–2.4.

A test double may validate technical behavior, but must not be reported as real SEC/web success.

Do not repeatedly run live preflight expecting different results when required configuration has not changed.

---

# 13. REQUIRED IMPLEMENTATION REPORT

After implementing everything possible, produce a detailed report with these sections:

## A. Honest verdict

Choose exactly one:

* `COMPLETE — REAL WINDOWS SEC+WEB VERIFIED`
* `CODE READY — INTERNAL DECISIONS REQUIRED BEFORE ACTIVATION`
* `PARTIAL — TECHNICAL WORK STILL REMAINS`
* `NOT IMPLEMENTED`

Do not use `CODE COMPLETE` if v31 visualization, runtime mock removal or production wiring remains incomplete.

## B. Implemented before this continuation

List previous Step 2.5 modules and behavior already present.

## C. Implemented in this continuation

For every change provide:

* absolute Windows path;
* function/class;
* defect or requirement;
* exact correction;
* test proving it.

## D. Preserved bones

List every working component deliberately left unchanged.

## E. Current workflow state

Separate:

* Step 2.2 status;
* Step 2.3 status;
* Step 2.4 status;
* selected assessment type;
* selected company;
* whether the selected legal entity is confirmed as an SEC filer.

## F. Runtime mock/fixture audit

List every discovered demo/mock/fixture path and whether it was:

* removed;
* isolated to tests;
* still blocked with justification.

## G. Step 2.5 UI implementation

Describe:

* v31 elements ported;
* source-to-target mapping;
* real API fields rendered;
* citation behavior;
* analyst-review behavior.

## H. Technical verification

Report exact commands and unedited summaries.

## I. Remaining technical defects

Do not mix these with approval questions.

## J. Internal-policy blockers

For each blocker provide:

* blocker code;
* exact configuration field;
* why the repository cannot answer it;
* risk of guessing;
* exact authoritative decision required.

## K. Real activation status

State clearly why live SEC + Web was or was not executed.

---

# 14. GENERATE A READY-TO-PASTE STYLUS PROMPT

After the implementation report, generate one self-contained prompt titled:

`PROMPT FOR STYLUS — RPR STEP 2.5 WINDOWS BLOCKER RESOLUTION`

The prompt must be ready for the user to copy directly into Stylus.

It must contain:

1. Windows-only context.
2. Exact project/application purpose.
3. What has already been implemented.
4. Working existing enterprise model/web routing.
5. Current Step 2.5 architecture.
6. Exact blocker codes.
7. Exact configuration variables.
8. Explanation that no fake approval values may be used.
9. Questions only about unresolved internal decisions.
10. Request for authoritative internal-source citations or named policy owners.
11. A required structured response format.

At minimum, ask Stylus to resolve:

### SEC Windows access

* Is outbound HTTPS from the current Windows RPR workstation/runtime to `data.sec.gov` and `www.sec.gov` approved?
* Are both hosts allowed?
* Is a corporate proxy required?
* Which CA/certificate-store configuration is required?
* What approval ID, approver, date and approved-host metadata should be recorded?
* Are the existing `RPR_STEP25_SEC_MODE`, `RPR_STEP25_LIVE_SEC_ENABLED` and `RPR_SEC_EGRESS_APPROVED` controls authoritative internal requirements?

### SEC User-Agent

* What exact SEC-compliant User-Agent should RPR use?
* What application/team name should it contain?
* What monitored team email/contact should it contain?
* Where should the non-secret value be configured on Windows?

### Approved-web authorization

* Is the existing `citi-r2d2-vertex` / `enterprise_web_evidence` adapter already approved for Step 2.5?
* Does it satisfy `RPR_STEP25_WEB_MODE=approved`?
* Is separate governance approval required?
* What domain/source restrictions, recency rules or logging requirements apply?

### Non-SEC-filer methodology

* What should SEC + Web do when the exact selected legal entity is not an SEC filer?
* Should the run:

  * stop as `SEC_NOT_APPLICABLE`;
  * proceed with approved web only and an explicit limitation;
  * require analyst confirmation;
  * or use another approved rule?
* Is parent-level SEC evidence permitted for a subsidiary?
* If yes, what authoritative relationship field and analyst control are required?

### Assessment/model authorization

Only if still unresolved after code inspection:

* Which existing R2D2 model route is approved for the final Step 2.5 assessment?
* What authentication verification is required?
* What retry behavior is approved after an H2M failure?

Require Stylus to answer using this table:

| Decision ID | Question | Authoritative answer | Exact value/configuration | Source/policy/owner | Approved? | Conditions | Still unknown |
| ----------- | -------- | -------------------- | ------------------------- | ------------------- | --------- | ---------- | ------------- |

Tell Stylus:

* Do not invent missing values.
* Mark unknown items clearly.
* Do not provide secrets or tokens.
* Do not discuss Unix, deployment or migration.
* Focus exclusively on the current Windows implementation.
* Distinguish technical capability from governance approval.

---

# 15. STOP CONDITION

After producing:

1. the detailed implementation report; and
2. the complete Stylus prompt,

stop.

Do not:

* guess approval values;
* repeatedly rerun preflight;
* switch to demo/fixture mode;
* generate a mock assessment;
* bypass Steps 2.3 or 2.4;
* make unauthorized live SEC calls;
* claim final end-to-end success.

Wait for the user to return with Stylus’s authoritative answers.
