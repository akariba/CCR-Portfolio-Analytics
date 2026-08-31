STEP 2.5 — FINAL PRE-IMPLEMENTATION HOLD.

READ THIS ENTIRE INSTRUCTION BEFORE TAKING ANY ACTION.

DO NOT START ANOTHER INVESTIGATION CYCLE.
DO NOT REFACTOR.
DO NOT ADD ARCHITECTURE.
DO NOT MODIFY STEPS 1–2.4.
DO NOT INVESTIGATE PRESET-ID EXECUTION.
DO NOT BUILD AUTHENTICATION INFRASTRUCTURE.
DO NOT CREATE NEW HELPER FILES.

We have now reduced Step 2.5 to a small set of concrete request-contract differences.

This is a PURE POC from an engineering/lifecycle perspective.

However, POC DOES NOT MEAN LOW QUALITY.

The final Step 2.5 result must remain analytically strong enough for a real CCR / credit-risk analyst to take seriously.

============================================================
ACCEPTED BUSINESS PROOF
============================================================

The SEC + WEB Stylus preset has already been executed successfully manually.

The successful test used:

Company:
APPLE INC

Step 2.2 CAGID:
0000014508

SEC CIK:
0000320193

The preset successfully consumed:

- real company context
- the RPR scenario
- six Step 2.3 event-driven factors
- five Step 2.4 sector-inherent factors

It successfully used:

- SEC Filing tooling
- web research
- counter-thesis research

and generated:

AAPL_Step25_Assessment.json

The result contained:

- identity validation
- factor-by-factor assessments
- risk direction
- confidence
- evidence references
- disconfirming evidence
- conflicts
- evidence gaps
- freshness warnings
- analyst questions
- reasoning summary
- workflow action

Therefore:

PRESET_BUSINESS_LOGIC_WORKS = TRUE
SEC_RETRIEVAL_WORKS = TRUE
WEB_RETRIEVAL_WORKS = TRUE
STEP25_SCHEMA_GENERATION_WORKS = TRUE

Do not redesign any of these.

============================================================
KNOWN LIVE RUNNER CONTRACT
============================================================

Successful browser execution:

POST
https://workspaces.genai.citi.net/runner-service/chat

Response:
HTTP 200
Content-Type: text/event-stream

Observed live outer request body:

mode = 1

application = "jukebox"

invoker = current logged-in SOEID

message.role = 0

message.parts = one initial preset-bearing part

initial part:
    data = ""
    data_type = 3
    mime_type = ""
    name = ""
    preset = <full inline preset>

model = "claude-sonnet-5"

request_id = UUID

temperature = 1

tool_config = {
    "integrations": [
        "lookup_documentation",
        "sec_filing"
    ],
    "auto_tool_mode": false
}

SSE:
Accept: text/event-stream

This is the source-of-truth execution contract.

============================================================
CURRENT RPR COMPARISON — ACCEPT AS PROVEN
============================================================

Current backend/step25/stylus_runner_client.py already matches the live request on:

- mode = 1
- application = "jukebox"
- invoker/current SOEID structure
- message.role = 0
- one initial preset-bearing message part
- part.data = ""
- part.data_type = 3
- part.mime_type = ""
- part.name = ""
- request_id UUID generation
- SSE Accept = text/event-stream
- inline preset mechanism
- flat answers dictionary using the exact 5 input names

DO NOT rewrite these working portions.

============================================================
CONCRETE DIFFERENCES ALREADY PROVEN
============================================================

DIFFERENCE 1 — MODEL

LIVE:

"claude-sonnet-5"

CURRENT RPR:

currently resolves to approximately:

"claude-sonnet-4-6"

This must eventually be changed to:

"claude-sonnet-5"

unless the final captured preset explicitly proves otherwise.

------------------------------------------------------------
DIFFERENCE 2 — TEMPERATURE

LIVE:

temperature = 1

CURRENT RPR:

temperature = 0

For exact POC parity, final implementation should use:

temperature = 1

------------------------------------------------------------
DIFFERENCE 3 — OUTER TOOL CONFIG

LIVE:

{
  "integrations": [
    "lookup_documentation",
    "sec_filing"
  ],
  "auto_tool_mode": false
}

CURRENT RPR:

{
  "integrations": [],
  "auto_tool_mode": false
}

THIS IS A MATERIAL CAPABILITY DIFFERENCE.

The live assessment visibly executed SEC Filing calls.

Therefore the final RPR implementation must reproduce the proven live integration list:

[
    "lookup_documentation",
    "sec_filing"
]

Do not replace this with the unrelated Swagger internal-domain ToolConfig model.

------------------------------------------------------------
DIFFERENCE 4 — PRESET PROMPT

LIVE:

real RPR Step 2.5 SEC + WEB credit-assessment prompt

CURRENT YAML:

PENDING_CAPTURE

The real prompt text supplied/captured by the user is the business source of truth.

It must replace the placeholder exactly enough to preserve its full analytical behaviour.

DO NOT shorten or simplify it.

------------------------------------------------------------
DIFFERENCE 5 — INNER PRESET TOOL CONFIG

CURRENT STATUS:

UNKNOWN.

This refers specifically to:

message.parts[0].preset.toolConfig

or its exact actual spelling.

Do NOT confuse it with OUTER:

request.tool_config

These are separate objects.

Do NOT map Swagger:

runner-service_internal_domain_models.ToolConfig

blindly.

------------------------------------------------------------
DIFFERENCE 6 — PRESET KNOWLEDGE

CURRENT STATUS:

UNKNOWN.

This refers specifically to:

message.parts[0].preset.knowledge

or exact actual spelling.

The user is performing one FINAL DevTools capture to expand:

message
  -> parts
     -> [0]
        -> preset
           -> toolConfig
           -> knowledge

Those exact captured JSON values will be provided next.

============================================================
INPUT CONTRACT — ACCEPTED
============================================================

The preset has exactly five inputs:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

Exact case matters.

Runtime answers use a flat dictionary:

preset["answers"] = {
    "<exact input name>": <value>,
    ...
}

The current RPR Stylus client already follows this pattern.

Do NOT create another answers adapter.

============================================================
COMPANY INTEGRITY
============================================================

Use the genuine Step 2.2 company.

For the validated POC path:

CAGID 0000014508
    ->
APPLE INC
    ->
CIK 0000320193
    ->
CIK_CONFIRMED

Do not substitute another company.

Do not infer identity from factor text.

Existing company/CikResolver behaviour should remain unchanged.

============================================================
STEP 2.3 AND STEP 2.4 REQUIREMENT
============================================================

The final Step 2.5 execution MUST consume the actual upstream factors registered by the existing RPR flow.

For the proven Apple test:

Step 2.3:
6 event-driven factors

Step 2.4:
5 sector-inherent factors

Do not manually rewrite those factors inside Step 2.5.

Do not introduce synthetic test factors when executing the final E2E.

============================================================
AUTHENTICATION
============================================================

Authentication is a separate operational issue.

Browser Stylus already proves:

Runner reachable = YES
Runner authenticated from browser = YES
Preset execution = YES

Claude shell may not currently possess a Runner bearer/refresh token.

Do NOT:

- ask the user to paste a bearer token into chat
- print tokens
- persist browser Authorization headers
- copy cookies
- design OAuth
- create dummy credentials
- invent successful responses

Do not mix authentication with request serialization.

============================================================
ONE FINAL PIECE OF INFORMATION IS COMING
============================================================

The user will provide the exact expanded live values for:

message.parts[0].preset.toolConfig

and

message.parts[0].preset.knowledge

When supplied:

USE THEM AS GROUND TRUTH.

Do not reinterpret them.

Do not normalize field names.

Do not replace them with Swagger internal models.

Do not generalize them.

============================================================
WHAT YOU SHOULD DO RIGHT NOW
============================================================

NO CODE CHANGES YET.

Before the capture arrives:

1. Re-open:

backend/step25/stylus_runner_client.py

and:

preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

2. Identify the EXACT existing lines/fields that will need modification for:

- model
- temperature
- outer tool_config.integrations
- preset prompt
- inner preset toolConfig
- preset knowledge
- verified flag

3. Confirm the existing five-answer mapping will NOT need modification.

4. Confirm Steps 1–2.4 require NO modification.

5. Confirm existing company identity resolution requires NO modification.

6. Confirm the existing inline-preset architecture remains correct.

7. Do NOT edit anything.

============================================================
AFTER THE TWO CAPTURED OBJECTS ARRIVE
============================================================

When the user provides preset.toolConfig and preset.knowledge:

DO NOT ask another architectural question.

Apply the smallest functional implementation.

Expected maximum functional scope:

FILE 1:
backend/step25/stylus_runner_client.py

Only if necessary for:

- model parity
- temperature parity
- outer tool_config parity

FILE 2:
preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

For:

- actual model
- full real prompt
- exact five inputs
- exact inner toolConfig
- exact knowledge
- verified=true

If captured shape proves a tiny serialization change is necessary in stylus_runner_client.py, make that change.

Otherwise do not alter serialization.

============================================================
IMMEDIATELY AFTER IMPLEMENTATION
============================================================

Run offline/unit tests first.

If they pass, run Step 2.5 preflight.

Then, once approved Runner authentication is available, perform the REAL E2E using the already-proven Apple context:

Step 2.2
CAGID 0000014508
APPLE INC
CIK 0000320193

    ->

registered Step 2.3
6 confirmed factors

    ->

registered Step 2.4
5 confirmed factors

    ->

POST /api/v1/rpr/step25/run

    ->

Stylus engine

    ->

POST /runner-service/chat

    ->

SEC + WEB tools

    ->

real Step25Assessment

    ->

existing Step 2.5 UI

============================================================
RESULT QUALITY GATE
============================================================

HTTP 200 IS NOT SUCCESS BY ITSELF.

JSON validation IS NOT SUCCESS BY ITSELF.

Step 2.5 succeeds only if the result demonstrates meaningful use of:

- real Apple identity
- actual selected RPR scenario
- actual Step 2.3 factors
- actual Step 2.4 factors
- SEC evidence
- relevant web evidence
- counter-thesis / disconfirming evidence
- credit-risk implications
- risk direction
- confidence/materiality
- evidence gaps
- conflicts where present
- analyst-relevant conclusions

Compare the integrated result qualitatively with the already-successful manual Stylus assessment.

If the integrated assessment is materially weaker, diagnose the concrete missing input/tool/config difference.

Do NOT solve quality problems by creating new architecture.

============================================================
8-K TOOL FAILURE POLICY
============================================================

The manual Stylus test had one SEC 8-K tool failure:

onSECFilingToolCall:
Unmarshal results: unexpected end of JSON input

Other SEC calls succeeded and the overall assessment completed.

Therefore:

- do not make one failed filing-tool call fatal
- retain successful SEC evidence
- retain web evidence
- disclose the evidence gap
- allow the assessment to finish when sufficient evidence remains

Do not fake the missing 8-K.

============================================================
SSE / EVIDENCE PARSING
============================================================

Current SSE parsing has an imperfect tool-event citation probe.

Do NOT expand this into another framework now.

Keep the existing fallback unless the REAL integrated run proves it loses material assessment content or provenance.

For this POC:

accurate final assessment + defensible traceability

is the objective.

Not perfect enterprise event normalization.

============================================================
FREEZE RULE
============================================================

After the final two preset objects are supplied:

NO NEW ARCHITECTURE.
NO NEW ENTITY FRAMEWORK.
NO PRESET-ID SYSTEM.
NO ARTIFACT FRAMEWORK.
NO AUTH FRAMEWORK.
NO STEP 1–2.4 CHANGES.
NO CLEANUP.
NO REFACTORING FOR STYLE.
NO GENERALIZATION.

ONLY FIX WHAT IS NECESSARY TO MAKE STEP 2.5 WORK.

============================================================
REPORT NOW
============================================================

Do not modify code.

Return ONLY:

1. READY_FOR_FINAL_TWO_FIELDS:
YES / NO

2. FILES_EXPECTED_TO_CHANGE:
exact paths

3. ALREADY_PROVEN_CHANGES:
- model
- temperature
- outer integrations
- prompt

4. STILL_WAITING_FOR:
- preset.toolConfig
- preset.knowledge

5. FIVE_INPUT_MAPPING_CHANGE_REQUIRED:
YES / NO

6. STEPS_1_TO_2_4_CHANGE_REQUIRED:
YES / NO

7. COMPANY_RESOLUTION_CHANGE_REQUIRED:
YES / NO

8. ONE SENTENCE:
what you will execute immediately when the two captured objects are supplied.

Then STOP.
