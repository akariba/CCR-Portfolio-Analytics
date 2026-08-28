I need you to investigate how Rapid Portfolio Review can automatically retrieve SEC filings and SEC financial data for the future Step 2.5 company-level credit assessment.

This task is RESEARCH AND DESIGN ONLY.

Do not edit, create, delete, rename, or reformat any RPR files.
Do not install packages.
Do not change the MarketDev environment.
Do not change authentication, certificates, proxies, firewall rules, or allow-lists.
Do not expose credentials, tokens, internal URLs, certificate contents, confidential portfolio data, CAGIDs, or company exposures.
Do not make automated calls from MarketDev unless I explicitly authorize a later connectivity test.

## RPR USE CASE

Rapid Portfolio Review currently operates through:

1. Step 2.1 — scenario and assumptions.
2. Step 2.2 — confirmed portfolio and company selection.
3. Step 2.3 — confirmed event-driven risk factors.
4. Step 2.4 — versioned sector-inherent risk factors.
5. Step 2.5 — company-level assessment.

Step 2.5 must assess how the confirmed Step 2.3 and Step 2.4 factors affect each company selected in Step 2.2.

The first Step 2.5 evidence lane will use:

* SEC filings and SEC financial data;
* approved enterprise-web evidence.

CAM/internal evidence will be handled later as a separate independent lane.

The SEC capability should help Step 2.5 find company-specific evidence concerning:

* business and revenue exposure;
* risk-factor disclosures;
* management discussion and analysis;
* earnings and cash-flow deterioration;
* liquidity and available funding;
* debt and maturity profile;
* refinancing requirements;
* covenant or borrowing-base information when disclosed;
* collateral and asset quality;
* impairments and write-downs;
* customer, supplier or geographic concentration;
* segment information;
* restructuring and workforce reductions;
* going-concern language;
* legal or regulatory proceedings;
* material events;
* acquisitions and disposals;
* defaults, amendments or waivers;
* changes in auditor or internal controls;
* credit-rating disclosures;
* evidence supporting or contradicting the Step 2.3 and Step 2.4 risk factors.

The SEC retrieval layer must collect evidence. It must not make the final credit decision, invent an RRR, regenerate risk factors, or silently calculate unapproved financial ratios.

## RESEARCH SOURCES

Use official SEC documentation as the primary authority.

Investigate official sources including, where applicable:

* `data.sec.gov`;
* SEC EDGAR API documentation;
* SEC fair-access rules;
* EDGAR submissions JSON;
* SEC Company Facts/XBRL APIs;
* SEC filing archives;
* SEC company-ticker and CIK reference files;
* SEC daily and quarterly filing indexes;
* SEC RSS feeds.

Clearly distinguish:

1. Public EDGAR data-access APIs that may not require authentication.
2. EDGAR filing/submission APIs that require filer or user credentials.
3. Third-party commercial “SEC API” services that are not operated by the SEC.

RPR only needs to read public filings. It does not submit filings.

Provide direct official documentation URLs for every important technical claim.

## QUESTIONS TO ANSWER

### 1. Official access methods

Identify every practical official method for automatically retrieving:

* company submission history;
* recent filing metadata;
* filing accession numbers;
* primary filing documents;
* filing exhibits;
* inline XBRL documents;
* normalized Company Facts data;
* individual XBRL concepts;
* filing indexes;
* newly published filings.

For each method, report:

* endpoint pattern;
* HTTP method;
* response format;
* required parameters;
* authentication requirements;
* User-Agent requirements;
* rate limits;
* update frequency;
* advantages;
* limitations;
* suitability for RPR Step 2.5.

### 2. Company-to-CIK resolution

Explain how RPR should map a Step 2.2 company to an SEC CIK.

Investigate:

* official company-ticker/CIK mapping files;
* issuer legal names;
* tickers;
* CIK formatting and zero-padding;
* former company names;
* subsidiaries versus listed parent companies;
* ADRs and foreign private issuers;
* companies with multiple securities;
* non-US companies filing Forms 20-F, 40-F or 6-K;
* private companies;
* companies that do not file with the SEC.

Design a safe matching policy.

The system must never select a CIK merely because a company name looks similar. Define results such as:

* `CIK_CONFIRMED`;
* `CIK_REVIEW_REQUIRED`;
* `CIK_UNRESOLVED`;
* `SEC_NOT_APPLICABLE`.

Explain which identifiers should be stored in the Step 2.2 company record to make Step 2.5 reliable.

### 3. Relevant filing forms

Assess the Step 2.5 value of at least:

* 10-K;
* 10-Q;
* 8-K;
* 20-F;
* 40-F;
* 6-K;
* amendments such as 10-K/A and 10-Q/A;
* registration statements where relevant;
* material exhibits attached to filings.

For each form, explain:

* what credit-relevant information it normally contains;
* when Step 2.5 should retrieve it;
* whether it should be part of the initial proof of concept or a later phase.

### 4. Filing retrieval workflow

Design the complete retrieval sequence for one confirmed Step 2.2 company.

For example, investigate whether the correct sequence is:

1. Validate the company identifier.
2. Resolve and confirm its CIK.
3. Retrieve submissions metadata.
4. Filter relevant forms by filing date and assessment window.
5. select the required accession numbers;
6. retrieve Company Facts/XBRL data;
7. retrieve the primary filing document and relevant exhibits;
8. extract credit-relevant sections;
9. normalize evidence;
10. pass only normalized evidence into the Step 2.5 assessment prompt.

Confirm or correct this sequence.

### 5. Incremental updates

Explain how RPR can avoid downloading all filings repeatedly.

Cover:

* last-successful retrieval timestamp;
* accession-number deduplication;
* filing-date and accepted-date handling;
* amendments;
* newly added exhibits;
* caching;
* cache expiry;
* retries;
* partial success;
* stale evidence;
* as-of dates;
* reproducibility of a historical Step 2.5 assessment.

### 6. Evidence provenance

Design a machine-readable SEC evidence record containing, at minimum:

```json
{
  "evidence_id": "",
  "company_id": "",
  "cik": "",
  "form": "",
  "filing_date": "",
  "accepted_datetime": "",
  "accession_number": "",
  "document_name": "",
  "section": "",
  "fact_name": "",
  "value": null,
  "unit": "",
  "period_start": "",
  "period_end": "",
  "fiscal_year": "",
  "fiscal_period": "",
  "filed_date": "",
  "source_url": "",
  "retrieved_at": "",
  "evidence_type": "",
  "extraction_method": "",
  "source_excerpt": "",
  "confidence": ""
}
```

Critique and improve this schema.

Distinguish:

* reported SEC facts;
* deterministic derived metrics;
* extracted filing text;
* LLM interpretations;
* missing or conflicting evidence.

The source URL and accession number must remain retrievable for audit and review.

### 7. Credit-relevant extraction

Explain how to locate and extract relevant evidence from filings without sending an entire 10-K or 20-F directly to the assessment model.

Consider:

* filing section identification;
* HTML parsing;
* inline XBRL;
* tables;
* exhibits;
* Item 1A Risk Factors;
* Item 2 or Item 7 MD&A;
* liquidity and capital-resources sections;
* debt footnotes;
* maturity tables;
* segment notes;
* concentration disclosures;
* legal proceedings;
* subsequent events;
* controls and procedures;
* 8-K item numbers.

Recommend a retrieval-and-ranking method that separates deterministic parsing from LLM reasoning.

### 8. XBRL and deterministic metrics

Identify which reported facts may help the Step 2.5 assessment, such as:

* cash and cash equivalents;
* total debt;
* current assets and liabilities;
* revenue;
* operating income;
* interest expense;
* operating cash flow;
* capital expenditure;
* goodwill and impairments.

Do not invent a universal metric list or formula.

Explain:

* how concepts vary between issuers;
* company extensions;
* units;
* periods;
* instantaneous versus duration facts;
* amended filings;
* duplicate facts;
* fiscal calendars;
* restatements;
* limitations of Company Facts.

Recommend which calculations should remain deterministic in Python and which qualitative conclusions may be delegated to the assessment model.

### 9. Fair access and operational controls

Document the current official SEC requirements for:

* declared User-Agent;
* contact information;
* request rate;
* caching;
* retry/backoff;
* request concurrency;
* compression;
* avoiding excessive downloads;
* treatment of blocked or rate-limited requests.

Propose a conservative RPR policy that remains comfortably inside the SEC limit.

### 10. Citi MarketDev requirements

Without changing anything, determine what would likely be required for MarketDev to reach:

* `data.sec.gov`;
* `www.sec.gov`.

Investigate from available RPR deployment documentation only:

* approved HTTPS proxy usage;
* corporate CA certificate;
* outbound-host allow-list;
* DNS resolution;
* TLS verification;
* environment-variable conventions;
* SEC User-Agent configuration;
* timeout and retry configuration.

Do not recommend bypassing corporate controls.

If required information is unavailable, list the exact question that must be sent to the MarketDev/platform team.

### 11. Direct SEC versus enterprise web

Explain the separate roles of the two sources.

Expected distinction to validate:

* SEC APIs and filings provide authoritative company-reported evidence.
* Approved enterprise web search provides external evidence, market developments and disconfirming information.
* Web search must not replace SEC data for reported financial facts.
* SEC evidence and web evidence must retain separate provenance classes.
* Conflicting evidence must be preserved and surfaced.

### 12. Technical architecture options

Compare at least these options:

1. Direct official SEC REST/JSON APIs.
2. Direct SEC filing archive retrieval.
3. Official SEC indexes or RSS for monitoring.
4. A third-party SEC data provider.
5. A hybrid approach.

Compare:

* reliability;
* auditability;
* latency;
* data completeness;
* operational complexity;
* licensing;
* external dependency;
* security approval;
* suitability for Citi’s audited environment.

Recommend the smallest appropriate option for the initial Step 2.5 proof of concept.

### 13. Initial proof of concept

Design a one-company, read-only proof of concept that:

1. Uses a manually confirmed company and CIK.
2. Retrieves recent relevant filing metadata.
3. Retrieves the latest annual and quarterly filing.
4. Retrieves Company Facts data.
5. extracts a small number of credit-relevant evidence records;
6. retrieves approved-web evidence separately;
7. produces a normalized evidence package;
8. does not yet assign or change an RRR;
9. does not modify Steps 2.2–2.4.

Specify:

* test company selection criteria;
* inputs;
* outputs;
* success criteria;
* failure cases;
* logs;
* audit evidence;
* security controls;
* expected runtime;
* what must be demonstrated before integration into RPR.

## REQUIRED OUTPUT

Create a detailed report titled:

`SEC_AUTOMATED_ACCESS_FOR_RPR_STEP25.md`

Use these sections:

1. Executive explanation of the RPR use case.
2. Recommended SEC access method.
3. Official SEC endpoints and documentation.
4. Authentication and fair-access requirements.
5. Company-to-CIK resolution.
6. Relevant forms and credit use.
7. End-to-end retrieval workflow.
8. Incremental updates and caching.
9. Filing-text extraction.
10. XBRL and deterministic metrics.
11. Evidence-provenance schema.
12. SEC versus approved-web responsibilities.
13. MarketDev connectivity and security requirements.
14. Architecture options and comparison.
15. Recommended one-company proof of concept.
16. Exact unresolved questions.
17. Go/no-go recommendation for a connectivity test.

Finish with:

* a concise status matrix using `CONFIRMED`, `PARTIAL`, `NOT FOUND`, and `BLOCKED`;
* a list of official SEC source URLs;
* a list of facts that still require confirmation;
* the exact next action, but no implementation.

Return the full report and a concise chat summary. Do not modify RPR or run the proof of concept.
