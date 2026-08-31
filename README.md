The audit is complete. Do not continue auditing or trying to authenticate the incompatible H2M token against Runner Service.

The prompt is suitable. Reuse it in the hybrid engine now.

IMPLEMENT THE HYBRID POC

1. Use the repository’s existing live web-search adapter to collect SEC and public-web evidence.
2. Use the existing authenticated H2M/R2D2 gateway only for the final assessment.
3. Insert the company, CIK and normalized evidence directly into the model prompt text.
4. Do not depend on Runner Service preset.answers.inputcompany merging.
5. Do not depend on a newly generated or pre-registered Runner preset ID.
6. Do not call Runner Service in hybrid mode.
7. Keep direct_runner as optional future code only.

COMPANY SELECTION

Do not read the company from DEMO_CLIENTS or any fixture.

Use, in order:

1. A real company from the current Step 2.2 portfolio state.
2. A local PoC company override supplied through the request or environment.
3. If neither exists, use Salesforce Inc. / CRM explicitly as a manually selected real test company—not as data sourced from demo_data.py.

EVIDENCE COLLECTION

Execute the real repository web-search function and collect:

* Official SEC.gov filing sources
* Recent credible public sources
* Exact URLs
* Titles
* Dates where available
* Supported facts
* Search/citation metadata

Keep SEC and web evidence in separate lanes. Do not let a failed direct SEC HTTP request block the PoC if official SEC URLs were obtained through live search.

MODEL PROMPT

Build the effective H2M prompt as:

* Existing Step 2.5 instructions
* Exact legal company name, ticker and CIK
* As-of date
* Complete normalized evidence list with stable evidence IDs
* Existing Step25Assessment response schema

Do not send the company only as a separate preset answer. Make it visible in the actual prompt text.

The model must not search independently in this hybrid design. It must assess only the evidence supplied to it.

VALIDATION

Before persistence:

* Parse JSON.
* Translate prompt fields to the exact EvidenceRecord and Step25Assessment fields.
* Validate all enums.
* Verify every cited evidence ID exists.
* Reject fabricated URLs or unknown citations.
* Record evidence gaps instead of inventing facts.
* Never invoke deterministic fallback output.

LIVE EXECUTION NOW

Run these in order:

1. Live web-search smoke test.
2. Live H2M assessment smoke test.
3. Full Step 2.5 backend run.
4. Confirm real evidence URLs.
5. Confirm schema and citation validation.
6. Confirm persistence.
7. Open the result in step23.html.
8. Refresh and confirm restoration.

Do not report success based on tests or imports. Provide the actual live request results.

Also correct these implementation gaps while touching the relevant code:

* Accept successful 2xx responses where appropriate.
* Add bounded Retry-After handling for 429.
* Add bounded exponential retry for transient 5xx/network failures.
* Remove any demo-data dependency from live company selection.
* Ensure diagnostics redact tokens and internal credential claims.

Final verdict must state either LIVE_POC_SUCCEEDED or the exact external service that failed.
