STOP HERE AND FREEZE THE CURRENT IMPLEMENTATION.

READ THIS ENTIRE INSTRUCTION BEFORE TAKING ANY ACTION.

The current Step 2.5 Stylus POC has reached the correct architectural stopping point.

DO NOT start another architecture cycle.
DO NOT refactor the current implementation.
DO NOT create additional frameworks, layers, services, abstractions, or helper files unless they are strictly required to make the POC execute correctly.
DO NOT redesign working Steps 1–2.4.
DO NOT reopen decisions that have already been investigated and accepted.

======================================================================
CRITICAL PRINCIPLE — POC DOES NOT MEAN LOW QUALITY
======================================================================

This is a PURE POC from an engineering/lifecycle perspective.

A separate production team may later replace most or all of this code.

That means:

ENGINEERING MAY BE SIMPLE.
BUSINESS QUALITY MUST NOT BE SIMPLE.

Do NOT interpret "POC" as permission to reduce:

- data quality
- evidence quality
- analytical depth
- company matching accuracy
- SEC accuracy
- prompt quality
- credit-risk reasoning
- traceability
- output consistency
- feature usability
- UI quality
- validation quality
- failure honesty

The implementation may be disposable.

THE RESULT MUST BE HIGH QUALITY.

The POC should be strong enough that an experienced CCR / credit-risk user can evaluate the feature seriously rather than dismissing it as a generic LLM demonstration.

======================================================================
CURRENT STATE — ACCEPTED BASELINE
======================================================================

Treat the following findings and implementation as ACCEPTED unless a concrete execution defect proves otherwise.

----------------------------------------------------------------------
1. STEP 2.5 HTTP 409 / READINESS
----------------------------------------------------------------------

The legacy Step 2.5 blockers were traced correctly.

The new Stylus POC path now bypasses legacy SEC/web/H2M readiness requirements that are irrelevant when retrieval is performed through the Stylus/Runner preset.

Legacy:

- orchestrated
- hybrid
- direct_runner
- existing non-Stylus engines

must remain unchanged.

This behaviour is accepted.

DO NOT redesign readiness logic.

DO NOT globally disable blockers.

DO NOT weaken legacy safety checks.

----------------------------------------------------------------------
2. STYLUS PRESET INVOCATION
----------------------------------------------------------------------

The existing code audit established that the known-working Runner integration sends the FULL PRESET DEFINITION INLINE.

No proven API was found for invoking the manually saved Stylus preset directly by UUID.

Therefore:

- STOP investigating preset UUID invocation.
- DO NOT make the candidate UUID a blocker.
- DO NOT invent a preset_id API.
- DO NOT create a preset-management architecture.

For the POC, use the exact real SEC + WEB preset definition inline through the already-proven Runner mechanism.

The manually created SEC + WEB Stylus preset remains the BUSINESS SOURCE OF TRUTH.

The code must reproduce that exact configuration once captured.

----------------------------------------------------------------------
3. STEP 2.2 COMPANY IDENTIFIERS
----------------------------------------------------------------------

Current findings:

- CAGID exists and is populated.
- cagid_name may be available.
- MLE records may expose gfcid / gfcid_name.
- ticker is not directly present.
- CIK is not directly present.
- LEI / ISIN / CUSIP are not directly present.

Reuse the existing company identity / CikResolver capability.

Do NOT build a new production entity-master framework.

However, COMPANY INTEGRITY IS NON-NEGOTIABLE.

The company assessed in Step 2.5 must genuinely correspond to the selected Step 2.2 record.

Expected resolution order:

Step 2.2 CAGID
    ->
authoritative cagid_name when available
    ->
authoritative gfcid_name / MLE company identity if required
    ->
existing CikResolver / verified mapping
    ->
legal company
    ->
confirmed SEC registrant
    ->
verified CIK

Do NOT infer identity from:

- sector
- event narrative
- Step 2.3 factor wording
- Step 2.4 sector wording
- similarity to another company

Do NOT substitute:

- Salesforce
- Apple
- Microsoft
- Tesla
- or any other convenient issuer

unless that company is genuinely the selected Step 2.2 company.

If company identity cannot be established:

NO_COMPANY_IDENTITY_AVAILABLE

If legal identity is established but SEC registration cannot be confirmed:

NO_CONFIRMED_SEC_REGISTRANT

Fail honestly rather than produce a misleading result.

----------------------------------------------------------------------
4. STYLUS ROUTE
----------------------------------------------------------------------

The Stylus engine is already wired into the existing Step 2.5 /run path.

Offline/unit tests currently pass.

Preserve the current implementation.

Modify it only if the actual captured Stylus payload or a real E2E execution exposes a concrete compatibility defect.

----------------------------------------------------------------------
5. EVIDENCE HANDLING
----------------------------------------------------------------------

Keep the evidence implementation technically lightweight.

DO NOT build an enterprise evidence-management platform.

BUT evidence quality and provenance must remain strong.

There must be NO:

- fabricated source
- fabricated URL
- fabricated SEC filing
- fabricated accession number
- fabricated CIK
- fabricated publication date
- fabricated citation
- fabricated evidence ID presented as authoritative
- unsupported numerical precision

For SEC evidence retain, where available:

- company / registrant
- CIK
- filing form
- accession number
- filing date
- source URL
- relevant extracted evidence / statement

For web evidence retain, where available:

- source/provider
- title
- URL
- publication date
- relevant evidence
- retrieval context

If Runner SSE/tool execution returns structured source metadata, use that metadata.

Prefer actual tool metadata over asking the language model to reconstruct citations.

======================================================================
POC IMPLEMENTATION PHILOSOPHY
======================================================================

The POC code may use straightforward implementation shortcuts where appropriate.

Acceptable examples:

- one verified hard-wired SEC + WEB preset
- a small manually verified CAGID -> company -> CIK mapping
- explicit conditional branches
- simple dictionaries/config
- lightweight evidence objects
- minimal glue code
- a few demo-company mappings

These are acceptable ONLY if the underlying business data is REAL and VERIFIED.

Do NOT spend time building:

- enterprise abstraction layers
- generic model orchestration platforms
- reusable preset registries
- generalized plugin systems
- production entity-master architecture
- dependency-injection frameworks
- scalable distributed execution
- complex telemetry
- generalized persistence layers
- elaborate configuration infrastructure
- future-proof API abstractions
- production deployment architecture

If a simple solution solves the POC correctly, use it.

BUT NEVER trade analytical/data quality for engineering convenience.

======================================================================
FEATURE QUALITY BAR
======================================================================

The final Step 2.5 capability must demonstrate HIGH QUALITY in four dimensions:

1. DATA QUALITY
2. ANALYTICAL QUALITY
3. EVIDENCE QUALITY
4. USER EXPERIENCE QUALITY

----------------------------------------------------------------------
A. DATA QUALITY
----------------------------------------------------------------------

The final assessment must use the ACTUAL upstream RPR context:

- real selected Step 2.2 portfolio/company
- actual Step 2.3 Event-Driven Risk Factors
- actual Step 2.4 Sector-Inherent Risk Factors
- verified legal company identity
- verified SEC identity where applicable
- real SEC evidence
- real web evidence

Do NOT regenerate upstream Step 2.3/2.4 results from labels.

Do NOT replace them with generic summaries.

Do NOT use illustrative/mock company data in the final successful demonstration.

----------------------------------------------------------------------
B. ANALYTICAL QUALITY
----------------------------------------------------------------------

The output must resemble serious credit-risk analysis.

It must NOT simply summarize:

- news
- SEC filings
- company descriptions
- sector background

The model must translate evidence into CREDIT RISK implications.

Where relevant, assess:

- event exposure
- company-specific vulnerability
- sector sensitivity
- revenue impact
- profitability impact
- cash-flow implications
- liquidity
- leverage
- debt service
- refinancing risk
- maturity profile
- funding access
- covenant pressure
- collateral / borrowing-base implications
- rating pressure / rating migration
- counterparty implications
- wrong-way risk where relevant
- concentration implications
- second-order impacts
- direction of risk
- severity/materiality
- time horizon
- mitigating factors
- contradictory evidence
- uncertainty
- evidence gaps

DO NOT mechanically populate irrelevant categories.

Analytical relevance is more important than filling every possible field.

----------------------------------------------------------------------
C. EVIDENCE DISCIPLINE
----------------------------------------------------------------------

The assessment must distinguish clearly between:

REPORTED FACT
DERIVED RESULT
ANALYTICAL ASSESSMENT
NOT EVIDENCED

Numerical claims should carry, where possible:

- value
- unit
- measurement period/window
- source
- source date
- evidence classification

For derived metrics, arithmetic should be traceable where practical.

If evidence is unavailable:

"Not evidenced in available sources"

is preferable to inventing an answer.

If credible sources conflict:

- preserve both figures/statements
- identify the conflict
- explain which source appears stronger and why if possible

----------------------------------------------------------------------
D. COUNTER-THESIS / DISCONFIRMING EVIDENCE
----------------------------------------------------------------------

The model must not simply confirm the initial risk narrative.

Where relevant, actively consider evidence that could reduce or invalidate the thesis, for example:

- stronger liquidity
- improving earnings
- debt reduction
- successful refinancing
- secured funding access
- supportive rating actions
- limited exposure to the event
- resilient customer demand
- improving margins
- capital support
- credible mitigation measures

The POC should demonstrate balanced credit reasoning.

----------------------------------------------------------------------
E. MATERIALITY
----------------------------------------------------------------------

Do not overwhelm the analyst with every fact retrieved.

Prioritize information that could materially affect:

- credit quality
- exposure management
- limits
- rating view
- portfolio monitoring
- risk escalation
- refinancing
- liquidity
- counterparty risk

Low-value facts should not dominate the assessment.

======================================================================
USER EXPERIENCE / UI QUALITY
======================================================================

POC does NOT mean unfinished user experience.

The Step 2.5 output must look intentional and credible.

Preserve the accepted RPR/v31 visual language as closely as practical.

Do NOT:

- expose raw JSON as the final UX
- expose Python/debug information
- expose stack traces
- show internal implementation names unnecessarily
- introduce inconsistent tables/cards
- create visibly temporary developer UI
- degrade existing Step 2.4/2.5 visual layout

The user should clearly understand:

- which company is being assessed
- what event/sector context is being considered
- major risk conclusions
- materiality
- direction of risk
- supporting evidence
- counter-evidence
- gaps/uncertainty

Failure states must also be clear and professional, including:

NO_COMPANY_IDENTITY_AVAILABLE
NO_CONFIRMED_SEC_REGISTRANT
STYLUS_PRESET_NOT_CONFIGURED
BLOCKED_AUTH
NO_EVIDENCE_AVAILABLE

Do not show a generic error if a more informative business-safe status is available.

======================================================================
CURRENT EXTERNAL BLOCKERS
======================================================================

There are currently ONLY TWO genuine external blockers:

1. The exact SEC + WEB Stylus preset definition has not yet been captured.

2. Runner authentication is not available inside the current Claude shell.

Do NOT create architecture to compensate for either blocker.

======================================================================
NEXT ACTION — ONE-TIME STYLUS CAPTURE
======================================================================

The next action is ONE manual capture of the real SEC + WEB Stylus request.

The user will:

1. Open the manually-created SEC + WEB preset in Stylus.

2. Open Chrome/Edge DevTools with F12.

3. Select:
   Network

4. Clear existing network requests.

5. Execute the preset once using representative safe values.

6. Identify the Runner execution request.

Likely endpoint resembles:

/runner-service/chat

but do not require the exact path if the actual environment uses a related Runner endpoint.

7. Select the request.

8. Open:

Payload
or
Request Payload

9. Capture ONLY the REQUEST BODY.

======================================================================
SECURITY — STRICT
======================================================================

DO NOT request or expose:

- Authorization headers
- bearer tokens
- refresh tokens
- session tokens
- cookies
- credentials
- API secrets
- authentication headers

If screenshots contain such information, instruct the user not to provide those sections.

We only require the non-secret business/request payload.

======================================================================
WHAT MUST BE CAPTURED
======================================================================

From the real Stylus request body capture the exact structure and configuration used by the preset.

Include, where present:

- preset
- preset.name
- model
- prompt
- system instructions
- inputs
- toolConfig
- tools
- knowledge configuration
- answers
- output/schema settings
- response settings
- any other NON-SECRET request-body property required by the known-working Runner contract

MOST IMPORTANT:

Capture the EXACT FIVE INPUT NAMES.

Do NOT:

- rename
- normalize
- shorten
- correct spelling
- modify case
- improve labels

The exact Stylus payload is the contract.

Example structure only:

inputs: [
    { name: "<EXACT STYLUS INPUT 1>", ... },
    { name: "<EXACT STYLUS INPUT 2>", ... },
    { name: "<EXACT STYLUS INPUT 3>", ... },
    { name: "<EXACT STYLUS INPUT 4>", ... },
    { name: "<EXACT STYLUS INPUT 5>", ... }
]

======================================================================
AFTER THE CAPTURE IS PROVIDED
======================================================================

Once the sanitized request body is supplied:

1. Compare it with:

preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

2. Replace ONLY placeholder / PENDING_CAPTURE values.

3. Preserve the real:

- prompt
- model
- five input names
- tools
- tool configuration
- knowledge configuration
- output settings
- other required Runner payload fields

4. Set the current verified-state field to:

verified: true

or the exact equivalent used in the current implementation.

5. Do NOT create a new preset-management architecture.

6. Do NOT return to preset UUID investigation.

7. Do NOT refactor stylus_runner_client.py unless the real payload proves a concrete incompatibility.

8. If the real payload differs from our assumption, make ONLY the smallest necessary compatibility correction.

9. Record the differences between:
   EXPECTED payload
   ACTUAL Stylus payload

for traceability.

======================================================================
MANDATORY FIVE-INPUT MAPPING REVIEW
======================================================================

Once the exact input names are known, explicitly document how EACH field is populated by RPR.

For every Stylus input provide:

1. EXACT INPUT NAME
2. RPR SOURCE
3. TRANSFORMATION
4. VALIDATION
5. EMPTY/MISSING BEHAVIOUR

The mapping must use actual data from the RPR workflow.

Step 2.5 must consume relevant upstream context from:

- Step 2.2
- Step 2.3
- Step 2.4

No unexplained generic text blob.

No silent omission of material context.

======================================================================
MANDATORY REAL COMPANY DEMO
======================================================================

Before final E2E execution, identify at least ONE genuine Step 2.2 company that can complete the full pipeline.

I want a concrete real example.

Report:

CAGID:
<actual CAGID>

CAGID name:
<actual value>

GFCID/name used:
<if applicable>

Resolved legal company:
<actual company>

Ticker:
<if available>

CIK:
<verified CIK>

SEC registrant status:
CONFIRMED

Resolution method:
<cagid_name / gfcid_name / verified POC map / resolver>

Do NOT merely state:

"resolver works"

Prove it using a genuine Step 2.2 record.

If the current selected record cannot be resolved, search the ACTUAL Step 2.2 dataset for another legitimate company suitable for the POC.

A small verified mapping:

CAGID -> Legal Company -> Ticker -> CIK

is acceptable for several POC companies if necessary.

Every entry must correspond to real Step 2.2 data.

======================================================================
FINAL END-TO-END TARGET
======================================================================

Once the preset has been captured and normal Runner authentication is available:

REAL Step 2.2 selection
    ↓
real CAGID
    ↓
real legal company
    ↓
verified CIK
    ↓
actual Step 2.3 Event-Driven Risk Factors
    ↓
actual Step 2.4 Sector-Inherent Risk Factors
    ↓
Step 2.5 Run Assessment
    ↓
exact SEC + WEB Stylus preset
    ↓
real SEC retrieval
    +
real web retrieval
    ↓
credit-risk analysis
    ↓
evidence/citations
    ↓
Step25Assessment schema validation
    ↓
existing Step 2.5 UI

======================================================================
STRICT SUCCESS CRITERIA
======================================================================

DO NOT classify Step 2.5 as SUCCESS merely because:

- HTTP 200 occurred
- Runner returned text
- valid JSON was produced
- the schema validated
- the UI rendered a table

Those are technical checks only.

Step 2.5 is successful only when ALL relevant conditions below pass:

1. Real Step 2.2 record used.

2. Correct company resolved.

3. Company mapping is traceable.

4. SEC registrant/CIK is verified where applicable.

5. Exact Stylus preset is used.

6. Exact five Stylus fields are populated.

7. Real Step 2.3 context reaches the assessment.

8. Real Step 2.4 context reaches the assessment.

9. SEC evidence is real.

10. Web evidence is real where available.

11. Citations are traceable.

12. Material claims are evidence-supported or clearly classified as analysis.

13. No unrelated company is substituted.

14. No fake evidence exists.

15. No invented numerical precision exists.

16. Output conforms to Step25Assessment schema.

17. Credit-risk implications are analytically meaningful.

18. Materiality is clearly expressed.

19. Risk direction is clearly expressed.

20. Mitigating/conflicting evidence is considered where relevant.

21. Missing evidence is explicitly identified.

22. User-facing presentation is understandable.

23. UI preserves expected RPR quality.

24. The result would be useful to a credit-risk / CCR analyst.

======================================================================
MANDATORY QUALITY REVIEW AFTER FIRST SUCCESSFUL RUN
======================================================================

After the first genuine E2E result, do NOT immediately declare completion.

Perform ONE structured quality review.

Score each category:

PASS
PARTIAL
FAIL

Review:

A. COMPANY ACCURACY
Is the assessed company definitely the Step 2.2 company?

B. SEC ACCURACY
Are registrant, CIK and filing references correct?

C. EVIDENCE ACCURACY
Do sources actually support the claims attached to them?

D. CREDIT TRANSLATION
Did the model translate evidence into credit consequences?

E. EVENT TRANSLATION
Did Step 2.3 materially influence the analysis?

F. SECTOR TRANSLATION
Did Step 2.4 materially influence the analysis?

G. MATERIALITY
Does the output focus on meaningful risk?

H. COUNTER-THESIS
Was contradictory/mitigating evidence considered?

I. EVIDENCE GAPS
Are unsupported areas clearly identified?

J. HALLUCINATION
Any unsupported claims, sources, numbers or identities?

K. TRACEABILITY
Can the user understand why conclusions were reached?

L. UX
Is the result readable and professionally structured?

M. ACTIONABILITY
Would the result actually assist a CCR/credit-risk decision?

Fix concrete PARTIAL/FAIL items only.

DO NOT use this review to trigger another architecture rewrite.

======================================================================
AUTHENTICATION
======================================================================

Do NOT request tokens from the user in Claude chat.

Do NOT print or store secrets.

Use the existing approved Runner authentication mechanism in the proper RPR runtime.

Until then:

BLOCKED_AUTH

is an acceptable status.

Authentication must not be faked.

======================================================================
FREEZE RULE
======================================================================

The implementation remains frozen.

Code changes are permitted only when:

A. the captured Stylus request demonstrates a concrete incompatibility;

B. genuine E2E execution reveals a specific functional defect;

C. analytical quality fails a requirement above;

D. evidence quality fails a requirement above;

E. UI behaviour materially prevents correct use of Step 2.5;

F. the user explicitly requests a change.

For every permitted correction:

MAKE THE SMALLEST POSSIBLE CHANGE.

Do not refactor surrounding working functionality.

Do not reopen unrelated architecture.

======================================================================
WHAT TO DO RIGHT NOW
======================================================================

DO NOT IMPLEMENT NEW FEATURE CODE.

Review only:

preset_knowledge/STYLUS_SEC_WEB_REQUIRED_CAPTURE.md

Confirm that it provides correct and concise instructions for capturing the real Stylus request.

If it is already correct:

DO NOT MODIFY IT.

Then STOP.

Report ONLY the following:

1. STATUS

READY_FOR_PRESET_CAPTURE

or the exact concrete reason why not.

2. TARGET FILE

Exact file where the real captured preset definition will be stored.

3. DEVTOOLS REQUEST

Exact/likely Runner request the user should identify.

4. REQUIRED REQUEST BODY

Exact non-secret sections needed from the user.

5. SECURITY

Explicit confirmation that auth tokens, headers, cookies and secrets are NOT required and must NOT be supplied.

6. CURRENT IMPLEMENTATION

Confirm whether the current code is ready to accept the captured preset without further architectural work.

7. NEXT ACTION AFTER CAPTURE

State exactly what will be changed after the real payload is supplied.

8. QUALITY COMMITMENT

Confirm explicitly:

"POC simplification applies only to engineering architecture. It does not reduce data, analytical, evidence, validation, or user-facing quality requirements."

DO NOT CONTINUE CODING AFTER THIS REPORT.
