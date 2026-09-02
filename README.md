# RPR Step 2.5 SEC + Web Field Dictionary

## Purpose
Step 2.5 performs a name-level financial/credit assessment for exactly one company.

The authoritative analytical methodology is the attached Step 3a
"Factor Analysis — Financials" methodology.

## Input ownership

### CompanyContextJSON
Authoritative company and portfolio context from Step 2.2.

Use company name, CAGID, ticker, CIK, country, industry, exposure,
current RRR and current classification only when supplied.

Never invent missing company or portfolio attributes.

### ScenarioContextJSON
Confirmed Step 2.1 scenario and assumptions.

Treat this as the controlling scenario context for the assessment.

### EventDrivenFactorsJSON
Confirmed Step 2.3 Event-Driven factors.

Every supplied Step 2.3 factor must be assessed.
Do not invent, delete, rename or substitute factors.

### SectorInherentFactorsJSON
Confirmed Step 2.4 Sector-Inherent factors.

Every supplied Step 2.4 factor must be assessed.
Do not invent, delete, rename or substitute factors.

### AssessmentASOFDATE
Strict assessment cut-off date.

Do not use information occurring after this date as current-state evidence.

### UserFeedback
Optional analyst instruction for reruns.
It may refine the analysis but must not override factual evidence.

---

# Factor preservation

Preserve for every confirmed factor:

- factor_id
- factor name
- originating step
- weight
- upstream meaning

source_step must identify:

- 2.3 = Event-Driven
- 2.4 = Sector-Inherent

Every confirmed factor must appear exactly once in factor_assessments.

---

# Scoring

Apply the attached Step 3a five-scale financial methodology.

Calculate:

ED_SCORE = weighted result of Step 2.3 factors

SI_SCORE = weighted result of Step 2.4 factors

COMPOSITE_SCORE =
(ED_SCORE × 0.80) + (SI_SCORE × 0.20)

Do not manufacture a score where required evidence is insufficient.

The model must explain the evidence supporting each factor score.

---

# SEC evidence

Use SEC Filing integration for authoritative public-company financial evidence.

Prefer the most relevant filings available as of AssessmentASOFDATE.

Do not fabricate:

- filing dates
- accession numbers
- filing types
- URLs
- quantitative financial values

If the integration does not provide a field, return null and identify the gap.

---

# Web evidence

Use Web Search for recent credible evidence relevant to the confirmed factors.

Web evidence supplements SEC evidence; it does not replace authoritative
financial filing evidence when filing evidence exists.

Do not fabricate URLs or source attribution.

---

# RRR and classification

current_rrr and current_class may only come from CompanyContextJSON.

Never infer or manufacture an existing RRR or classification.

recommended_rrr_action and recommended_class_action must follow the
Step 3a methodology and supporting evidence.

If the evidence is insufficient, return null and explain the gap.

---

# Analyst-owned fields

Impact Rating Override and User Credit Commentary are analyst/UI fields.

The model must not fabricate values for those fields.

---

# Output rules

Return one JSON object only.

Follow rpr_step25_secweb_output_schema_v1.json.

No markdown.
No prose before or after the JSON.
No invented data.

Use null or an evidence-gap entry when information cannot be established.
