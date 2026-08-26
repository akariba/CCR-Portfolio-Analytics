No — the previous wording said “up to 3 events/theme”, which is not strict enough. That would legally allow 1 or 2 events. For your RPR rule, it should be EXACTLY 3 valid events for every accepted theme.

Replace every reference to “up to 3” with this hard rule:

NON-NEGOTIABLE EVENT COUNT RULE

For every theme accepted for scanning, Trigger 1 must return EXACTLY 3 distinct, valid, evidence-supported market events.

Accepted theme → exactly 3 events

Not 1.
Not 2.
Not “up to 3.”
Exactly 3.

A theme must NOT be marked discovery-complete or READY with fewer than 3 valid events.

If the first Gemini discovery call produces fewer than 3 valid events after normalization/validation:

Keep every valid event already found.
Calculate missing_event_count = 3 - valid_event_count.
Run a targeted gap-fill discovery only for the missing number of events.
Explicitly instruct Gemini not to repeat already accepted events.
Normalize and validate the additional results.
Deduplicate semantically, not merely by exact title.
Continue until exactly 3 valid distinct events exist or the bounded recovery policy is exhausted.

Never fabricate an event simply to reach three.

If three evidence-supported events genuinely cannot be obtained after the bounded recovery attempt, the theme must return:

DISCOVERY_INCOMPLETE
valid_events: <0|1|2>
required_events: 3
reason: <explicit technical/evidence reason>

It must not silently proceed as a successful 1-event or 2-event theme.

Once exactly 3 events have been accepted, enrichment and Opus refinement must run independently for all three events.

A later enrichment/refinement failure on one event must not delete the event or reduce the theme's event count. Preserve its strongest successful upstream representation and expose Retry for only the failed stage.

Therefore the invariant throughout Trigger 1 is:

accepted theme
     ↓
EXACTLY 3 event identities
     ↓
Event 1: discovery → enrichment → refinement
Event 2: discovery → enrichment → refinement
Event 3: discovery → enrichment → refinement

Event identity/count is frozen once the three valid discovery events are accepted. Downstream failures cannot reduce 3 → 2 or replace one event with another.

Add an explicit backend invariant/assertion:

EXPECTED_EVENTS_PER_THEME = 3

and ensure the frontend also treats:

events_found < 3

as incomplete, never successful.

The acceptance test is therefore:

Theme A = exactly 3 events
Theme B = exactly 3 events
Theme C = exactly 3 events

If three themes are scanned, the expected event identity count is 9, regardless of whether some individual events later display RETAINED because enrichment/refinement failed.

And I would change the earlier prompt line from:

“Preserve max 3 events/theme.”

to:

“Preserve the strict business rule: EXACTLY 3 distinct validated events per accepted theme. Three is both the minimum and maximum. Never mark a theme successful with fewer than 3.”
