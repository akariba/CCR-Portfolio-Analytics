IMPLEMENT THIS DIRECTLY. Do not redesign RPR, do not refactor working code, do not change the v31 bone, and do not modify Step 2.1/2.2/2.3/2.4 business logic unless explicitly required below.

There are TWO specific Step 1 defects visible in the latest real browser run.

==================================================
FIX 1 — DISCOVERY PARSER IS REJECTING VALID GEMINI JSON
==================================================

This is the priority defect.

The live terminal shows Gemini returning a root structure containing:

{
  "theme": "...",
  "events": [
    {
      "title": "...",
      "event_date": "...",
      ...
    }
  ]
}

BUT immediately afterwards the application logs:

"response parsed but had no usable events array"
and
"Discovery response did not contain an events array"

One diagnostic even reports top_level_keys:
['name','published_at','supports','url']

Those look like a nested citation/source object, NOT the actual root object.

Therefore inspect the CURRENT market_event_scout.py parsing path carefully.

Do NOT solve this by weakening validation blindly.

Required behavior:

1. Parse the COMPLETE Gemini structured response/root object first.
2. If the root object contains `events` and it is a list, use that list.
3. Never accidentally select a nested source/citation/support object as the root result.
4. Correctly handle:
   - clean JSON object
   - fenced ```json ... ```
   - leading/trailing prose around one valid JSON payload
   - already-decoded dict
   - top-level event array
   - legitimate single-event object if already supported
5. Preserve current accepted aliases where appropriate.
6. Normalize event fields only AFTER the correct root/events array has been located.
7. Do not convert a genuine valid Gemini event response into zero events because an optional field is absent.
8. Required fields must remain genuinely required, but report WHICH event and WHICH required field caused rejection.
9. Add concise diagnostics:
   root_type
   root_keys
   events_found
   events_accepted
   events_rejected
   rejection_reasons
10. Do not dump large raw model responses into logs.

Use the exact real response shape visible in the latest logs as a regression case.

Acceptance criterion:
A Gemini response with:
{"theme":"x","events":[{"title":"...", ...}]}
must resolve the outer `events` list and must NOT report
"did not contain an events array".

Do not change the event-per-theme architecture or the 3-event maximum.

==================================================
FIX 2 — RE-SCAN / SEARCH REFINEMENT TEXT IS BAD
==================================================

The browser currently exposes analyst-facing text such as:

"Tier 2: Narrative Scope: ... Hang Seng, DAX/Nikkei and equity volatility measures ..."

This is unacceptable product copy.

It exposes internal search-planning language, introduces arbitrary market indices, is overly broad, and does not read like a credit analyst workflow.

FIRST trace where this text is generated.

Separate two concepts:

A. INTERNAL SEARCH INSTRUCTION
May contain detailed search planning required by Gemini.

B. ANALYST-FACING UI COPY
Must be concise, professional and credit-risk oriented.

Do NOT show raw generated search queries/search-planning text in the UI.

Replace the analyst-facing refinement panel with this semantic contract:

TITLE:
Additional Evidence Recommended

BODY:
Re-scan the incomplete sections using recent authoritative sources, focusing on the confirmed event, affected geographies, credit transmission, market impact and assumptions.

BUTTON:
Re-scan Missing Evidence

Optional secondary line:
Only incomplete or weakly evidenced sections will be targeted.

Do NOT hardcode event-specific content such as Hang Seng, DAX, Nikkei, VIX, S&P 500, etc.

The INTERNAL re-scan instruction should instead be constructed dynamically from:
- confirmed event/theme
- sections currently NO DATA / LIMITED
- existing evidence gaps
- report as-of date

Internal search policy:
- prioritize authoritative and recent sources
- primary/official source first where available
- central banks/regulators/governments/rating agencies/company filings
- then high-quality financial/news sources
- search only for evidence needed for the missing/weak sections
- do not broaden into unrelated markets
- do not invent benchmark/index requirements
- preserve the existing event identity/Bible rule
- re-scan must enrich the SAME event, not create a new event

==================================================
DO NOT CHANGE
==================================================

Do not change:
- v31 layout/style
- progressive discovery → enrichment → Opus refinement architecture
- Gemini 3.5 Flash routing
- Opus refinement routing
- max 3 events/theme
- Step 2.1
- Step 2.2
- Step 2.3
- Step 2.4
- existing working elapsed timers
- current evidence-quality improvements
- current URL cleaning
- current caching
- current High/Medium behavior

Use minimal surgical edits.

Do not repeatedly ask me for permission.
Inspect → implement → restart if required → test.

==================================================
MANDATORY TEST
==================================================

Run at least these parser tests locally:

A.
{"theme":"Test","events":[{"title":"Event A","event_date":"2026-08-20","why_material":"test"}]}

B.
```json
{"theme":"Test","events":[{"title":"Event A","event_date":"2026-08-20","why_material":"test"}]}
