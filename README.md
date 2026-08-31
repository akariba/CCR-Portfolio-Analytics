FINAL CONTRACT-RESOLUTION PASS FOR STEP 2.5.

READ THIS ENTIRELY BEFORE ACTING.

DO NOT MODIFY CODE YET.

DO NOT START ANOTHER ARCHITECTURE CYCLE.

THIS IS THE LAST INVESTIGATION PASS BEFORE THE MINIMAL FUNCTIONAL STEP 2.5 FIX.

============================================================
BUSINESS OBJECTIVE
============================================================

We need the existing RPR flow to execute:

REAL Step 2.2 company
    ->
REAL Step 2.3 factors
    ->
REAL Step 2.4 factors
    ->
existing SEC + WEB Stylus preset
    ->
high-quality Step25Assessment
    ->
existing Step 2.5 UI

This is a PURE POC.

Engineering implementation should remain as simple as possible.

ANALYTICAL QUALITY MUST REMAIN HIGH.

============================================================
WHAT IS ALREADY PROVEN — DO NOT RE-INVESTIGATE
============================================================

The SEC + WEB Stylus preset itself WORKS.

A direct live Stylus execution successfully produced:

AAPL_Step25_Assessment.json

for the genuine RPR company:

CAGID = 0000014508
Company = APPLE INC
CIK = 0000320193

The execution successfully used:

- company context
- scenario context
- six event-driven factors
- five sector-inherent factors
- SEC filings
- web research
- counter-thesis research
- final credit-risk synthesis

Observed SEC behavior:

FY2025 10-K = PASS
FY2026 10-Q = PASS
additional 10-Q = PASS

One 8-K retrieval failed with:

onSECFilingToolCall:
Unmarshal results: unexpected end of JSON input

but this DID NOT prevent final assessment generation.

The final result included meaningful:

- identity validation
- factor assessments
- risk direction
- confidence
- evidence references
- conflicts
- disconfirming evidence
- evidence gaps
- freshness warnings
- analyst questions
- workflow action

Therefore:

STYLUS_PRESET_WORKS = YES

Do NOT alter the business prompt/schema merely because integration is incomplete.

============================================================
SUCCESSFUL LIVE RUNNER REQUEST — SOURCE OF TRUTH
============================================================

Browser DevTools captured the actual successful request:

POST
https://workspaces.genai.citi.net/runner-service/chat

HTTP 200 OK

Content-Type:
text/event-stream

Duration:
approximately 13.1 minutes

Outer request payload visibly contained:

mode: 1

application: "jukebox"

invoker: <current logged-in user>

message: {
    parts: [
        {
            data: ...,
            data_type: 3,
            mime_type: ...,
            name: ...
        }
    ],
    role: 0
}

model: "claude-sonnet-5"

request_id: <UUID>

temperature: 1

tool_config: {
    integrations: [
        "lookup_documentation",
        "sec_filing"
    ],
    auto_tool_mode: false
}

Frontend call stack visibly included:

sendPresetInput

THIS LIVE REQUEST IS THE PRIMARY EXECUTION CONTRACT.

============================================================
SWAGGER FINDINGS — VERIFIED
============================================================

1. INTERNAL Input model

runner-service_internal_domain_models.Input

contains:

canReply        boolean
canSelectAll    boolean
default         value/object
label           string
maxFileSize     integer
maxFiles        integer
name            string
options         [string]
placeholder     string
required        boolean
type            string

The real Stylus preset UI contains these five inputs:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

Exact case must be preserved.

------------------------------------------------------------
2. INTERNAL Knowledge model
------------------------------------------------------------

runner-service_internal_domain_models.Knowledge

visibly exposes:

file

Inspect OpenAPI/source for exact type if necessary.

Do NOT guess.

------------------------------------------------------------
3. INTERNAL ToolConfig
------------------------------------------------------------

runner-service_internal_domain_models.ToolConfig

visibly contains:

google_search_enabled   boolean
mock_llm                boolean

IMPORTANT:

THIS IS NOT THE SAME SHAPE AS THE SUCCESSFUL LIVE /chat:

tool_config = {
    integrations: [
        "lookup_documentation",
        "sec_filing"
    ],
    auto_tool_mode: false
}

Therefore DO NOT map the internal ToolConfig model blindly into the live chat request.

------------------------------------------------------------
4. INTERNAL Preset model
------------------------------------------------------------

runner-service_internal_domain_models.Preset

contains approximately:

answers
id                  string
is_custom_preset    boolean
name                string
preset_creator_id   string
preset_creator_job_data models.LOBData
version_no          integer

preset_creator_job_data was expanded and is LOB/business metadata, including fields such as:

emt_members
function
level

It is NOT the executable prompt/model/tool/input configuration.

Therefore DO NOT assume GET /v1/presets/{id} necessarily returns the full executable inline preset.

------------------------------------------------------------
5. INTERNAL Data
------------------------------------------------------------

runner-service_internal_domain_models.Data

was manually expanded.

Verified visible fields:

key       string
type      string
value     object

------------------------------------------------------------
6. INTERNAL DataContainer
------------------------------------------------------------

runner-service_internal_domain_models.DataContainer

was manually expanded.

Visible fields include:

data              array[Data]
latestInstance    string
oauth             nested structure

Do not infer the exact oauth type from the screenshot; inspect OpenAPI if relevant.

CRITICAL:

The internal Data model:

key/type/value

DOES NOT MATCH the live /chat message part shape:

data/data_type/mime_type/name

Therefore:

DO NOT ASSUME
internal_domain_models.Data == POST /chat message.parts item.

============================================================
STOP EXPLORING GENERIC INTERNAL MODELS
============================================================

The manual Swagger exploration is finished.

Do NOT spend time on:

signals
spaces
remote agents
audience groups
experiments
feature config
generic workflow models

unless the exact POST /chat schema directly references one.

The only remaining contract question is:

HOW DOES sendPresetInput BUILD THE SUCCESSFUL message.parts OBJECT?

============================================================
TASK 1 — IDENTIFY THE EXACT POST /chat REQUEST DTO
============================================================

Find the exact route implementation/OpenAPI schema for:

POST /chat

Do NOT choose models based only on similar names.

Trace the route to the actual request structure it deserializes.

Return exact fields/types for:

mode
application
invoker
message
model
request_id
temperature
tool_config

Determine which are required.

============================================================
TASK 2 — IDENTIFY EXACT MESSAGE DTO
============================================================

Find the concrete type used for:

message

Then find the concrete type used for:

message.parts[]

The live request proves a part contains:

data
data_type
mime_type
name

Return the exact definitions.

We need:

message type =
...

parts item type =
...

role type =
...

data_type type =
...

============================================================
TASK 3 — RESOLVE ENUM VALUES
============================================================

From actual source/schema determine:

role = 0 means exactly:
...

data_type = 3 means exactly:
...

Do NOT infer these values semantically.

Find the enum/code.

============================================================
TASK 4 — TRACE sendPresetInput DIRECTLY
============================================================

This is the highest-priority task.

Trace the frontend function:

sendPresetInput

through:

sendPresetInput
   ->
request construction
   ->
message.parts
   ->
POST /runner-service/chat

Use any available:

- frontend source
- source maps
- colleague code
- Swagger/OpenAPI
- browser-generated request code
- compiled JS inspection

READ ONLY.

Do not modify frontend code.

Find exactly what is serialized into the `data` field.

============================================================
TASK 5 — ANSWER THE CENTRAL QUESTION
============================================================

Determine whether message.parts[0].data contains:

A. full preset object as JSON

B. preset + answers wrapper

C. only answers

D. command/preset reference

E. another exact structure

Return the exact non-secret shape.

Example ONLY — do not assume:

{
  "preset": {...},
  "answers": {...}
}

We need actual proof.

============================================================
TASK 6 — FIVE INPUT VALUES
============================================================

Trace how the five values entered into Stylus become runtime answers:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

Determine exact answer representation.

For example:

answers[name] = value

or:

answers = [
   {name, value}
]

or another structure.

Do not guess.

============================================================
TASK 7 — PROMPT / KNOWLEDGE / INPUT DEFINITIONS
============================================================

Determine where the working runtime receives:

- the preset prompt
- input definitions
- knowledge configuration/files
- output/schema instructions

Possible locations may include:

- message.parts[0].data
- server-side preset expansion
- command expansion before /chat
- another frontend-loaded object

Trace it.

We need the actual working mechanism, not a theoretical design.

============================================================
TASK 8 — COMPARE TO CURRENT RPR
============================================================

Inspect:

backend/step25/stylus_runner_client.py

Compare CURRENT RPR with the successful browser request.

Produce a table:

ELEMENT
LIVE STYLUS
CURRENT RPR
MATCH?
MINIMAL FIX

Include at least:

outer body
mode
application
invoker
message
message.role
message.parts
message part data
message part data_type
message part mime_type
message part name
model
request_id
temperature
tool_config
answers
preset
SSE Accept behavior
SSE parsing
final-result extraction

============================================================
TASK 9 — FIND THE FIRST ACTUAL DIFFERENCE THAT WOULD BREAK EXECUTION
============================================================

Do NOT list cosmetic differences first.

Identify the earliest material contract mismatch in request construction.

Example:

LIVE:
message.parts[0].data = X

RPR:
message.parts[0].data = Y

Therefore Runner cannot treat RPR request as a preset invocation.

I need the actual proven root cause.

============================================================
TASK 10 — RESULT RETRIEVAL
============================================================

The successful Stylus run created:

AAPL_Step25_Assessment.json

Determine whether current RPR SSE parsing can retrieve the final assessment reliably.

If YES:
keep it.

If NO:
check whether existing documented artifact retrieval is significantly simpler.

Do NOT create an artifact framework.

Choose the smallest proven POC route.

============================================================
TASK 11 — AUTHENTICATION IS NOT THE CONTRACT ROOT CAUSE
============================================================

Do not mix the two issues.

Browser proves:

Runner reachable = YES
browser auth = YES
preset works = YES

Claude shell may still lack a Runner token.

That is an operational execution condition.

Do NOT:

- request a bearer token from user
- print tokens
- persist browser cookies
- design new OAuth
- build auth architecture

The final RPR test will use the existing approved authentication route/environment.

============================================================
TASK 12 — NO MORE PRESET-ID ARCHITECTURE
============================================================

Swagger proved preset repository APIs exist.

It did NOT prove that /chat executes by preset ID.

And the persisted Preset model is not obviously the executable preset structure.

Therefore:

STOP investigating preset-ID execution.

Do NOT implement:

GET preset every run
preset sync
preset cache
preset repository client
preset version framework

unless the successful live call actually requires it.

============================================================
TASK 13 — QUALITY MUST NOT BE REDUCED
============================================================

The existing working preset's analytical quality is the baseline.

Do NOT simplify away:

SEC research
web research
counter-thesis
Step 2.3 usage
Step 2.4 usage
evidence gaps
disconfirming evidence
conflict detection
freshness
analyst questions
credit-risk interpretation

POC simplification means:

LESS ENGINEERING

not:

LESS ANALYTICAL QUALITY.

============================================================
REPORT FORMAT — EXACTLY THIS
============================================================

Return:

1. ACTUAL POST /chat REQUEST TYPE
<exact type/source>

2. ACTUAL MESSAGE TYPE
<exact type>

3. ACTUAL MESSAGE.PARTS ITEM TYPE
<exact type>

4. role=0
<exact meaning>

5. data_type=3
<exact meaning>

6. sendPresetInput SERIALIZATION
<exact non-secret object shape>

7. FIVE INPUT ANSWER REPRESENTATION
<exact structure>

8. WHERE PROMPT COMES FROM
<exact path>

9. WHERE INPUT DEFINITIONS COME FROM
<exact path>

10. WHERE KNOWLEDGE COMES FROM
<exact path>

11. WHERE OUTPUT SCHEMA COMES FROM
<exact path>

12. LIVE STYLUS vs RPR
<table of material differences>

13. FIRST EXECUTION-BREAKING DIFFERENCE
<one precise root cause>

14. MINIMUM FUNCTIONAL FIX
<precise change>

15. FILES REQUIRED TO CHANGE
maximum target:
1-2 functional files

16. RESULT RETRIEVAL
SSE or artifact + why

17. AUTH REMAINING
<only the genuine operational auth issue>

18. FINAL STATUS
choose exactly one:

READY_FOR_MINIMAL_RPR_FIX

NEED_ONE_MORE_CONTRACT_CHECK

GENUINE_EXTERNAL_BLOCKER

============================================================
ABSOLUTE STOP RULE
============================================================

NO CODE CHANGES DURING THIS PASS.

NO NEW FILES.

NO REFACTORING.

NO CHANGES TO STEPS 1-2.4.

NO PRODUCTION ARCHITECTURE.

NO MORE GENERIC SWAGGER EXPLORATION.

We are solving ONE remaining problem:

MAKE RPR GENERATE THE SAME SUCCESSFUL RUNNER REQUEST THAT STYLUS GENERATES.
