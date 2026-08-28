Continue the Step 2.5 implementation. Do not start over.

Your previous result established the backend core, but it is not yet an end-to-end RPR feature because:

1. The Step 2.5 frontend is not wired.
2. The editor reports 91 changed files, which must be reconciled with your claim that only the `_step25` package, three test files, `server.py`, and documentation changed.
3. The actual application entry point cannot currently import because the pre-existing Step 2.2 upload route requires `python-multipart`.
4. The Step 2.5 router was checked in isolation, but the API contracts still need an offline mounted-router smoke test.
5. The existing approved-web adapter is structurally implemented but needs mocked integration verification.

This pass has two priorities:

* Audit and constrain the change set.
* Finish the complete fixture-mode frontend-to-backend vertical slice.

Do not enable or test live SEC access.

# Phase 1 — Audit the 91-file discrepancy

Before editing anything else, run and inspect:

```bash
git status --short
git diff --stat
git diff --name-status
git diff --numstat
git ls-files --others --exclude-standard
```

Also enumerate the new Step 2.5 package and fixtures with file sizes.

Determine exactly why VS Code reports:

```text
91 files changed
+10670 -366
```

Classify every changed file as one of:

```text
PRE_EXISTING_USER_CHANGE
STEP25_REQUIRED_CHANGE
GENERATED_TEST_ARTIFACT
UNRELATED_OR_ACCIDENTAL_CHANGE
UNKNOWN
```

Rules:

* Do not revert, overwrite, or delete pre-existing user changes.
* Do not run destructive Git commands.
* Do not reset the repository.
* Do not silently remove unknown changes.
* Remove a generated cache or bytecode artifact only if it is untracked, clearly produced by your current test run, and not user-authored.
* Do not commit `.pyc`, `__pycache__`, test caches, runtime evidence stores, or generated logs.
* If runtime-generated files account for the inflated change count, ensure they are excluded through the repository’s existing ignore conventions.
* Do not make broad `.gitignore` changes that hide legitimate project files.
* If large SEC fixture files account for the count or size, retain only the smallest schema-accurate fixture subsets needed by tests.
* Do not claim the discrepancy is resolved until the final report contains the exact classified file list.

After auditing, continue implementation unless an unrelated user change directly conflicts with the required frontend files.

# Phase 2 — Inspect the backend contracts already implemented

Read the actual new code before changing it.

Identify:

* Router prefix.
* Endpoint paths.
* Request models.
* Response models.
* Run-state values.
* Evidence response structure.
* Assessment response structure.
* Error response structure.
* Fixture company identifiers.
* Existing API registration in `server.py`.
* Whether the package is named `_step25`, `step25`, or something else.
* The exact public functions exposed by the orchestrator.
* The exact approved-web adapter interface.
* How the deterministic assessment fallback is labeled.

Do not create a second set of competing endpoints.

If the new API does not support the frontend requirements, make the smallest additive backend correction.

# Phase 3 — Prove the router offline

The missing `python-multipart` dependency is reported as a pre-existing environment gap caused by the Step 2.2 upload endpoint.

Do not install packages during this pass.

Do not remove or weaken the Step 2.2 upload endpoint.

Do not change application behavior merely to bypass the missing dependency.

Instead:

1. Check whether `python-multipart` is already declared in the repository’s requirements or lock files.
2. If declared, document this as environment drift.
3. If not declared, document the pre-existing dependency gap separately. Do not edit dependency locks unless specifically authorized.
4. Create an offline router integration test by mounting the real Step 2.5 router into a minimal test FastAPI application.
5. Use the project’s existing test client or equivalent.
6. Exercise the actual Step 2.5 routes in fixture mode.

The integration smoke test must verify:

```text
GET status/preflight
GET or load fixture company context
POST create/run Step 2.5 fixture assessment
GET run status
GET normalized evidence
GET assessment
GET manifest, if implemented
```

Verify:

* No network calls occur.
* Live SEC remains disabled.
* Fixture SEC evidence is returned.
* Fixture approved-web evidence is returned.
* SEC and web evidence remain separate.
* The assessment cites valid evidence IDs.
* The response explicitly says the RRR was not changed.
* The run reaches `COMPLETED` or the appropriate documented fixture terminal state.
* Invalid company and unresolved CIK cases return structured errors.
* A request attempting to force live SEC mode is rejected.

Add this test to the normal Step 2.5 test suite.

# Phase 4 — Verify the mocked approved-web adapter

Add a mocked integration test for the adapter over the existing approved enterprise web-search path.

The test must prove that the adapter:

* Calls the existing RPR search function rather than a new search provider.
* Passes a bounded factor-driven query.
* Limits total query and result counts.
* Normalizes title, URL, publisher/domain, publication time when available, retrieval time, snippet, and provider metadata.
* Labels the normalized record `web_evidence`.
* Does not assign an SEC accession number.
* Deduplicates canonical URLs.
* Rejects unsafe URL schemes.
* Returns a partial-source status when approved search is unavailable.
* Does not cause the SEC lane to fail when only web retrieval fails.
* Does not make a real public-web request in tests.

Do not activate the real approved-web provider during this pass.

# Phase 5 — Wire the existing Step 2.5 frontend

Locate the existing v31 Step 2.5 placeholder and extend it.

Do not create a separate page if Step 2.5 already has a panel.

Do not redesign the application.

Do not alter Steps 1–2.4.

Do not rename existing DOM IDs used elsewhere.

Do not replace existing CSS or JavaScript frameworks.

Reuse the existing:

* Navigation.
* Company-selection state.
* Button styles.
* Cards.
* Tables.
* Status badges.
* Loading patterns.
* Error patterns.
* Modal, drawer, or accordion patterns.
* CSS variables.
* API helper functions.
* Authentication behavior.

Make only additive Step 2.5 frontend changes.

## Required Step 2.5 UI sections

### A. Upstream readiness

Display:

* Selected Step 2.2 company.
* Internal company ID.
* Ticker if available.
* Step 2.2 confirmation status.
* Count of related Step 2.3 event factors.
* Applicable Step 2.4 sector-factor version.
* Assessment as-of date.
* Whether Step 2.5 is ready to run.
* Exact reason when it is not ready.

The frontend must use existing application state when possible. Do not maintain a competing company-selection state.

### B. Mode banner

Fixture mode must visibly display:

```text
DEMO / FIXTURE MODE
No live SEC or public-web request will be made.
```

If the server reports that live SEC is blocked, display:

```text
LIVE SEC MODE BLOCKED
MarketDev connectivity and SEC User-Agent approval are incomplete.
```

Do not add a client-side switch that can override server configuration.

### C. Run controls

Add:

* Assessment as-of date.
* Run Step 2.5 Demo button.
* Reset/clear displayed result only if consistent with existing UI.
* Loading state.
* Disabled state while a run is executing.
* Accurate phase/status text.

The button must call the real Step 2.5 fixture-mode endpoint.

Do not simulate completion with a timer.

### D. CIK identity card

Display:

* Input company name.
* Ticker.
* Internal company ID.
* Normalized 10-digit CIK.
* SEC entity name.
* CIK match status.
* Resolution method.
* Match confidence.
* Review-required reason.

For `CIK_REVIEW_REQUIRED`, `CIK_UNRESOLVED`, or `SEC_NOT_APPLICABLE`:

* Do not continue to assessment.
* Show a clear review state.
* Do not guess a CIK.
* Do not present this as an application crash.

### E. Run progress

Display real phases returned by the backend, such as:

```text
UPSTREAM_VALIDATED
CIK_RESOLVED
SEC_METADATA_COLLECTED
SEC_EVIDENCE_NORMALIZED
WEB_EVIDENCE_COLLECTED
CONFLICTS_EVALUATED
ASSESSMENT_GENERATED
COMPLETED
PARTIAL
BLOCKED
FAILED
```

Use the actual backend vocabulary.

Do not invent phases that the server cannot return.

### F. SEC evidence lane

Create a distinct SEC section containing:

* Filing form.
* Filing date.
* Accepted datetime.
* Report date if present.
* Accession number.
* Amendment indicator.
* Original/superseding relationship when known.
* Primary filing link.
* Filing section.
* Bounded source excerpt.
* XBRL concept.
* Taxonomy.
* Value.
* Unit.
* Period.
* Fiscal year/period.
* Extraction method.
* Extraction confidence.
* Retrieval timestamp.
* Evidence ID.

Requirements:

* Escape source content.
* Never inject filing HTML.
* Use secure links.
* Clearly label company-reported facts.
* Do not display null fields as misleading values.
* Provide expandable detail if the existing UI supports it.
* Keep the display readable when many records exist.

### G. Approved-web evidence lane

Create a separate web evidence section containing:

* Original query when available.
* Result title.
* Publisher/domain.
* Publication date when available.
* Retrieval timestamp.
* Bounded snippet.
* Related Step 2.3 or Step 2.4 factors.
* Evidence ID.
* Source link.
* Fixture/demo label.

Display this disclaimer:

```text
Approved-web evidence provides external context and does not override company-reported SEC evidence.
```

Never mix web records into the SEC table.

Never label a web snippet as a verified company-reported fact.

### H. Conflicts and evidence gaps

Display:

* SEC-versus-web conflicts.
* Amendment/original conflicts.
* Duplicate XBRL period values.
* Stale evidence warnings.
* Missing SEC or web sources.
* Unresolved CIK or scope questions.
* Analyst-review requirements.

For each conflict:

* Display all involved evidence IDs.
* Preserve both sides.
* Show `UNRESOLVED` or `ANALYST REVIEW REQUIRED`.
* Do not automatically pick a winner.

If no conflicts exist, display an honest empty state, not “confirmed safe.”

### I. Step 2.5 assessment

Display the actual validated assessment:

* Headline.
* Company-specific risk direction.
* Overall confidence.
* Factor-by-factor assessment.
* Supporting evidence.
* Disconfirming evidence.
* Conflicts.
* Evidence gaps.
* Freshness warnings.
* Analyst questions.
* Workflow action.
* Nonbinding RRR review recommendation.
* Prompt version.
* Model or deterministic-fallback label.
* Assessment as-of timestamp.

Prominently display:

```text
Review recommendation only.
No RRR value was changed.
```

If the backend used a deterministic fallback rather than the configured LLM:

* Label it clearly.
* Do not present it as LLM reasoning.
* Do not hide the fallback mode.

### J. Evidence citations

Every evidence ID cited by an assessment should be clickable or expandable.

Selecting an evidence ID must reveal:

* Source lane.
* Source title or filing.
* Source URL.
* Accession number for SEC evidence.
* Excerpt.
* Retrieval timestamp.
* Extraction method.
* Confidence.

Do not permit citations to nonexistent evidence records.

### K. Error and partial states

Handle at least:

```text
STEP25_UPSTREAM_NOT_READY
CIK_REVIEW_REQUIRED
CIK_UNRESOLVED
SEC_NOT_APPLICABLE
SEC_LIVE_MODE_BLOCKED
SEC_SOURCE_UNAVAILABLE
WEB_SOURCE_UNAVAILABLE
INSUFFICIENT_EVIDENCE
MODEL_OUTPUT_INVALID
EVIDENCE_VALIDATION_FAILED
```

Use existing UI error conventions.

Do not show raw stack traces.

A web-source failure should display a partial result if SEC evidence succeeded.

# Phase 6 — Frontend implementation quality

Use a small dedicated Step 2.5 JavaScript module if that matches the current structure.

Avoid adding hundreds of lines to an unrelated global file if the frontend already supports modular JavaScript.

Implement:

* Request cancellation or stale-response protection if the selected company changes during a run.
* Double-click protection.
* Safe DOM rendering.
* Proper date formatting without changing the underlying value.
* Deterministic display ordering.
* Empty states.
* Loading states.
* Retry only for appropriate retryable errors.
* Accessible labels and status text.
* Keyboard-accessible expandable evidence.
* No `innerHTML` with untrusted source content unless it is escaped through an existing safe helper.

If the project uses direct DOM rendering and no framework, follow that style rather than introducing a framework.

# Phase 7 — Preserve upstream integrity

Add regression assertions or code-level verification that running Step 2.5 does not mutate:

* Step 2.2 company identity.
* Step 2.2 confirmation status.
* Step 2.3 factors.
* Step 2.4 factor versions.
* Existing RRR.
* Existing workflow status, except for a new Step 2.5-specific run record if designed that way.

Do not silently persist the Step 2.5 recommendation into an authoritative rating field.

# Phase 8 — Tests

Run the existing 26 Step 2.5 tests plus the new router and frontend-related tests.

At minimum add or run:

```text
Router mounted in minimal offline FastAPI app
Complete fixture-mode run
Status endpoint
Evidence endpoint
Assessment endpoint
Manifest endpoint
Force-live request rejection
Mock approved-web adapter
Citation-to-evidence validation
RRR non-mutation
Upstream non-mutation
Frontend rendering helper tests, if the repository supports JS tests
```

If the project has no JavaScript test environment, do not install one. Instead:

* Keep frontend logic small.
* Test pure transformation/render-model functions where possible using existing tools.
* Perform syntax checking with an existing runtime if available.
* Document the exact manual browser test.

Full regression:

* Run the relevant existing suite.
* Report pre-existing failures separately.
* Do not describe the full application as passing while `server.py` cannot import.
* State accurately that the full app runtime remains blocked by the pre-existing missing `python-multipart` environment dependency if that remains true.

# Phase 9 — Manual demo instructions

Update `STEP25_IMPLEMENTATION.md` with an exact offline demo.

Include:

1. Exact project directory.
2. Exact environment variables.
3. Exact command to start the app when dependencies are present.
4. Exact fixture company.
5. Exact application URL.
6. Exact Step 2.5 navigation.
7. Exact button to click.
8. Expected CIK.
9. Expected SEC evidence records.
10. Expected web evidence records.
11. Expected conflict.
12. Expected assessment result.
13. Expected “No RRR changed” message.
14. How to inspect the manifest.
15. How to confirm no live network call occurred.

Also include an API-only offline demo using the mounted test application or existing test command so the feature can still be verified while the main environment lacks `python-multipart`.

# Phase 10 — Final verification

Before claiming completion:

1. Re-run `git status --short`.
2. Re-run `git diff --stat`.
3. Re-run `git diff --name-status`.
4. Inspect every modified existing file.
5. Check for accidental changes.
6. Check for generated runtime artifacts.
7. Verify no secrets or contact details were added.
8. Verify no live SEC URL was contacted.
9. Verify no TLS bypass exists.
10. Verify no new public web provider exists.
11. Verify no upstream RPR records are mutated.
12. Verify frontend calls the actual implemented route contracts.
13. Verify citations resolve to displayed evidence.
14. Verify fixture labels are visible.
15. Verify the RRR disclaimer is visible.

Do not claim “end to end” unless a fixture-mode UI action reaches the real router/orchestrator and renders the returned SEC evidence, web evidence, conflict information, and assessment.

# Required final response

Return:

```text
SECOND-PASS RESULT
- COMPLETE / PARTIAL / BLOCKED

91-FILE AUDIT
- Why VS Code reported 91 files
- Exact classification counts
- Exact required Step 2.5 files
- Exact pre-existing user files
- Exact generated files
- Exact unrelated/unknown files
- Actions taken

FRONTEND COMPLETION
- Exact existing files modified
- Step 2.5 UI sections now available
- Exact API calls made by the frontend
- How citations are resolved

BACKEND VERIFICATION
- Mounted-router test result
- Complete fixture run result
- Approved-web mock result
- Live-mode rejection result

APPLICATION RUNTIME
- Whether the real `server.py` imports
- Exact `python-multipart` status
- Whether the dependency is declared
- Honest description of any remaining environment blocker

TESTS
- Exact commands
- Exact pass/fail counts
- Pre-existing failures separated from new failures

SECURITY
- Confirmation of fixture default
- Confirmation that no live SEC request occurred
- Confirmation that TLS was not bypassed
- Confirmation that the existing approved web path is the only web adapter
- Confirmation that no RRR was changed

FILES CHANGED
- Every Step 2.5-required file and purpose

MANUAL DEMO
- Exact steps and expected output

REMAINING LIMITATIONS
- Only genuine unresolved items

FINAL DIFF SUMMARY
- Exact file count
- Insertions
- Deletions
```

Continue now. Do not merely provide another plan.
