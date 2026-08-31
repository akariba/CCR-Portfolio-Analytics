EXECUTE NOW — FINAL STEP 2.5 STYLUS CONTRACT CAPTURE IS COMPLETE.

READ THIS ENTIRE INSTRUCTION BEFORE MODIFYING ANYTHING.

This is no longer an investigation task.

We have now captured the missing live Stylus preset contract directly from
the successful manual SEC + WEB execution.

The objective is now:

MAKE THE EXISTING RPR STEP 2.5 STYLUS PATH REPRODUCE THE PROVEN-WORKING
STYLUS REQUEST WITH THE MINIMUM POSSIBLE CODE CHANGE.

============================================================
NON-NEGOTIABLE FREEZE RULE
============================================================

DO NOT:

- start another architecture cycle
- refactor Step 2.5 generally
- redesign Steps 1–2.4
- change Step 2.2 portfolio selection
- change Step 2.3 generation
- change Step 2.4 generation
- redesign company resolution
- introduce a new entity master
- introduce a preset-ID invocation architecture
- build a knowledge management framework
- build a file-upload framework
- build an auth framework
- create generalized adapters
- create unnecessary helper files
- clean up unrelated code
- rewrite working code for style
- weaken analytical quality because this is a POC

POC simplification applies to ENGINEERING ARCHITECTURE ONLY.

It does NOT mean simplification of:

- evidence quality
- credit analysis quality
- company identity integrity
- SEC evidence
- web evidence
- factor assessment
- citations/provenance
- validation
- final user-facing result

The Step 2.5 result must be sufficiently strong that an experienced
credit-risk analyst can evaluate it seriously.

============================================================
CURRENT BUSINESS FLOW — PRESERVE
============================================================

The desired and accepted flow is:

REAL Step 2.2 portfolio company
        ↓
real CAGID/company identity
        ↓
existing CikResolver
        ↓
confirmed SEC registrant/CIK
        ↓
confirmed Step 2.3 event-driven factors
        ↓
confirmed Step 2.4 sector-inherent factors
        ↓
existing Step 2.5 /run
        ↓
Stylus Runner
        ↓
FULL SEC + WEB PRESET INLINE
        ↓
SEC Filing + web search
        ↓
evidence-backed Step25Assessment
        ↓
existing Step 2.5 UI

Do not alter this flow.

============================================================
PROVEN COMPANY FOR THE POC
============================================================

The current genuine demo path already proved:

Step 2.2 CAGID:
0000014508

Company:
APPLE INC

SEC CIK:
0000320193

Status:
CIK_CONFIRMED

This is a genuine Step 2.2 portfolio record.

Do not substitute another unrelated company.

Existing company-resolution logic is accepted and should remain unchanged.

============================================================
PROVEN MANUAL STYLUS RESULT
============================================================

The SEC + WEB preset has already been manually executed successfully in
Stylus with Apple.

The successful manual execution demonstrated:

- Apple company identity was accepted
- SEC Filing was invoked
- web/internet searches were invoked
- Step 2.3 factors were consumed
- Step 2.4 factors were consumed
- company-specific credit assessment was produced
- AAPL_Step25_Assessment.json was produced
- Apple CIK 0000320193 was confirmed
- factor-by-factor assessment was produced
- evidence IDs were produced
- supporting evidence was produced
- disconfirming evidence was produced
- conflicts were represented
- evidence gaps were represented
- analyst questions were represented
- workflow action was produced

Therefore:

DO NOT redesign the preset.

DO NOT split SEC and WEB into separate presets.

The combined SEC + WEB concept is now proven manually.

The task is only to reproduce this successful invocation through RPR.

============================================================
LIVE RUNNER ENDPOINT
============================================================

Successful browser execution used:

POST
https://workspaces.genai.citi.net/runner-service/chat

Response:
HTTP 200
Content-Type:
text/event-stream

RPR must continue using the existing Runner integration mechanism.

Do not invent another service.

============================================================
PROVEN OUTER REQUEST CONTRACT
============================================================

The successful request contains the same fundamental structure already used
by the current RPR Runner client:

{
    "mode": 1,
    "application": "jukebox",
    "invoker": <current user's SOEID>,
    "message": {
        "parts": [
            {
                "data": "",
                "data_type": 3,
                "mime_type": "",
                "name": "",
                "preset": <FULL INLINE PRESET>
            }
        ],
        "role": 0
    },
    "model": "claude-sonnet-5",
    "request_id": <uuid>,
    "temperature": 1,
    "tool_config": {
        "integrations": [
            "lookup_documentation",
            "sec_filing"
        ],
        "auto_tool_mode": false
    }
}

IMPORTANT:

The preset is INLINE.

Do NOT call it by preset UUID.

Do NOT implement preset-ID retrieval.

request_id should continue to be generated in the existing appropriate
manner.

============================================================
MODEL
============================================================

The live successful request used:

"model": "claude-sonnet-5"

Use this exact model value for this preset invocation.

Do not silently fall back to claude-sonnet-4-6.

If the YAML currently contains PENDING_CAPTURE or another stale model,
replace it with:

claude-sonnet-5

============================================================
TEMPERATURE
============================================================

The live successful request used:

"temperature": 1

Current RPR was observed using:

"temperature": 0

Change ONLY the Stylus Runner POC request so that it reproduces the
successful value:

"temperature": 1

Do not modify unrelated LLM/model settings elsewhere in RPR.

============================================================
OUTER RUNNER TOOL_CONFIG
============================================================

The successful browser request used:

"tool_config": {
    "integrations": [
        "lookup_documentation",
        "sec_filing"
    ],
    "auto_tool_mode": false
}

The previous RPR implementation had:

"integrations": []

That must be corrected for the Stylus Step 2.5 POC path.

Use exactly:

[
    "lookup_documentation",
    "sec_filing"
]

Do not globally change tool settings for Steps 1–2.4.

============================================================
VERY IMPORTANT — TWO DIFFERENT TOOL CONFIGURATION LAYERS
============================================================

Do NOT confuse:

OUTER request:
tool_config

with:

INNER inline preset:
toolConfig

They are different objects in the successful request.

OUTER:

"tool_config": {
    "integrations": [
        "lookup_documentation",
        "sec_filing"
    ],
    "auto_tool_mode": false
}

INNER PRESET:

"toolConfig": {
    "auto_tool_mode": false,
    "google_search_enabled": true,
    "google_url_context_enabled": false,
    "integrations": null,
    "mock_llm": false
}

Preserve both exactly.

Do NOT merge them.

Do NOT transform inner integrations:null into the outer integration list.

============================================================
REQUIRED INTEGRATIONS INSIDE PRESET
============================================================

The live preset separately contains:

"requiredIntegrations": [
    "sec_filing"
]

Preserve this exact field/value in the inline preset definition.

============================================================
EXACT FIVE INPUT DEFINITIONS — NOW CAPTURED
============================================================

This is the final previously-missing contract information.

These values were read directly from:

message.parts[0].preset.inputs

inside the successful browser POST /runner-service/chat Request Payload.

THESE ARE GROUND TRUTH.

INPUT 0
-------

name:
companycontextjson

label:
CompanyContextJSON

type:
text

required:
true

helperText:
contains link: {}

INPUT 1
-------

name:
EventDrivenF

label:
EventDrivenFactorsJSON

type:
text

required:
true

helperText:
contains link: {}

INPUT 2
-------

name:
SectorInhere

label:
SectorInherentFactorsJSON

type:
text

required:
true

helperText:
contains link: {}

INPUT 3
-------

name:
AssessmentAS

label:
AssessmentASOFDATE

type:
text

required:
true

helperText:
contains link: {}

INPUT 4
-------

name:
EvidenceWind

label:
EvidenceWindowMonths

type:
text

required:
false

helperText:
contains link: {}

============================================================
CRITICAL INPUT-NAME RULE
============================================================

The Runner's preset.answers dictionary is keyed by the exact preset INPUT
"name" values.

Therefore the exact keys are:

companycontextjson
EventDrivenF
SectorInhere
AssessmentAS
EvidenceWind

CASE IS SIGNIFICANT.

DO NOT use the labels as keys.

Specifically DO NOT use:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

for preset.answers unless they occur somewhere separately for display.

Those are LABELS.

The actual serialized input names are the shorter values above.

Do NOT 'correct' the spelling.

Do NOT expand:

EventDrivenF
→ EventDrivenFactorsJSON

Do NOT expand:

SectorInhere
→ SectorInherentFactorsJSON

Do NOT expand:

AssessmentAS
→ AssessmentASOFDATE

Do NOT expand:

EvidenceWind
→ EvidenceWindowMonths

The shortened names are what the successful Stylus request actually sends.

============================================================
REQUIRED RPR → PRESET ANSWER MAPPING
============================================================

The current Step 2.5 adapter should populate the existing flat
preset["answers"] dictionary approximately as follows:

preset["answers"]["companycontextjson"]
    = serialized real Step 2.2/company assessment context

preset["answers"]["EventDrivenF"]
    = serialized confirmed Step 2.3 event-driven factors

preset["answers"]["SectorInhere"]
    = serialized confirmed Step 2.4 sector-inherent factors

preset["answers"]["AssessmentAS"]
    = assessment as-of date

preset["answers"]["EvidenceWind"]
    = evidence-window-month value when supplied

For the current POC test, EvidenceWind may use the already-agreed evidence
window such as 12 if that is what the existing Step 2.5 context specifies.

Do NOT fabricate missing Step 2.3 or Step 2.4 content.

Pass the real registered RPR values.

============================================================
PRESET KNOWLEDGE — LIVE CAPTURE
============================================================

The successful preset contains two knowledge objects.

Preserve them as the captured preset definition.

Knowledge item 1:

{
    "file": {
        "name": "RPR_STEP25_FIELD_DICTIONARY.md",
        "value": "01a0584e-ca8a-7d0e-a77c-08578da91c47/input_files/RPR_STEP25_FIELD_DICTIONARY.md"
    }
}

Knowledge item 2:

{
    "file": {
        "name": "Step25Assessment.schema.txt",
        "value": "01a0584e-ca8a-7d0e-a77c-08578da91c47/input_files/Step25Assessment.schema.txt"
    }
}

Use the captured values verbatim for the first POC execution.

DO NOT build a new knowledge upload/synchronization subsystem.

If a REAL Runner execution later explicitly says these knowledge references
cannot be resolved outside the originating workflow, stop on that concrete
error and apply only the smallest necessary POC fix.

Do not anticipate that failure with architecture.

============================================================
INNER PRESET TOOLCONFIG — LIVE CAPTURE
============================================================

Use exactly:

{
    "auto_tool_mode": false,
    "google_search_enabled": true,
    "google_url_context_enabled": false,
    "integrations": null,
    "mock_llm": false
}

This is preset.toolConfig.

Again:

THIS IS NOT THE SAME AS OUTER request.tool_config.

============================================================
PROMPT
============================================================

The complete live Step 2.5 preset prompt has already been captured/pasted
during the prior investigation.

Use that COMPLETE text VERBATIM.

Do not summarize it.

Do not shorten it.

Do not paraphrase it.

Do not produce a new generic credit-analysis prompt.

Do not replace it with a simplified POC prompt.

Its purpose is to produce a serious name-level credit assessment using:

- verified company identity
- Step 2.3 event-driven factors
- Step 2.4 sector-inherent factors
- SEC evidence
- web evidence
- supporting evidence
- disconfirming evidence
- direction
- materiality
- confidence
- conflicts
- evidence gaps
- analyst questions
- workflow recommendation/action

If you cannot locate the exact full prompt already captured in the current
conversation/repo material, STOP and report:

EXACT_PROMPT_TEXT_NOT_FOUND

Do NOT invent a replacement.

============================================================
PRESET FILE
============================================================

Update the existing:

preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

Do not create a new preset configuration file unless the existing file
physically cannot represent an observed field.

Populate the current preset definition with the captured values.

The YAML should represent the proven preset faithfully, including as
applicable:

- name
- model
- full prompt
- inputs
- answers/input keys
- toolConfig
- requiredIntegrations
- knowledge
- any already-existing relevant preset properties
- verified=true

Do not arbitrarily copy every irrelevant metadata field from the Stylus UI
if the Runner doesn't need it.

But do not omit execution-bearing fields proven above.

============================================================
EXPECTED CODE FILE
============================================================

The only expected Python change is approximately:

backend/step25/stylus_runner_client.py

and ONLY for request-contract differences that cannot live in the YAML,
principally:

1. temperature:
0 → 1

2. outer request tool_config integrations:
[] →
["lookup_documentation", "sec_filing"]

Preserve:

- mode=1
- application="jukebox"
- message.role=0
- preset-bearing first message part
- data_type=3
- SSE request handling
- current request-id generation
- existing authentication loading
- existing final-answer extraction/fallback unless a real test proves it
  inadequate

Do not rewrite this client.

============================================================
STEP 2.2 / COMPANY INTEGRITY
============================================================

No change required.

Preserve the currently proven path:

CAGID
→ cagid_name / authoritative gfcid_name
→ existing CikResolver
→ legal company
→ confirmed SEC registrant

For current POC:

0000014508
→ APPLE INC
→ CIK 0000320193
→ CIK_CONFIRMED

No company inferred from scenario wording.

No Salesforce/Apple/Microsoft substitution.

If a different portfolio company cannot resolve:

NO_COMPANY_IDENTITY_AVAILABLE

or:

NO_CONFIRMED_SEC_REGISTRANT

as already designed.

============================================================
STEP 2.3
============================================================

NO CODE CHANGE.

Use the actual confirmed Step 2.3 factors already registered in Step 2.5
context.

Do not regenerate them inside Step 2.5.

Do not rewrite them.

Do not use placeholder factors.

============================================================
STEP 2.4
============================================================

NO CODE CHANGE.

Use the actual confirmed Step 2.4 factors already registered in Step 2.5
context.

Do not regenerate them inside Step 2.5.

Do not rewrite them.

Do not alter the Step 2.4 UI or schema.

============================================================
STEP 2.5 QUALITY STANDARD
============================================================

A successful HTTP 200 is NOT sufficient.

A successful JSON parse is NOT sufficient.

Step 2.5 succeeds only when the result genuinely demonstrates:

1. correct Step 2.2 company identity
2. confirmed CIK where SEC assessment is applicable
3. use of Step 2.3 factors
4. use of Step 2.4 factors
5. actual SEC evidence
6. actual web evidence
7. factor-by-factor assessment
8. risk direction
9. materiality/credit implication
10. evidence IDs/provenance
11. supporting evidence
12. disconfirming/contrary evidence where available
13. conflicts where evidence disagrees
14. explicit evidence gaps
15. freshness warnings where necessary
16. analyst questions where uncertainty remains
17. a useful overall credit-risk conclusion
18. schema-compatible Step25Assessment
19. successful rendering through the existing Step 2.5 UI

Do not fabricate facts to obtain schema completeness.

============================================================
SEC TOOL FAILURE OBSERVED DURING MANUAL TEST
============================================================

During the successful manual Stylus test, some SEC calls succeeded and one
8-K call surfaced:

onSECFilingToolCall:
Unmarshal results: unexpected end of JSON input

Do NOT treat this as evidence that the overall preset is broken.

Other SEC calls successfully returned actual filing data and the overall
assessment completed.

Do NOT build a retry framework now.

Do NOT redesign SEC retrieval now.

If the same isolated tool failure occurs during RPR but sufficient genuine
SEC evidence is still returned and the assessment remains valid, surface
the evidence limitation appropriately.

Only investigate further if the final RPR assessment genuinely cannot
complete or lacks sufficient SEC evidence.

============================================================
EVIDENCE / SSE
============================================================

Keep the current lightweight evidence handling.

The previous investigation identified that direct SSE parsing may not
recognize every Stylus-specific tool-call event name.

Do NOT build a generalized SSE event framework pre-emptively.

The current final-response fallback to the model's evidence IDs/citations is
acceptable for this POC provided:

- evidence is genuine
- no fabricated IDs are introduced
- no fabricated URLs are introduced
- SEC statements are traceable
- web statements are traceable as far as the Runner result supplies them

If the real end-to-end run proves that evidence is being lost materially,
fix that concrete defect only.

============================================================
AUTHENTICATION
============================================================

Do NOT ask the user to paste browser bearer tokens into Claude chat.

Do NOT print credentials.

Do NOT commit credentials.

Do NOT persist browser tokens into source control.

Use the existing approved Runner auth loader/mechanism.

The current Runner client_id fallback already established during the prior
investigation should be preserved unless a concrete error proves otherwise.

If no current Runner credential is available in this shell:

BLOCKED_AUTH

is acceptable.

But the preset/config implementation and offline tests should still be
completed.

============================================================
IMPLEMENTATION SEQUENCE — DO THIS NOW
============================================================

1. Inspect current:
   preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

2. Inspect current:
   backend/step25/stylus_runner_client.py

3. Compare current implementation against THIS FINAL CAPTURE.

4. Modify ONLY what is necessary.

5. Populate the exact five preset inputs:

   companycontextjson
   EventDrivenF
   SectorInhere
   AssessmentAS
   EvidenceWind

6. Ensure their corresponding labels/types/required flags agree with the
   live capture.

7. Populate the captured model:
   claude-sonnet-5

8. Populate the previously captured full prompt verbatim.

9. Populate inner preset.toolConfig exactly.

10. Populate preset.requiredIntegrations exactly.

11. Populate the two knowledge entries exactly.

12. Set outer request temperature to 1.

13. Set outer request integrations to:
    lookup_documentation
    sec_filing

14. Set preset verified=true only after the real captured values have been
    populated and the local preset validation accepts them.

15. Run the existing Step 2.5 offline/unit tests.

16. Run any existing preset/config validation.

17. Restart ONLY if required by current application behaviour.

18. Run Step 2.5 preflight.

19. Confirm the only remaining blocker, if any.

20. If Runner authentication is available, execute the REAL RPR Step 2.5
    path using the registered Apple context:

    real Step 2.2 company
    → confirmed Step 2.3
    → confirmed Step 2.4
    → POST /step25/run
    → real Runner
    → real SEC/web assessment

21. Do not manufacture success if authentication is unavailable.

============================================================
E2E ACCEPTANCE TEST
============================================================

For a successful real execution, prove all of the following:

COMPANY
-------
company_id = 0000014508
company = APPLE INC
CIK = 0000320193
SEC identity = confirmed

UPSTREAM
--------
Step 2.3 confirmed and actually supplied
Step 2.4 confirmed and actually supplied

RUNNER
------
real POST /runner-service/chat attempted
full preset sent inline
model = claude-sonnet-5
temperature = 1

OUTER integrations include:
lookup_documentation
sec_filing

PRESET
------
input key companycontextjson populated
input key EventDrivenF populated
input key SectorInhere populated
input key AssessmentAS populated
input key EvidenceWind populated if applicable

INNER:
google_search_enabled = true
requiredIntegrations includes sec_filing
knowledge includes both captured files

RESULT
------
HTTP success if auth available
SSE response consumed
final Step25Assessment parsed
company identity still Apple
Step 2.3 factors assessed
Step 2.4 factors assessed
SEC evidence present
web evidence present
credit-risk conclusion present
evidence gaps preserved rather than fabricated
existing UI can consume result

============================================================
DO NOT DECLARE SUCCESS TOO EARLY
============================================================

Do NOT say "Step 2.5 works" merely because:

- YAML loads
- unit tests pass
- preflight passes
- HTTP 200 occurs
- JSON parses

There are three separate statuses:

A. CONTRACT_CONFIGURED
B. RUNNER_EXECUTION_WORKING
C. STEP25_ANALYTICAL_RESULT_VALIDATED

Report them separately.

If auth is absent, likely status may be:

CONTRACT_CONFIGURED = YES
RUNNER_EXECUTION_WORKING = BLOCKED_AUTH
STEP25_ANALYTICAL_RESULT_VALIDATED = NOT_RUN_VIA_RPR

That is acceptable and truthful.

If authentication exists and the real run succeeds, inspect the resulting
assessment before marking C as YES.

============================================================
FINAL REPORT FORMAT
============================================================

After doing the work, report ONLY:

1. FILES_CHANGED
   exact files and line/range summary

2. FINAL_INPUT_KEYS
   show all five exact keys

3. REQUEST_CONTRACT
   model
   temperature
   outer integrations
   inner toolConfig
   requiredIntegrations
   knowledge count

4. TESTS
   exact tests executed and pass/fail

5. PREFLIGHT
   exact remaining blockers

6. REAL_RPR_STEP25_RUN
   ATTEMPTED / NOT_ATTEMPTED
   HTTP/result
   exact failure layer if failed

7. DATA_FLOW_PROOF
   Step 2.2 company/CAGID/CIK
   Step 2.3 factor count
   Step 2.4 factor count
   exact five input keys populated

8. ANALYTICAL_RESULT
   only if a real Runner run completed:
   SEC evidence present?
   web evidence present?
   factor assessments present?
   conflicts/gaps preserved?
   valid Step25Assessment?
   useful credit conclusion?

9. STATUS

   CONTRACT_CONFIGURED =
   RUNNER_EXECUTION_WORKING =
   STEP25_ANALYTICAL_RESULT_VALIDATED =

10. REMAINING_BLOCKER
    exact blocker, or NONE

============================================================
FINAL FREEZE
============================================================

After this implementation/test:

NO NEW ARCHITECTURE.
NO NEW PRESET FRAMEWORK.
NO ENTITY FRAMEWORK.
NO AUTH FRAMEWORK.
NO STEP 1–2.4 CHANGES.
NO CLEANUP.
NO REFACTORING.

Only fix a CONCRETE defect exposed by the real Step 2.5 execution.

EXECUTE NOW.
