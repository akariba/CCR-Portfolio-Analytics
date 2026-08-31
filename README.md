Work in this project only:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

## Objective

Make RPR Step 2.5 execute through the manually created Stylus preset, using the existing approved internal Python connectivity pattern. First prove the preset works in isolation; only then connect it to the Step 2.5 Run Assessment flow.

Also identify the exact remaining execution and UI work required for full v31 parity in Steps 2.4 and 2.5.

## Non-negotiable constraints

* Preserve the current accepted working application backbone.
* Make additive, minimal changes.
* Do not refactor or replace working Steps 1, 2.1, 2.2, or 2.3.
* Do not create, edit, publish, promote, or otherwise configure the Stylus preset. I manage the preset manually.
* Do not invent endpoint URLs, preset identifiers, field keys, response contracts, company data, factors, evidence, credentials, or environment variables.
* Never print tokens, passwords, certificates, cookies, authorization headers, or other secrets.
* Use only the existing approved Citi/internal connectivity, authentication, certificates, and environment configuration.
* Do not make production activation or Fiddler a prerequisite for this local PoC if the existing approved Python pattern works without it.
* Do not fabricate missing SEC or web evidence.
* Use the actual v31 HTML file as the visual baseline, not screenshots or approximations.
* Treat v31 as read-only.
* Test through the backend-served URL, not `file:///`.

## Manually created Stylus preset

Name:

RPR Step 2.5 — SEC + Web Credit Assessment

Current state:

* Testing
* Version 1
* Claude Sonnet 5
* Web Search enabled
* SEC filings enabled
* Data Explorer disabled
* Two knowledge files attached:

  * `preset_knowledge\Step25Assessment.schema.txt`
  * `preset_knowledge\RPR_STEP25_FIELD_DICTIONARY.md`

Candidate preset UUID visible in the browser URL:

`01a0586c-b61e-7842-83d0-74411b1ab24a`

Treat that as a candidate only. Verify whether it is genuinely the API preset ID before using it.

The shortcut is visible on the Stylus preset card. Do not reconstruct or guess it from the title. Find the exact shortcut through the existing approved metadata/API pattern or tell me exactly where I must copy it from.

Observed input-key tokens are:

* `companycontextjson`
* `EventDrivenF`
* `SectorInhere`
* `AssessmentAS`
* `EvidenceWind`

Some may be visually truncated by Stylus. Verify the complete, case-sensitive keys before coding. The Python request must use the exact internal keys, not the friendly display labels.

Friendly field labels are:

* `CompanyContextJSON`
* `EventDrivenFactorsJSON`
* `SectorInherentFactorsJSON`
* `AssessmentASOFDATE`
* `EvidenceWindowMonths`

The first four are required. `EvidenceWindowMonths` is optional and should default to `18`.

## Phase 1 — Explain and audit the existing Python execution pattern

Before modifying application files:

1. Locate every relevant `app.py` and every existing Stylus/preset client, service client, SSE client, token helper, certificate helper, and environment configuration.
2. Pay particular attention to the colleague’s existing application that already invokes an internal AI service or preset.
3. Explain clearly:

   * which `app.py` is relevant;
   * how execution starts;
   * how authentication is obtained;
   * how the endpoint is constructed;
   * whether the call is synchronous, asynchronous, streaming, SSE, or polling;
   * the request payload structure;
   * how a preset or prompt identifier is supplied;
   * retry and timeout handling;
   * response parsing;
   * error handling;
   * what can safely be reused for RPR;
   * what should not be copied, such as Streamlit UI, email, or unrelated batch features.
4. Do not expose secret values. Report only environment-variable names and configuration locations.
5. Trace the current RPR Step 2.5 path:

   * frontend Run Assessment handler;
   * backend route;
   * selected engine;
   * service/runner;
   * persistence;
   * response model;
   * frontend rendering.
6. Explain exactly why the current Run Assessment button does not complete successfully.

Provide the audit before making changes, but continue automatically to the next phase if the approved invocation pattern and required configuration are available.

## Phase 2 — Generate one real, validated preset test case

Create:

`preset_knowledge\PRESET_PREVIEW_INPUTS.md`

Use actual confirmed RPR data, not invented sample data.

1. Find one confirmed Step 2.2 portfolio company that:

   * is a real public SEC registrant;
   * has an unambiguous company identity;
   * has a ticker;
   * has a valid CIK;
   * has confirmed Step 2.3 results;
   * has confirmed Step 2.4 results.
2. Generate these five copy-ready input values:

   * CompanyContextJSON
   * EventDrivenFactorsJSON
   * SectorInherentFactorsJSON
   * AssessmentASOFDATE
   * EvidenceWindowMonths
3. Use the real payload shapes consumed by the current Step 2.5 backend.
4. Preserve every confirmed Step 2.3 and Step 2.4 factor ID exactly.
5. Validate all JSON using Python.
6. Use the current assessment date and an 18-month evidence window.
7. Record:

   * company name;
   * company ID/CAGID;
   * ticker;
   * CIK;
   * source endpoint, object, or saved-session location for every value;
   * number of Step 2.3 factors;
   * number of Step 2.4 factors;
   * confirmation state of each upstream step;
   * JSON validation result.

If no eligible confirmed public company exists, stop. Report the missing upstream prerequisite rather than fabricating a fixture.

## Phase 3 — Prove the preset works in isolation

Using the existing approved Python connection pattern:

1. Determine the exact API-callable preset identifier and exact input keys.
2. Create an isolated smoke-test script or test module. Do not wire the UI yet.
3. Submit the generated five inputs to the Testing version of the preset.
4. Use reasonable timeout, retry, and streaming/polling handling based on the proven existing client.
5. Save sanitized diagnostic output locally:

   * request correlation/run ID;
   * HTTP status;
   * execution status;
   * elapsed time;
   * response content type;
   * sanitized raw response;
   * parsed response;
   * validation errors, if any.
6. Do not store authorization headers, tokens, cookies, or credentials.
7. Extract the JSON safely if the service surrounds it with prose or Markdown.
8. Validate the result against the actual `Step25Assessment` Pydantic model—not merely by checking whether it parses as JSON.
9. Confirm all exact schema enums, including:

   * `SUPPORTING`, `DISCONFIRMING`, `MIXED`, `INSUFFICIENT`
   * `HIGH`, `MEDIUM`, `LOW`
   * `IMPROVING`, `STABLE`, `DETERIORATING`, `INDETERMINATE`
   * `NO_CHANGE_REVIEW_INDICATED`
   * `REVIEW_FOR_POSSIBLE_UPGRADE`
   * `REVIEW_FOR_POSSIBLE_DOWNGRADE`
   * `INSUFFICIENT_EVIDENCE`
   * `CONTINUE_REVIEW`
   * `REQUEST_MORE_EVIDENCE`
   * `ESCALATE_TO_ANALYST`
   * `DEFER_ASSESSMENT`
10. Verify that every returned factor assessment references a real upstream factor ID.
11. Verify company name/ticker/CIK consistency.
12. Verify the as-of date.
13. Verify that post-date evidence does not influence the conclusion.
14. Verify that SEC and web provenance remain distinguishable.
15. Verify that unsupported conclusions become `INSUFFICIENT_EVIDENCE`.

If Python cannot call the preset because a verified endpoint, identifier, permission, certificate, or exact key is missing, do not guess. Stop and report:

* the exact failed operation;
* the sanitized error;
* what was proven;
* the single missing value or permission;
* exactly where I can retrieve it manually.

In that case, still finish `PRESET_PREVIEW_INPUTS.md` so I can perform the first test manually in Stylus.

## Phase 4 — Resolve the evidence-record contract

The current `Step25Assessment` schema references `evidence_ids`, but it may not contain complete evidence records with URLs, SEC accession numbers, form types, publication dates, retrieval dates, and factual claims.

Trace the active code and determine which existing contract is intended:

A. `Step25Assessment` only, with evidence records stored separately;

B. an envelope containing `assessment` plus `evidence_records`; or

C. the preset returns `Step25Assessment`, while Python constructs and persists evidence records from tool output.

Do not silently change the Pydantic schema.

Report:

* actual current contract;
* relevant classes/functions/files;
* where complete evidence records are created;
* where they are stored;
* how `evidence_ids` are resolved;
* any current contract mismatch;
* the smallest safe correction.

Do not proceed to full integration unless evidence IDs can be resolved to real evidence records or the existing contract explicitly allows unresolved IDs.

## Phase 5 — Integrate only after the smoke test passes

After a successful schema-validated preset execution:

1. Create a small isolated Stylus preset client/service.
2. Reuse the proven authentication, certificate, timeout, retry, and response-handling code.
3. Do not copy unrelated Streamlit, UI, email, or batch functionality.
4. Put endpoint names, preset ID/shortcut, timeouts, and engine selection in configuration/environment variables.
5. Never hardcode credentials.
6. Keep the existing Step 2.5 engine available behind a configuration flag or fallback. Do not delete it.
7. Wire the existing Step 2.5 Run Assessment route to:

   * accept one selected confirmed Step 2.2 company;
   * load authoritative company context;
   * load confirmed Step 2.3 event-driven factors;
   * load confirmed Step 2.4 sector-inherent factors;
   * set the as-of date;
   * set the 18-month evidence window;
   * call the preset;
   * parse and validate the result;
   * persist the assessment and evidence according to the proven contract;
   * return the existing frontend-compatible response.
8. Prevent duplicate execution caused by double-clicks.
9. Clear loading state on success, validation failure, timeout, or service failure.
10. Show useful phase messages while processing.
11. Return structured, sanitized errors.
12. Do not show endless “Processing.”
13. For the local PoC, readiness should depend on actual preset connectivity and upstream confirmation—not unrelated production activation.

## Phase 6 — Correct Steps 2.4 and 2.5 UI using v31

Use this immutable baseline:

`UI Design\icm-pm-rapid-portfolio-review-v31.html`

Active implementation:

`UI Design\step23.html`

Inspect the actual v31 DOM, CSS, JavaScript, column definitions, widths, filters, row expansion, status pills, controls, and spacing.

Restore exact functional and visual parity for Steps 2.4 and 2.5 while retaining dynamic backend data.

### Step 2.4

* Match the v31 factor-table structure.
* Match column ordering, widths, headers, filters, density, borders, typography, spacing, and expandable-row behavior.
* Preserve the confirmed Step 2.4 data and confirmation workflow.
* Do not replace the v31 design with a new editable matrix or approximate layout.

### Step 2.5

* Match the v31 assessment-type cards and portfolio-summary table.
* Restore the complete v31 column order and table behavior.
* Preserve filters, horizontal scrolling, row expansion, evidence/factor details, commentary, override controls, Export, and Confirm Assessment.
* Do not render hundreds of misleading placeholder assessment rows.
* Distinguish clearly between:

  * upstream portfolio data unavailable;
  * company not yet assessed;
  * evidence insufficient;
  * genuine zero;
  * genuine blank/not applicable.
* Show assessment values only after a successful validated assessment.
* Ensure Run Assessment uses the selected confirmed company and the new preset-backed route.
* Keep the right-side workflow/status panel where currently accepted unless exact v31 parity requires otherwise.
* Remove or collapse PoC diagnostics that are not present in v31, without deleting useful backend diagnostics.

## Phase 7 — Verification

Run:

1. Python syntax/compile checks.
2. Existing relevant unit tests.
3. New preset-client tests with mocked sanitized responses.
4. Pydantic response-validation tests.
5. Negative tests:

   * missing confirmed Step 2.2 company;
   * missing Step 2.3 factors;
   * missing Step 2.4 factors;
   * invalid company identity;
   * timeout;
   * non-JSON response;
   * invalid schema;
   * unknown factor ID;
   * duplicate click;
   * insufficient evidence.
6. One live isolated preset smoke test if approved connectivity is available.
7. One complete local end-to-end execution through:
   `http://127.0.0.1:8000/ui-design/step23.html`
8. Visual comparison against the actual v31 file at the same viewport and browser zoom.
9. Confirm that navigating away from Step 2.5 clears loading indicators.
10. Confirm that existing Steps 1 through 2.3 still work.

## Required final report

Return:

1. Plain-language explanation of the relevant `app.py`.
2. Root cause of the previous Run Assessment failure.
3. Exact preset invocation contract.
4. Verified preset ID and exact shortcut.
5. Exact case-sensitive input keys.
6. Selected smoke-test company and upstream data sources.
7. Smoke-test result.
8. Schema-validation result.
9. Evidence-record contract result.
10. Every file created or modified.
11. Why each modification was necessary.
12. Tests executed and results.
13. Remaining blockers.
14. Exact restart commands.
15. Exact URL to test.
16. A clear verdict:

* `PASS — preset validated and integrated`;
* `PARTIAL — preset validated but integration blocked`;
* `BLOCKED — preset could not be executed`, with the precise reason.

Proceed autonomously through these phases when safe. Do not claim success based only on static code inspection or an HTTP 200. Success requires a real parsed and Pydantic-validated Step 2.5 result.
