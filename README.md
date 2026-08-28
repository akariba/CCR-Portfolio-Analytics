Apply the reviewed Stylus findings to the production-only RPR Step 2.5 implementation.

This is not a demo task.

Do not reintroduce:

```text
fixtures
mock providers
demo companies
Apple defaults
synthetic evidence
synthetic conflicts
mock assessments
demo banners
runtime test modes
```

The active frontend remains:

```text
UI Design/step23.html
```

# 1. Architecture decision

For this increment, use:

```text
Primary SEC source: Path A — direct official SEC EDGAR APIs
Web source: existing approved enterprise web-search path
Assessment model: existing H2M-backed R2D2/LLM gateway
```

Do not add the Stylus “U.S. SEC Filings” Preset as a production evidence source in this increment.

Reason:

* Direct SEC provides deterministic URLs, accession numbers, reported facts, and audit provenance.
* The Preset combines retrieval and interpretation and would introduce a second evidence architecture before the direct path is complete.
* It may be evaluated later as a separately labeled `llm_interpretation` supplementary lane.

Document this architecture decision.

# 2. Correct the authentication gate

The current production preflight incorrectly requires:

```text
R2D2_AUTH_MODE=m2m
```

For this phase, M2M/COIN client credentials are unavailable. H2M is the available working authentication mode.

Change the Step 2.5 production model/web authentication requirement to the established H2M mode.

Requirements:

* Accept and require the project’s real H2M configuration.
* Use the existing approved H2M acquisition path.
* Do not invent M2M credentials.
* Do not gate Step 2.5 on unavailable M2M.
* Do not introduce a mock fallback.
* Do not relabel an H2M fallback as M2M.
* Correct misleading comments in `rpr_search_agent.py` or related files.
* Keep SEC access independent of H2M because SEC endpoints are public and unauthenticated.
* H2M applies only to approved-web and model-backed assessment operations.
* A failed H2M session must return a typed blocker and must not become risk evidence.

Suggested production status:

```text
STEP25_H2M_AUTH_READY
STEP25_H2M_AUTH_NOT_READY
```

Remove `STEP25_MODEL_AUTH_NOT_READY: R2D2_AUTH_MODE must be m2m`.

Replace it with an accurate H2M readiness check.

# 3. Implement real live CIK resolution

Stylus found that `CikResolver` still reads a static fixture mapping even when SEC mode is live.

Fix this first.

When live SEC mode is active:

1. Fetch and cache:

```text
https://www.sec.gov/files/company_tickers.json
```

2. Optionally fetch:

```text
https://www.sec.gov/files/company_tickers_exchange.json
```

for exchange disambiguation.

3. Use the existing live SEC client and transport.
4. Reuse the same:

   * Host allow-list.
   * HTTPS enforcement.
   * User-Agent.
   * TLS verification.
   * Rate limiter.
   * Retry policy.
   * Caching.
   * Audit behavior.
5. Do not create another HTTP client.
6. Cache ticker mappings with the configured TTL.
7. Refresh periodically, not for every company.
8. Store:

   * Source URL.
   * Retrieval timestamp.
   * Raw-artifact reference.
   * SHA-256.
9. Preserve strict matching:

   * Existing confirmed CIK first.
   * Exact ticker candidate.
   * Exact normalized legal-name candidate.
   * No fuzzy automatic confirmation.
   * Ambiguity becomes `CIK_REVIEW_REQUIRED`.
10. Confirm the selected candidate against:

```text
https://data.sec.gov/submissions/CIK##########.json
```

before granting final `CIK_CONFIRMED`.

Validation must compare:

* Returned SEC entity name.
* Known ticker where available.
* Frontend/backend selected company identity.
* Former-name data when available.

Do not silently reject a legitimate former-name difference, but require a warning or analyst review.

# 4. Revalidate company identity server-side

The browser must not be authoritative for:

```text
company name
confirmation status
ticker
CIK
Step 2.2 confirmation
```

Use the selected internal company ID to reload the authoritative Step 2.2 record server-side.

Implement or reuse a minimal read-only Step 2.2 lookup.

The backend must verify:

* Company exists.
* Company belongs to the active portfolio/context.
* Company is confirmed.
* Submitted internal ID matches the authoritative record.
* Frontend-supplied name/ticker/CIK do not override backend values.

If the current Step 2.2 architecture cannot provide a backend lookup, return a clearly documented trust-boundary blocker. Do not silently trust browser booleans.

# 5. Resolve the current selected-company scope

The selected company shown in the production UI is:

```text
NATIONWIDE BUILDING SOCIETY–SWINDON HEAD OFFICE
```

This appears to be a UK entity.

Do not assume it is a domestic 10-K/10-Q filer.

During CIK resolution, determine whether it is:

```text
U.S. domestic filer
foreign private issuer
SEC debt/security filer
non-filer
subsidiary of a filer
ambiguous entity
```

Use a controlled filer classification:

```text
DOMESTIC_FILER
FOREIGN_PRIVATE_ISSUER
SEC_LIMITED_FORM_FILER
SEC_NOT_APPLICABLE
FILER_REVIEW_REQUIRED
```

If no CIK or SEC filing relationship is confirmed:

* Return `SEC_NOT_APPLICABLE` or `CIK_REVIEW_REQUIRED`.
* Do not use another company’s filings.
* Do not substitute web-only evidence under the SEC + Web assessment type.
* Do not fabricate SEC evidence.

Because a foreign entity is present in the real portfolio, implement form routing for foreign filers if confirmed in scope:

```text
20-F
20-F/A
40-F
40-F/A
6-K
6-K/A
```

If product methodology has not approved foreign-issuer assessment:

* Detect the filer correctly.
* Return a production scope blocker.
* Do not silently process it as a domestic filer.

# 6. Expand domestic filing coverage

The current implementation retrieves only 10-K/10-K/A.

Add:

```text
latest 10-K and applicable amendment
latest 1–2 10-Q filings and amendments
credit-relevant 8-K metadata
relevant 8-K documents within the assessment window
```

Do not indiscriminately fetch every 8-K.

Filter relevant 8-K items, including where applicable:

```text
1.03 Bankruptcy or Receivership
2.04 Triggering Events That Accelerate or Increase a Direct Financial Obligation
4.01 Changes in Registrant’s Certifying Accountant
4.02 Non-Reliance on Previously Issued Financial Statements
5.02 Departure/Election of Directors or Principal Officers
7.01 Regulation FD Disclosure
8.01 Other Events
```

Use the existing form-agnostic filing metadata parser.

Preserve:

```text
form
filing date
accepted datetime
report date
accession number
primary document
items
amendment status
supersession relationship
source URL
retrieval timestamp
```

# 7. Fix filing-text extraction

Current extraction is vulnerable to raw HTML and table-of-contents matches.

Implement an HTML-to-text normalization stage using an existing installed parser.

Requirements:

* Remove script/style content.
* Remove tags safely.
* Decode entities.
* Normalize whitespace.
* Preserve meaningful headings.
* Avoid executing or rendering untrusted HTML.
* Do not send full filing HTML to the LLM.

Add TOC disambiguation:

* Do not accept the first `Item 1A` or `Item 7` occurrence blindly.
* Skip likely TOC occurrences near the beginning.
* Require substantive body text after a heading.
* Identify the next genuine item boundary.
* Record extraction offsets and method.
* Mark uncertain extraction as low confidence.

Expand deterministic sections:

```text
Item 1A Risk Factors
Item 3 Legal Proceedings
Item 7 MD&A
Item 7A Market Risk
Liquidity and Capital Resources
Debt and Covenant disclosures
Going Concern
Controls and Procedures
Cybersecurity
Commitments and Contingencies
Subsequent Events
```

Validate against multiple real historical filing structures when live testing is formally authorized, not only one fixture document.

# 8. Do not unilaterally expand XBRL concepts

The current five-concept list was created for an earlier fixture slice and is not an approved production methodology.

Do not call it production approved.

List the existing concepts and mark their status accurately.

Candidate additions may include:

```text
cash and cash equivalents
current assets
current liabilities
interest expense
operating cash flow
capital expenditures
goodwill
impairments
```

However:

* Do not activate additional concepts without product-owner/methodology sign-off.
* Create a versioned concept-profile configuration.
* Mark the current profile `PENDING_METHODOLOGY_APPROVAL`.
* Do not invent a universal metric list.
* Do not create unapproved ratios.
* Record excluded concepts and the reason.
* Distinguish `concept_not_approved` from `concept_not_reported`.
* Preserve company-extension taxonomy limitations.

# 9. Make web queries use actual Step 2.3/2.4 factors

The current approved-web implementation sends one generic query:

```text
{company_name} recent credit-relevant developments
```

Replace this with bounded factor-driven queries.

Extend `ApprovedWebEvidenceProvider.collect()` to receive:

```text
selected company identity
confirmed Step 2.3 factors
confirmed Step 2.4 factors
assessment as-of date
```

Build targeted queries by factor category.

Examples:

```text
{company} + tariff/trade-policy exposure
{company} + liquidity/funding risk
{company} + debt/covenant developments
{company} + regulatory action
{company} + credit rating action
{company} + management change
{company} + litigation
{company} + cybersecurity incident
{company} + sector-specific confirmed factor
```

Requirements:

* Use only confirmed real factors.
* Limit query count.
* Deduplicate related factor queries.
* Preserve every query.
* Preserve result provenance.
* Exclude results outside the assessment window where appropriate.
* Do not treat snippets as SEC-reported facts.
* Do not allow untrusted result text to instruct the LLM.
* Use the real H2M-approved web-search path.
* No M2M requirement.
* No mock fallback.

# 10. Persist evidence and raw source material

Stylus found that normalized evidence and assessments are currently held only in memory and lost on restart.

Extend the existing `Step25Repository` rather than adding a new storage technology.

Persist:

```text
run manifest
raw SEC response bytes
raw approved-web response payload
normalized EvidenceRecord objects
conflict records
assessment input manifest
raw model output
validated Step25Assessment
prompt version
schema version
model metadata
```

Requirements:

* Store raw source bytes using content-addressed SHA-256 keys.
* Never overwrite different bytes under the same artifact identity.
* Link every normalized evidence record to its raw artifact.
* Make a completed assessment reproducible without refetching sources.
* Document retention as unresolved if no approved retention policy exists.
* Do not silently delete source snapshots.
* Protect against path traversal.
* Do not store credentials or tokens.

# 11. Formalize SEC egress approval

`RPR_SEC_EGRESS_APPROVED=true` cannot by itself be treated as proof of approval.

Keep the fail-closed boolean, but require deployment documentation to reference:

```text
approval/ticket ID
approval date
approver/team
approved hosts
approved port
proxy requirement
CA requirement
environment
```

Do not hardcode organizational approval details.

Do not enable or test live SEC access until this real approval exists.

SEC egress approval is independent of H2M/M2M authentication.

# 12. Correct production readiness

The Step 2.5 production UI must display these independent readiness areas:

```text
Step 2.2 identity confirmed
Step 2.3 factors confirmed
Step 2.4 factors confirmed/versioned
CIK status
SEC egress approval
SEC User-Agent
SEC TLS/proxy readiness
approved-web H2M readiness
assessment-model H2M readiness
evidence persistence readiness
```

Remove the M2M-only blocker.

Do not enable Run Assessment until:

* Real company identity is confirmed.
* Step 2.3 is confirmed.
* Step 2.4 is confirmed.
* CIK is confirmed or valid filer classification permits SEC retrieval.
* SEC access is formally approved and configured.
* Approved web is available through H2M.
* The real assessment model is available through H2M.
* Persistence is ready.

For the current screen, Step 2.4 is `No`; therefore the run must remain blocked even after correcting authentication.

# 13. Strict orchestration

Ensure no production code can call:

```python
Step25Orchestrator.run(strict=False)
```

Remove the permissive default or add a runtime guard.

Production behavior must be strict:

* Missing SEC lane: no assessment.
* Missing web lane: no assessment.
* Missing Step 2.4: no assessment.
* H2M failure: no assessment.
* Unconfirmed CIK: no assessment.
* Persistence failure: do not mark complete.

# 14. RRR regression protection

Add a test that captures the authoritative RRR state before and after a Step 2.5 run and proves it is byte-for-byte or value-for-value unchanged.

Also confirm:

* Step 2.2 is unchanged.
* Step 2.3 is unchanged.
* Step 2.4 is unchanged.
* No rating workflow is automatically completed.
* The result remains nonbinding.

# 15. Test requirements

Add or update tests for:

```text
H2M accepted as current production auth mode
M2M not required
SEC access independent of H2M
live CIK ticker-file retrieval through mocked live transport
submissions confirmation of CIK
ambiguous CIK review
foreign-filer classification
non-filer SEC_NOT_APPLICABLE
10-Q selection
10-Q/A retention
credit-relevant 8-K filtering
20-F/6-K routing when enabled
HTML stripping
TOC avoidance
factor-driven web queries
query limits and deduplication
persistent evidence records
persistent raw source bytes
assessment recovery after restart
strict=False unreachable in production
RRR unchanged
frontend identity revalidated server-side
```

All external calls must be mocked in unit/integration tests.

Do not claim production-ready from mocked tests alone.

# 16. Do not activate live mode in this task

Implement and test the code paths using controlled mocks.

Do not set:

```text
RPR_SEC_EGRESS_APPROVED=true
```

unless a real approval record is supplied.

Do not invent the SEC User-Agent.

Do not contact SEC.

Do not perform real approved-web retrieval.

Do not perform a real H2M model call unless the current authorized H2M session is already working and the user explicitly requests the live validation.

# Final response

Return:

```text
STYLUS ALIGNMENT IMPLEMENTATION
- COMPLETE / PARTIAL / BLOCKED

ARCHITECTURE
- Direct SEC primary:
- Stylus SEC Preset adopted:
- Approved web path:
- Authentication mode:

AUTH CORRECTION
- Previous incorrect M2M gate:
- Current H2M gate:
- SEC independence from auth:

CIK
- Live ticker retrieval:
- Submissions confirmation:
- Identity server validation:
- Foreign-filer handling:

FILING COVERAGE
- 10-K:
- 10-Q:
- 8-K:
- 20-F/40-F/6-K:
- Amendments:

EXTRACTION
- HTML stripping:
- TOC avoidance:
- Sections:

XBRL
- Current concept-profile status:
- Product approval required:
- Derived metrics:

WEB
- Step 2.3/2.4-driven queries:
- H2M provider:
- Query limits:

PERSISTENCE
- Raw SEC:
- Raw web:
- Evidence:
- Assessment:
- Restart recovery:

SEC APPROVAL
- Formal approval record present:
- Live activation performed:

PRODUCTION READINESS
- Step 2.2:
- Step 2.3:
- Step 2.4:
- CIK:
- SEC:
- Web:
- Model:
- Persistence:

TESTS
- Exact commands and results

RRR PROTECTION
- Regression result:

FILES CHANGED
- Exact paths and purpose

REMAINING BLOCKERS
- Exact unresolved production blockers
```

Implement the reviewed gaps without reintroducing any demo or fixture runtime path.
