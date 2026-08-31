IMPORTANT CHANGE OF DIRECTION:

This is a PURE POC.

Do NOT design this as production software.

A separate production team will likely rebuild or replace this code later. Our objective is simply to prove that the RPR concept works accurately and convincingly end-to-end using the resources already available.

Therefore optimize for:

1. speed
2. simplicity
3. accuracy of the assessment
4. real data
5. traceability sufficient for the demo
6. minimal changes to the existing working RPR backbone

Do NOT spend time on:
- production architecture
- generalized frameworks
- elaborate abstraction layers
- future-proof APIs
- unnecessary adapters
- extensive configuration systems
- production deployment concerns
- scalability engineering
- sophisticated error frameworks
- refactoring working code
- code cleanliness for its own sake

============================================================
POC TARGET
============================================================

We need to demonstrate:

REAL Step 2.2 selected company
        ↓
Step 2.3 event factors
        ↓
Step 2.4 sector factors
        ↓
SEC + WEB Stylus/Runner assessment
        ↓
high-quality Step 2.5 result
        ↓
existing RPR UI

That is the goal.

============================================================
1. FIX RUN ASSESSMENT WITH MINIMUM CHANGE
============================================================

The current HTTP 409 occurs because Step 2.5 checks legacy SEC/web/H2M production-readiness settings before any model call.

For the POC, make the smallest safe change that allows the new SEC+WEB Runner path to execute without requiring the old unused local services.

Do NOT redesign the readiness architecture.

If a simple condition such as:

if using SEC_WEB_STYLUS_POC:
    skip legacy SEC/web/H2M blockers

is sufficient, use it.

Preserve the old path unchanged.

============================================================
2. DO NOT WASTE TIME ON PRESET UUID
============================================================

Your investigation already showed that the known-working Runner code sends the preset definition inline.

Use that mechanism.

Do not spend more time proving whether a saved Stylus preset can be invoked by UUID.

We will obtain the exact preset definition once from Stylus and use the same structure in the POC.

No generalized preset-management feature is required.

============================================================
3. FIVE INPUTS
============================================================

We need the exact five Stylus input names once.

Create one short instruction telling me exactly how to capture the request from Stylus Browser DevTools -> Network.

After I provide that request, extract:

- exact input names
- prompt
- model
- tools
- knowledge configuration
- any other required preset fields

Then copy/use that exact definition for the POC.

Do not invent names.

============================================================
4. COMPANY SELECTION
============================================================

We need ONE genuine company to prove the POC.

Inspect the available Step 2.2 data for any useful company/entity identifier.

Do not build a sophisticated entity-resolution framework.

Use whatever authoritative information already exists in the current files/data.

If Step 2.2 contains an identifier that can be mapped simply to a company, do that.

If the current dataset genuinely cannot identify any company, tell me clearly.

For the POC, a small explicit lookup/mapping table is acceptable if needed, PROVIDED the selected company genuinely corresponds to the Step 2.2 record.

Do not substitute an unrelated convenient company.

We only need enough real companies to demonstrate the workflow.

============================================================
5. SEC
============================================================

For the selected real company:

- determine its legal company name
- determine ticker if available
- determine/verify CIK
- use real SEC information

For the POC, a simple resolver or explicit verified mapping is completely acceptable.

We do not need a production-grade SEC entity master.

If no SEC registrant exists, return:
NO_CONFIRMED_SEC_REGISTRANT

============================================================
6. EVIDENCE
============================================================

Keep evidence handling SIMPLE.

We need enough traceability to show that Step 2.5 is based on real evidence.

If the Stylus/Runner response provides source URLs, SEC filing references, dates or citations, retain them and display/store them with the assessment.

Do NOT build a complex enterprise EvidenceRecord subsystem unless the current RPR code already makes it trivial.

A lightweight structure such as:

{
  "id": "E1",
  "source": "...",
  "url": "...",
  "date": "...",
  "statement": "..."
}

is sufficient for the POC.

The important rule is:

NO fabricated citations.
NO invented sources.
NO invented SEC facts.

============================================================
7. AUTH
============================================================

Do not ask me to paste tokens into Claude.

Reuse the existing approved Runner authentication mechanism when we execute from the proper environment.

Until then, build everything possible without the live call.

BLOCKED_AUTH is acceptable for the isolated smoke test.

Do not turn authentication into an architecture project.

============================================================
8. STEP 2.5 QUALITY
============================================================

This is the most important requirement.

The Step 2.5 result must actually be useful for a credit-risk analyst.

It should combine:

- selected company
- event-driven factors from Step 2.3
- sector factors from Step 2.4
- company-specific SEC evidence
- relevant web evidence
- credit implications
- direction of risk
- materiality
- supporting evidence
- conflicting evidence where relevant
- assumptions / gaps

Do not optimize merely for producing valid JSON.

QUALITY OF THE CREDIT ASSESSMENT IS THE POC.

============================================================
9. KEEP EXISTING WORKING RPR
============================================================

Do not modify Steps 1–2.3 unless absolutely necessary.

Do not redesign the application.

Do not clean/refactor unrelated files.

Do not introduce unnecessary dependencies.

Use the existing code and bolt on the minimum required functionality.

============================================================
10. IMPLEMENT NOW
============================================================

Proceed with:

A. inspect actual Step 2.2 identifiers
B. identify the easiest legitimate company-resolution route
C. make the minimal Run Assessment blocker change
D. prepare the five-input mapping point
E. prepare the inline Stylus preset call using existing runner_client.py
F. prepare simple SEC/company validation
G. prepare simple evidence/citation capture
H. validate Step25Assessment output
I. connect it to the existing Step 2.5 UI

Do not stop for architectural questions unless execution is genuinely impossible.

At the end tell me only:

1. What now works
2. What files you changed
3. What real company can be used for the POC
4. What remains blocked
5. The ONE exact Stylus action I need to perform
6. Exact commands/steps to run the POC
