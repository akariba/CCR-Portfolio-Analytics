# RPR Step 2.5 SEC + WEB — Field Dictionary and Execution Contract

## 1. Purpose

Step 2.5 performs a **name-level financial / credit assessment for exactly one company**.

The assessment must:
- use only the company selected in Step 2.2;
- use the confirmed scenario from Step 2.1;
- assess exactly the confirmed Event-Driven factors from Step 2.3;
- assess exactly the confirmed Sector-Inherent factors from Step 2.4;
- use SEC filings and approved Web Search as evidence sources;
- apply the authoritative Step 3a **Factor Analysis – Financials** methodology;
- return one machine-readable JSON object conforming to the attached Step 2.5 output schema.

Do not introduce additional companies, factors, methodologies, scenarios, or portfolio assumptions.

---

## 2. Input Ownership

### CompanyContextJSON
Authoritative company and portfolio context from Step 2.2.

Use only fields actually supplied, including where available:
- company_name
- cagid
- ticker
- cik
- country
- country_name
- industry / sector
- exposure
- MLE
- current_rrr
- current_class

Rules:
1. Do not invent missing company or portfolio attributes.
2. Do not replace the selected company with a better-known company.
3. Do not infer a public registrant only from company-name similarity.
4. If ticker or CIK is supplied, use it to verify SEC identity.
5. If identity cannot be established confidently, record the limitation in `evidence_gaps` and do not analyse another company.

### ScenarioContextJSON
Confirmed Step 2.1 scenario and assumptions.

Treat this as the controlling scenario context for the assessment.

Do not rewrite or replace the confirmed scenario.

### EventDrivenFactorsJSON
Confirmed Step 2.3 Event-Driven factors.

Every supplied Step 2.3 factor must:
- remain Event-Driven;
- preserve its supplied `factor_id`;
- preserve its supplied factor name / label;
- preserve its supplied weight;
- appear exactly once in `factor_assessments`;
- have `source_step` equal to `"2.3"`.

Do not invent, delete, rename, merge, split, move, or substitute factors.

### SectorInherentFactorsJSON
Confirmed Step 2.4 Sector-Inherent factors.

Every supplied Step 2.4 factor must:
- remain Sector-Inherent;
- preserve its supplied `factor_id`;
- preserve its supplied factor name / label;
- preserve its supplied weight;
- appear exactly once in `factor_assessments`;
- have `source_step` equal to `"2.4"`.

Do not invent, delete, rename, merge, split, move, or substitute factors.

### AssessmentASOFDATE
Strict evidence cut-off date.

Do not use information first published or occurring after this date as if it were known at the assessment date.

### UserFeedback
Optional analyst instruction for a rerun.

It may refine emphasis or interpretation but must not:
- override factual evidence;
- alter confirmed factors;
- alter factor weights;
- alter the Step 3a methodology;
- change the assessment cut-off date.

---

## 3. Company Identity Control

Before financial analysis:

1. Verify that SEC evidence corresponds to the supplied company using company name, ticker and/or CIK.
2. Prefer CIK when supplied.
3. Do not infer identity from name similarity alone.
4. Do not use evidence belonging to a different legal entity.
5. If identity remains uncertain, record the limitation explicitly in `evidence_gaps`.

---

## 4. Evidence Retrieval

Use only:
- **SEC Filing integration**
- **approved Web Search integration**

### Evidence priority
Use evidence in this order when available:

1. SEC filings and filed exhibits.
2. Company financial disclosures / investor materials.
3. Rating-agency, regulator or government material.
4. High-quality financial news and other credible web sources.

### SEC evidence
Use SEC filings as the authoritative source for public-company financial facts when available.

Prefer the most relevant filings available as of `AssessmentASOFDATE`.

Do not fabricate:
- filing dates;
- accession numbers;
- filing types;
- URLs;
- financial values;
- legal proceedings;
- management changes.

If a SEC integration result does not provide a requested field, use `null` for that evidence field and record the limitation where material.

### Web evidence
Use Web Search only for evidence relevant to the confirmed factors and scenario.

Web evidence may supplement SEC evidence, but it must not replace authoritative filed financial information where such filing evidence exists.

Do not fabricate:
- URLs;
- publication dates;
- source names;
- quotations;
- numerical values.

### Evidence discipline
For every material quantitative fact used in scoring, capture where available:
- value;
- unit;
- reporting period;
- source title;
- source/publication date;
- retrievable reference or URL.

Use only evidence needed to assess the supplied factors. Avoid unrelated background research.

---

## 5. Factor Assessment Contract

For every confirmed factor:

1. Preserve:
   - `factor_id`
   - factor name
   - `source_step`
   - supplied weight

2. Assess the factor using genuine SEC/Web evidence.

3. Apply the authoritative Step 3a five-scale financial methodology.

4. Assign a factor score from **1.0 to 5.0** when the Step 3a methodology permits a valid assessment.

5. Return:
   - `score`
   - `direction`
   - `impact_rating`
   - concise evidence-based `rationale`
   - supporting `evidence_ids`

6. `direction` must use only the vocabulary allowed by the output schema.

7. `impact_rating` must use only the vocabulary allowed by the output schema.

8. Do not use an upstream placeholder score as the final Step 2.5 factor score. Step 2.5 must perform the actual evidence-grounded Step 3a assessment.

9. Do not move factors between Event-Driven and Sector-Inherent sets.

10. Do not allow one factor to appear more than once.

---

## 6. Evidence Insufficiency

Do not invent evidence.

If evidence for an individual factor is genuinely insufficient:
- record the specific limitation in `evidence_gaps`;
- apply the authoritative Step 3a treatment for insufficient evidence;
- do not fabricate a factor score merely to complete the output.

However:

**If the model has successfully assessed all supplied Event-Driven and Sector-Inherent factors, the final Step 2.5 scoring fields are mandatory and must be calculated before returning the response.**

A response containing successfully assessed factors but blank or omitted final scoring fields is invalid.

---

## 7. ED Score

`scoring.ed_score` is the normalized weighted average of all successfully assessed confirmed Step 2.3 Event-Driven factors.

Formula:

`ED_SCORE = SUM(factor_score × supplied_weight) / SUM(supplied_weight)`

Use Step 2.3 factors only.

Rules:
- preserve supplied weights;
- do not substitute equal weights;
- do not include Step 2.4 factors;
- do not apply the 80/20 final composite weighting inside ED_SCORE;
- return a numeric value from 1.0 to 5.0;
- round the final displayed ED_SCORE to two decimal places.

---

## 8. SI Score

`scoring.si_score` is the normalized weighted average of all successfully assessed confirmed Step 2.4 Sector-Inherent factors.

Formula:

`SI_SCORE = SUM(factor_score × supplied_weight) / SUM(supplied_weight)`

Use Step 2.4 factors only.

Rules:
- preserve supplied weights;
- do not substitute equal weights;
- do not include Step 2.3 factors;
- do not apply the 80/20 final composite weighting inside SI_SCORE;
- return a numeric value from 1.0 to 5.0;
- round the final displayed SI_SCORE to two decimal places.

---

## 9. Composite Score

After ED_SCORE and SI_SCORE have been calculated independently:

`COMPOSITE_SCORE = (ED_SCORE × 0.80) + (SI_SCORE × 0.20)`

Rules:
- use exactly 80% Event-Driven and 20% Sector-Inherent weighting;
- do not re-weight individual factors at this stage;
- return a numeric value from 1.0 to 5.0;
- round the final displayed `scoring.composite_score` to two decimal places.

---

## 10. Residual Rating

`scoring.residual_rating` must be determined from the authoritative Step 3a residual-risk thresholds / decision table.

Allowed output values:
- `LOW`
- `MEDIUM`
- `HIGH`

Do not:
- invent a new threshold;
- use Step 4 portfolio thresholds;
- substitute a generic market-risk label;
- return blank or null after a successfully completed assessment.

---

## 11. Credit Impact Rating

`scoring.credit_impact_rating` must be determined using the authoritative Step 3a credit-impact logic.

Allowed output values:
- `LOW_IMPACT`
- `MEDIUM_IMPACT`
- `HIGH_IMPACT`

Do not:
- invent alternative labels;
- return a prose sentence in this field;
- return blank or null after a successfully completed assessment.

---

## 12. Mandatory Final Scoring Contract

For a successfully completed Step 2.5 assessment, all five fields below are mandatory:
- `scoring.ed_score`
- `scoring.si_score`
- `scoring.composite_score`
- `scoring.residual_rating`
- `scoring.credit_impact_rating`

Requirements:

### scoring.ed_score
Must be numeric from **1.0 to 5.0**.

### scoring.si_score
Must be numeric from **1.0 to 5.0**.

### scoring.composite_score
Must be numeric from **1.0 to 5.0**.

### scoring.residual_rating
Must be exactly one of:

`LOW | MEDIUM | HIGH`

### scoring.credit_impact_rating
Must be exactly one of:

`LOW_IMPACT | MEDIUM_IMPACT | HIGH_IMPACT`

These five fields must not be:
- null;
- blank;
- empty strings;
- omitted;
- `"Not available"`.

This rule applies once all supplied Step 2.3 and Step 2.4 factors have been successfully assessed.

Before returning the JSON, explicitly verify that all five values are populated.

---

## 13. Credit Conclusion

Produce the schema-defined `credit_conclusion` using only assessed factors and supporting evidence.

### headline
A concise name-level credit conclusion.

It must reflect the actual Step 2.5 assessment, not a generic market headline.

### key_risk_driver
Identify the principal company-specific residual credit-risk driver.

It must be directly traceable to:
- one or more assessed factors;
- their factor scores;
- supporting evidence.

Do not return a generic sector statement if the company-level evidence supports a more specific driver.

### current_rrr
May only come from `CompanyContextJSON`.

Do not infer or manufacture an existing RRR.

### current_class
May only come from `CompanyContextJSON`.

Do not infer or manufacture an existing classification.

### recommended_rrr_action
Apply the authoritative Step 3a methodology and supplied current RRR when available.

Do not invent a current RRR merely to generate a recommendation.

### recommended_class_action
Apply the authoritative Step 3a methodology and supplied current classification when available.

Do not invent a current classification merely to generate a recommendation.

### confidence
Use only the vocabulary allowed by the output schema.

Confidence must reflect evidence quality and completeness.

---

## 14. Analyst-Owned Fields

The following are analyst/UI-owned and must not be fabricated by the model:
- Impact Rating Override
- User Credit Commentary

If such fields exist in downstream UI state, preserve them outside the model-generated analytical conclusions unless the schema explicitly requires their transport.

---

## 15. Evidence Objects

Each evidence object must use the exact fields required by the output schema.

Where available populate:
- `evidence_id`
- `source_type`
- `title`
- `fact`
- `url`
- `filing_type`
- `filing_date`
- `accession_number`

Rules:
- `source_type` must reflect the actual source;
- evidence IDs must be internally consistent;
- every factor `evidence_id` reference must point to a returned evidence object;
- do not create evidence IDs for evidence that was not actually retrieved;
- do not invent accession numbers or URLs.

---

## 16. Evidence Gaps

Use `evidence_gaps` only for genuine limitations.

Examples:
- unavailable portfolio attributes;
- unavailable current RRR/classification;
- unavailable source metadata;
- genuinely unresolved factor evidence;
- evidence that falls after the assessment cut-off;
- company identity uncertainty.

Do not use `evidence_gaps` as a substitute for calculations that can be performed from already-assessed factors.

In particular, do not leave ED_SCORE, SI_SCORE or COMPOSITE_SCORE blank when the necessary factor scores and weights are already available.

---

## 17. Analyst Questions

Use `analyst_questions` only where a human decision or missing analyst-owned input materially affects the assessment.

Do not ask questions merely because an optional field is absent.

Do not use analyst questions to avoid completing calculations supported by available evidence.

---

## 18. Final Validation Before Output

Before returning the final JSON, verify all of the following:

- [ ] exactly one company has been assessed;
- [ ] company identity is consistent with supplied Step 2.2 context;
- [ ] every supplied Step 2.3 factor appears exactly once;
- [ ] every supplied Step 2.4 factor appears exactly once;
- [ ] no factor was moved between Event-Driven and Sector-Inherent sets;
- [ ] supplied factor IDs and weights were preserved;
- [ ] factor scores use the authoritative Step 3a methodology;
- [ ] numerical claims used in scoring are supported by genuine evidence;
- [ ] evidence after `AssessmentASOFDATE` was not treated as current-state evidence;
- [ ] ED_SCORE was calculated from Step 2.3 factors only;
- [ ] SI_SCORE was calculated from Step 2.4 factors only;
- [ ] COMPOSITE_SCORE uses exactly 80% ED and 20% SI;
- [ ] `scoring.ed_score` is populated;
- [ ] `scoring.si_score` is populated;
- [ ] `scoring.composite_score` is populated;
- [ ] `scoring.residual_rating` is populated;
- [ ] `scoring.credit_impact_rating` is populated;
- [ ] residual rating follows Step 3a thresholds;
- [ ] credit-impact rating follows Step 3a methodology;
- [ ] no current RRR or classification was fabricated;
- [ ] every evidence ID referenced by a factor exists in the returned evidence array;
- [ ] final output conforms to the attached Step 2.5 SEC+Web output schema.

---

## 19. Output Rules

Return **exactly one JSON object only**.

Follow the attached Step 2.5 SEC+Web output schema exactly.

Do not return:
- Markdown;
- code fences;
- prose before the JSON;
- prose after the JSON;
- a second alternative JSON object;
- a summary outside the schema.

Do not invent data.

For non-mandatory evidence/context fields only, use `null` or an `evidence_gaps` entry when the value cannot be established.

This null rule does **not** apply to the five mandatory final scoring fields after all supplied factors have been successfully assessed.

Once the supplied Event-Driven and Sector-Inherent factors have been successfully assessed, the model must calculate and populate:
- `scoring.ed_score`
- `scoring.si_score`
- `scoring.composite_score`
- `scoring.residual_rating`
- `scoring.credit_impact_rating`

before returning the final JSON.
