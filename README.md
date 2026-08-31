Perform a complete, evidence-based audit of the new Step 2.5 direct-runner implementation before making further architectural changes.

The purpose is to determine:

1. Exactly how it executes.
2. Whether the implemented prompts fit the intended RPR Step 2.5 purpose.
3. Whether it can genuinely execute a live search/model assessment.
4. What remains between the current implementation and a successful PoC.

Do not give me another high-level implementation summary. Inspect the actual files, trace the executable code path, and report concrete details with file and line references.

Review at minimum:

* backend/step25/runner_client.py
* backend/step25/direct_runner_orchestrator.py
* backend/step25/step25_poc_preset.yaml
* backend/step25/config.py
* backend/step25/router.py
* backend/step25/models.py
* backend/step25/assessment_prompt.py
* backend/step25/assessment_service.py
* backend/llm_gateway.py
* RUNTIME_ENV.ps1
* feedback_step25.txt
* pe-sponsor-search/app 1.py
* pe-sponsor-search/pe_sponsor_preset.yaml

Treat the colleague’s files as read-only reference material.

A. EXECUTION VERDICT

Begin with one precise verdict:

* READY_FOR_LIVE_POC
* READY_AFTER_CONFIGURATION
* PROMPT_MISMATCH
* IMPLEMENTATION_DEFECT
* AUTHENTICATION_BLOCKED
* EXTERNAL_SERVICE_BLOCKED

Explain the decisive reason and distinguish tested behavior from assumptions.

B. COMPLETE EXECUTION FLOW

Trace the exact runtime sequence from clicking “Run Assessment” in step23.html through:

1. Frontend request.
2. Router endpoint.
3. Local PoC readiness check.
4. Company selection and CIK resolution.
5. Runner client construction.
6. Token acquisition.
7. Preset loading.
8. Runner request payload creation.
9. POST /chat.
10. SSE event processing.
11. Google-search evidence extraction.
12. Final-model-content extraction.
13. JSON parsing.
14. Evidence normalization.
15. Citation validation.
16. Step25Assessment construction.
17. Persistence.
18. Response returned to the frontend.
19. Browser refresh and run restoration.

For every step identify:

* Function and file
* Inputs
* Outputs
* Failure behavior
* Whether it was actually tested

C. EXACT PROMPTS

Show the complete effective prompt that the model receives after all YAML loading, variable substitution, schema insertion and company-input injection.

Separate:

* System/preset instructions
* Company/user input
* Embedded JSON schema
* Empty-result follow-up prompt

Do not summarize or omit sections. Redact only secrets.

Explain whether the company value is inserted into the actual prompt or merely included elsewhere in the request.

D. PROMPT PURPOSE-FIT MATRIX

Evaluate the effective prompt against every requirement below using:

* PASS
* PARTIAL
* FAIL
* NOT IMPLEMENTED

Requirements:

1. Performs a name-level company assessment.
2. Uses live search rather than model memory alone.
3. Resolves exact legal name, ticker and CIK.
4. Requires official SEC.gov evidence.
5. Prefers recent 10-K, 10-Q and relevant 8-K filings.
6. Keeps SEC evidence separate from general web evidence.
7. Records exact source URLs.
8. Records filing/publication dates.
9. Associates every material claim with evidence IDs.
10. Prohibits fabricated facts, URLs and citations.
11. Identifies conflicting evidence.
12. Identifies stale evidence.
13. Reports unavailable evidence honestly.
14. Produces the existing Step25Assessment schema.
15. Does not replace or mutate the existing RRR score.
16. Produces useful risk drivers rather than a generic company summary.
17. Includes limitations and uncertainty.
18. Supports the Step 2.5 frontend without translation loss.
19. Does not use mock, fixture, canned or deterministic fallback data.
20. Does not rely on Apple/AAPL test data.

For every PARTIAL or FAIL, quote the relevant prompt or code behavior and specify the exact correction.

E. RUNNER REQUEST CONTRACT

Show a redacted example of the actual JSON sent to POST /chat, including:

* application
* invoker
* mode
* request_id
* session_id
* message.parts
* preset
* role
* model
* temperature
* tool_config
* Google-search configuration

Compare it field-by-field with the working request produced by pe-sponsor-search/app 1.py.

Identify any missing or changed headers and explain whether each difference is intentional.

Confirm that:

* Mock LLM is disabled.
* HTTP 200 and 201 are accepted.
* text/event-stream is accepted.
* One session_id is reused.
* Every request gets a new request_id.

F. AUTHENTICATION INVESTIGATION

The existing repository previously demonstrated successful H2M token acquisition. Investigate why the new implementation reports that GENAI_BEARER_TOKEN or GENAI_REFRESH_TOKEN is missing.

Inspect and compare:

* Existing llm_gateway token acquisition
* RUNTIME_ENV.ps1
* Current process, user and machine environment-variable presence
* Colleague application token acquisition
* New runner_client token acquisition

Do not print token values, refresh tokens, secrets or complete authorization headers.

Report only:

* Credential source names
* Whether each is present
* Whether it is usable
* Token acquisition method
* Expiry information if safely available
* Why the new adapter did or did not reuse the already working H2M flow

If the existing current-user H2M helper can safely supply the runner token, reuse it instead of asking the user to paste a bearer token.

Do not copy the colleague’s credentials, SOEID, email address or client identity.

G. SSE AND SEARCH-EVIDENCE HANDLING

Show which SSE event shapes are recognized.

Explain:

* How final text is distinguished from intermediate tool events.
* How Google-search result URLs are extracted.
* Whether titles, snippets, publication dates and grounding metadata survive normalization.
* What happens when tool events arrive but no final answer arrives.
* What happens on malformed JSON events.
* What happens on an empty stream.
* Whether raw SSE diagnostics can expose confidential data.
* Whether citations displayed in the UI correspond to genuine collected source events.

H. ERROR AND RETRY BEHAVIOR

Report exact behavior for:

* 200
* 201
* 400
* 401
* 403
* 429
* 500
* 503
* Connection timeout
* Read timeout
* Total timeout
* Stream ending without final content
* Schema-invalid model output
* Unknown evidence IDs
* Unreachable source URL

Confirm retries are bounded. Refresh only when appropriate. Honor Retry-After.

I. DATA INTEGRITY

Prove that the direct-runner path does not silently use:

* demo_data.py
* DEMO_RR_SCORES
* Apple fixtures
* mocked SEC results
* deterministic assessment fallback
* cached colleague output
* fabricated citations

Search the complete runtime path, not merely the newly created files.

J. LIVE EXECUTION

After completing the static audit, attempt the smallest real live PoC using the existing current-user authentication path.

Do not use Fiddler unless direct network execution actually requires it. Do not wait for production approvals.

Use one real non-Apple company. If multiple valid companies exist, select the first deterministically and report it.

Capture, with secrets redacted:

* Selected company
* Ticker
* Resolved CIK
* Runner URL path
* Model
* Search-enabled status
* HTTP status
* Content-Type
* Request ID
* Session ID
* SSE line/event count
* Tool/search event count
* Final-content event count
* Source URLs collected
* JSON/schema-validation result
* Citation-validation result
* Elapsed time
* Persisted run ID
* Frontend result
* Refresh/restore result

Passing tests without a live request is not a successful PoC.

K. FINAL GAP LIST

List only genuine remaining gaps. Classify each as:

* PROMPT
* CODE
* CONFIGURATION
* AUTHENTICATION
* EXTERNAL SERVICE
* UI
* DATA QUALITY

Do not classify production approval or Fiddler configuration as a PoC blocker.

L. FINAL ANSWER

Finish with:

1. Whether the prompt fits the Step 2.5 purpose.
2. Whether the direct-runner implementation matches the working colleague pattern.
3. Whether a real live call succeeded.
4. The smallest exact next action required.
5. The final verdict from section A.

Save the full audit as STEP25_DIRECT_RUNNER_EXECUTION_AUDIT.md and also present its important findings in the response.
