We now have enough information. Do NOT start another general investigation cycle and do NOT ask me again for decisions that can be made from the evidence already collected.

Proceed using the following architecture decisions.

============================================================
DECISION 1 — STEP 2.5 ENGINE GATING
============================================================

The existing HTTP 409 behaviour has been correctly traced.

Do NOT globally remove production/local safety blockers.

Make Step 2.5 readiness ENGINE-SPECIFIC.

Existing hybrid/legacy Step 2.5 engine:
- preserve all existing SEC/web/H2M readiness checks exactly.

New Stylus SEC+WEB engine:
- must NOT require the legacy local SEC/web/H2M services if SEC/web retrieval is being performed by the approved Runner/Stylus preset.
- instead require:
    1. Runner authentication readiness
    2. valid preset configuration
    3. valid Step 2.2 company identity
    4. valid Step25 output schema

This must be additive and must not alter the working legacy engine.

============================================================
DECISION 2 — STOP BLOCKING ON PRESET UUID
============================================================

Your audit established that every proven working Runner implementation in this codebase sends the FULL PRESET DEFINITION INLINE.

No proven saved-preset-ID invocation API exists.

Therefore:

Do NOT make candidate UUID
01a0586c-b61e-7842-83d0-74411b1ab24a
a prerequisite for implementation.

Do NOT invent a preset_id API.

Implement against the existing proven INLINE PRESET Runner contract.

The manually-created Stylus SEC+WEB preset remains the business/source configuration that we must reproduce exactly.

One remaining one-time external action will be obtaining the exact Stylus request/preset definition, including the exact five case-sensitive input keys.

Until that is supplied, create a clearly isolated configuration boundary/place-holder for the exact preset definition.

Do NOT invent field names.

============================================================
DECISION 3 — COMPANY IDENTITY
============================================================

The finding that company_name/ticker/CIK are absent from the checked Step 2.2 dataset is significant.

Before declaring the dataset unusable, inspect the COMPLETE Step 2.2 schema and relevant existing portfolio/entity files for ANY authoritative company identifiers, including but not limited to:

CAGID
GFCID
obligor
counterparty
issuer
legal_name
entity_name
client_name
parent
LEI
entity_id
security issuer identifiers

Report the actual columns found.

Then trace whether any existing RPR/internal mapping can resolve:

Step2.2 identifier
    -> legal company
    -> SEC registrant
    -> CIK.

DO NOT infer company identity from sector/event text.

DO NOT substitute Salesforce, Apple, Microsoft or another convenient company.

If no authoritative entity mapping exists, implement the explicit status:

NO_COMPANY_IDENTITY_AVAILABLE

If legal company exists but SEC registrant cannot be confirmed:

NO_CONFIRMED_SEC_REGISTRANT

This is preferable to fabricated data.

============================================================
DECISION 4 — EVIDENCE OWNERSHIP
============================================================

RPR/backend owns EvidenceRecord IDs.

The Stylus/LLM must NOT invent authoritative evidence_ids.

For SEC/Web evidence discovered inside the Stylus preset, capture/return enough provenance to construct a canonical RPR EvidenceRecord, including where available:

- source URL
- SEC accession / filing identifier
- filing/publication date
- retrieval date
- title
- source/provider
- evidence statement/snippet
- source type
- company identity

Create an adapter:

Stylus source/citation
    -> validate provenance
    -> canonical EvidenceRecord
    -> deterministic RPR evidence_id
    -> Step25Assessment evidence_ids

If Runner SSE/tool events already expose structured source metadata, use those rather than asking the model to reproduce it.

Inspect the raw Runner event contract specifically for source/tool provenance.

Do not modify Step25Assessment.schema.json unnecessarily.

Prefer an external response/envelope or adapter if the existing assessment schema can remain intact.

============================================================
DECISION 5 — AUTHENTICATION
============================================================

Do NOT ask me to paste GENAI_BEARER_TOKEN or GENAI_REFRESH_TOKEN into Claude.

Do NOT print or persist credentials.

The isolated smoke test may remain BLOCKED_AUTH until run from an authenticated RPR runtime.

Reuse the existing approved OAuth/Runner authentication mechanism.

Add only sanitized diagnostics such as:

RUNNER_AUTH = READY / NOT_READY
TOKEN_SOURCE = ENV / REFRESH_FLOW / NONE

Never print token values.

Authentication being unavailable in your current shell must NOT prevent implementation and offline tests.

============================================================
IMPLEMENTATION ORDER
============================================================

Proceed now in this exact order:

1. Inspect complete Step 2.2 identifier columns and existing mapping capability.
2. Implement engine-specific Step 2.5 readiness gating.
3. Implement Step2.2 -> company identity -> SEC identity contract.
4. Implement the SEC+WEB preset input adapter boundary.
5. Implement Runner response/source provenance adapter.
6. Implement canonical EvidenceRecord generation.
7. Implement Step25Assessment validation.
8. Add explicit failure states.
9. Add unit/offline integration tests.
10. Produce ONE concise implementation report.

Do NOT start Phase 6 UI parity yet.

Do NOT redesign Steps 1–2.4.

Do NOT refactor runner_client.py unless absolutely required.

Do NOT create mock successful assessment data.

============================================================
ONE-TIME STYLUS INFORMATION
============================================================

Create a file:

preset_knowledge/STYLUS_SEC_WEB_REQUIRED_CAPTURE.md

It should tell me exactly ONE TIME what I need to retrieve from the Stylus browser/UI to complete integration.

Keep it short.

It should specify exactly where to look in Browser DevTools Network and exactly what portion of the request we need.

Do not ask for bearer/authentication headers.

We only want the sanitized preset/request structure necessary to recover:
- exact 5 input names
- preset definition
- model
- prompt
- tool configuration
- knowledge configuration

Once captured, this must remove the need for any further UUID/input-key investigation.

============================================================
FINAL REPORT
============================================================

When finished report only:

A. files changed
B. company identifier fields actually found
C. company-resolution path
D. Step2.5 engine gating before vs after
E. evidence provenance mechanism
F. remaining genuine external blocker(s)
G. exact one-time action required from me

Do not reopen questions already decided above.
