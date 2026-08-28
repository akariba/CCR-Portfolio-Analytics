Critical product correction: RPR Step 2.5 must contain strictly no demo behavior.

Remove the runtime demo/fixture implementation from the active application.

The target is:

```text
UI Design/step23.html
```

The required production flow is:

```text
Real Step 2.2 selected company
+ confirmed real Step 2.3 event factors
+ confirmed/versioned real Step 2.4 sector factors
+ live official SEC evidence
+ real approved enterprise web evidence
+ real configured R2D2 LLM
-> real Step 2.5 assessment
```

No Apple demo, fixture company, mock provider, fixture evidence, synthetic conflict, demo selector, demo banner, or automatic fallback is permitted in the runtime application.

# 1. Runtime behavior that must be removed

Remove from production/runtime execution:

```text
demo-aapl
Apple fixture selection
CIK 0000320193 as a hardcoded/demo default
RPR_STEP25_SEC_MODE=fixture
RPR_STEP25_WEB_MODE=fixture
LLM_PROVIDER=mock
FixtureSecTransport as a selectable runtime provider
FixtureWebEvidenceProvider as a selectable runtime provider
demo-only SEC responses
demo-only web responses
synthetic conflict evidence
deterministic mock assessment
DEMO / FIXTURE MODE banner
DEMO FIXTURE CONTEXT banner
Step 2.5 Fixture Run Target
fixture company dropdown
fixture Step 2.3 factors
fixture Step 2.4 factors
client-side fixture-mode request fields
mock-provider documentation for operating the application
```

Remove the demo UI visible in `step23.html`.

Do not leave a hidden query parameter, frontend switch, environment default, or API request field that enables a demo run in production.

Test doubles may remain only inside automated tests. They must not be reachable through production routes or the real UI.

# 2. Production mode must be fail-closed

The production Step 2.5 server configuration must require:

```text
RPR_STEP25_SEC_MODE=live
RPR_STEP25_WEB_MODE=approved
RPR_STEP25_LIVE_SEC_ENABLED=true
RPR_SEC_USER_AGENT=<approved organizational User-Agent>
LLM_PROVIDER=r2d2
R2D2_AUTH_MODE=m2m
```

Also require the existing approved credentials, certificate, proxy, and environment configuration used by RPR.

Do not invent credentials.

Do not log credentials.

Do not display credentials in the UI.

Do not allow the frontend to choose `sec_mode`, `web_mode`, `LLM_PROVIDER`, authentication mode, host allow-list, TLS behavior, or User-Agent.

The server owns all source and security modes.

If any required production item is missing, return an explicit blocker. Do not substitute fixture/mock data.

Suggested blockers:

```text
STEP25_SEC_ACCESS_NOT_APPROVED
STEP25_SEC_USER_AGENT_MISSING
STEP25_SEC_EGRESS_BLOCKED
STEP25_SEC_TLS_NOT_READY
STEP25_WEB_PROVIDER_NOT_READY
STEP25_MODEL_AUTH_NOT_READY
STEP25_UPSTREAM_NOT_READY
STEP25_CIK_REVIEW_REQUIRED
STEP25_INSUFFICIENT_EVIDENCE
```

# 3. Do not make an unauthorized SEC request

Before any live SEC request, require explicit server-side confirmation that MarketDev production connectivity is approved.

Use the existing activation control if already implemented. Otherwise add a server-only gate such as:

```text
RPR_SEC_EGRESS_APPROVED=true
```

A live SEC request requires all of:

```text
live SEC enabled
egress approved
approved User-Agent present
HTTPS allow-list active
TLS verification active
proxy/CA configuration valid
selected company has CIK_CONFIRMED
```

If any condition is false:

* Do not contact SEC.
* Do not perform DNS probing.
* Do not downgrade TLS.
* Do not use `verify=False`.
* Do not fall back to fixture data.
* Return an activation-blocked response listing only nonsecret missing requirements.

# 4. Bind Step 2.5 to the real selected company

`step23.html` already contains the Step 2.2 portfolio-selection workflow.

Step 2.5 must consume the actual confirmed company selected in Step 2.2.

Do not display a second company selector.

Do not let the browser submit authoritative identity fields such as company name, ticker, or CIK as trusted values.

The frontend should submit only the minimum internal selection/run identifier required by the established application contract.

The backend must load the authoritative company record and obtain:

```text
internal company ID
legal company name
ticker, if stored
existing CIK, if stored
Step 2.2 confirmation status
portfolio/scenario context
assessment as-of date
```

Display these values read-only in Step 2.5.

If no company is selected or confirmed:

```text
STEP25_UPSTREAM_NOT_READY
```

Do not assess a demo company instead.

# 5. Require real Step 2.3 factors

Load real confirmed Step 2.3 event-driven risk factors associated with the selected company.

Validate:

* Factor ID exists.
* Factor text is nonempty.
* Status is confirmed/approved under the existing workflow.
* Factor belongs to the selected company and current assessment context.
* Factor is not an exception message or backend error.
* Factor has its real provenance/version information.

Reject strings such as:

```text
Command ['helix', 'auth', 'access-token', 'print', '-a'] timed out after 15 seconds
```

Such text is an operational error, not a risk factor.

If no confirmed Step 2.3 factors exist, block the assessment and explain why.

Do not use fixture factors.

# 6. Require real Step 2.4 factors

Load the real approved/versioned Step 2.4 sector-factor set applicable to the selected company.

Require:

* Valid sector.
* Approved factor version.
* One or more valid confirmed factors.
* Factor IDs.
* Labels.
* Importance/weight fields defined by the existing deterministic methodology.
* Version metadata.
* Approval/confirmation status.
* No backend error strings in the factor collection.

The screenshot shows the current Step 2.4 generation attempted:

```text
helix auth access-token print -a
```

and timed out.

Diagnose why Step 2.4 used the Helix CLI instead of the established M2M R2D2 configuration.

Do not bypass authentication.

Do not fabricate sector factors.

Do not allow Step 2.5 to continue with zero confirmed sector factors.

If this is a shared model-gateway configuration defect:

* Correct the smallest shared configuration/auth-selection issue.
* Preserve existing M2M security.
* Ensure Step 2.3 and Step 2.4 still work.
* Do not rewrite Step 2.4 methodology.
* Do not add a mock fallback.
* Do not convert model errors into factor rows.

The production assessment button must remain disabled until Step 2.4 is confirmed.

# 7. Real CIK resolution

Resolve the selected company’s SEC CIK using real authoritative inputs.

Priority:

1. Confirmed CIK stored in the Step 2.2 company record.
2. Exact authoritative internal identifier mapping.
3. Exact ticker candidate from official SEC ticker data.
4. Exact unique normalized legal-name candidate.
5. Manual review.

Statuses:

```text
CIK_CONFIRMED
CIK_REVIEW_REQUIRED
CIK_UNRESOLVED
SEC_NOT_APPLICABLE
```

Rules:

* Never use a demo/default CIK.
* Never automatically confirm a fuzzy match.
* Never substitute a parent for a subsidiary.
* Never guess when multiple candidates exist.
* Preserve candidate and resolution provenance.
* Require analyst confirmation when appropriate.
* Stop before retrieval unless status is `CIK_CONFIRMED`.

# 8. Live SEC evidence

Use only official SEC sources:

```text
https://www.sec.gov/files/company_tickers.json
https://www.sec.gov/files/company_tickers_exchange.json
https://data.sec.gov/submissions/CIK##########.json
https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json
https://www.sec.gov/Archives/edgar/data/...
```

Production requirements:

* Approved declared User-Agent.
* HTTPS only.
* TLS verification always enabled.
* Host allow-list restricted to `data.sec.gov` and `www.sec.gov`.
* Sequential conservative request rate.
* Caching.
* Timeouts.
* Retry-After handling.
* Bounded exponential backoff.
* Response-size limits.
* Redirect validation.
* Immutable raw response snapshot.
* SHA-256.
* Retrieval audit record.
* No arbitrary frontend-provided URLs.

Retrieve for the selected real company:

* Submissions metadata.
* Latest applicable 10-K.
* Latest one or two 10-Q filings.
* Relevant 8-K metadata within the assessment window.
* Relevant amendments.
* Company Facts.
* Bounded relevant filing sections.

Do not send complete filings to the LLM.

Do not invent XBRL metric requirements.

Use only the approved production concept profile. If no approved profile exists, process permitted narrative evidence and explicitly report the XBRL methodology gap.

# 9. Real approved-web lane

Use only the existing approved enterprise web-search path.

Do not use:

* Fixture web data.
* Synthetic snippets.
* A new search vendor.
* Direct browser scraping.
* An unapproved public search API.

Build search queries from:

```text
real selected company
confirmed Step 2.3 factors
confirmed Step 2.4 factors
assessment as-of date
```

Preserve:

```text
query
title
publisher/domain
publication date
retrieval timestamp
source URL
bounded excerpt/snippet
provider metadata
related factor IDs
```

Label all results as web evidence.

Do not represent a snippet as a verified SEC fact.

Do not silently override SEC evidence.

If the approved web provider is unavailable:

* Return `STEP25_WEB_PROVIDER_NOT_READY`.
* Do not replace it with fixture data.
* Do not generate a complete SEC + Web assessment.

# 10. Real LLM assessment

Use the actual configured R2D2 provider through the existing `llm_gateway.py`.

Require:

```text
LLM_PROVIDER=r2d2
R2D2_AUTH_MODE=m2m
```

Use existing approved:

```text
COIN_CLIENT_ID
COIN_CLIENT_SECRET
CITI_CERT_PATH
R2D2 endpoint/model configuration
```

Never expose those values.

Do not use:

```text
LLM_PROVIDER=mock
Helix CLI as an undocumented fallback
hardcoded assessment text
deterministic fake headline
synthetic recommendation
```

If M2M authentication or the model call fails:

* Return a typed model-auth/model-unavailable blocker.
* Preserve already collected evidence.
* Do not generate an assessment.
* Do not fabricate a fallback.
* Do not mark the run complete.
* Show the operational error separately from risk evidence.

Only call the LLM when both SEC and approved-web lanes contain sufficient real evidence.

# 11. Production run semantics

Use truthful run phases:

```text
CREATED
UPSTREAM_VALIDATED
CIK_RESOLVED
SEC_METADATA_COLLECTED
SEC_EVIDENCE_NORMALIZED
WEB_EVIDENCE_COLLECTED
CONFLICTS_EVALUATED
ASSESSMENT_GENERATED
COMPLETED
BLOCKED
FAILED
```

For strict SEC + Web:

* Missing SEC evidence means no assessment.
* Missing approved-web evidence means no assessment.
* Missing real model access means no assessment.
* Missing confirmed Step 2.3/2.4 factors means no assessment.
* CIK ambiguity means no assessment.

Do not return `PARTIAL` with a fabricated or mock assessment.

A blocked run may preserve collected evidence for diagnosis, but it must not present a completed Step 2.5 conclusion.

# 12. Production API contract

The frontend must not submit source modes.

Use a production request such as:

```json
{
  "company_id": "<selected internal company ID>",
  "as_of": "YYYY-MM-DD"
}
```

The backend loads authoritative identity and upstream context.

Remove runtime request fields such as:

```text
sec_mode=fixture
web_mode=fixture
demo_company
fixture_id
mock_assessment
```

If tests need transport injection, inject test doubles internally through dependency overrides—not public API fields.

# 13. Correct step23.html UI

Remove from `step23.html`:

* Demo/fixture banner.
* Demo fixture context.
* Apple/demo identity.
* Fixture target selector.
* Demo as-of defaults.
* Fixture readiness statements.
* Instructions referencing a demo.
* Mock provider presentation.
* Any “Ready to run” result based on fixture state.

Replace them with production panels:

## Selected company

Display the actual Step 2.2 company:

```text
Company
Internal company ID
Ticker
CIK status
Step 2.2 confirmation
Assessment as-of date
```

## Upstream readiness

Display actual:

```text
Step 2.3 confirmed factor count
Step 2.4 version
Step 2.4 confirmed factor count
CIK status
SEC access status
Approved-web provider status
R2D2 M2M status
```

## Run button

The existing visible `Run Assessment` button:

* Runs only the selected `SEC + Web` path.
* Remains disabled until all required production readiness checks pass.
* Displays exact blockers.
* Does not trigger a fixture run.
* Does not trigger CAM paths.

## Results

Render only real returned data:

* Real company identity.
* Real filings.
* Real accession numbers.
* Real XBRL facts.
* Real filing excerpts.
* Real approved-web results.
* Real conflicts.
* Real assessment.
* Real evidence citations.
* Real model metadata.

Do not display a result when the run is blocked.

# 14. Conflict handling

Keep SEC and web evidence separate.

If they conflict:

* Preserve both records.
* Cite both source URLs.
* Mark the conflict for analyst review.
* Do not silently resolve it.
* Do not treat web evidence as authoritative over SEC reporting.
* Do not treat an older SEC filing as proof that a newer external event did not happen.

All assessment claims must cite real evidence IDs.

# 15. RRR protection

Step 2.5 may produce only a nonbinding review recommendation.

It must never:

* Change RRR.
* Write into the authoritative rating field.
* Auto-upgrade.
* Auto-downgrade.
* Mark analyst review complete.

Display:

```text
Review recommendation only.
No RRR value was changed.
```

# 16. Remove production fixture reachability

Search the entire runtime codebase for:

```text
demo
fixture
demo-aapl
AAPL
0000320193
LLM_PROVIDER=mock
FixtureSecTransport
FixtureWebEvidenceProvider
mock assessment
synthetic conflict
```

Classify every match.

Requirements:

* No fixture/demo match may be reachable from `step23.html` or production Step 2.5 routes.
* Test-only fixtures may remain under tests.
* Test dependency overrides may remain.
* Documentation may mention test doubles only as automated testing implementation details—not operating instructions.
* Production configuration must not default to fixture or mock.
* Remove fixture/manual-demo instructions from `STEP25_IMPLEMENTATION.md`.

# 17. Tests

Retain automated isolation using mocks internally, but test the production contract.

Add tests proving:

1. Production route does not accept `sec_mode`.
2. Production route does not accept `web_mode`.
3. Production route does not accept a fixture company.
4. Frontend contains no demo/fixture controls.
5. No Apple fixture is hardcoded in `step23.html`.
6. Selected Step 2.2 company is used.
7. Unconfirmed Step 2.3 blocks.
8. Missing/unconfirmed Step 2.4 blocks.
9. Exception text cannot become a factor.
10. Unconfirmed CIK blocks.
11. SEC approval/configuration missing blocks without a network call.
12. Web provider missing blocks without fallback.
13. R2D2 authentication failure blocks without mock output.
14. SEC failure prevents assessment.
15. Web failure prevents assessment.
16. Model failure prevents assessment.
17. Real evidence IDs are required.
18. RRR is never mutated.
19. Test fixtures are inaccessible from production routes.
20. Live SEC transport cannot disable TLS.

Tests must not contact live SEC or live web unless a separately authorized integration-test environment is explicitly enabled.

# 18. Activation verification

Do not perform live network calls merely because the user rejected demo mode.

First report the production readiness matrix:

```text
Selected real company:
Step 2.2 confirmed:
Step 2.3 confirmed:
Step 2.4 confirmed:
CIK confirmed:
SEC egress approved:
SEC User-Agent configured:
SEC TLS/CA ready:
SEC proxy ready:
Approved web provider ready:
R2D2 M2M ready:
```

Only execute a real assessment when every required item is confirmed.

If something is missing, keep the application in a truthful blocked state and provide the exact configuration or approval required.

Do not substitute a demo.

# 19. Final report

Return:

```text
STRICT PRODUCTION RESULT
- READY / BLOCKED

DEMO REMOVAL
- Demo UI removed:
- Fixture company removed:
- Runtime fixture transports disabled/removed:
- Mock provider removed from runtime:
- Fixture API fields removed:
- Test-only fixtures retained:

ACTIVE FRONTEND
- Exact step23.html path:
- HTTP URL:

REAL INPUTS
- Selected Step 2.2 company:
- Step 2.3 status/count:
- Step 2.4 version/status/count:
- CIK status:

PRODUCTION READINESS
- SEC egress:
- SEC User-Agent:
- SEC TLS:
- SEC proxy:
- Approved web:
- R2D2 M2M:

ASSESSMENT EXECUTION
- Executed: yes/no
- If no, exact blocker:
- If yes, run ID:
- SEC evidence count:
- Web evidence count:
- Assessment ID:
- Provider:
- Conflict count:
- Nonbinding:
- RRR changed:

NETWORK
- SEC requests:
- Approved-web requests:
- Unauthorized requests:
- TLS bypass:

FILES CHANGED
- Exact files and purpose

TESTS
- Exact commands and results

REMAINING BLOCKERS
- Exact production-only blockers
```

Begin by removing all runtime demo behavior from `step23.html` and the production Step 2.5 API. Do not replace it with another simulation.
