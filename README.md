Continue from the CURRENT uncommitted RPR workspace. Do not restart the implementation from scratch.

Project root:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI`

# Objective

Deliver a genuinely working, production-only Step 2.5 `SEC + Web` implementation for the existing RPR application.

The required user journey is:

1. Analyst selects and confirms a real Step 2.2 portfolio company.
2. Step 2.3 event-driven factors are confirmed.
3. Step 2.4 sector-inherent factors are confirmed and versioned.
4. Analyst selects `SEC + Web` in Step 2.5.
5. Existing Run Assessment button runs the production pipeline.
6. The backend loads the authoritative selected company.
7. The backend resolves SEC identity/CIK safely.
8. The backend retrieves applicable official SEC evidence.
9. The backend retrieves approved enterprise-web evidence.
10. SEC and web evidence remain provenance-separated.
11. Conflicts are flagged, never silently reconciled.
12. The R2D2 assessment is generated using H2M.
13. Results, evidence, citations, conflicts, and run status are displayed in `step23.html`.
14. The run is persistently retrievable.

This must be the real implementation—not a demo, fixture, mock, static simulation, informational stub, or UI-only shell.

# Absolute rules

## Active frontend

The only active frontend is:

`UI Design\step23.html`

Do not modify, use, test, wire, or copy from any v31 HTML file.

## Preserve working RPR bones

All accepted working behavior is immutable.

Preserve:

* Step 1 Trigger 1.
* Step 1 Trigger 2.
* Step 2.1.
* Step 2.2.
* Step 2.3.
* Step 2.4.
* Current prompts.
* Current factor records.
* Current confirmation mechanisms.
* Current feedback panels.
* Current workflow sidebar.
* Existing model routing.
* Existing FastAPI routes unless an additive extension is required.
* Current visual design and CSS.

Do not refactor working code merely for style.

Do not delete or rename existing endpoints, fields, functions, files, or UI IDs.

## Strictly no demo

Forbidden in runtime code, UI, configuration, smoke tests, and manual verification:

* Demo company.
* Apple/AAPL default.
* `demo-aapl`.
* Fixture company.
* Fixture SEC evidence.
* Fixture web evidence.
* Mock assessment.
* Mock LLM provider.
* Hardcoded assessment results.
* Sample citations represented as real.
* Automatic fallback to fixtures.
* Automatic fallback to mock.
* Substitution of an unresolved company with a known SEC filer.
* Hidden development bypass.
* “Temporary” fail-open mode.

Mocks and fixtures are permitted only inside isolated automated tests and must never be reachable from production routes.

## Authentication and access

* Do not introduce or use COIN/M2M credentials.

* Assessment model authentication is H2M.

* Preserve:

  * `LLM_PROVIDER=r2d2`
  * `R2D2_AUTH_MODE=h2m`

* SEC EDGAR does not use H2M. It requires public HTTPS access, an approved SEC User-Agent, appropriate egress authorization, TLS verification, rate limiting, and fair-access behavior.

* Approved web must use the repository’s existing enterprise-approved web adapter.

* Do not add direct Google, Bing, arbitrary public search, scraping services, or a new external vendor.

## Never fabricate approval

Do not invent or hardcode:

* `RPR_SEC_USER_AGENT`
* SEC contact email.
* SEC team/desk identity.
* `RPR_SEC_EGRESS_APPROVED=true`
* Egress approval ID.
* Egress approval date.
* Egress approver.
* Approved host list.
* Proxy information.
* Corporate CA bundle.
* Approved-web provider status.
* H2M login state.
* Step 2.2 confirmation.
* Step 2.4 confirmation.

If any required internal fact is unavailable, stop that branch and produce the exact question for Stylus. Do not guess.

# Current implementation state

The most recent hardening pass reportedly added:

1. A real H2M readiness state machine.
2. `/step25/h2m-readiness?verify=...`.
3. Typed H2M token errors.
4. Configurable bounded H2M timeout.
5. Token/JWT redaction.
6. Backend-stamped workflow state.
7. `/step25/workflow-state/{company_id}`.
8. Frontend authoritative-state refresh.
9. Grouped preflight blockers.
10. Thirty-three new mocked tests.
11. A full result of approximately 195 passing tests, with two failures and three collection errors described as pre-existing dependency/import issues.

Preserve these changes unless inspection demonstrates a concrete defect.

However, the same report explicitly says:

* CIK resolution remains an informational stub pending a real run.
* `rpr_search_agent.py` has a separate H2M/fallback path that was read but not corrected.
* Approved-web activation remains deferred.
* SEC access remains blocked.
* Step 2.5 is not production-ready.

Therefore, do not report completion after merely setting environment variables or running preflight. Complete the missing production runtime.

# Phase 1 — forensic inspection before editing

Before modifying anything:

1. Inspect all current working-tree changes.

2. Do not reset, revert, checkout, clean, discard, or overwrite them.

3. The UI reportedly shows approximately 110 changed files. Determine:

   * Which files were changed by the latest hardening pass.
   * Which files were already modified before that pass.
   * Which changes are unrelated to Step 2.5.
   * Whether any generated caches or artifacts are included.

4. Do not modify unrelated files.

5. Inspect the current Step 2.5 implementation end to end.

Inspect at minimum:

* `UI Design/step23.html`
* `UI Design/rpr_step25_append.js`
* `UI Design/rpr_step25_append.css`
* `backend/server.py`
* `backend/llm_gateway.py`
* `backend/rpr_search_agent.py`
* `backend/step25/`
* All Step 2.5 routers, orchestration, providers, persistence, schemas and models
* Step 2.2 company/portfolio service
* Step 2.3 confirmation service
* Step 2.4 finalization service
* `RUNTIME_ENV.ps1`
* Existing tests
* `STEP25_IMPLEMENTATION.md`
* Latest Step 2.5 progress/session documents

Create an internal call graph from the existing Run Assessment button to the final persisted assessment.

Do not invent a replacement architecture before understanding the current one.

# Phase 2 — verify the previous hardening work

Before building new functionality, verify that the reported fixes really exist and work:

1. H2M configuration alone must not produce `READY`.

2. `READY` must require actual successful token acquisition.

3. Missing Helix CLI must produce a typed error.

4. Timeout must produce a typed timeout error.

5. Token text must not appear in logs or responses.

6. Workflow state must come from the backend.

7. Step 2.2 and Step 2.4 status must be identical in:

   * Backend state.
   * Workflow sidebar.
   * Step 2.5 readiness panel.
   * Step 2.5 preflight.

8. A blocked 409 response must clear the UI loading state.

9. Grouped blockers must remain fail-closed.

10. Existing working routes must remain compatible.

If a reported fix is incomplete, correct it narrowly and add a regression test.

# Phase 3 — authoritative selected-company input

Step 2.5 must run only for the real company selected and confirmed in Step 2.2.

The browser must submit only the stable internal company ID/CAGID and assessment as-of date.

The backend must load the authoritative confirmed Step 2.2 record.

Load, where available:

* Internal company ID/CAGID.
* Legal company name.
* Country/jurisdiction.
* Ticker.
* Exchange.
* LEI.
* Existing CIK.
* Sector/L2/L3.
* Step 2.2 portfolio/version ID.
* Confirmation status.
* Confirmation timestamp.

Requirements:

* Reject unknown company IDs.
* Reject companies outside the confirmed Step 2.2 portfolio.
* Reject unconfirmed Step 2.2 records.
* Reject browser identity data that conflicts with the server record.
* Do not trust a browser-supplied company name, ticker or CIK.
* Do not invent missing identifiers.
* Do not replace the selected company with Apple or another filer.
* Persist the identity snapshot used by the assessment.

If the existing Step 2.2 storage cannot supply these fields, do not create a shadow company database. Identify the existing authoritative source and add the narrowest read-only adapter.

# Phase 4 — real CIK and SEC-applicability resolution

Replace any informational CIK stub with a real production implementation.

Use official SEC sources through the existing SEC client.

Expected resolution sequence:

1. If the authoritative company record already contains a CIK:

   * Normalize it to ten digits.
   * Verify it using SEC submissions identity metadata.

2. Otherwise, use the official SEC ticker/company mirror.

3. Permit exact ticker matching.

4. Use exchange information only as an additional exact disambiguation signal.

5. Verify the candidate against submissions metadata.

6. Do not use fuzzy name similarity as automatic confirmation.

7. Never select an ambiguous match automatically.

Required statuses:

* `CIK_CONFIRMED`
* `CIK_REVIEW_REQUIRED`
* `CIK_UNRESOLVED`
* `SEC_NOT_APPLICABLE`
* `SEC_ACCESS_FAILED`

Keep match confidence distinct from evidence-extraction confidence.

Rules:

* Missing ticker does not mean `SEC_NOT_APPLICABLE`.
* Foreign incorporation does not mean `SEC_NOT_APPLICABLE`.
* No ticker match means unresolved, not automatically inapplicable.
* An ambiguous match requires analyst review.
* An SEC identity conflict must retain both identities for review.
* Do not run SEC filing retrieval until CIK is confirmed.
* Never force the currently selected company to have SEC filings.

For the actual selected portfolio company, return the honest classification. Do not substitute a test company.

# Phase 5 — production SEC retrieval

Inspect the existing SEC client and complete the real retrieval path.

Use official SEC endpoints only. Do not add third-party SEC services unless separately approved.

The client must support, as required by current Step 2.5 methodology:

* Submissions metadata.
* Company facts/XBRL.
* Filing metadata.
* Primary filing documents.
* Filing amendments.
* Source URLs and accession numbers.

At minimum, route relevant forms based on actual filer classification:

* `10-K`
* `10-K/A`
* `10-Q`
* `10-Q/A`
* Relevant `8-K`
* `8-K/A`
* `20-F`
* `20-F/A`
* `40-F`
* `40-F/A`
* `6-K`

Do not treat a foreign private issuer as a domestic 10-K filer.

Every SEC request must use:

* Approved SEC User-Agent.
* HTTPS.
* TLS verification.
* Approved proxy/CA behavior, if required.
* A bounded timeout.
* Bounded retries.
* Backoff for transient errors.
* Central rate limiting.
* No aggressive parallel requests.
* No retry storm.
* No request if preflight is blocked.

Preserve:

* CIK.
* Form.
* Filing date.
* Accepted datetime when available.
* Report period.
* Accession number.
* Primary document.
* Source URL.
* Amendment relationship.
* Retrieval timestamp.
* HTTP status.
* Raw-response hash.
* Parser version.

Do not run a real SEC request unless approval and User-Agent requirements are satisfied.

# Phase 6 — SEC parsing and normalization

Use deterministic parsing before any LLM interpretation.

Support:

* Official JSON parsing.
* XBRL fact normalization.
* Primary-document HTML parsing.
* Removal/isolation of scripts and styles.
* Heading normalization.
* Table-of-contents disambiguation.
* Substantive-section boundary detection.
* Bounded excerpts.
* Amendment/supersession handling.
* Duplicate-period handling.
* Typed extraction failures.

Do not allow an LLM to invent missing filing text.

Use only the project’s approved/versioned XBRL concept profile.

If no approved Step 2.5 concept list exists, keep the existing minimal deterministic list and create a precise Stylus methodology question. Do not invent dozens of concepts.

Every evidence record must remain traceable to the filing and accession that produced it.

# Phase 7 — complete the approved-web production adapter

Inspect `rpr_search_agent.py` and the current Step 2.5 web provider.

Remove any reachable Step 2.5 runtime fallback to:

* Mock provider.
* Fixture response.
* Demo data.
* Direct unapproved public search.
* A provider that bypasses approved enterprise authentication.

Do not remove fallbacks used by other working RPR steps unless they are a security defect. Scope the correction to Step 2.5 or add explicit provider-mode separation.

Step 2.5 web searches must be created from:

* Authoritative company identity.
* Confirmed Step 2.3 factors.
* Confirmed Step 2.4 factors.
* Assessment as-of date.

Implement bounded, factor-specific queries.

Preserve:

* Query ID.
* Factor ID.
* Factor version.
* Search timestamp.
* Publication date when available.
* Source title.
* Canonical URL.
* Domain.
* Excerpt.
* Provider.
* Retrieval method.
* Evidence class.
* Raw-response reference/hash.

Requirements:

* Configurable query limit.
* Configurable recency window.
* Approved-domain controls where required.
* URL canonicalization.
* Deduplication without destroying provenance.
* No result without a source URL.
* No silent provider fallback.
* No continuation as SEC-only when `SEC + Web` was selected and approved web failed.
* Clear typed provider/authentication errors.

If the exact approved adapter, endpoint, model or authentication contract cannot be proven from repository code or internal documentation, stop this branch and produce an exact Stylus question. Do not infer it.

# Phase 8 — upstream factor integrity

Step 2.5 must consume only confirmed, versioned factors.

Server-side load:

* Confirmed Step 2.3 factor records.
* Confirmed/finalized Step 2.4 factor records.

Persist:

* Factor ID.
* Factor text.
* Factor type.
* Version.
* Confirmation timestamp.
* Applicable company or sector.
* Source step.

Reject the run if required upstream factors are unconfirmed.

Do not trust browser `confirmed=true`.

Do not force confirmation.

Do not rewrite, regenerate or alter confirmed factors during Step 2.5.

# Phase 9 — evidence schema and conflicts

Keep SEC and approved-web evidence distinct.

Required evidence fields include, where applicable:

* `evidence_id`
* `run_id`
* `company_id`
* `cik`
* `cik_match_status`
* `evidence_class`
* `evidence_type`
* `source_provider`
* `form`
* `filing_date`
* `accepted_datetime`
* `accession_number`
* `document_name`
* `section`
* `fact_name`
* `raw_value`
* `normalized_value`
* `unit`
* `period_start`
* `period_end`
* `source_url`
* `publication_date`
* `retrieved_at`
* `assessment_as_of`
* `extraction_method`
* `source_excerpt`
* `extraction_confidence`
* `identity_match_confidence`
* `conflict_flag`
* `conflict_notes`
* Related Step 2.3 factor ID/version
* Related Step 2.4 factor ID/version
* Raw artifact hash
* Parser/profile version

Rules:

* SEC is authoritative for company-reported filing facts.
* Approved web supplies external, market, recent and potentially disconfirming evidence.
* Web evidence must never overwrite SEC evidence.
* Contradictions must retain both sources.
* Conflicts must be visible to the analyst.
* The retrieval layer must not silently reconcile conflicts.
* Missing evidence must remain missing.

# Phase 10 — production R2D2 assessment

Use only the existing R2D2 gateway with H2M.

No mock fallback.

The assessment must consume only the persisted evidence package and confirmed factors.

Requirements:

* Evidence collection and model assessment have separate statuses.

* A model failure must not delete collected evidence.

* Support a state such as:

  `EVIDENCE_COMPLETE_ASSESSMENT_FAILED`

* H2M timeout must be typed and actionable.

* Citations must reference evidence IDs that exist in the package.

* Reject invented or unresolved citations.

* Include prompt version and provider/model metadata.

* Mark the result as nonbinding.

* Do not modify RRR, portfolio selection, or upstream factors.

* Do not print or persist access tokens.

# Phase 11 — durable persistence

Verify that production Step 2.5 does not depend solely on in-memory dictionaries.

Persist using the repository’s existing approved persistence abstraction:

* Run record.
* Company identity snapshot.
* Upstream factor snapshots.
* SEC request metadata.
* Raw SEC artifact or approved immutable reference.
* Web request metadata.
* Raw approved-web artifact or approved immutable reference.
* Hashes.
* Normalized evidence.
* Conflicts.
* Assessment request metadata.
* Assessment response.
* Citations.
* Provider/prompt versions.
* Failure stage and typed error.
* Timestamps.

A run must remain retrievable after server restart.

Do not build a second incompatible persistence system if one already exists.

# Phase 12 — step23.html production UX

Wire only the existing Step 2.5 elements in:

`UI Design\step23.html`

Do not create a second assessment button.

The existing Run Assessment button must:

1. Refresh authoritative state.
2. Call preflight.
3. Stop cleanly on blockers.
4. Create/run the assessment only when genuinely ready.
5. Poll or retrieve the real run.
6. Render the result.
7. Always clear Processing state.

Display:

* Selected authoritative company.
* Step 2.2 confirmation/version.
* Step 2.3 confirmation/version and factor count.
* Step 2.4 confirmation/version and factor count.
* CIK resolution status.
* SEC applicability.
* SEC evidence lane.
* Approved-web evidence lane.
* Conflicts.
* Assessment.
* Clickable citations.
* Retrieval/as-of dates.
* Typed errors.
* Partial evidence/model-failure states.

Remove any reachable demo/fixture labels, controls or runtime path from Step 2.5.

Do not redesign the page.

# Phase 13 — configuration and approval discipline

Do not blindly execute the Stylus Windows-local-setup artifact.

Specifically:

1. Do not run `Test-NetConnection` to SEC hosts without explicit authorization. It is still an outbound network attempt.

2. Do not set `RPR_STEP25_LIVE_SEC_ENABLED=true` until:

   * Real egress approval exists.
   * Approved SEC User-Agent exists.
   * Required host/proxy/CA configuration is confirmed.

3. Do not set `RPR_SEC_EGRESS_APPROVED=true` without a genuine approval record.

4. Do not use a placeholder User-Agent.

5. Do not run the suggested Apple smoke test.

6. Do not perform any test using a company outside the confirmed real Step 2.2 portfolio.

7. `RPR_STEP25_WEB_MODE=approved` may be activated only after the existing approved provider contract is verified.

8. `LLM_PROVIDER=r2d2` and `R2D2_AUTH_MODE=h2m` may be used only through the real gateway.

9. Never print the Helix credential or token.

Prepare configuration validation and instructions, but keep unavailable external approvals as visible blockers.

# Phase 14 — Stylus stop-and-ask protocol

If any internal fact is not provable, do not guess and do not continue that affected branch.

Create a section titled:

`INFORMATION REQUIRED FROM STYLUS`

For each missing item provide:

* Why it is required.
* Exact component blocked.
* Exact question to ask.
* Acceptable answer format.
* Whether implementation can continue elsewhere.

Potential questions include:

1. What exact SEC User-Agent format and approved team/contact identity must RPR use?
2. Is direct outbound HTTPS from local Windows to `data.sec.gov` and `www.sec.gov` approved?
3. Is separate MarketDev approval required later?
4. What are the approved SEC hosts?
5. Is a corporate proxy mandatory?
6. Which CA bundle must be used for public SEC endpoints?
7. What evidence/fields constitute the formal egress approval record?
8. Which existing enterprise web adapter is approved for Step 2.5?
9. What authentication method does that adapter require?
10. Is `rpr_search_agent.run_web_search` approved for Step 2.5 production use?
11. What domain, recency, query-count and retention restrictions apply?
12. What SEC fair-access request-rate limit should RPR enforce internally?
13. Which XBRL concepts are approved for the Step 2.5 assessment?
14. May a confirmed non-SEC filer proceed with approved-web-only evidence, or must `SEC + Web` stop?
15. What durable evidence-retention location/policy must Step 2.5 use?

Ask only questions that remain unanswered after inspecting the repository and existing internal documents.

# Phase 15 — testing

All automated tests must be offline.

Add tests for:

* Authoritative company loading.
* Browser identity mismatch rejection.
* Unconfirmed Step 2.2 rejection.
* Unconfirmed Step 2.3 rejection.
* Unconfirmed Step 2.4 rejection.
* Exact CIK matching.
* Ambiguous CIK review.
* Unresolved CIK.
* Non-SEC applicability classification.
* Foreign filer classification.
* Domestic/foreign form routing.
* Amendment/supersession handling.
* SEC rate limiting.
* Retry/backoff.
* User-Agent requirement.
* No request when egress approval is absent.
* Approved-web provider requirement.
* No provider fallback.
* Factor-specific query generation.
* Query cap.
* Evidence provenance.
* SEC/web conflict preservation.
* H2M timeout.
* Evidence-complete/model-failed state.
* Citation validation.
* Persistence across service re-instantiation.
* Loading state after 409.
* `step23.html` only.
* No v31 wiring.
* No demo/runtime fixture route.
* No Apple defaults.
* No live network calls in tests.
* No mutation of RRR/upstream records.

Run:

1. Focused Step 2.5 tests.
2. Related Step 2.2–2.4 tests.
3. Full backend suite.
4. Frontend/static wiring tests.

Do not hide failures.

Report pre-existing failures separately with evidence.

# Acceptance criteria

Do not declare success unless all code-side criteria are satisfied:

1. The selected real Step 2.2 company reaches Step 2.5 without identity substitution.
2. Step 2.2/2.3/2.4 statuses are server-authoritative and consistent.
3. CIK resolution is a real implementation, not an informational stub.
4. SEC retrieval has a real production path guarded by approval.
5. Approved web has a real production adapter with no fixture fallback.
6. Evidence is normalized and provenance-preserving.
7. SEC/web conflicts remain visible.
8. R2D2/H2M assessment uses real evidence.
9. Run results survive process restart.
10. `step23.html` renders the real result.
11. Blocked configuration causes no network call.
12. No demo/mock/fixture runtime exists.
13. No approval has been fabricated.
14. No token is exposed.
15. No working RPR bone is broken.

External approval blockers may remain, but the code must be ready to activate without another redesign once genuine values are supplied.

# Final response format

Return:

## A. Implementation verdict

* Implemented.
* Partially implemented.
* Blocked.
* Not implemented.

Do not exaggerate.

## B. Actual runtime call graph

Show exact existing file, endpoint, class and function names from `step23.html` through final persistence.

## C. Files changed

Explain every changed production file, test file and document.

## D. Tests

Give exact commands and exact results.

## E. Production blockers

Separate:

* Code blockers.
* Missing internal information.
* H2M/operator action.
* SEC approval.
* Approved-web approval.
* Analyst confirmation.
* Methodology decision.

## F. Information required from Stylus

Provide exact ready-to-paste questions.

## G. Safe activation plan

Provide commands only after required approvals exist. Do not include fake values and do not execute them.

## H. Explicit confirmations

Confirm:

* Active frontend: `UI Design\step23.html`.
* No v31 modification.
* No demo company.
* No fixture runtime.
* No mock provider fallback.
* No Apple smoke test.
* No fabricated approval.
* No token disclosure.
* No unauthorized external request.
* Existing working RPR behavior preserved.

Do not stop after another diagnostic report. Implement every code-side requirement that can be established safely from the repository. Stop only at genuine internal-information or approval boundaries.
