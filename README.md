# RPR STEP 2.5 — WINDOWS-ONLY SEC + APPROVED-WEB PRODUCTION COMPLETION

## THIS PROMPT SUPERSEDES ALL PREVIOUS STEP 2.5 PROMPTS

Work directly in the existing Windows project:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI`

Active frontend:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\UI Design\step23.html`

The application must remain a Windows implementation. MarketDev, Unix, Linux, migration, hosting, containers, deployment packaging, and server installation are completely out of scope.

## 1. NON-NEGOTIABLE RULES

1. Do not mention, prepare for, or modify anything for MarketDev or Unix.
2. Do not replace, rename, rebuild, simplify, refactor, or redesign the existing application.
3. Preserve every currently working component as an immutable building bone.
4. All changes must be additive or narrowly corrective.
5. Do not modify working Steps 1, 2.1, 2.2, 2.3, or 2.4.
6. Do not change their prompts, model routing, endpoints, state transitions, visualizations, scoring, or confirmation behavior.
7. Do not modify the v31 HTML file.
8. Do not serve, mount, execute, or make v31 the active frontend.
9. v31 is a read-only reference only for its Step 2.5 visualization and PoC behavior.
10. The only active frontend remains `UI Design\step23.html`.
11. Strictly no demo mode, fixture mode, mock mode, simulated company, sample assessment, canned response, fabricated approval, or hidden fallback in runtime.
12. Do not use Apple/AAPL or any other hardcoded test company.
13. Never replace the selected company with a different company.
14. Never map a subsidiary to its parent SEC filer without explicit stored entity linkage and analyst confirmation.
15. Do not fabricate SEC CIKs, accession numbers, filings, web evidence, citations, scores, or assessment text.
16. Do not set approval variables to `true` merely to pass preflight.
17. Do not disable TLS validation, certificate verification, egress controls, User-Agent validation, or provenance validation.
18. Do not expose, copy, save, print, log, or hardcode an H2M/Helix access token.
19. Ignore any token visible in previous screenshots.
20. Do not introduce `ANTHROPIC_API_KEY` as a new Step 2.5 requirement unless the existing Step 2.5 production code demonstrably uses that provider.
21. Do not run destructive Git commands, global Undo, reset, checkout, clean, or mass file restoration.
22. The repository has a large existing dirty working tree. Preserve unrelated changes.

## 2. VERIFIED WORKING BASELINE — PRESERVE IT

The latest real Windows run proves the following already works:

### Step 1

* `step23.html` is the active frontend.
* Trigger 2 User Narrative works.
* The eight-section enriched narrative renders.
* Existing confirmation and feedback behavior works.

### Step 2.1

* Scenario narrative and scenario assumptions render.
* Assumptions can be reviewed and confirmed.
* The workflow advances correctly.

### Step 2.2

* Portfolio selection works.
* Sector filtering works.
* The real company database loads approximately 157 matching companies for the demonstrated sector.
* Real CAGIDs, company names, countries, sectors, and MLE information are displayed.
* Portfolio confirmation reaches the backend.

### Steps 2.3 and 2.4

The terminal proves the existing production routing works:

* Enterprise-web evidence:

  * provider: `citi-r2d2-vertex`
  * model: `gemini-3.5-flash`
  * role: `enterprise_web_evidence`
  * runtime: Google ADK Gemini
  * location: `us`
  * Windows certificate store is used
* Step 2.4 reasoning:

  * provider: `r2d2`
  * model: `claude-opus-4-6`
  * role: `step24_v6_sector_inherent_reasoning`
* Both calls completed successfully.
* Step 2.3 and Step 2.4 finalization endpoints returned HTTP 200.
* The factor visualizations, threshold tables, scoring logic, and confirmation workflow are working.

Do not change this routing and do not introduce another model architecture.

### Existing Step 2.5 infrastructure

The following endpoints already exist and return HTTP 200 where appropriate:

* `GET /api/v1/rpr/step25/preflight`
* `POST /api/v1/rpr/step25/context`
* `GET /api/v1/rpr/step25/readiness/{company_id}`
* `GET /api/v1/rpr/step25/workflow-state/{company_id}`
* `POST /api/v1/rpr/step25/run`
* Existing evidence and assessment retrieval routes

Preserve these routes unless a proven route-level defect requires a narrowly compatible correction.

Previously added production-hardening behavior must also be preserved, subject to verification:

* `SEC_ACCESS_FAILED`
* `EVIDENCE_COMPLETE_ASSESSMENT_FAILED`
* SEC access-failure propagation
* fail-closed SEC egress gate
* evidence preservation when assessment generation fails
* amendment-aware filing selection
* schema aliases
* citation-drop visibility
* repository round-trip integrity
* restart-durable evidence and assessment retrieval

Do not rebuild this package from scratch.

## 3. CURRENT OBSERVED STEP 2.5 PROBLEMS

The current Step 2.5 screen shows a real confirmed portfolio and a real selected company, but Step 2.5 remains blocked.

Observed production blockers:

* `STEP25_SEC_ACCESS_NOT_APPROVED`
* `RPR_STEP25_SEC_MODE` is not `live`
* `RPR_STEP25_LIVE_SEC_ENABLED` is not `true`
* `STEP25_SEC_EGRESS_BLOCKED`
* `RPR_SEC_EGRESS_APPROVED` is not established
* `STEP25_SEC_USER_AGENT_MISSING`
* `RPR_SEC_USER_AGENT` is not configured
* `STEP25_WEB_PROVIDER_NOT_READY`
* `RPR_STEP25_WEB_MODE` is not recognized as approved

There is also a visible state inconsistency:

* The workflow sidebar shows Steps 2.2, 2.3, and 2.4 as confirmed.
* Step 2.5 shows Step 2.3 confirmed with six factors.
* Step 2.5 simultaneously reports Step 2.4 or combined upstream confirmation as `No`.

This must be traced and corrected. Do not conceal the inconsistency by changing the displayed text.

The demonstrated selected company includes `CITIBANK NIGERIA LTD`. Do not assume this entity is an SEC registrant and do not substitute Citigroup or another parent. Its SEC eligibility must be determined honestly.

## 4. FIRST ACTION — FORENSIC AUDIT

Before editing:

1. Confirm the exact current working directory.
2. Record `git status --short` and `git diff --stat`.
3. Identify all files changed by the previous Step 2.5 work.
4. Do not revert any change.
5. Inspect applicable repository instructions.
6. Locate and inspect:

   * `UI Design\step23.html`
   * the v31 HTML reference
   * `start_backend.ps1`
   * `RUNTIME_ENV.ps1`, if present
   * `backend\server.py`
   * the complete Step 2.5 package
   * Step 2.5 router, configuration, orchestration, models and repository
   * SEC client and transport
   * CIK resolution
   * SEC filing selection and extraction
   * approved-web provider
   * assessment service
   * `llm_gateway.py`
   * upstream Step 2.2, 2.3 and 2.4 persisted-state APIs
   * Step 2.5 frontend JavaScript and CSS
7. Calculate a hash of the v31 reference before editing.
8. At completion, calculate it again and prove it is unchanged.
9. Identify the exact files you plan to modify before modifying them.
10. If a fix would require altering a working Step 1–2.4 component, stop and explain the blocker before changing it.

Do not infer code behavior from filenames. Read the implementation.

## 5. FIX THE UPSTREAM READINESS INCONSISTENCY

Trace the complete identity and state chain:

`confirmed Step 2.2 portfolio → selected company/CAGID → confirmed Step 2.3 factors → confirmed Step 2.4 sector factors → Step 2.5 context → readiness`

Requirements:

1. Step 2.5 must use server-confirmed state, not merely green DOM indicators.
2. Use the real workflow, portfolio, company/CAGID, sector, scenario and as-of identifiers.
3. Do not key state only by company name.
4. Do not lose leading zeros or convert identifiers unnecessarily.
5. Confirm whether Step 2.4 is stored by sector, company, portfolio, scenario or workflow.
6. Correct any mismatched key used by:

   * `/step25/context`
   * `/step25/readiness/{company_id}`
   * `/step25/workflow-state/{company_id}`
7. Ensure Step 2.5 reads the same confirmed Step 2.4 artifact that the workflow sidebar reads.
8. A browser refresh must not manufacture or silently discard confirmed backend state.
9. A genuinely new workflow must remain unconfirmed.
10. A previously persisted workflow should be restored only through its real workflow/run identifier.
11. The Run Assessment button must be disabled when upstream state is genuinely incomplete.
12. The UI must list exactly which upstream confirmation is missing.
13. Do not send `POST /step25/run` when readiness is false.
14. Preserve the backend HTTP 409 fail-closed behavior for an invalid run request.

Add regression tests for the exact observed inconsistency: sidebar-confirmed Step 2.4 versus Step 2.5 reporting Step 2.4 as unconfirmed.

## 6. CORRECT WINDOWS CONFIGURATION PROPAGATION

Audit how the backend is started on Windows.

Requirements:

1. Determine the exact configuration precedence between:

   * the current PowerShell process
   * `start_backend.ps1`
   * `RUNTIME_ENV.ps1`
   * Python configuration defaults
   * any `.env` or configuration file already used
2. Do not introduce a new configuration system unless absolutely necessary.
3. Environment variables set in one PowerShell window must not be assumed to affect an already-running backend in another window.
4. The final restart instructions must set or load configuration before starting Uvicorn in the same process chain.
5. `start_backend.ps1` must not overwrite legitimate environment values with unsafe defaults.
6. Do not hardcode approval values in Python, JavaScript, PowerShell or HTML.
7. Preflight must report:

   * whether each configuration item was found
   * the configuration source
   * readiness state
   * a safe, redacted explanation
8. Never return secrets or tokens in preflight.
9. Separate readiness blockers into:

   * upstream workflow state
   * SEC configuration
   * SEC governance/egress approval
   * approved-web provider
   * assessment-model authentication
10. A healthy `/health` response must not be presented as Step 2.5 production readiness.
11. A `200` response from `/preflight` means only that preflight executed; the UI must also inspect its `ready` state.

## 7. REUSE THE ALREADY WORKING APPROVED-WEB PATH

The existing Windows application has successfully executed enterprise-web evidence retrieval using:

* `citi-r2d2-vertex`
* `gemini-3.5-flash`
* Google ADK
* role `enterprise_web_evidence`
* Windows certificate-store TLS

Step 2.5 must reuse this existing approved adapter and configuration. Do not build a second public-web client.

Audit `RPR_STEP25_WEB_MODE`:

1. Determine whether it is a genuine existing governance requirement or a new Step 2.5 feature gate.
2. Do not simply remove it.
3. Do not blindly set it to `approved`.
4. If the existing enterprise-web adapter is already the approved application path, connect Step 2.5 to that adapter.
5. Readiness should verify the actual adapter configuration and capability.
6. If an explicit opt-in remains required, load it through the existing Windows runtime configuration and document its authoritative source.
7. No direct uncontrolled public-web requests are permitted.
8. Preserve source-domain controls, TLS, timeouts and existing enterprise search behavior.
9. Store web evidence separately from SEC evidence.
10. Every web evidence record must contain:

    * source URL
    * source title
    * publication date when available
    * retrieval timestamp
    * source domain
    * relevant excerpt or structured fact
    * evidence class/type
    * company identifier
    * applicable factor identifier
11. Canonicalize and deduplicate URLs without destroying auditability.
12. Web evidence may supplement or contradict SEC evidence but must never overwrite an SEC-reported fact.

## 8. COMPLETE THE REAL SEC LANE

Use only official SEC endpoints and existing approved code paths.

Requirements:

1. Perform safe CIK resolution in this order:

   * explicitly stored and previously confirmed CIK
   * exact ticker mapping
   * exact legal-name mapping
   * review-required candidate
   * unresolved/not applicable
2. Never choose a fuzzy match automatically.
3. Never map a subsidiary to a parent solely because their names are related.
4. Record:

   * matching method
   * confidence/status
   * exact SEC legal name
   * CIK
   * reviewer confirmation when applicable
5. Support explicit statuses such as:

   * `CIK_CONFIRMED`
   * `CIK_REVIEW_REQUIRED`
   * `CIK_UNRESOLVED`
   * `SEC_NOT_APPLICABLE`
   * `SEC_ACCESS_FAILED`
6. A company that is not an SEC filer must not receive fabricated SEC evidence.
7. A non-filer or unresolved entity must produce an honest UI state and an evidence-completeness decision.
8. Do not silently substitute a different company to achieve a successful test.
9. Retrieve only relevant official SEC data such as:

   * submissions metadata
   * Company Facts/XBRL
   * selected filing documents and exhibits
10. Preserve relevant 10-K, 10-Q and 8-K handling and amendment-aware supersession.
11. Do not invent foreign-issuer scope. Preserve an explicit not-applicable or pending-scope state where necessary.
12. Enforce the configured SEC User-Agent.
13. Enforce HTTPS and certificate validation.
14. Respect fair-access limits, bounded retries, backoff and caching.
15. Do not conduct a live SEC call until the Windows egress and User-Agent requirements are genuinely satisfied.
16. Store raw responses or reproducible raw-response metadata according to the existing repository pattern.
17. Every SEC evidence item must retain:

* CIK
* accession number
* form
* filing date
* report period
* primary document
* exact resolvable SEC source URL
* retrieval timestamp
* evidence type/class

18. For SEC evidence, `source_url` and `accession_number` must remain populated together.
19. Do not strip provenance during normalization, assessment generation, persistence or API serialization.

## 9. EVIDENCE AND CONFLICT RULES

1. Keep SEC and approved-web evidence as separate provenance lanes.
2. SEC filings are authoritative for company-reported financial facts and disclosures.
3. Approved web supplies external context and disconfirming evidence.
4. Web evidence must never automatically override an SEC-reported fact.
5. When sources conflict:

   * retain both records
   * set `conflict_flag=true`
   * describe the conflict
   * require analyst review
6. Do not silently reconcile conflicting evidence.
7. Distinguish:

   * reported fact
   * deterministic extracted text
   * derived deterministic metric
   * approved-web evidence
   * model-generated assessment
8. Missing evidence must be explicit.
9. No LLM-generated claim may masquerade as source evidence.
10. Citation sanitization must not remove the source audit anchor.

## 10. ASSESSMENT GENERATION

1. Reuse the existing working R2D2/H2M model gateway.
2. Do not redesign global model routing.
3. Do not add an Anthropic API-key dependency if Step 2.5 uses the existing R2D2/H2M gateway.
4. Use the same secure credential mechanism already working for the Windows R2D2 calls.
5. Never display or log the access token.
6. A token-fetch timeout must produce a bounded, actionable authentication error.
7. Do not fall back to mock assessment text.
8. Generate the assessment only from:

   * confirmed Step 2.3 factors
   * confirmed Step 2.4 factors
   * normalized SEC evidence
   * normalized approved-web evidence
9. Preserve all collected evidence if the assessment model fails.
10. Use `EVIDENCE_COMPLETE_ASSESSMENT_FAILED` when evidence succeeded but assessment generation failed.
11. Allow an analyst to retry the assessment without retrieving all evidence again, subject to existing policy.
12. Require citations connecting conclusions to evidence IDs.
13. Drop or reject unsupported citations and expose the omission.
14. Financial calculations, weighting and aggregation must remain deterministic Python/approved existing logic.
15. The LLM must not invent a new scoring formula.

## 11. PORT THE v31 STEP 2.5 VISUALIZATION AND PoC LOGIC

The v31 HTML is a read-only reference.

Before implementation:

1. Locate the exact Step 2.5 HTML, CSS and JavaScript in v31.
2. Trace its real:

   * data transformation
   * factor grouping
   * deterministic scoring
   * weighting
   * aggregation
   * portfolio-summary rendering
   * expand/collapse behavior
   * commentary behavior
   * rerun behavior
3. Do not guess its logic from screenshots.
4. Document the source-to-target mapping.

Then port the required behavior additively into `UI Design\step23.html`.

Requirements:

1. Preserve the existing `step23.html` layout, IDs, navigation, workflow sidebar and feedback components.
2. Do not create duplicate global functions, IDs or event handlers.
3. Do not add another Run Assessment button.
4. Wire the existing Run Assessment button.
5. Keep the existing SEC + Web selection card.
6. Do not implement or alter CAM modes during this task.
7. Render the v31-style Step 2.5 portfolio outcome using real backend data.
8. Remove all runtime dependence on sample arrays or embedded v31 data.
9. Never display a demo/fixture banner or demo company selector.
10. The result should include, where supported by the actual v31 logic and backend schema:

    * company identity
    * CAGID/internal identifier
    * ticker/CIK or explicit unavailable state
    * country
    * industry hierarchy
    * event-driven factor scores
    * sector-inherent factor scores
    * deterministic weights
    * ED score
    * SI score
    * composite score
    * residual/impact rating
    * current and recommended actions where supported
    * key risk driver
    * analyst override
    * analyst commentary
    * overall assessment commentary
11. Provide expandable factor-level detail.
12. Provide separate SEC and web evidence views.
13. Provide clickable citations using exact stored URLs.
14. Show accession number and form for SEC citations.
15. Show conflicts prominently for analyst review.
16. Show missing, stale, unresolved and not-applicable states.
17. Show evidence and assessment status independently.
18. Support rerunning an assessment without duplicating the prior result.
19. Preserve assessment history/version identifiers if the backend supports them.
20. Do not show a completed assessment until a real assessment object has been retrieved successfully.
21. Do not declare the overall workflow confirmed automatically; retain analyst review and confirmation behavior.

If v31’s PoC processes only one selected company at a time, preserve that exact behavior using a real company from the confirmed Step 2.2 portfolio.

If v31 processes several confirmed portfolio companies, preserve that behavior without inventing results for unprocessed companies.

Do not silently change the PoC scope.

## 12. TESTING RULES

Test doubles may be used only inside isolated automated tests for deterministic error paths. They must never be reachable from the production runtime.

Fixture or mock success does not count as end-to-end success.

Required verification:

### Regression

* Re-run existing Step 1–2.4 tests.
* Confirm no regression in:

  * narrative generation
  * scenario confirmation
  * portfolio selection
  * Step 2.3 generation/finalization
  * Step 2.4 web evidence
  * Step 2.4 Opus reasoning
  * workflow sidebar
  * feedback panels

### Step 2.5 automated tests

Cover:

* upstream state key consistency
* persisted Step 2.4 confirmation retrieval
* CIK exact match
* CIK unresolved
* non-SEC filer
* subsidiary/parent non-substitution
* SEC access failure
* approved-web adapter failure
* amendment supersession
* evidence provenance
* SEC URL/accession preservation
* web/SEC conflict retention
* repository restart round-trip
* model-auth failure
* evidence-preserving assessment failure
* citation rejection
* rerun behavior
* v31 reference hash unchanged
* absence of demo/mock/fixture runtime switches

### Real Windows integration

After genuine readiness requirements are satisfied:

1. Start the actual backend using the approved Windows virtual environment.
2. Serve or open the actual `UI Design\step23.html` through the existing supported path.
3. Complete the real workflow through Steps 1–2.4.
4. Select a real confirmed company.
5. Confirm whether that exact legal entity is an SEC filer.
6. If it is not an SEC filer, do not replace it. Display the correct status.
7. For the first successful SEC end-to-end verification, use a real confirmed Step 2.2 company that is genuinely an SEC filer.
8. Do not add Apple/AAPL to the portfolio for testing.
9. Run the existing Run Assessment button.
10. Verify actual HTTP calls made by the browser.
11. Verify:

    * preflight ready
    * context identity correct
    * CIK confirmed
    * SEC evidence retrieved
    * approved-web evidence retrieved
    * evidence stored
    * conflicts retained
    * real assessment generated
    * provider is not mock
    * citations resolve
    * v31-style result renders in `step23.html`
    * refresh/retrieval preserves the result

Do not claim end-to-end success based only on direct API calls if the real browser button and DOM rendering were not tested.

## 13. INTERNAL INFORMATION — STOP INSTEAD OF GUESSING

If implementation is blocked by missing internal information, implement everything safely possible and then produce a short `STYLUS QUESTIONS REQUIRED` section.

Ask only Windows-relevant questions, such as:

1. What exact SEC User-Agent application/team name and monitored contact should RPR use?
2. Is direct Windows HTTPS access to `data.sec.gov` and `www.sec.gov` approved?
3. Is a proxy required for those destinations?
4. What CA/TLS configuration is required on the Windows host?
5. Is the existing `enterprise_web_evidence` adapter sufficient evidence of approved-web readiness for Step 2.5, or is a separate Step 2.5 opt-in required?
6. Which existing workflow/run identifier is authoritative for restoring confirmed Steps 2.2–2.4?
7. What is the approved behavior for a confirmed portfolio company that is not an SEC filer?

Do not ask about MarketDev, Unix, deployment or hosting.

## 14. COMPLETION CRITERIA

Do not state “complete” unless all applicable conditions are true:

* Active frontend is `UI Design\step23.html`.
* v31 is unchanged.
* Steps 1–2.4 still work.
* Step 2.5 reads the correct confirmed workflow state.
* The Step 2.4 confirmation mismatch is fixed.
* Real selected company identity is preserved.
* SEC eligibility is handled honestly.
* Approved-web uses the existing enterprise adapter.
* No runtime mock/demo/fixture path exists.
* No fake approval is used.
* SEC evidence contains exact source URLs and accession numbers.
* Web evidence remains separately attributable.
* Conflicts retain both sources.
* Assessment is generated through the actual approved model path.
* The v31-style Step 2.5 result renders in `step23.html`.
* Browser execution has been tested.
* Persistence survives retrieval/restart.
* Regression tests pass or every unrelated pre-existing failure is identified with evidence.

## 15. REQUIRED FINAL REPORT

Return:

### A. Implementation verdict

Choose exactly one:

* `COMPLETE — REAL WINDOWS SEC+WEB VERIFIED`
* `CODE COMPLETE — EXTERNAL APPROVAL REQUIRED`
* `PARTIAL — TECHNICAL BLOCKER REMAINS`
* `NOT IMPLEMENTED`

### B. Preserved working bones

List all working components verified unchanged.

### C. Root causes

For every observed problem, state:

* symptom
* root cause
* file/function responsible
* correction
* verification

### D. Files changed

For every file:

* absolute Windows path
* reason
* narrow change made

### E. Files explicitly not changed

Include:

* v31 reference
* working Step 1–2.4 components
* unrelated dirty-tree files

### F. Model and provider proof

Report actual providers and models observed without exposing credentials.

### G. SEC proof

Report:

* exact tested legal entity
* matching method
* CIK status
* forms/accessions retrieved
* SEC evidence count
* rate-limit behavior

### H. Approved-web proof

Report:

* adapter used
* query count
* evidence count
* domain/provenance behavior

### I. Assessment proof

Report:

* assessment ID
* provider
* evidence IDs used
* conflict count
* citation-validation result

### J. UI proof

Confirm:

* actual `step23.html`
* existing Run Assessment button used
* v31-style output rendered
* no sample company
* no demo/fixture banner
* citations clickable
* analyst review retained

### K. Tests

Provide exact commands and unedited pass/fail summaries.

### L. Remaining blockers

Separate:

* code blocker
* Windows configuration blocker
* internal approval blocker
* company SEC-eligibility blocker
* model-authentication blocker

Do not hide blockers and do not represent a blocked implementation as successful.
