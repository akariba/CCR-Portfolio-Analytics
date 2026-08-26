
Do not work on Step 2.1, 2.2, 2.3, 2.4, 2.5, deployment, cleanup, visual changes, or refactoring. Do not redesign the working architecture. Preserve the current v31 UI and the existing progressive per-event pipeline:

Gemini discovery → Gemini evidence enrichment → Opus refinement.

We have spent too much time patching symptoms. I want you to identify and eliminate the ROOT CAUSES of Trigger 1 instability end-to-end.

Current observable defect:

A scan can discover events successfully but individual events later become RETAINED with “Enrichment Incomplete”.
Example current run: 4 events detected but 21 sections missing.
Some events become READY while others fail enrichment/refinement in the same scan.
We have previously observed Gemini responses that visibly contain an events array but the backend still raises Discovery response did not contain an events array.
We have observed discovery events rejected because required-field parsing did not accept the model's returned shape.
We have observed Gemini enrichment return output that could not populate the required 8 sections.
We have observed Opus refinement fail with Opus batch response did not contain an events array.
Re-scan therefore behaves nondeterministically.

YOUR TASK IS IMPLEMENTATION, NOT ANOTHER LONG ANALYSIS.

First inspect the exact live code paths used by server.py for Trigger 1. Trace one event from theme submission all the way through discovery, enrichment, Opus refinement and UI-ready result.

Then implement a robust normalization boundary after every LLM call.

The model must NOT be trusted to return one exact JSON envelope. Build one canonical internal schema and normalize all legitimate variants into it before the rest of the pipeline sees them.

For discovery, accept legitimate variants including:

{"events":[...]}
{"identified_events":[...]}
{"market_events":[...]}
nested one-level wrapper objects
fenced JSON
prose followed by JSON
bare event arrays
one valid event object

Do NOT silently accept malformed/incomplete content. Normalize aliases first, then validate.

Separate these two concepts:

MODEL OUTPUT SHAPE DIFFERENCE

versus

GENUINELY MISSING REQUIRED BUSINESS CONTENT

A model response must never be rejected merely because the wrapper/key name differs when the underlying event is valid.

Apply the same principle independently to:

A. Discovery

Canonical internal output:

{
  "events": [...]
}

B. Evidence enrichment

Normalize directly to the canonical eight Step-1 sections:

Event Overview
Event History
Direct Impact Geographies
Contagious Impact Geographies
Equity Market Impact
Credit Market Impact
Commodity Market Impact
Assumptions

Accept sensible aliases/casing/markdown/JSON variations but never invent missing evidence.

C. Opus refinement

Opus is refining ONE event. Do not require an events[] wrapper unless the business contract genuinely requires it.

Normalize any legitimate:

event object
{"event": {...}}
{"events": [{...}]}
{"refined_event": {...}}
8-section object

into one canonical refined-event representation.

This is especially important: inspect why a single-event Opus refinement call is currently able to fail because an events array is absent. If the call semantically processes one event, the parser should not irrationally require a batch envelope.

RETRY POLICY

Do not blindly repeat expensive full calls.

Use at most:

original call
→ local normalization/repair
→ ONE lightweight model-format repair only if structurally necessary

Never redo enterprise web research simply because JSON formatting was imperfect.

PARTIAL RESULT POLICY

Progressive results must remain.

If discovery succeeds and enrichment fails:

retain discovery;
clearly mark enrichment failure;
Retry should retry only the failed event/stage, not the entire theme.

If enrichment succeeds and Opus refinement fails:

retain the enriched eight-section result;
Retry should retry only refinement;
never downgrade the event back to discovery-only content.

In other words:

discovery success
     ↓
enrichment success
     ↓
refinement success


is monotonic. A downstream failure must never destroy an upstream successful artifact.

TIMEOUTS

Inspect the actual timeout on every stage:

discovery
enrichment
refinement
repair

Do not simply increase all timeouts. Determine which calls genuinely time out versus which finish but fail parsing.

Log separately:

MODEL_TIMEOUT
MODEL_ERROR
PARSE_NORMALIZED
VALIDATION_FAILURE
FORMAT_REPAIR
SUCCESS
REQUIRED DIAGNOSTICS

For every event log:

theme_id
event_id
stage
model
elapsed_ms
raw_output_chars
parsed_root_type
detected_keys
normalization_path
validation_result
retry_count
final_status

Never log confidential full model content unnecessarily.

ACCEPTANCE TEST

After implementation, run a real Trigger-1 test with at least:

US Trade Policy & Tariffs
Global Monetary Policy

Target up to 3 events/theme.

A test is not considered successful merely because HTTP = 200.

Report for every event:

DISCOVERY       PASS/FAIL + seconds
ENRICHMENT      PASS/FAIL + seconds
OPUS REFINEMENT PASS/FAIL + seconds
SECTIONS        x/8
FINAL STATUS    READY / RETAINED / FAILED

Also report total scan elapsed time.

Test parser normalization independently against all known output shapes so we are not waiting several minutes for live calls merely to test JSON parsing.

HARD CONSTRAINTS
Do not change the business prompt merely to hide parser defects.
Do not reduce evidence quality.
Do not remove Gemini enterprise web search.
Do not remove Opus refinement.
Do not merge themes.
Preserve max 3 events/theme.
Preserve independent per-theme/per-event processing.
Preserve current fallback/retained behavior.
Preserve v31 UI.
No broad refactoring.
Do not touch Step 2.x.
Do not ask me repeatedly for permission for normal inspection/edit/test commands. Execute the complete stabilization pass.
Do not spend tokens narrating every command while working.

At the end give me one concise implementation report containing:

exact root causes found;
exact files modified;
exact code behavior changed;
before/after failure behavior;
real test results and elapsed times;
any remaining failure mode;
whether Trigger 1 is now safe enough for a live demo.

If something is not actually tested, label it NOT TESTED. Do not call code inspection a successful end-to-end test.

One thing I would not let Claude do again is simply raise timeouts or keep adding parser regex patches one by one. Trigger 1 needs one canonical normalization layer at every model boundary. That is the architectural fix that should make these repeated "events array" / missing-section / refinement-envelope problems stop recurring.
