NOW PERFORM A QUALITY REVIEW OF THE ACTUAL SEC + WEB PRESET ITSELF.

IMPORTANT:

This is NOT another architecture exercise.

Do NOT redesign RPR.
Do NOT revisit Steps 1–2.4.
Do NOT create new frameworks.
Do NOT make changes merely because something could be architecturally cleaner.

The objective is much narrower:

Determine whether the SEC + WEB preset we created is actually the BEST HIGH-QUALITY Step 2.5 preset for this RPR POC, now that you understand the real data flow and implementation.

I want you to critically review:

1. THE PRESET PROMPT
2. THE JSON OUTPUT SCHEMA
3. THE KNOWLEDGE .MD FILE(S)
4. THE FIVE INPUT FIELDS
5. THEIR MAPPING TO REAL RPR DATA
6. THE MODEL/TOOLS CONFIGURATION
7. WHETHER THE PRESET WILL PRODUCE THE CREDIT-RISK QUALITY WE EXPECT

Do NOT automatically defend the current design because we created it earlier.

Challenge it.

If something should change, say so clearly and explain why.

============================================================
CONTEXT — WHAT STEP 2.5 MUST ACHIEVE
============================================================

Step 2.5 is not a generic research or summarization feature.

It is a high-quality company-specific credit-risk assessment using:

REAL Step 2.2 company
        +
REAL Step 2.3 Event-Driven Risk Factors
        +
REAL Step 2.4 Sector-Inherent Risk Factors
        +
REAL SEC evidence
        +
REAL approved web evidence
        ↓
analytically useful credit assessment

The users are expected to be sophisticated CCR / credit-risk users.

Therefore the preset must produce analysis that is:

- accurate
- company-specific
- event-specific
- sector-aware
- evidence-driven
- materially focused
- skeptical
- traceable
- analytically deep
- explicit about uncertainty

It must NOT produce generic LLM prose.

============================================================
VERY IMPORTANT DISTINCTION
============================================================

This remains a POC from an ENGINEERING perspective.

We do NOT require:
- production architecture
- generalized schemas for every future use case
- scalable preset management
- excessive abstraction
- unnecessary fields

BUT:

QUALITY OF THE FEATURE MUST BE VERY HIGH.

Do not simplify the analytical requirements merely because this is a POC.

============================================================
ARTIFACTS TO REVIEW
============================================================

Inspect the ACTUAL current versions, not your memory of them.

At minimum review:

- preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml
- Step25Assessment.schema.json
- preset_knowledge/RPR_STEP25_FIELD_DICTIONARY.md
- preset_knowledge/PRESET_PREVIEW_INPUTS.md
- any SEC + WEB knowledge Markdown file actually attached/intended for Stylus
- the actual five Stylus input names
- the current Step 2.5 model/schema classes
- existing Step 2.5 UI requirements
- actual Step 2.3 output shape
- actual Step 2.4 output shape

If the real Stylus preset request has now been captured, use the ACTUAL:

- prompt
- model
- tools
- knowledge
- inputs
- output requirements

as the source of truth.

============================================================
PART 1 — REVIEW THE PRESET PROMPT
============================================================

Read the complete current SEC + WEB prompt.

Do not simply summarize it.

Evaluate whether it gives the model sufficient instructions to produce a serious credit-risk assessment.

Score each area:

PASS
PARTIAL
FAIL

Evaluate:

A. ROLE

Does the prompt establish the correct analytical role?

The model should behave closer to a senior credit-risk / CCR analyst than a general researcher.

------------------------------------------------------------
B. OBJECTIVE

Is the actual objective explicit?

It should be clear that the model is translating an external event + sector exposure + company fundamentals into CREDIT RISK.

Not simply:
"research this company."

------------------------------------------------------------
C. STEP 2.3 INTEGRATION

Does the prompt explicitly tell the model how to use the Event-Driven Risk Factors?

Does it require the model to test each material Step 2.3 factor against company-specific evidence?

Could the model currently ignore Step 2.3 and still technically answer?

If yes, that is a weakness.

------------------------------------------------------------
D. STEP 2.4 INTEGRATION

Same question for Sector-Inherent Risk Factors.

Does Step 2.4 actually influence the analysis?

Or is it merely supplied as context that the model may ignore?

------------------------------------------------------------
E. COMPANY-SPECIFICITY

Does the prompt prevent generic sector analysis from being reported as company-specific analysis?

Does it require explicit evidence of company exposure?

------------------------------------------------------------
F. SEC DISCIPLINE

Does it clearly direct the model toward the most relevant company filings/evidence?

Where relevant, consider:

- 10-K
- 10-Q
- 8-K
- debt disclosures
- liquidity
- cash
- revolvers
- maturities
- covenant disclosure
- risk factors
- segment exposures
- cash-flow information
- leverage/funding information
- material events

Do NOT require irrelevant filings mechanically.

------------------------------------------------------------
G. WEB RESEARCH QUALITY

Does the prompt tell the model what constitutes acceptable web evidence?

Does it prioritize:
- authoritative sources
- company releases
- regulators
- rating agencies where accessible
- credible financial press
- reliable industry sources

over weak sources?

------------------------------------------------------------
H. RECENCY

Does the prompt appropriately prioritize information around the event/assessment date?

Can stale information dominate the assessment?

------------------------------------------------------------
I. CREDIT TRANSLATION

This is critical.

Does the prompt force translation into:

FACT
    ->
TRANSMISSION MECHANISM
    ->
CREDIT CONSEQUENCE

Where relevant:

event
→ revenue/margin/cash-flow impact
→ liquidity/leverage/refinancing implications
→ credit consequence

If the model could simply summarize evidence without making this translation, mark PARTIAL/FAIL.

------------------------------------------------------------
J. MATERIALITY

Does the prompt prevent the model from flooding the report with immaterial facts?

Does it prioritize what could change:
- credit view
- exposure management
- rating
- limits
- headroom
- escalation
- portfolio monitoring

------------------------------------------------------------
K. COUNTER-THESIS

Does the prompt explicitly require disconfirming evidence?

Not a token sentence.

The model should search for evidence that could invalidate or reduce the prevailing risk thesis.

------------------------------------------------------------
L. CONFLICT HANDLING

Does it adequately handle conflicting sources/figures?

------------------------------------------------------------
M. EVIDENCE CLASSIFICATION

Does it properly distinguish:

REPORTED
DERIVED
ANALYTICAL ASSESSMENT
NOT EVIDENCED

------------------------------------------------------------
N. NUMERICAL DISCIPLINE

For material quantitative claims, does the prompt require where applicable:

value
unit
period/window
source
publication/filing date

And arithmetic for important derived values?

------------------------------------------------------------
O. NAMED-ENTITY DISCIPLINE

Does it prevent inference of unnamed companies/parties?

------------------------------------------------------------
P. HALLUCINATION CONTROL

Are instructions strong enough to prevent:
- invented facts
- invented sources
- invented SEC details
- invented ratings
- invented covenants
- invented CIKs
- false precision

------------------------------------------------------------
Q. ACTIONABILITY

Would the resulting output actually help someone make a credit-risk decision?

============================================================
PART 2 — REVIEW THE FIVE INPUT FIELDS
============================================================

Now inspect the ACTUAL five Stylus inputs.

For each field provide:

EXACT NAME:
...

INTENDED PURPOSE:
...

CURRENT RPR SOURCE:
...

ACTUAL DATA RECEIVED:
...

IS THIS A GOOD DESIGN?
YES / PARTIAL / NO

PROBLEM:
...

RECOMMENDATION:
...

Specifically determine whether the five inputs collectively transmit ALL important information from:

- Step 2.2
- Step 2.3
- Step 2.4

without:
- losing material context
- duplicating huge amounts of unnecessary text
- mixing unrelated semantics
- requiring the LLM to reverse-engineer JSON it should not need to reverse-engineer

Do not change the number of inputs simply for elegance.

But if one of the five fields is poorly defined or materially harms the assessment, say so.

============================================================
PART 3 — REVIEW Step25Assessment.schema.json
============================================================

Now critically review the current JSON schema.

Question:

DOES THE SCHEMA CAPTURE WHAT A HIGH-QUALITY STEP 2.5 ANALYSIS ACTUALLY NEEDS?

Do not assume more fields = better schema.

A good POC schema should preserve analytical value while remaining practical.

Evaluate:

A. Does it preserve company identity?

B. Does it connect findings to Step 2.3 factors?

C. Does it connect findings to Step 2.4 factors?

D. Does it capture assessment direction?

E. Does it capture materiality/severity?

F. Does it capture evidence references?

G. Does it preserve uncertainty?

H. Does it capture mitigating/counter-thesis findings?

I. Does it capture conflicting evidence?

J. Does it capture unevidenced/gap areas?

K. Does it support UI rendering cleanly?

L. Does it create unnecessary complexity?

M. Are any required fields likely to force the model to fabricate content?

That last question is especially important.

A field should NOT be required if, in practice, the model frequently lacks evidence and would be tempted to invent a value.

"Not evidenced" may be acceptable where appropriate.

============================================================
CRITICAL SCHEMA QUESTION
============================================================

Check whether the schema forces the model into a false sense of precision.

Examples:

- mandatory numerical rating when evidence does not justify it
- mandatory direction when evidence is ambiguous
- mandatory evidence ID when no evidence exists
- mandatory SEC-specific fields for non-SEC evidence
- mandatory factor assessments even when the factor is immaterial

Identify such problems.

============================================================
PART 4 — REVIEW THE KNOWLEDGE .MD
============================================================

Read the actual Markdown knowledge supplied to Stylus.

Determine what its purpose currently is.

It should contain relatively stable RPR domain instructions/definitions that improve the assessment.

It should NOT become a dumping ground for dynamic run-specific data that already arrives through the five inputs.

Evaluate whether it contains the right guidance for:

- Step 2.3 meaning
- Step 2.4 meaning
- factor interpretation
- credit-risk terminology
- evidence standards
- materiality
- direction
- assessment output semantics
- JSON field definitions
- expected treatment of uncertainty

Check for:

- contradictions with the prompt
- contradictions with JSON schema
- stale field names
- duplicated instructions
- ambiguous terminology
- excessive content
- irrelevant material

============================================================
IMPORTANT KNOWLEDGE RULE
============================================================

Knowledge should support the model.

It should not fight the prompt.

There should be ONE coherent hierarchy:

PRESET PROMPT
    ->
KNOWLEDGE DEFINITIONS
    ->
REAL RPR INPUTS
    ->
SEC/WEB EVIDENCE
    ->
JSON OUTPUT

If the same rule is defined differently in multiple places, identify it.

============================================================
PART 5 — REVIEW MODEL + TOOLS
============================================================

Inspect the actual Stylus model/tool configuration.

Evaluate:

MODEL:
Is the selected model appropriate for the reasoning complexity?

SEC TOOL:
Is it configured/available correctly?

WEB TOOL:
Is it configured/available correctly?

KNOWLEDGE:
Is it actually connected?

OUTPUT:
Does the model have sufficient instruction to return structured output reliably?

Do NOT recommend a different model simply because a theoretically stronger one exists.

Recommend change only if there is a meaningful POC quality benefit.

============================================================
PART 6 — TEST AGAINST REAL RPR DATA
============================================================

If a real Step 2.5 result is now available, use it as the MOST IMPORTANT evidence for this review.

Do not judge the prompt only theoretically.

Use the real result to detect:

- ignored Step 2.3 factors
- ignored Step 2.4 factors
- generic prose
- weak SEC evidence
- weak web evidence
- duplicated findings
- unsupported statements
- poor materiality ranking
- missing counter-thesis
- excessive speculation
- incorrect credit translation
- schema fields that produce nonsense
- evidence that does not support conclusions

============================================================
IF NO LIVE RESULT EXISTS YET
============================================================

If Step 2.5 still cannot execute because of authentication/preset availability:

perform the structural review now,

BUT clearly label:

STRUCTURAL REVIEW

and do NOT pretend that output quality has been empirically proven.

After the first real successful Step 2.5 result, repeat ONLY the output-quality portion.

============================================================
PART 7 — SHOULD WE CHANGE ANYTHING?
============================================================

Now give me an opinionated recommendation.

Classify every proposed change as:

MUST CHANGE BEFORE POC
SHOULD CHANGE FOR QUALITY
OPTIONAL
DO NOT CHANGE

Do NOT generate a giant wishlist.

Focus only on changes with meaningful impact.

Use this table:

ARTIFACT
CURRENT ISSUE
SEVERITY
WHY IT MATTERS
EXACT RECOMMENDATION
CHANGE NOW? YES/NO

Artifacts:

- preset prompt
- five inputs
- Step25Assessment.schema.json
- knowledge .md
- model
- SEC tool config
- web tool config
- output instructions

============================================================
PART 8 — CHECK OUR ORIGINAL DESIGN ASSUMPTIONS
============================================================

Explicitly tell me whether our original manually-created SEC + WEB preset design was:

A. fundamentally sound;

B. sound but needs targeted improvements;

C. materially flawed and should be revised before relying on Step 2.5.

Do NOT choose A simply because implementation already exists.

Explain the evidence.

============================================================
PART 9 — IMPORTANT: DO NOT CHANGE FILES YET
============================================================

For THIS review pass:

DO NOT modify:

- preset prompt
- JSON schema
- knowledge markdown
- five input definitions
- model/tool configuration

unless there is an execution-blocking typo/configuration issue that prevents inspection.

I want the REVIEW FIRST.

This prevents us from creating another unnecessary change loop.

============================================================
FINAL REQUIRED REPORT
============================================================

Return exactly these sections:

1. OVERALL VERDICT

Preset design:
GOOD / NEEDS_TARGETED_IMPROVEMENT / NEEDS_MAJOR_REVISION

Confidence:
HIGH / MEDIUM / LOW

Reason:
maximum 5 concise points.

------------------------------------------------------------

2. PROMPT QUALITY

PASS/PARTIAL/FAIL for:
Role
Objective
Step2.3 usage
Step2.4 usage
SEC research
Web research
Credit translation
Materiality
Counter-thesis
Evidence discipline
Numerical discipline
Conflict handling
Hallucination control
Actionability

------------------------------------------------------------

3. FIVE INPUT REVIEW

Exact current five fields and whether each is appropriate.

------------------------------------------------------------

4. JSON SCHEMA REVIEW

GOOD / TARGETED_CHANGES / MAJOR_CHANGES

List only material issues.

------------------------------------------------------------

5. KNOWLEDGE .MD REVIEW

GOOD / TARGETED_CHANGES / MAJOR_CHANGES

List only material issues.

------------------------------------------------------------

6. MODEL/TOOLS REVIEW

State whether current:
model
SEC
web
knowledge

configuration is suitable.

------------------------------------------------------------

7. MUST CHANGE BEFORE POC

Only genuinely necessary items.

If none:
NONE

------------------------------------------------------------

8. SHOULD CHANGE FOR QUALITY

Targeted improvements only.

------------------------------------------------------------

9. DO NOT CHANGE

Explicitly identify elements that are already good and should be frozen.

------------------------------------------------------------

10. RECOMMENDED FINAL PRESET DESIGN

Do NOT rewrite everything.

Describe only the exact targeted differences you recommend from the existing design.

------------------------------------------------------------

11. NEXT ACTION

Choose exactly one:

KEEP_CURRENT_PRESET_AND_TEST

TARGETED_PRESET_UPDATE_THEN_TEST

MAJOR_PRESET_REVISION_REQUIRED

============================================================
QUALITY PRINCIPLE
============================================================

Do not optimize this review for preserving work already done.

Optimize for creating the strongest possible Step 2.5 POC.

At the same time:

do NOT overengineer.

The implementation may be disposable.

The analytical feature cannot be disposable-quality.
