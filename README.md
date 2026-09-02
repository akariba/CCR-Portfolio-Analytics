# ROLE AND AUTHORITY

Execute the RPR Step 2.5 Name-Level Financial Assessment for exactly one company.

The attached "Factor Analysis — Financials" Step 3a methodology is the authoritative analytical methodology. Follow it in full.

Do not replace, simplify, reinterpret, or create an alternative methodology.

Your task is to apply that methodology to the supplied confirmed RPR inputs and return the machine-readable output required by the attached Step 2.5 SEC+Web output schema.


# INPUTS

Company Context:
{CompanyContextJSON}

Confirmed Scenario Context:
{ScenarioContextJSON}

Confirmed Event-Driven Risk Factors:
{EventDrivenFactorsJSON}

Confirmed Sector-Inherent Risk Factors:
{SectorInherentFactorsJSON}

Assessment As-Of Date:
{AssessmentASOFDATE}

Analyst Feedback:
{UserFeedback}


# EXECUTION BOUNDARIES

Assess exactly the company supplied in CompanyContextJSON.

Do not introduce additional companies.

Do not change, rename, merge, delete or invent Event-Driven or Sector-Inherent risk factors.

Use only the confirmed factors supplied in EventDrivenFactorsJSON and SectorInherentFactorsJSON.

Preserve their factor IDs, source type, importance and weights.

Treat Event-Driven and Sector-Inherent factors as separate factor sets throughout the analysis.

Do not move an Event-Driven factor into the Sector-Inherent set or vice versa.


# COMPANY IDENTITY CONTROL

Before financial analysis, verify that SEC evidence corresponds to the supplied company identity using the provided company name, ticker and/or CIK.

Do not infer a public registrant identity from company-name similarity alone.

If identity cannot be established with sufficient confidence, return the appropriate identity/evidence limitation in the schema rather than analysing another company.


# EVIDENCE RETRIEVAL

Use the SEC Filing integration and approved Internet Search integration.

The assessment as-of date is a hard evidence cutoff.

Do not use information first published after AssessmentASOFDATE as if it were known at the assessment date.

For each vulnerability and buffer metric required by every supplied factor, retrieve the most recent information appropriate to the methodology.

Where a metric requires trend analysis, retrieve all periods required to evaluate the trend rather than imposing an arbitrary fixed evidence window.

Prefer authoritative evidence in this order where appropriate:

1. SEC filings and filed exhibits.
2. Company financial disclosures and investor materials.
3. Rating agency / regulatory / government material where retrievable.
4. High-quality external sources for evidence not contained in filings.

Do not invent values.

Do not infer exact numeric values when the source does not support them.

If required information cannot be evidenced, explicitly mark it unavailable.


# METRIC ASSESSMENT

For every Event-Driven and Sector-Inherent factor:

Assess Vulnerability Metrics and Buffer/Mitigant Metrics separately.

For every material metric provide:

- metric being tested;
- observed value where available;
- unit;
- relevant reporting period;
- source name;
- source/publication date;
- retrievable URL or filing reference;
- availability status;
- metric interpretation;
- vulnerability signal label OR buffer-strength label, as applicable.

Vulnerability signal labels must use:
VERY_HIGH
HIGH
MEDIUM
LOW

Buffer strength labels must use:
STRONG
MEDIUM
WEAK
NEGLIGIBLE

Follow the scoring methodology supplied with the factor.

The score represents residual credit risk AFTER mitigants, not gross event severity.

Strong company-specific buffers must reduce residual risk where the methodology supports that conclusion.


# FACTOR SCORING

Produce a Residual Risk Score from 1.0 to 5.0 for every factor for which sufficient evidence exists.

Do not mechanically assign identical scores to different factors.

Every factor score must be justified by company-specific evidence.

If the source methodology says a factor cannot be scored because required financial evidence is unavailable, return the factor as not assessable rather than creating a score.

Do not alter the confirmed factor weight.


# AGGREGATION

Calculate a proposed Event-Driven weighted score using the confirmed Event-Driven factor weights.

Calculate a proposed Sector-Inherent weighted score using the confirmed Sector-Inherent factor weights.

For the RPR product-level Step 2.5 composite use:

Composite Score =
0.80 × Event-Driven Weighted Score
+
0.20 × Sector-Inherent Weighted Score

Do not modify the 80/20 product weighting.

Apply the Step 3a name-level residual-risk methodology when assigning the residual-risk level.

Do not substitute portfolio-level Step 4 scoring thresholds.


# CREDIT ANCHORING

Where current RRR and/or current classification are genuinely supplied in CompanyContextJSON, apply the Step 3a methodology for:

- impact rating;
- recommended RRR action;
- final RRR;
- recommended classification action;
- final classification;
- applicable rating/classification caps and floors;
- better-of rule.

If current RRR or current classification is absent, null or unavailable, do not invent it.

Return "No recommendation" for outputs that cannot legitimately be calculated from the supplied company context.


# KEY RISK DRIVER

Identify the principal company-specific residual credit-risk driver from the assessed factors.

The key risk driver must be traceable to the factor assessment and evidence.

Do not generate a generic market headline.


# CREDIT ASSESSMENT COMMENTARY

Produce the structured Step 3a Credit Assessment Commentary.

Cover every assessed Event-Driven and Sector-Inherent factor.

For each factor include:

- key vulnerability finding and evidence;
- explicit vulnerability signal;
- key buffer/mitigant finding and evidence;
- explicit buffer strength;
- residual-risk score;
- factor-level credit implication.

Then provide the overall synthesis including:

- Event-Driven weighted result;
- Sector-Inherent weighted result;
- composite result;
- residual-risk level;
- impact assessment;
- recommended RRR/classification actions where inputs permit;
- dominant vulnerabilities;
- effectiveness of buffers;
- overall credit trajectory under the confirmed scenario.


# QUALITY AND SELF-VALIDATION

Before returning the result, silently validate:

1. Every supplied confirmed factor is represented exactly once.
2. Event-Driven and Sector-Inherent factors have not been mixed.
3. Every numeric claim is supported by evidence.
4. Every metric has the appropriate period.
5. Missing evidence is explicit.
6. Factor scores are between 1 and 5.
7. Weighted calculations use supplied weights only.
8. ED and SI set calculations are internally consistent.
9. The RPR final composite uses exactly 80% ED and 20% SI.
10. Step 3a residual-risk thresholds are used, not Step 4 portfolio thresholds.
11. RRR/classification recommendations follow the authoritative Step 3a tables.
12. No RRR/classification value was fabricated.
13. The commentary matches the structured factor scores.
14. The key risk driver is supported by the factor-level evidence.

Correct inconsistencies before final output.


# OUTPUT

Return JSON only.

Do not return Markdown.

Do not return explanatory text before or after the JSON.

The JSON must conform exactly to the attached:
rpr_step25_secweb_output_schema_v1.json
