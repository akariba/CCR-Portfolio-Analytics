Step 2.3 = Event-Driven Risk Factors.

What it currently does:

Takes the confirmed Step 1 event
Takes the confirmed Step 2.1 scenario + assumptions
Takes the selected sector and Step 2.2 portfolio context
Sends those to Claude Opus
Generates 4–6 event-driven risk factors
For each factor it proposes things such as:
factor name/narrative
vulnerability metrics
buffer/mitigant metrics
threshold bands
critical combinations
rationale
importance
Then Python validates the structure and applies deterministic importance/weight logic. The backend explicitly requires 4–6 factors
