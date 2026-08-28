You are implementing RPR Step 2.5 SEC + approved-web evidence collection end to end inside the currently open VS Code repository.

This is an implementation task. Do not stop after analysis or produce only a plan. Inspect the repository, identify the existing architecture, implement the requested vertical slice, run offline tests, and provide a precise handoff.

# 1. Objective

Build the additive Step 2.5 company-evidence pipeline that:

1. Accepts a company already confirmed by RPR Step 2.2.
2. Preserves and consumes related Step 2.3 event factors.
3. Preserves and consumes the applicable versioned Step 2.4 sector factors.
4. Resolves or validates the company’s SEC CIK safely.
5. Retrieves SEC filing metadata, Company Facts/XBRL evidence, and bounded filing sections through an abstract SEC transport.
6. Retrieves approved public-web evidence through RPR’s existing enterprise web-search path.
7. Keeps SEC and web provenance separate.
8. Builds a normalized, auditable evidence package.
9. Sends only bounded normalized evidence—not complete filings—to the existing LLM gateway.
10. Produces a company-level residual-risk assessment and an RRR review recommendation.
11. Never automatically changes the company’s RRR or any upstream record.
12. Displays the result inside the existing Step 2.5 user interface.
13. Works end to end in deterministic fixture/demo mode now.
14. Contains a production-ready live SEC transport that remains disabled until MarketDev approval is supplied.

The working feature must demonstrate:

```text
Step 2.2 company
    + Step 2.3 event factors
    + Step 2.4 sector factors
    + SEC reported evidence
    + approved-web external evidence
    -> Step 2.5 review assessment
```

# 2. Non-negotiable preservation rules

Treat the existing application as an immutable backbone.

Do not break, replace, redesign, or silently alter:

* The v31 frontend structure or visual language.
* Steps 1, 2.1, 2.2, 2.3, or 2.4.
* Existing routes or route response contracts.
* Existing DOM IDs relied upon by JavaScript.
* Existing navigation, state management, or company selection.
* Authentication or authorization.
* R2D2/COIN integration.
* TLS validation.
* Model routing.
* Existing LLM provider selection.
* Existing web-search behavior.
* Existing startup scripts, except for the smallest additive registration required by the application architecture.
* Existing dependency versions, including `helix-adk-adapter`.
* Existing data files and user changes unrelated to Step 2.5.

Do not run `git reset`, `git checkout --`, destructive cleanup, or mass formatting.

Do not commit or push unless explicitly requested.

Do not run `pip install`, rebuild `.venv`, or edit dependency locks unless implementation is impossible with the dependencies already present. If a dependency is truly required, stop and report it rather than installing it silently.

Use additive modules and minimal integration edits.

# 3. Mandatory first inspection

Before editing:

1. Find and read any `AGENTS.md`, contributor guidance, README files, and project-specific instructions.
2. Run `git status --short`.
3. Identify the actual application root.
4. Locate:

   * FastAPI or other backend entry point.
   * Existing router registration.
   * Step 2.2, 2.3, 2.4, and 2.5 code.
   * Existing Step 2.5 placeholder.
   * Existing Pydantic models.
   * Existing persistence or audit-store pattern.
   * Existing frontend HTML, JavaScript, and CSS.
   * `web_search_agent.py`.
   * `llm_gateway.py`.
   * Existing model-routing code.
   * Existing test framework and fixtures.
   * Existing logging conventions.
   * Existing configuration-loading conventions.
5. Search for all Step 2.5 references.
6. Search for all upstream company, event-factor, sector-factor, RRR, and workflow status schemas.
7. Read the relevant implementations before designing replacements.

Potential paths seen in earlier RPR work include:

```text
marketdev_start.sh
app/backend/rpr_search_agent.py
app/backend/web_search_agent.py
app/backend/llm_gateway.py
app/backend/market_event_scout.py
app/backend/rapid-portfolio/
```

These are hints only. Use the real repository structure.

If Step 2.5 infrastructure already exists, extend it. Do not create a competing implementation.

# 4. Current security boundary

MarketDev live SEC connectivity is not yet approved.

The following remain unresolved:

* Outbound HTTPS access to `data.sec.gov`.
* Outbound HTTPS access to `www.sec.gov`.
* Corporate proxy requirements.
* Public DNS resolution.
* Public CA versus Citi CA trust behavior.
* Outbound host allow-list requirements.
* The approved RPR SEC User-Agent/contact string.

Therefore:

* Implement the entire pipeline.
* Make fixture mode the default.
* Implement the live transport behind explicit configuration.
* Do not enable live SEC access.
* Do not issue live SEC requests.
* Do not test SEC DNS or connectivity.
* Do not use `curl`, `wget`, a browser, Python, or any other tool to contact SEC hosts during implementation.
* Do not bypass TLS.
* Do not set `verify=False`.
* Do not invent an approved SEC User-Agent.
* Do not reuse `CITI_CERT_PATH` for public SEC hosts unless the platform team explicitly confirms that requirement later.
* A request for live mode without all required configuration must fail closed with a clear activation-blocked response.

The approved enterprise web-search integration may use only RPR’s existing web-search path. Do not introduce a new public search provider, scraper, browser automation path, or API key.

# 5. Recommended package structure

Follow existing repository conventions. If no Step 2.5 backend package exists, create a cohesive package similar to:

```text
app/backend/step25/
    __init__.py
    config.py
    enums.py
    models.py
    errors.py
    cik_resolver.py
    sec_transport.py
    sec_client.py
    sec_filings.py
    sec_xbrl.py
    sec_text.py
    web_provider.py
    evidence_normalizer.py
    conflict_detector.py
    assessment_prompt.py
    assessment_service.py
    orchestration.py
    repository.py
    router.py
```

Do not force these exact filenames if the project has a better established convention.

Separate responsibilities:

* Transport performs controlled HTTP or fixture reads.
* SEC client knows SEC endpoints.
* Parsers convert raw source material into typed internal records.
* Normalizer produces the common evidence schema.
* Repository stores immutable source snapshots and versioned assessment runs.
* Assessment service calls the existing LLM gateway.
* Router exposes the feature through the existing backend.
* UI consumes only supported API contracts.

# 6. Operating modes and configuration

Implement explicit modes.

Suggested configuration:

```text
RPR_STEP25_SEC_MODE=fixture|live
RPR_STEP25_WEB_MODE=fixture|approved
RPR_STEP25_LIVE_SEC_ENABLED=false
RPR_SEC_USER_AGENT=
RPR_SEC_MAX_REQUESTS_PER_SECOND=1
RPR_SEC_CONNECT_TIMEOUT_SECONDS=5
RPR_SEC_READ_TIMEOUT_SECONDS=20
RPR_SEC_MAX_RETRIES=5
RPR_SEC_CACHE_TTL_SECONDS=86400
RPR_SEC_CA_BUNDLE=
RPR_STEP25_ASSESSMENT_PROMPT_VERSION=step25-sec-web-v1
```

Requirements:

* Default SEC mode: `fixture`.
* Default web mode: `fixture`, unless the current application already has a safe local default.
* Live SEC mode requires:

  * `RPR_STEP25_SEC_MODE=live`
  * `RPR_STEP25_LIVE_SEC_ENABLED=true`
  * A nonempty approved `RPR_SEC_USER_AGENT`
  * Valid TLS configuration
* The live transport must allow only:

  * `data.sec.gov`
  * `www.sec.gov`
* The host allow-list must not be caller-controlled through an API request.
* Reject redirects to non-allow-listed hosts.
* Use HTTPS only.
* Do not accept URL strings directly from frontend callers.
* Construct known SEC URLs internally.
* Default to one request per second and sequential requests.
* Permit at most two requests per second under the current RPR policy, even though the SEC’s published ceiling is higher.
* Honor `Retry-After`.
* Use exponential backoff with bounded jitter for 429 and transient 5xx responses.
* Do not retry permanent 4xx responses other than 408/429.
* Enforce response-size limits.
* Enforce connect and read timeouts.
* Send `Accept-Encoding: gzip, deflate`.
* Never expose the User-Agent contact value in frontend output.

Add a configuration-only preflight method that reports:

```json
{
  "sec_mode": "fixture",
  "live_sec_enabled": false,
  "user_agent_configured": false,
  "allowed_hosts": ["data.sec.gov", "www.sec.gov"],
  "tls_verification": "required",
  "connectivity_test_performed": false,
  "activation_blockers": []
}
```

This preflight must not perform DNS or network calls.

# 7. SEC transport abstraction

Implement a typed transport interface with at least:

```python
class SecTransport(Protocol):
    def get_json(self, resource: SecResource) -> SecResponse: ...
    def get_text(self, resource: SecResource) -> SecResponse: ...
```

Implement:

## FixtureSecTransport

* Reads committed fixture files only.
* Rejects path traversal.
* Never accesses the network.
* Returns the same metadata shape as live mode.
* Supports deterministic failure fixtures:

  * 403
  * 429 followed by success
  * timeout
  * malformed JSON
  * missing filing
  * oversized response

## LiveSecTransport

* Structurally complete.
* Disabled by default.
* Performs all configuration checks before a request.
* Uses the project’s existing HTTP client if suitable.
* Reuses existing proxy behavior only through standard approved configuration.
* Performs TLS verification without exceptions.
* Applies allow-list, timeout, rate-limit, retry, caching, and audit controls.
* Raises a typed activation-blocked exception when approval/configuration is incomplete.

Do not call the live transport during this task.

# 8. Official SEC sources

Support these official source patterns:

```text
https://www.sec.gov/files/company_tickers.json
https://www.sec.gov/files/company_tickers_exchange.json
https://data.sec.gov/submissions/CIK##########.json
https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json
https://data.sec.gov/api/xbrl/companyconcept/CIK##########/{taxonomy}/{concept}.json
https://data.sec.gov/api/xbrl/frames/{taxonomy}/{concept}/{unit}/{period}.json
https://www.sec.gov/Archives/edgar/data/{cik_without_leading_zeros}/{accession_without_dashes}/{primary_document}
```

Initial implementation must use:

* Company ticker mappings.
* Submissions.
* Company Facts.
* Filing archive documents.

Company Concept and Frames should be supported by typed URL builders or interfaces but do not need to be part of the default Step 2.5 run.

Rules:

* CIK in data API URLs must be exactly ten digits with leading zeros.
* Archive CIK directory uses the integer CIK without leading zeros.
* Archive accession directory removes dashes.
* Validate accession numbers with a strict pattern.
* Validate primary-document names and prevent path traversal.
* Never accept an arbitrary archive path from a client request.

# 9. Safe company and CIK resolution

Step 2.5 must never modify Step 2.2’s confirmed identity. Store Step 2.5 identity resolution as a separate overlay.

Implement these statuses exactly unless the repository already has an equivalent controlled vocabulary:

```text
CIK_CONFIRMED
CIK_REVIEW_REQUIRED
CIK_UNRESOLVED
SEC_NOT_APPLICABLE
```

Resolution priority:

1. Existing confirmed CIK already stored by Step 2.2.
2. Exact CIK supplied by an authorized upstream record.
3. Exact ticker match against the official ticker mapping.
4. Exact normalized legal-name match when unique.
5. Otherwise manual review.

Safety rules:

* Normalize punctuation, capitalization, whitespace, and standard corporate suffixes for candidate comparison.
* Preserve the original input and matched SEC name.
* Do not use fuzzy name similarity to automatically confirm.
* Do not select the first candidate when multiple candidates remain.
* Do not treat a subsidiary as its parent automatically.
* Confirm ticker/name candidates against the submissions record when live mode is later enabled.
* A ticker match alone is a candidate, not immutable proof, because SEC ticker mapping coverage is not guaranteed.
* Private/non-filing companies return `SEC_NOT_APPLICABLE` or `CIK_UNRESOLVED` with an explicit reason.
* Foreign private issuers are out of scope for the initial POC unless existing product configuration says otherwise.
* Never fabricate a CIK.

Return a typed result such as:

```json
{
  "company_id": "internal-company-id",
  "input_name": "Example Company",
  "input_ticker": "EXM",
  "input_cik": null,
  "normalized_cik": "0000000000",
  "sec_entity_name": "EXAMPLE COMPANY",
  "status": "CIK_REVIEW_REQUIRED",
  "method": "exact_ticker_candidate",
  "match_confidence": "MEDIUM",
  "candidate_count": 1,
  "candidates": [],
  "reason": "Ticker matched; confirmation is still required.",
  "source_url": "https://www.sec.gov/files/company_tickers.json",
  "retrieved_at": "ISO-8601 timestamp"
}
```

Use enums instead of unconstrained strings where practical.

# 10. Filing metadata ingestion

Parse the columnar `filings.recent` structure safely.

Do not assume every array has equal length without validation. Produce a typed parsing error if required columns are inconsistent.

Normalize at least:

```text
accession_number
filing_date
report_date
acceptance_datetime
act
form
file_number
film_number
items
size
is_xbrl
is_inline_xbrl
primary_document
primary_doc_description
archive_index_url
primary_document_url
```

Initial selection policy:

* Latest non-amended 10-K.
* Latest one or two non-amended 10-Q filings.
* 8-K metadata within a configurable assessment window.
* Relevant amendments, including 10-K/A and 10-Q/A, retained alongside the original.
* Do not silently replace an original filing with an amendment.
* Set `amendment_flag`.
* Set `supersedes_accession_number` only when the relationship can be established deterministically.
* Otherwise retain both records and leave the relationship unresolved.
* Deduplicate by accession number.
* Sort by accepted datetime, then filing date.
* Preserve filing date, accepted datetime, report date, and retrieval date separately.

Support additional submissions-history files referenced by `filings.files` when the requested window requires older material, but do not fetch them in the default fixture demo unless included in fixtures.

# 11. SEC raw-response storage and caching

Use the existing audit/evidence store if one exists.

If none exists, implement the smallest repository-local runtime store consistent with existing conventions. Do not create a new database server.

For every raw artifact record:

```text
artifact_id
run_id
source_type
source_url
retrieved_at
http_status
content_type
content_length
sha256
cache_key
cache_hit
request_attempt
transport_mode
local_storage_reference
```

Requirements:

* Preserve the exact raw response bytes in an immutable snapshot.
* Compute SHA-256.
* Never overwrite a previous snapshot with different bytes.
* Use content-addressed or versioned storage.
* Store a manifest linking normalized evidence records to raw artifacts.
* Cache by canonical SEC resource identity.
* Cache successes.
* Do not cache malformed responses as successful results.
* Respect configured TTL for reuse while retaining immutable historical snapshots.
* Make fixture runs reproducible.
* Do not store secrets.
* Audit logging should record whether a User-Agent profile was configured, not expose the contact string.

# 12. Company Facts and XBRL normalization

Parse Company Facts without treating all tags as interchangeable.

For every normalized XBRL fact preserve:

```text
taxonomy
concept
label
description
unit
value
start
end
instant
fiscal_year
fiscal_period
form
filed
frame
accession_number
source_url
retrieved_at
```

Rules:

* Preserve taxonomy and concept separately.
* Preserve units.
* Preserve period semantics.
* Distinguish instant facts from duration facts.
* Preserve fiscal year and fiscal period.
* Preserve filing form and accession number.
* Preserve amendments and repeated facts.
* Never silently choose a value solely because it is last in an array.
* Select facts aligned with the chosen filing and period.
* Explain deterministic selection in code comments and documentation.
* Do not calculate ratios or derived financial metrics unless an existing approved RPR methodology already defines them.
* Do not allow the LLM to perform authoritative arithmetic.
* If approved derived metrics exist, calculate them deterministically in Python and store:

  * Formula identifier
  * Inputs and evidence IDs
  * Exact arithmetic
  * Output unit
  * Method/version
* If no approved metric profile exists, production assessment must continue using narrative and raw reported facts without inventing one.

Implement two concept profiles:

1. `production_approved`:

   * Loaded from existing configuration if available.
   * Empty/fail-explicitly if no approved list exists.
   * Must never contain invented production requirements.

2. `demo_fixture`:

   * Contains only the small set of concepts represented by committed fixtures.
   * Clearly labeled as demo-only.
   * Must not be represented as RPR policy.

# 13. Deterministic filing-text extraction

Retrieve filing HTML through the transport abstraction.

Treat filing content as untrusted data:

* Never execute scripts.
* Remove script, style, navigation, and hidden content.
* Normalize whitespace.
* Preserve tables as bounded readable text when useful.
* Do not render filing HTML directly into the RPR page.
* Escape all displayed text.
* Enforce document and excerpt size limits.

Implement deterministic section detection for relevant 10-K/10-Q content, including where present:

```text
Risk Factors
Management’s Discussion and Analysis
Liquidity and Capital Resources
Legal Proceedings
Controls and Procedures
Material Changes
Debt
Covenants
Going Concern
Cybersecurity
Concentrations
Commitments and Contingencies
Subsequent Events
```

Requirements:

* Use heading/Item patterns and document structure.
* Avoid naïvely selecting the table-of-contents occurrence.
* Record start/end offsets or equivalent extraction anchors.
* Record extraction method and confidence.
* Bound every excerpt by configurable character/token limits.
* Keep the complete sanitized document out of the LLM context.
* Store only the top relevant bounded sections for assessment.
* Preserve the primary-document URL and accession number.
* If section extraction is uncertain, mark it for review rather than fabricating certainty.

# 14. Unified evidence schema

Implement a typed normalized evidence record.

Use existing project naming where compatible, but preserve these semantics:

```json
{
  "evidence_id": "",
  "run_id": "",
  "company_id": "",
  "cik": "",
  "cik_match_status": "CIK_CONFIRMED",
  "evidence_class": "reported_fact | derived_metric | extracted_text | llm_interpretation | web_evidence",
  "source_kind": "sec_submissions | sec_xbrl | sec_filing | approved_web",
  "form": null,
  "filing_date": null,
  "accepted_datetime": null,
  "accession_number": null,
  "supersedes_accession_number": null,
  "document_name": null,
  "section": null,
  "taxonomy": null,
  "fact_name": null,
  "value": null,
  "unit": null,
  "period_start": null,
  "period_end": null,
  "instant": null,
  "fiscal_year": null,
  "fiscal_period": null,
  "filed_date": null,
  "published_at": null,
  "source_title": null,
  "source_publisher": null,
  "source_url": "",
  "retrieved_at": "",
  "as_of": "",
  "evidence_type": "",
  "extraction_method": "deterministic_xbrl | deterministic_text_pattern | approved_web_result | llm_interpretation | manual",
  "source_excerpt": "",
  "extraction_confidence": "HIGH | MEDIUM | LOW | NOT_APPLICABLE",
  "match_confidence": "HIGH | MEDIUM | LOW | NOT_APPLICABLE",
  "conflict_flag": false,
  "conflict_notes": "",
  "related_step23_factor_ids": [],
  "related_step24_factor_ids": [],
  "raw_artifact_id": "",
  "content_sha256": "",
  "metadata": {}
}
```

Validation rules:

* Every SEC filing/XBRL evidence record requires both `source_url` and `accession_number`.
* Every web record requires `source_url`, title or publisher where available, retrieval time, and a bounded excerpt.
* Web records must not invent an SEC accession number.
* Every record requires `evidence_id`, `company_id`, `retrieved_at`, `as_of`, and provenance.
* `llm_interpretation` may reference source evidence IDs but may not replace source evidence.
* `reported_fact` is reserved for company-reported SEC/XBRL facts.
* `web_evidence` is never relabeled as a reported SEC fact.
* Store source and assessment dates distinctly.
* Reject invalid enum values.
* Reject citations to nonexistent evidence IDs.

# 15. Approved-web evidence lane

Inspect `web_search_agent.py` and reuse its real interface.

Create a thin Step 2.5 adapter instead of duplicating search logic.

The adapter must:

* Accept company identity plus relevant Step 2.3 and Step 2.4 factor context.
* Generate bounded, auditable queries.
* Call only the existing approved enterprise search path.
* Preserve the original query.
* Preserve returned title, URL, publisher/domain, publication date when available, retrieval time, excerpt/snippet, and provider metadata.
* Deduplicate canonical URLs.
* Reject dangerous or invalid URL schemes.
* Limit results per query and total results per company.
* Convert results to `web_evidence`.
* Never present snippets as verified facts.
* Never overwrite SEC evidence.
* Keep approved web evidence in a visibly separate lane.
* Surface unavailable search as a partial-source condition, not total pipeline failure when SEC evidence is still available.

Use factor-driven query templates such as:

```text
"{company}" liquidity debt covenant
"{company}" rating agency action
"{company}" regulatory legal investigation
"{company}" cybersecurity incident
"{company}" management change
"{company}" restructuring bankruptcy going concern
"{company}" supply chain disruption
"{company}" + specific Step 2.3 event-factor label
"{company}" + specific Step 2.4 sector-factor label
```

Do not run every generic query. Select queries based on actual upstream factors and configured limits.

Implement `FixtureWebEvidenceProvider` for deterministic offline tests and `ApprovedWebEvidenceProvider` for the existing enterprise path.

Fixture web evidence must be clearly marked:

```text
transport_mode=fixture
current_fact=false
demo_only=true
```

Do not imply that fixture snippets represent current market conditions.

# 16. SEC versus web responsibility

Preserve this policy:

* SEC filings and XBRL are authoritative for company-reported facts and disclosures.
* Approved-web evidence provides external, market, contextual, or disconfirming evidence.
* Web evidence must never silently override SEC-reported evidence.
* SEC evidence must not be treated as proof that no later external event occurred.
* Conflicts must be surfaced with both sources retained.
* The retrieval layer does not silently resolve conflicting evidence.
* The analyst remains the decision-maker.

Implement conflict support in two layers:

1. Deterministic candidate detection:

   * Same factor but inconsistent dates/values.
   * Web result alleges an event not present in the current filing set.
   * Multiple SEC facts for the same concept/period/unit.
   * Amendment versus original filing.
   * Stale evidence versus assessment date.

2. Assessment-layer interpretation:

   * The LLM may describe a conflict.
   * It must cite all involved evidence IDs.
   * It must not delete or overwrite either side.
   * It must state when evidence is insufficient to resolve the conflict.

# 17. Step 2.5 assessment input

Construct a bounded typed input package containing:

```text
assessment_run_id
company identity
CIK resolution
assessment as-of date
selected Step 2.3 factors
selected Step 2.4 factor version
SEC evidence records
approved-web evidence records
conflict candidates
source gaps
freshness metadata
prompt version
schema version
```

Do not send:

* Whole filings.
* Whole Company Facts responses.
* Raw search result payloads.
* Secrets.
* Internal credentials.
* Unbounded excerpts.
* Evidence unrelated to the selected company/factors.

Apply deterministic context limits. Record excluded evidence IDs and the reason for exclusion.

# 18. Assessment prompt and output contract

Use the existing `llm_gateway.py` and existing model-routing configuration.

Do not add a new model provider.

Create a versioned Step 2.5 system prompt that tells the model:

* Use only supplied evidence.
* Distinguish SEC from web.
* Cite evidence IDs for every material claim.
* Treat web snippets as external claims, not reported facts.
* Surface contradictions.
* Do not invent facts, calculations, thresholds, ratings, or dates.
* Do not perform unapproved financial ratios.
* Do not change RRR.
* Do not make a final credit decision.
* Return valid JSON matching the schema.
* Return insufficient evidence when appropriate.

First reuse existing RPR enums and methodology if present.

If the repository has no Step 2.5 output vocabulary, use this review-only contract:

```json
{
  "assessment_id": "",
  "company_id": "",
  "as_of": "",
  "prompt_version": "",
  "model_metadata": {},
  "headline": "",
  "company_specific_risk_direction": "IMPROVING | STABLE | DETERIORATING | INDETERMINATE",
  "rrr_review_recommendation": "NO_CHANGE_REVIEW_INDICATED | REVIEW_FOR_POSSIBLE_UPGRADE | REVIEW_FOR_POSSIBLE_DOWNGRADE | INSUFFICIENT_EVIDENCE",
  "recommendation_is_non_binding": true,
  "overall_confidence": "HIGH | MEDIUM | LOW",
  "factor_assessments": [
    {
      "factor_id": "",
      "factor_source_step": "2.3 | 2.4",
      "assessment": "",
      "direction": "SUPPORTING | DISCONFIRMING | MIXED | INSUFFICIENT",
      "evidence_ids": [],
      "confidence": "HIGH | MEDIUM | LOW"
    }
  ],
  "supporting_evidence": [
    {
      "statement": "",
      "evidence_ids": []
    }
  ],
  "disconfirming_evidence": [
    {
      "statement": "",
      "evidence_ids": []
    }
  ],
  "conflicts": [
    {
      "description": "",
      "evidence_ids": [],
      "resolution_status": "UNRESOLVED | ANALYST_REVIEW_REQUIRED"
    }
  ],
  "evidence_gaps": [],
  "freshness_warnings": [],
  "analyst_questions": [],
  "reasoning_summary": "",
  "workflow_action": "CONTINUE_REVIEW | REQUEST_MORE_EVIDENCE | ESCALATE_TO_ANALYST | DEFER_ASSESSMENT"
}
```

Enforcement:

* Parse and validate through Pydantic.
* Validate every cited evidence ID against the input package.
* Reject uncited material claims.
* Attempt at most one controlled JSON repair through the existing gateway if that is already an approved pattern.
* Otherwise return `MODEL_OUTPUT_INVALID`.
* Persist the raw model response separately from the validated assessment.
* Record model name, prompt version, schema version, run ID, and timestamp.
* Never write the recommendation into the authoritative RRR field.

# 19. Orchestration and run states

Implement an orchestration service with these phases:

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
PARTIAL
BLOCKED
FAILED
```

A run should:

1. Validate the Step 2.2 company.
2. Load Step 2.3 and Step 2.4 context.
3. Resolve/validate CIK.
4. Stop safely for `CIK_UNRESOLVED`, `CIK_REVIEW_REQUIRED`, or `SEC_NOT_APPLICABLE`, unless an authorized manual override already exists.
5. Collect SEC metadata.
6. Select filings.
7. Normalize XBRL evidence.
8. Extract bounded filing sections.
9. Collect approved-web evidence.
10. Detect conflict candidates.
11. Build the assessment package.
12. Call the LLM only if sufficient evidence exists.
13. Validate and store output.
14. Return run status plus provenance.

Ensure rerunning the same fixture request is idempotent or generates a new versioned run without overwriting the prior run.

# 20. Typed error taxonomy

Use structured errors such as:

```text
STEP25_UPSTREAM_NOT_READY
CIK_REVIEW_REQUIRED
CIK_UNRESOLVED
SEC_NOT_APPLICABLE
SEC_LIVE_MODE_BLOCKED
SEC_CONFIGURATION_INVALID
SEC_HOST_NOT_ALLOWED
SEC_TLS_CONFIGURATION_INVALID
SEC_RATE_LIMITED
SEC_SOURCE_UNAVAILABLE
SEC_RESPONSE_INVALID
SEC_FILING_NOT_FOUND
WEB_SOURCE_UNAVAILABLE
INSUFFICIENT_EVIDENCE
MODEL_OUTPUT_INVALID
EVIDENCE_VALIDATION_FAILED
```

Frontend responses should include:

```json
{
  "code": "SEC_LIVE_MODE_BLOCKED",
  "message": "Live SEC access is not activated for MarketDev.",
  "retryable": false,
  "details": {
    "missing_approvals": []
  }
}
```

Do not send raw stack traces to the browser.

# 21. Backend API

Follow the application’s existing route and response conventions.

If there is no established Step 2.5 API, add a router equivalent to:

```text
GET  /api/rpr/step25/status
GET  /api/rpr/step25/companies
GET  /api/rpr/step25/companies/{company_id}/context
POST /api/rpr/step25/cik/resolve
POST /api/rpr/step25/runs
GET  /api/rpr/step25/runs/{run_id}
GET  /api/rpr/step25/runs/{run_id}/evidence
GET  /api/rpr/step25/runs/{run_id}/assessment
GET  /api/rpr/step25/runs/{run_id}/manifest
```

Suggested run request:

```json
{
  "company_id": "",
  "as_of": "YYYY-MM-DD",
  "sec_mode": "fixture",
  "web_mode": "fixture",
  "include_forms": ["10-K", "10-Q", "8-K"],
  "assessment_enabled": true
}
```

Requirements:

* Do not allow request bodies to enable live SEC mode if server configuration disables it.
* Authorize routes using existing application controls.
* Do not create a second FastAPI application.
* Register the router in the existing backend.
* Preserve existing health and status endpoints.
* Reuse existing response wrappers if present.
* Use async only if consistent with the project; do not mix blocking HTTP into an async event loop.
* If runs are synchronous, provide honest status behavior.
* Do not invent a background queue unless the application already has one.

# 22. Frontend implementation

Implement the feature inside the existing v31 Step 2.5 area.

Do not replace the page or redesign navigation.

Reuse existing:

* CSS variables.
* Typography.
* Cards.
* Buttons.
* Status badges.
* Tables.
* Modals/drawers.
* Loading indicators.
* Error patterns.
* State-management patterns.

The Step 2.5 panel should include:

## Upstream readiness

Display:

* Selected company.
* Step 2.2 status.
* Number of related Step 2.3 factors.
* Step 2.4 sector-factor version.
* Assessment as-of date.
* Whether Step 2.5 can run.

## Mode banner

Display clearly:

```text
DEMO / FIXTURE MODE — No live SEC request will be made
```

If live SEC is configured but not approved:

```text
LIVE SEC MODE BLOCKED — MarketDev activation requirements are incomplete
```

## Company/CIK identity

Display:

* Company name.
* Ticker.
* Internal company ID.
* CIK.
* SEC entity name.
* CIK match status.
* Resolution method.
* Confidence.
* Manual-review reason.

## Evidence controls

Provide:

* Assessment as-of date.
* Run Demo button.
* Refresh fixture run if appropriate.
* Separate SEC and web mode labels.
* No frontend switch capable of bypassing server-side live-mode controls.

## Progress

Show the real orchestration phases rather than a fake timer.

## SEC evidence lane

Display:

* Selected filing forms.
* Filing and accepted dates.
* Accession number.
* Filing links.
* XBRL facts with units and periods.
* Extracted filing sections.
* Source excerpts.
* Retrieval timestamp.
* Evidence confidence.
* Amendment relationships.
* Provenance links.

## Approved-web evidence lane

Display separately:

* Query.
* Title.
* Publisher/domain.
* Publication date if available.
* Retrieved timestamp.
* Snippet.
* Related factors.
* Fixture/demo label when applicable.
* Link to source.

## Conflict and gap panel

Display:

* SEC-versus-web conflicts.
* Amendment/original conflicts.
* Multiple-XBRL-value conflicts.
* Stale evidence.
* Missing source types.
* Unresolved questions.
* Analyst-review requirement.

## Step 2.5 assessment

Display:

* Headline.
* Company-specific risk direction.
* Nonbinding RRR review recommendation.
* Overall confidence.
* Factor-by-factor assessments.
* Supporting evidence.
* Disconfirming evidence.
* Evidence gaps.
* Analyst questions.
* Workflow action.
* Model/prompt metadata.
* Explicit statement:

```text
This output is a review recommendation only. No RRR value was changed.
```

## Provenance interaction

Evidence IDs cited in the assessment must be clickable or expandable to reveal the matching source record.

## Export

If an export pattern already exists, add an export for:

* Normalized evidence JSON.
* Assessment JSON.
* Run manifest JSON.

Do not introduce a new download framework if none exists.

Accessibility:

* Use proper labels.
* Support keyboard interaction.
* Do not rely on color alone.
* Escape source content.
* Preserve usable mobile/desktop behavior consistent with the current application.

# 23. Fixture/demo package

Build one complete non-confidential public-company demo.

Prefer an existing public test company already present in the repository. Otherwise use a clearly labeled public fixture company such as Apple, with known CIK `0000320193`.

Do not use a confidential Step 2.2 portfolio company.

Fixtures should include:

```text
company identity
ticker mapping subset
submissions JSON subset
Company Facts JSON subset
10-K or 10-Q filing HTML subset
approved-web results subset
Step 2.3 factors
Step 2.4 sector-factor version
expected normalized evidence
expected assessment or deterministic mocked LLM output
```

Fixture requirements:

* Schema-accurate.
* Small enough for tests.
* Preserve realistic accession and period shapes.
* Do not claim fixture data is current.
* Include source URLs and retrieval timestamps.
* Label web fixture content as demo-only.
* Include at least:

  * One reported XBRL fact.
  * One extracted filing section.
  * One web evidence item.
  * One supporting relationship.
  * One disconfirming or conflict candidate.
  * One evidence gap.
  * One amendment or duplicate test case.
* If the LLM cannot run in the test environment, use the project’s existing model mock pattern. Do not make tests depend on a live model.

The end-to-end demo must work without internet access.

# 24. Required tests

Use the existing test framework.

Add unit tests for:

## Configuration/security

* Fixture mode is default.
* Live mode fails closed.
* Missing User-Agent blocks live mode.
* Non-HTTPS URLs are rejected.
* Non-allow-listed hosts are rejected.
* Redirects to other hosts are rejected.
* TLS verification cannot be disabled.
* Response size limits work.
* No network call occurs in fixture tests.

## CIK resolution

* Ten-digit zero padding.
* Existing confirmed CIK.
* Exact ticker candidate.
* Unique exact-name candidate.
* Ambiguous ticker/name.
* Renamed entity.
* Subsidiary versus parent.
* Private/non-filer.
* Foreign issuer out of scope.
* No fuzzy auto-confirmation.

## SEC parsing

* Columnar submissions parsing.
* Unequal array lengths.
* Latest 10-K selection.
* Latest two 10-Q selections.
* 8-K window filtering.
* Accession deduplication.
* Amendment retention.
* Archive URL construction.
* Invalid accession rejection.
* Invalid document-path rejection.

## XBRL

* Unit preservation.
* Instant versus duration periods.
* Filing/accession alignment.
* Duplicate values.
* Amendment values.
* Empty production metric profile.
* Demo-only concept profile.
* No unapproved derived metric.

## Filing text

* Script/style stripping.
* HTML escaping.
* Table-of-contents avoidance.
* Section detection.
* Bounded excerpts.
* Low-confidence extraction.
* Oversized document handling.

## Transport

* Cache hit.
* Cache miss.
* SHA-256 manifest.
* 429 plus Retry-After.
* Bounded exponential retry.
* Permanent 4xx handling.
* Malformed JSON.
* Timeout.
* Immutable snapshots.

## Web lane

* Existing adapter invocation through a mock.
* Query limits.
* URL deduplication.
* Provenance retention.
* Invalid URL rejection.
* Fixture labels.
* Web failure produces partial status when SEC succeeds.

## Evidence schema

* SEC evidence requires URL and accession.
* Web evidence requires URL and provenance.
* Web evidence cannot masquerade as SEC fact.
* Invalid enums rejected.
* Assessment citations must exist.
* Raw artifact linkage.
* Conflict preserves both records.

## Assessment

* Whole filing never enters the LLM payload.
* Context limits.
* Valid structured response.
* Invalid JSON.
* Invalid evidence citation.
* Uncited material claim.
* Insufficient evidence.
* RRR is never mutated.
* Upstream records remain unchanged.

Add at least one offline integration test:

```text
fixture Step 2.2 company
-> upstream factor load
-> CIK resolution
-> SEC fixture ingestion
-> filing/XBRL normalization
-> web fixture ingestion
-> conflict detection
-> model mock
-> validated Step 2.5 assessment
-> persisted run manifest
-> API response
```

Run targeted new tests and the relevant existing regression suite.

Do not claim tests passed unless you ran them.

# 25. Documentation

Create or update a concise implementation document, following repository conventions, covering:

* Architecture.
* SEC and web lane separation.
* Data flow.
* Evidence schema.
* Configuration.
* Fixture demo instructions.
* Live activation requirements.
* Official SEC endpoints.
* Fair-access behavior.
* CIK safety.
* XBRL limitations.
* Filing-text limitations.
* Conflict handling.
* Audit/reproducibility.
* API contracts.
* Test commands.
* Known limitations.
* Remaining product decisions.

Document these unresolved production decisions explicitly:

1. Approved SEC User-Agent/contact convention.
2. MarketDev egress/proxy/DNS/CA/allow-list approval.
3. Approved Step 2.5 XBRL concept/metric profile.
4. Which existing Step 2.2 identifiers strengthen CIK resolution.
5. Whether foreign private issuers are in scope.
6. Evidence retention/versioning policy.
7. Final Step 2.5 methodology vocabulary if one already does not exist.

Reference official guidance:

```text
https://www.sec.gov/search-filings/edgar-application-programming-interfaces
https://www.sec.gov/about/developer-resources
https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data
https://www.sec.gov/files/company_tickers.json
https://www.sec.gov/files/company_tickers_exchange.json
```

# 26. Definition of done

Implementation is complete only when:

* Step 2.5 runs end to end with SEC and web fixtures.
* The UI displays both source lanes separately.
* Evidence provenance is preserved.
* CIK ambiguity stops safely.
* Filing/XBRL normalization is deterministic.
* Complete filings never enter the LLM.
* Assessment output is schema validated.
* Every material model claim cites evidence IDs.
* Conflicts remain visible.
* RRR is not changed.
* Existing Steps 1–2.4 still work.
* Existing auth, TLS, startup, and model routing still work.
* Live SEC mode remains disabled and fail-closed.
* No live SEC connectivity test was attempted.
* Tests pass or all failures are reported accurately.
* Changed files are limited and documented.

# 27. Execution sequence

Proceed in this order:

1. Inspect repository and instructions.
2. Record existing dirty files and preserve them.
3. Map current Step 2.2–2.5 contracts.
4. Identify exact integration points.
5. Implement typed models and enums.
6. Implement configuration and fail-closed activation controls.
7. Implement fixture and live transport classes.
8. Implement CIK resolution.
9. Implement SEC submissions and filing selection.
10. Implement Company Facts normalization.
11. Implement deterministic filing-text extraction.
12. Implement raw artifact caching and manifests.
13. Implement approved-web and fixture-web adapters.
14. Implement normalized evidence and conflict handling.
15. Implement assessment prompt, validation, and orchestration.
16. Add backend routes.
17. Integrate the existing Step 2.5 frontend.
18. Add fixtures.
19. Add unit and integration tests.
20. Run targeted tests.
21. Run relevant regression tests.
22. Inspect the final diff for accidental changes.
23. Provide the final handoff.

Do not pause merely to ask whether you should begin. Begin implementation.

Only stop for clarification if:

* The project root cannot be identified.
* There are irreconcilable competing Step 2.5 implementations.
* The required edit would overwrite unrelated user changes.
* A necessary dependency is missing and cannot be avoided.
* The existing application contract directly contradicts these requirements.

# 28. Final handoff format

At completion, report:

```text
IMPLEMENTATION RESULT
- Complete / Partial / Blocked

WHAT NOW WORKS
- ...

FILES CHANGED
- path: purpose

BACKEND CONTRACTS
- routes and important models

FRONTEND BEHAVIOR
- ...

SEC MODE
- fixture status
- live activation status
- confirmation that no live connectivity test occurred

WEB MODE
- fixture status
- approved enterprise adapter status

TESTS RUN
- exact command
- result

REGRESSION STATUS
- ...

SECURITY CONTROLS VERIFIED
- ...

UNRESOLVED ACTIVATION ITEMS
- ...

MANUAL DEMO
1. Exact command
2. Exact URL
3. Exact company/fixture to select
4. Exact buttons to press
5. Expected visible result

KNOWN LIMITATIONS
- ...

DIFF REVIEW
- Confirmation that Steps 1–2.4, auth, TLS, model routing, startup, and RRR storage were not modified except for documented additive integration.
```

Be precise. Do not state that something works unless supported by code inspection or a test you actually ran.
