STOP HERE AND FREEZE THE CURRENT IMPLEMENTATION.

The current Step 2.5 Stylus POC work has reached the correct stopping point.

Do NOT start another architecture cycle.
Do NOT refactor the current implementation.
Do NOT create more helper frameworks/files unless they are literally required to execute the POC.
Do NOT redesign working Steps 1–2.4.
Do NOT revisit decisions already made.

============================================================
CURRENT STATE — TREAT AS ACCEPTED BASELINE
============================================================

The following findings/implementation are accepted:

1. Step 2.5 HTTP 409 issue
- The legacy Step 2.5 blockers were traced correctly.
- The Stylus POC path now bypasses legacy SEC/web/H2M readiness checks.
- Legacy/orchestrated/hybrid/direct_runner paths remain unchanged.
- This additive behaviour is accepted.

2. Stylus preset invocation
- Do NOT use or investigate preset UUID invocation further.
- The only proven working Runner mechanism in the current codebase sends the FULL PRESET DEFINITION INLINE.
- The POC will use that existing inline mechanism.
- No by-ID preset architecture is required.

3. Step 2.2 identifiers
- Step 2.2 contains CAGID and potentially cagid_name / gfcid_name.
- It does not provide ticker / CIK / LEI / ISIN / CUSIP directly.
- The existing CikResolver/company identity path should be reused.
- Do not invent a new entity-resolution framework.

4. Company integrity
- No fake Salesforce / Apple / Microsoft substitution is allowed.
- The assessment company must genuinely correspond to the selected Step 2.2 record.
- If company identity cannot be determined:
  NO_COMPANY_IDENTITY_AVAILABLE
- If legal company exists but SEC registrant cannot be confirmed:
  NO_CONFIRMED_SEC_REGISTRANT

5. Stylus route
- The Stylus engine is wired into the existing Step 2.5 /run flow.
- Offline/unit tests currently pass.
- Preserve this.

6. Evidence handling
- Keep the current lightweight evidence/citation approach.
- No need to design a production enterprise evidence framework.
- Real source provenance is required.
- No fabricated evidence IDs, URLs, SEC facts, or citations.

============================================================
POC PHILOSOPHY
============================================================

This is a PURE POC.

A separate production team may completely rebuild this implementation later.

Optimize only for:

- a convincing end-to-end demo
- real data
- accurate credit-risk assessment
- enough traceability to validate the result
- minimal changes to the current working RPR backbone

Do NOT optimize for:

- production architecture
- scalability
- generalized reusable frameworks
- abstract configuration systems
- future-proof APIs
- deployment hardening
- code cleanup for its own sake

The business objective is:

REAL Step 2.2 company
    ->
Step 2.3 factors
    ->
Step 2.4 factors
    ->
SEC + WEB Stylus assessment
    ->
high-quality Step 2.5 result
    ->
existing UI

============================================================
DO NOT MODIFY CODE YET
============================================================

There are now only TWO genuine external blockers:

1. The exact real SEC + WEB Stylus preset definition has not yet been captured from the Stylus UI.
2. Runner authentication is unavailable in the current Claude shell.

Do NOT compensate for either blocker by writing more architecture.

The next task is to PREPARE FOR THE ONE-TIME STYLUS CAPTURE ONLY.

============================================================
ONE-TIME STYLUS CAPTURE
============================================================

The user will manually open the SEC + WEB preset in Stylus and capture the real request body using browser DevTools.

Expected process:

1. Open SEC + WEB preset in Stylus.
2. Open Chrome/Edge DevTools with F12.
3. Open Network tab.
4. Clear existing network entries.
5. Execute/run the preset once with any safe test values.
6. Find the request to the Runner endpoint, likely something similar to:
   /runner-service/chat
7. Open that request.
8. Open Payload / Request Payload.
9. Capture ONLY the request BODY.

DO NOT ask the user for:
- Authorization header
- bearer token
- refresh token
- cookies
- authentication headers
- any secret values

We only need the sanitized request structure.

============================================================
WHAT MUST BE CAPTURED
============================================================

From the request body we need the exact real values/structure for:

- preset object
- exact 5 input field names, including exact case
- prompt
- model
- toolConfig / tools
- knowledge configuration
- answers or related required fields
- any other body fields required by the known-working Runner contract

The most critical element is the exact input structure, e.g.:

inputs: [
    { name: "<exact key 1>", ... },
    { name: "<exact key 2>", ... },
    { name: "<exact key 3>", ... },
    { name: "<exact key 4>", ... },
    { name: "<exact key 5>", ... }
]

Do NOT guess or normalize these names.

============================================================
AFTER THE USER PROVIDES THE CAPTURE
============================================================

When the real Stylus request body is supplied:

1. Compare it against the current placeholder:
   preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

2. Replace ONLY placeholder/pending values with the exact real captured values.

3. Set the preset definition state to verified=true or the current equivalent flag.

4. Preserve the current inline Runner mechanism.

5. Do NOT add new abstraction layers.

6. Do NOT refactor stylus_runner_client.py unless the real request proves a tiny compatibility change is actually necessary.

7. Do NOT touch unrelated Step 1–2.4 code.

============================================================
POC COMPANY CHECK
============================================================

Before final E2E execution, identify at least ONE genuine Step 2.2 company that can complete the full path.

We need a concrete demo record showing something like:

Step 2.2 CAGID: <real value>
Company: <real legal company name>
Ticker: <if available>
CIK: <verified real CIK>
SEC status: CONFIRMED

Use:

CAGID
 -> cagid_name
 -> if empty, first authoritative gfcid_name from MLE rows
 -> existing CikResolver
 -> confirmed SEC identity

Do not infer the company from sector/event text.

If current selected records do not resolve cleanly, search the actual Step 2.2 dataset for another genuine record that does.

For this POC, a tiny explicit verified mapping such as:

CAGID -> Legal Company -> Ticker -> CIK

for a few demo companies is ACCEPTABLE if required.

Conditions:
- mapping must correspond to actual Step 2.2 records
- mapping must be manually/verifiably correct
- no unrelated company substitution
- clearly label it as POC mapping if used

Do NOT build a production entity master.

============================================================
FINAL E2E TARGET
============================================================

Once the preset definition is captured and normal Runner authentication is available, execute:

Step 2.2 real company
    ->
resolve legal company
    ->
resolve/verify CIK
    ->
Step 2.3 event-driven factors
    ->
Step 2.4 sector-inherent factors
    ->
Step 2.5 Run Assessment
    ->
inline SEC + WEB Stylus preset
    ->
real SEC/web evidence
    ->
schema-valid Step25Assessment
    ->
existing Step 2.5 UI

The output must be genuinely useful for a credit-risk analyst.

Quality matters more than engineering elegance.

============================================================
STEP 2.5 QUALITY REQUIREMENT
============================================================

The final assessment must demonstrate that the model actually used:

- real selected company context
- Step 2.3 event-driven factors
- Step 2.4 sector factors
- real company-specific SEC evidence
- relevant web evidence
- credit implication
- direction of risk
- materiality/severity
- evidence/citations
- conflicts or contrary evidence where relevant
- assumptions/gaps where evidence is unavailable

Do NOT accept a result merely because valid JSON was returned.

The POC succeeds only if the assessment content is credible and analytically useful.

============================================================
AUTHENTICATION
============================================================

Do NOT request tokens from the user in Claude chat.

Do NOT print or persist secrets.

Use the existing approved Runner authentication mechanism when the POC is run from the normal RPR environment.

Until then:
- BLOCKED_AUTH is acceptable
- do not modify authentication architecture
- do not create dummy tokens
- do not manufacture successful model output

============================================================
FREEZE RULE
============================================================

Current implementation is now frozen unless one of these conditions occurs:

A. the real captured Stylus request body proves a small compatibility change is required;
B. the final E2E test identifies a concrete execution defect;
C. the user explicitly asks for another change.

Otherwise:
NO MORE ARCHITECTURE
NO REFACTORING
NO CLEANUP
NO NEW FRAMEWORKS
NO NEW HELPER FILES

============================================================
WHAT TO DO NOW
============================================================

Do not implement anything further right now.

Review the existing:
preset_knowledge/STYLUS_SEC_WEB_REQUIRED_CAPTURE.md

Make sure it gives the user very short, exact instructions for the browser DevTools capture described above.

If it already does, leave it unchanged.

Then stop and report ONLY:

1. Current code status: READY_FOR_PRESET_CAPTURE / not ready
2. Exact file that will receive the real captured preset definition
3. Exact endpoint/request type the user should look for in DevTools
4. Exactly which request BODY sections are needed
5. Confirmation that NO auth headers/secrets should be provided
6. One sentence describing what happens immediately after the capture is supplied

Do not continue coding after this report.
