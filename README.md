TRIGGER 1 ONLY — FINAL ROOT-CAUSE + PERFORMANCE STABILIZATION.

Do not touch Step 2.x.
Do not redesign the frontend.
Do not change v31 styling.
Do not work on Step 2.5.
Do not clean unrelated files.
Do not use subagents.
Do not repeatedly ask me for approval.
Do not make broad speculative changes.

Work directly, test end-to-end, and return the mandatory implementation report at the end.

PROJECT:
Rapid Portfolio Review_AI

TRIGGER 1 FLOW MUST REMAIN:

Gemini enterprise web discovery
→ Gemini evidence enrichment
→ Claude Opus refinement

Maximum 3 events per theme.

========================================================
OBSERVED FAILURE — IMPORTANT
========================================================

The latest real run proves the Gemini API itself is often SUCCESSFUL.

Example failure:

Global Monetary Policy:

Gemini discovery:
status=SUCCESS
duration_ms≈121821
output_chars≈20042

Parser then reports approximately:

root_type=dict
events_found=1
events_accepted=0
events_rejected=1

and the event is rejected for missing required event field(s).

Application then incorrectly surfaces:

GEMINI DISCOVERY FAILED
"No usable event..."

Meanwhile:

US Trade Policy & Tariffs:

Gemini discovery:
status=SUCCESS
duration≈126s
output_chars≈36,499
events_found=3
events_accepted=3

and works correctly.

Therefore DO NOT start by changing networking, TLS, certificates,
timeouts or retry counts.

The first task is to establish EXACTLY why semantically valid Gemini
responses sometimes fail our event contract.

========================================================
PART 1 — CAPTURE THE REAL FAILURE
========================================================

Inspect:

market_event_scout.py
rpr_search_agent.py
the actual Trigger-1 discovery prompt
all event Pydantic/dataclass/schema definitions used by discovery.

Run ONE failing-theme discovery only if needed.

For that run preserve the raw Gemini answer in memory/logging long enough
to compare it to the expected schema.

Do NOT dump sensitive/raw evidence into permanent files.

For every rejected candidate log only:

candidate index
candidate top-level keys
expected required keys
missing keys
recognized aliases
rejection reason

Then answer:

WHY was Gemini's Global Monetary Policy result detected as one event but
rejected?

I need the exact schema mismatch, not "the model returned bad JSON."

Examples of what to check:

event title field mismatch
event date field mismatch
why_material/materiality mismatch
nested event object
section-style object returned instead of event object
different capitalization
different property aliases
markdown/prose wrapper
Gemini using the business prompt's human-readable headings instead of
the machine contract

========================================================
PART 2 — FIX THE DISCOVERY CONTRACT AT THE SOURCE
========================================================

Discovery is currently producing 20k–36k characters and taking about
2 minutes.

This is too large for EVENT DISCOVERY.

Redesign ONLY THE DISCOVERY CONTRACT, while preserving its business
purpose.

Discovery should NOT generate the eight final risk-report sections.

Discovery should return ONLY a compact manifest of up to 3 events:

{
  "theme": "...",
  "events": [
    {
      "event_id": "...",
      "title": "...",
      "event_date": "...",
      "why_material": "...",
      "primary_geography": ["..."],
      "evidence_refs": [...]
    }
  ]
}

Use the application's actual field names if they differ.

Each candidate needs only enough evidence to establish:
WHAT happened,
WHEN,
WHERE,
WHY it is credit/market-risk material,
and the authoritative sources supporting its existence.

TARGET discovery output:
preferably <= 8,000 characters for 3 events.

Do not ask discovery to write:
Event History,
Direct Impact,
Contagious Impact,
Equity Impact,
Credit Impact,
Commodity Impact,
Assumptions.

Those belong to ENRICHMENT.

========================================================
PART 3 — USE REAL STRUCTURED OUTPUT IF SUPPORTED
========================================================

Inspect the exact google.adk.models.Gemini / enterprise_web_search path
used by this project.

Determine whether this approved ADK configuration supports an actual
response_schema / structured JSON output while enterprise web search is
active.

IF YES:
use a real schema for the discovery manifest.

IF NO:
do NOT invent unsupported parameters.

Instead require exactly one JSON root object and validate it against the
canonical event schema.

The canonical schema must live in ONE place in code.

The prompt, parser and validator must not each maintain slightly
different definitions.

========================================================
PART 4 — BOUNDED NORMALIZATION, NOT HEURISTIC CHAOS
========================================================

Before rejecting an otherwise valid candidate, support a SMALL explicit
alias map.

Examples only where genuinely observed:

title:
title
event_title
name

event_date:
event_date
date
published_at

why_material:
why_material
materiality
why_it_matters

Do NOT recursively scan arbitrary nested citation/source objects and
mistake them for events.

Do NOT accept an object merely because it contains "name" or "url".

A valid event candidate must satisfy a distinctive event signature.

Prefer:

required event fields + candidate being located inside the canonical
events container.

========================================================
PART 5 — SCHEMA-REPAIR WITHOUT REPEATING WEB SEARCH
========================================================

This is important for latency.

If the Gemini web search succeeds but the response is structurally
invalid:

DO NOT immediately repeat the expensive enterprise web search.

Attempt:

1. deterministic normalization;
2. deterministic JSON extraction;
3. bounded alias mapping.

If the content is clearly the intended event data but still fails only
because of formatting/schema shape, use ONE cheap schema-repair pass
WITHOUT web search.

The repair input is the already-returned Gemini text.

Its only job:

"Transform this existing discovery response into the canonical event
manifest. Do not add facts."

It must not research again.

Only if the original Gemini result contains genuinely no usable event
information may a discovery web-search retry occur.

Maximum full discovery web-search attempts per theme = 2.

========================================================
PART 6 — FIX MISLEADING FAILURE STATES
========================================================

Currently this:

Gemini status=SUCCESS
→ schema rejected
→ "GEMINI DISCOVERY FAILED"

is misleading.

Separate these statuses:

DISCOVERY_API_FAILED
DISCOVERY_SCHEMA_INVALID
DISCOVERY_NO_MATERIAL_EVENTS
DISCOVERY_SUCCESS

The UI should not claim the web search failed when the web search
actually succeeded.

========================================================
PART 7 — ENRICHMENT OWNS THE EIGHT SECTIONS
========================================================

After the compact manifest is accepted, enrichment generates:

1 Event Overview
2 Event History
3 Direct Impact Geographies
4 Contagious Impact Geographies
5 Equity Market Impact
6 Credit Market Impact
7 Commodity Market Impact
8 Assumptions

This stage should use the authoritative evidence framework already added.

Prioritize:

Tier 1:
official government / regulators / central banks / statistical bodies /
SEC or equivalent / rating agencies where accessible / issuer filings

Tier 2:
Reuters, Bloomberg-quality institutional reporting, major financial
press, recognized market-data/research providers

Tier 3:
other credible sources only when Tier 1/2 cannot establish the claim.

Prefer recent evidence relevant to the event.

Never expose:

vertexaisearch.cloud.google.com
grounding-api-redirect
Google internal redirect URLs
internal API paths

Analyst-facing text should show publisher/domain or canonical public URL
only.

========================================================
PART 8 — FAILURE IS PER EVENT, NOT PER THEME
========================================================

Do not discard an entire theme because one candidate is malformed.

If three candidates are returned and:

2 validate
1 fails

continue with the 2 valid events.

Attempt repair only for the failed candidate.

The theme should fail only when zero usable events remain after bounded
repair/retry.

Likewise enrichment failure of one event must not erase successful
events from the same theme.

========================================================
PART 9 — PARALLELISM / LATENCY
========================================================

Inspect the current execution model before changing it.

Desired structure:

themes can discover independently;

once an event manifest exists, event enrichment should run concurrently
with a SMALL bounded concurrency;

Opus refinement should not block already-discovered events from being
shown in the UI.

Do NOT launch unbounded LLM calls.

Suggested maximum:
3 concurrent event enrichments.

Do not implement parallelism if it already exists correctly.

First verify.

Add stage timing:

THEME:
D0 discovery start
D1 Gemini returned
D2 parse/validation complete

EVENT:
E0 enrichment start
E1 Gemini returned
E2 parse complete
O0 Opus start
O1 Opus returned
DONE

Log milliseconds.

========================================================
PART 10 — OPUS REFINEMENT CONTRACT
========================================================

We previously saw Opus responses fail because the application expected an
events array.

Inspect this contract too.

If Opus is refining ONE event, do not require it to return an array unless
there is a real architectural reason.

Use the smallest schema matching the operation:

single-event refinement → single event object
theme batch refinement → events array

Do not force incompatible response shapes.

Again, prefer a real structured response schema if supported by the
approved gateway.

========================================================
PART 11 — QUALITY GATE
========================================================

For each discovered event before enrichment require:

material event title
specific event/date
clear relationship to selected theme
at least one credible retrievable source
no duplicate of another selected event

Rank candidates using:

materiality
recency
source authority
credit relevance
distinctiveness

Select the best maximum 3.

Do not select three versions of the same underlying event.

========================================================
PART 12 — TESTS
========================================================

Do not spend the session repeatedly making live searches.

First build deterministic regression fixtures using sanitized examples of
the shapes ALREADY observed:

1 canonical JSON
2 fenced JSON
3 JSON preceded/followed by prose
4 alias field names
5 nested source/citation metadata
6 human-readable section headings
7 single event object
8 canonical events array
9 one invalid + two valid events
10 malformed/truncated response

Verify parser/validator behavior locally.

Then perform only:

ONE live discovery:
US Trade Policy & Tariffs

ONE live discovery:
Global Monetary Policy

Acceptance:

US Trade:
up to 3 accepted events.

Global Monetary Policy:
must no longer fail merely because Gemini selected a different JSON
shape if the required information exists.

========================================================
PERFORMANCE TARGET
========================================================

Measure, do not fake.

Discovery should become materially faster because the requested output is
small.

Target:
<=60 seconds/theme where provider/search latency permits.

More important:
discovery payload should be compact, ideally <=8k chars.

Do not sacrifice authoritative evidence merely to hit a timer.

The key optimization is:
SEARCH LESS OUTPUT, NOT LOWER QUALITY.

========================================================
DO NOT DO
========================================================

Do not rewrite the whole Trigger 1 service.

Do not replace the progressive pipeline.

Do not remove enterprise web search.

Do not replace Gemini 3.5 Flash.

Do not replace Opus 4.6.

Do not touch Step 2.

Do not change v31.

Do not create speculative fallbacks.

Do not silently fill missing evidence.

Do not repeatedly rerun Gemini while debugging parsing.

========================================================
MANDATORY IMPLEMENTATION REPORT
========================================================

After completing the work, report exactly:

1. ROOT CAUSE
For each failure shape observed:
raw top-level shape
expected shape
why it failed

2. OLD DISCOVERY CONTRACT
required fields
typical chars
observed latency

3. NEW DISCOVERY CONTRACT
exact schema
target size

4. PARSER / VALIDATOR
exact normalization/alias rules
exact rejection rules

5. RETRY / REPAIR POLICY
when deterministic repair occurs
when no-web schema repair occurs
when full web retry occurs

6. CONCURRENCY
what is parallel
maximum concurrency

7. FILES CHANGED
file
function
specific reason

8. TEST RESULTS
all deterministic fixtures
US Trade live result
Global Monetary Policy live result

9. LATENCY
D0→D1
D1→D2
enrichment
Opus
total

10. OUTPUT QUALITY
source tiers used
duplicate handling
freshness treatment

11. REGRESSION
confirm Trigger 2, Step 2.x and v31 were not modified.

12. REMAINING ISSUES
only actual unresolved defects.

Do the implementation first.
Do not give me a speculative essay before modifying/testing.
Do not give me internal chain-of-thought.
Give me the factual engineering report when finished.
