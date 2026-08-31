IMPORTANT — THIS OVERRIDES THE PREVIOUS "FREEZE / STOP" INSTRUCTION.

DO NOT STOP AT READY_FOR_PRESET_CAPTURE.

DO NOT DECLARE STEP 2.5 READY.

DO NOT DECLARE THE POC COMPLETE.

STEP 2.5 MUST ACTUALLY WORK END-TO-END.

The objective now is EXECUTION, not more architecture review, documentation, readiness reports, or theoretical wiring.

======================================================================
PRIMARY OBJECTIVE
======================================================================

MAKE STEP 2.5 WORK.

The required real flow is:

REAL Step 2.2 selected portfolio company
        ↓
REAL Step 2.3 Event-Driven Risk Factors
        ↓
REAL Step 2.4 Sector-Inherent Risk Factors
        ↓
exact SEC + WEB Stylus preset inputs
        ↓
approved Runner Service
        ↓
REAL SEC evidence
        +
REAL web evidence
        ↓
high-quality company credit assessment
        ↓
Step25Assessment validation
        ↓
existing Step 2.5 UI

DO NOT STOP UNTIL this flow is either:

A. genuinely working end-to-end

OR

B. blocked by ONE specific external item that cannot possibly be solved from the code/environment available.

No more general investigation loops.

======================================================================
STRICT DEFINITION OF "WORKING"
======================================================================

STEP 2.5 IS NOT WORKING merely because:

- code compiles
- unit tests pass
- /preflight works
- HTTP 409 is gone
- company resolution works
- CIK resolution works
- Runner client exists
- preset configuration file exists
- JSON schema validates
- UI renders
- a smoke test exists

Those are components.

I need the ACTUAL FEATURE.

SUCCESS means:

1. Select a real company from Step 2.2.

2. Use that SAME company throughout the assessment.

3. Carry its real Step 2.3 factors into Step 2.5.

4. Carry its real Step 2.4 factors into Step 2.5.

5. Invoke the SEC + WEB assessment using the approved Runner mechanism.

6. Retrieve real evidence.

7. Generate a real company-specific credit-risk assessment.

8. Return schema-valid Step25Assessment.

9. Display it in the existing Step 2.5 UI.

10. Show evidence/citations supporting material conclusions.

======================================================================
CURRENT VERIFIED BASELINE
======================================================================

Do NOT re-investigate these findings.

They are accepted.

----------------------------------------------------------------------
A. REAL STEP 2.2 DATA WORKS
----------------------------------------------------------------------

Real Step 2.2 portfolio data has been queried.

The previous conclusion that company_name was unavailable was WRONG.

The real cache contains approximately:

84,051 rows

and approximately:

50,542 rows with real company_name values.

Therefore use the existing data.

Do NOT invent another portfolio source.

----------------------------------------------------------------------
B. VERIFIED REAL COMPANY
----------------------------------------------------------------------

A real portfolio example has already been proven:

CAGID:
0000014508

COMPANY:
APPLE INC

SEC CIK:
0000320193

STATUS:
CIK_CONFIRMED

This company genuinely exists in the real Step 2.2 data.

It was NOT substituted as a convenient example.

Use this company for the FIRST complete E2E test unless there is a concrete technical reason another genuine Step 2.2 company is better.

Reconfirm the mapping at execution time, but do NOT rebuild company-resolution architecture.

----------------------------------------------------------------------
C. COMPANY RESOLUTION
----------------------------------------------------------------------

Existing path:

Step 2.2
    ->
company_name / cagid_name / relevant existing name
    ->
resolve_company_identity()
    ->
existing CikResolver
    ->
verified CIK

is accepted.

DO NOT create a new entity-resolution framework.

DO NOT create manual mapping unless actually necessary.

DO NOT substitute unrelated companies.

----------------------------------------------------------------------
D. 409 ROOT CAUSE
----------------------------------------------------------------------

The previous HTTP 409 problem was caused by running the default legacy/orchestrated assessment engine.

The Stylus path works under:

RPR_STEP25_ASSESSMENT_ENGINE=stylus

and correctly uses its own blocker set.

Legacy SEC/web/H2M blockers must remain unchanged for legacy engines.

This problem is considered solved.

DO NOT revisit it unless an actual E2E run contradicts this.

----------------------------------------------------------------------
E. RUNNER INVOCATION
----------------------------------------------------------------------

Existing code investigation established that the working approved Runner pattern sends:

FULL PRESET DEFINITION INLINE

not a preset UUID.

Therefore:

DO NOT investigate UUID again.
DO NOT create a by-ID API.
DO NOT make preset ID a blocker.
DO NOT create preset management architecture.

Use the proven INLINE Runner mechanism.

----------------------------------------------------------------------
F. EXISTING STEP 2.5 CODE
----------------------------------------------------------------------

The following have already been implemented:

- stylus_engine.py
- stylus_runner_client.py
- company_identity.py
- stylus_evidence_adapter.py
- Step 2.5 /run Stylus branch
- Stylus-specific readiness
- Step25Assessment validation
- offline tests

PRESERVE THEM.

Modify them only when required for actual execution.

======================================================================
POC RULE
======================================================================

THIS IS A POC.

Production engineering quality is NOT required.

Another team may rebuild all of this later.

Therefore:

DO NOT spend time on:
- architecture elegance
- generalized frameworks
- scalability
- future-proofing
- enterprise abstractions
- generic preset management
- generalized entity masters
- unnecessary documentation
- unnecessary test infrastructure
- refactoring working code

BUT FEATURE QUALITY MUST BE VERY HIGH.

Do NOT compromise:

- real data
- accuracy
- SEC evidence
- web evidence
- company correctness
- analytical quality
- credit-risk interpretation
- citations
- traceability
- Step 2.3 context
- Step 2.4 context
- UI quality
- hallucination control

TEMPORARY CODE IS ACCEPTABLE.

TEMPORARY-QUALITY ANALYSIS IS NOT.

======================================================================
TASK 1 — FIND THE ACTUAL FIVE INPUTS WITHOUT GUESSING
======================================================================

Before asking the user for anything, exhaust everything already available locally.

Inspect:

- preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml
- preset_knowledge/RPR_STEP25_FIELD_DICTIONARY.md
- preset_knowledge/PRESET_PREVIEW_INPUTS.md
- preset_knowledge/STYLUS_SEC_WEB_REQUIRED_CAPTURE.md
- Step25Assessment.schema.json
- existing colleague app.py / app 1.py
- current Stylus/Runner client examples
- current RPR Step 2.5 prompt/config
- any saved screenshots/text/config already represented in repo files
- any existing Runner request examples

Determine whether the exact five case-sensitive Stylus inputs are ALREADY recoverable.

If YES:
USE THEM NOW.

Do not ask the user for another capture.

If NO:
the only permitted user intervention is ONE sanitized request-body capture from the Stylus UI.

Do not ask multiple questions.

Do not ask for preset UUID.

Do not ask for auth headers.

Do not ask for tokens.

======================================================================
TASK 2 — IF CAPTURE IS REQUIRED, MAKE IT ONE ACTION ONLY
======================================================================

If the real preset definition truly cannot be recovered locally, tell the user exactly:

Open SEC + WEB in Stylus
→ F12
→ Network
→ clear
→ run preset
→ select POST .../runner-service/chat
→ Payload / Request Body

Need ONLY:

- top-level model
- messageParts/messages structure
- preset object
- prompt
- toolConfig/tools
- knowledge
- inputs
- answers
- output/schema settings
- other non-secret body fields

DO NOT request:

- Authorization
- bearer tokens
- refresh tokens
- cookies
- credentials
- headers

After the sanitized payload is supplied:

DO NOT start another analysis cycle.

Immediately populate:

preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

with the ACTUAL captured configuration.

Set:

verified: true

Then continue execution immediately.

======================================================================
TASK 3 — EXACT FIVE-INPUT RPR MAPPING
======================================================================

Once the exact five names are known, map them to REAL RPR data.

For EACH of the five fields prove:

EXACT STYLUS INPUT NAME
→ source RPR object
→ actual value/structure sent
→ validation
→ missing-data behaviour

The source data must come from the actual RPR run.

The five inputs must collectively receive the information required by the preset.

Specifically ensure that the assessment receives:

A. REAL COMPANY CONTEXT

from Step 2.2.

B. REAL EVENT-DRIVEN CONTEXT

from Step 2.3.

C. REAL SECTOR-INHERENT CONTEXT

from Step 2.4.

D. any additional company/risk context required by the preset.

E. whatever final input is defined by the actual preset contract.

Do NOT invent five field purposes.

The actual Stylus preset determines the names/purposes.

But prove exactly where every value comes from.

======================================================================
TASK 4 — VERIFY STEP 2.3 AND STEP 2.4 ARE REAL
======================================================================

This is critical.

Do NOT merely pass company identity to Step 2.5.

For CAGID 0000014508 / APPLE INC:

retrieve/use the ACTUAL Step 2.3 result already generated by the RPR workflow.

retrieve/use the ACTUAL Step 2.4 result already generated by the RPR workflow.

If those upstream outputs are unavailable for the selected run:

run the existing Step 2.3 and 2.4 flow normally.

DO NOT fabricate them.

DO NOT use hard-coded factors.

DO NOT summarize generic Apple risks.

DO NOT reconstruct them independently if the actual upstream result can be generated.

Before sending to Stylus, output SANITIZED diagnostics showing:

STEP22_COMPANY = APPLE INC
STEP22_CAGID = 0000014508
STEP22_CIK = 0000320193

STEP23_FACTOR_COUNT = <actual>
STEP24_FACTOR_COUNT = <actual>

STYLUS_INPUT_1_SOURCE = ...
STYLUS_INPUT_2_SOURCE = ...
STYLUS_INPUT_3_SOURCE = ...
STYLUS_INPUT_4_SOURCE = ...
STYLUS_INPUT_5_SOURCE = ...

Do not print confidential underlying portfolio values unnecessarily.

======================================================================
TASK 5 — AUTHENTICATION: SOLVE USING EXISTING APPROVED MECHANISM
======================================================================

Do NOT simply stop because the current Claude child shell lacks:

GENAI_BEARER_TOKEN

or

GENAI_REFRESH_TOKEN.

First inspect the EXISTING approved runtime/auth setup.

Check, without exposing values:

- RUNTIME_ENV.ps1
- current backend launch scripts
- existing Runner client
- colleague app.py authentication
- refresh-token logic already implemented
- existing environment-loading mechanism
- existing `.runner_token` / `.runner_refresh_token` handling if applicable
- existing normal RPR execution environment

Report only:

SET / NOT_SET
AVAILABLE / UNAVAILABLE

Never print secrets.

Attempt to execute using the existing approved mechanism.

Do NOT implement a new auth architecture.

Do NOT ask the user to paste a token into Claude.

If the normal environment has to be launched differently, provide the exact safe launch command using the existing loader.

Only if the current shell truly cannot inherit/use the approved user session after exhausting existing mechanisms may you state:

BLOCKED_AUTH_CURRENT_SHELL

But do not confuse this with a Step 2.5 code failure.

======================================================================
TASK 6 — RUN THE REAL PRESET
======================================================================

Once preset configuration + approved auth are available:

RUN THE REAL CALL.

No mock.

No fixture response.

No fabricated success.

No fake SEC documents.

No fake web results.

Use:

APPLE INC
CAGID 0000014508
CIK 0000320193

plus its actual Step 2.3 and Step 2.4 context.

Invoke the actual Runner Service through:

stylus_runner_client.py

using the exact real inline preset.

Capture sanitized execution diagnostics:

RUNNER_REQUEST_SENT = YES
PRESET_VERIFIED = YES
COMPANY = APPLE INC
CIK = 0000320193
STEP23_INCLUDED = YES/NO
STEP24_INCLUDED = YES/NO
RUNNER_RESPONSE_RECEIVED = YES/NO

Do not expose secrets.

======================================================================
TASK 7 — VERIFY SEC + WEB ACTUALLY RETRIEVED DATA
======================================================================

Do NOT assume retrieval happened merely because the model produced text.

Prove it.

Inspect Runner SSE/tool events / response metadata.

For SEC evidence, verify where available:

- source/SEC
- registrant
- filing type
- accession number or filing identity
- filing date
- URL/source reference
- statement/fact retrieved

For web evidence verify:

- source/provider
- title
- URL
- publication date where available
- relevant retrieved statement

The final report must distinguish:

SEC_EVIDENCE_COUNT = X
WEB_EVIDENCE_COUNT = Y

If either tool was expected but returned zero, investigate the concrete cause.

Do NOT fabricate evidence to satisfy the count.

======================================================================
TASK 8 — CREDIT-RISK QUALITY
======================================================================

The final assessment must NOT be a generic company summary.

It must translate the retrieved evidence into credit implications.

Where relevant evaluate:

- company/event exposure
- sector transmission
- revenues
- margins
- profitability
- cash flow
- liquidity
- leverage
- debt service
- refinancing
- maturity profile
- ratings
- funding access
- covenants
- collateral
- counterparty risk
- wrong-way risk
- concentration
- severity
- direction
- time horizon
- mitigants
- contradictory evidence
- uncertainty

Do not force irrelevant categories.

Materiality matters.

======================================================================
TASK 9 — EVIDENCE QUALITY
======================================================================

STRICT RULES:

NO fabricated evidence.

NO fabricated URL.

NO fabricated SEC accession.

NO fabricated dates.

NO fabricated CIK.

NO unsupported numerical precision.

NO invented citations.

NO unsupported identity.

Distinguish as appropriate:

REPORTED
DERIVED
ANALYTICAL ASSESSMENT
NOT EVIDENCED

If unavailable:

Not evidenced in available sources.

If sources conflict:

show the conflict.

Do not silently choose one without explaining why.

======================================================================
TASK 10 — SCHEMA + UI
======================================================================

Validate the REAL output against:

Step25Assessment.schema.json

If validation fails:

fix only the concrete mapping/output problem.

Do NOT loosen the schema merely to accept bad output unless the schema itself is demonstrably inconsistent with the agreed Step 2.5 business output.

Then send the REAL assessment through the existing Step 2.5 frontend flow.

Verify visually/functionally:

- assessment renders
- company is correct
- major risk conclusions visible
- evidence visible
- materiality visible
- risk direction visible
- conflicts/gaps visible where relevant
- no raw JSON as final UX
- no stack trace/debug information
- no broken layout

Preserve the v31 visual intent.

Do NOT redesign the whole UI.

Fix only concrete Step 2.5 display defects.

======================================================================
ABSOLUTE NO-SUBSTITUTION RULE
======================================================================

For the real E2E test:

If Apple/0000014508 fails company resolution:

DO NOT silently choose another company.

Diagnose why.

If we explicitly decide to use another company, it MUST be another genuine Step 2.2 company and the report must identify the change.

At no point may the model/code silently assess a different issuer.

======================================================================
NO MORE PREMATURE STOPPING
======================================================================

DO NOT stop after:

"READY_FOR_PRESET_CAPTURE"

DO NOT stop after:

"PRESET_CONFIGURED"

DO NOT stop after:

"CIK_CONFIRMED"

DO NOT stop after:

"RUNNER_READY"

DO NOT stop after:

"SCHEMA_VALID"

DO NOT stop after:

"HTTP 200"

Continue through the full chain.

The only legitimate early stop is a hard external blocker that cannot be solved using the existing environment/resources.

If that occurs, provide:

BLOCKER:
<one precise blocker>

PROOF:
<exact sanitized evidence>

WHY CODE CANNOT SOLVE IT:
<one paragraph>

ONE USER ACTION REQUIRED:
<one exact action>

Do not provide a list of speculative blockers.

======================================================================
FINAL ACCEPTANCE TEST
======================================================================

I expect ONE end-to-end evidence table:

CHECK | RESULT | PROOF

Step 2.2 real company | PASS/FAIL | ...
CIK verified | PASS/FAIL | ...
Step 2.3 actual output used | PASS/FAIL | ...
Step 2.4 actual output used | PASS/FAIL | ...
Exact 5 Stylus inputs mapped | PASS/FAIL | ...
Real preset configured | PASS/FAIL | ...
Runner authenticated | PASS/FAIL | ...
Runner request executed | PASS/FAIL | ...
SEC evidence retrieved | PASS/FAIL | ...
Web evidence retrieved | PASS/FAIL | ...
Step25 schema valid | PASS/FAIL | ...
Credit assessment quality | PASS/PARTIAL/FAIL | ...
Evidence traceability | PASS/PARTIAL/FAIL | ...
Step 2.5 UI rendered | PASS/FAIL | ...

STEP 2.5 IS COMPLETE ONLY WHEN THE FULL TABLE IS PASS,
except analytical quality fields may require a targeted improvement cycle if PARTIAL.

======================================================================
QUALITY REVIEW
======================================================================

After the first genuine result, evaluate:

1. Company accuracy
2. SEC accuracy
3. Web evidence accuracy
4. Step 2.3 usage
5. Step 2.4 usage
6. Credit translation
7. Materiality
8. Counter-thesis
9. Evidence gaps
10. Hallucination
11. Traceability
12. UI readability
13. Analyst usefulness

PASS / PARTIAL / FAIL.

If PARTIAL/FAIL:

fix the actual problem.

Do NOT rebuild architecture.

======================================================================
START NOW
======================================================================

Proceed with execution.

First state in no more than 10 lines:

1. exact current blocker to live Step 2.5
2. whether exact five preset inputs are already recoverable locally
3. whether approved Runner auth is recoverable through existing project/runtime mechanisms
4. whether real Step 2.3 data for CAGID 0000014508 is available
5. whether real Step 2.4 data for the same case is available

Then immediately work through the blockers.

DO NOT stop to ask me architecture questions.

DO NOT create more planning documents.

DO NOT create more memory/status files unless required for execution.

DO NOT freeze anything until Step 2.5 genuinely works end-to-end.
