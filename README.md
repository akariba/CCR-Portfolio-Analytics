Use these exact simple test inputs in the Stylus preset:

CompanyContextJSON
{"company_name":"Apple Inc.","ticker":"AAPL","cik":"0000320193","cagid":null,"current_rrr":null,"current_class":null}
ScenarioContextJSON
{"scenario_name":"US Trade Policy & Tariffs","assessment_horizon":"12+ months","scenario_narrative":"Assess Apple under continuing US trade-policy uncertainty, tariffs, supply-chain pressure and regulatory risk."}
EventDrivenFactorsJSON
[{"factor_id":"ED-1","factor_name":"Leadership transition","source_step":"2.3","weight":0.3,"score":-1},{"factor_id":"ED-2","factor_name":"Regulatory scrutiny of Services","source_step":"2.3","weight":0.4,"score":-1}]
SectorInherentFactorsJSON
[{"factor_id":"SI-1","factor_name":"Regulatory scrutiny of Services","source_step":"2.4","weight":0.2,"score":-1}]
AssessmentASOFDATE
2026-09-02




## MANDATORY FINAL SCORING CONTRACT

A successful assessment MUST populate all of the following fields with non-null values:

- scoring.ed_score
- scoring.si_score
- scoring.composite_score
- scoring.residual_rating
- scoring.credit_impact_rating

These fields are mandatory whenever at least one Event-Driven factor and one Sector-Inherent factor have been successfully assessed.

SCORING RULES:

1. Calculate Event-Driven score as the weighted average of all supplied Step 2.3 factor scores:
   ED_SCORE = SUM(factor_score × factor_weight) / SUM(event_driven_weights)

2. Calculate Sector-Inherent score as the weighted average of all supplied Step 2.4 factor scores:
   SI_SCORE = SUM(factor_score × factor_weight) / SUM(sector_inherent_weights)

3. Calculate Composite Score using the RPR Step 2.5 methodology:
   COMPOSITE_SCORE = (0.80 × ED_SCORE) + (0.20 × SI_SCORE)

4. residual_rating and credit_impact_rating MUST then be derived using the Step 3a methodology and attached Field Dictionary.

5. Do NOT return null merely because current_rrr or current_class is unavailable.
   Those fields affect RRR/classification recommendation only.
   They DO NOT prevent calculation of ED score, SI score, composite score, residual rating, or credit impact rating.

6. If an individual supplied factor genuinely cannot be scored because evidence is insufficient:
   - document the reason under evidence_gaps;
   - do not invent evidence;
   - calculate the aggregate score from the legitimately assessed factors only if permitted by the Step 3a methodology.

7. Before returning the JSON, perform a final validation:
   scoring.ed_score != null
   scoring.si_score != null
   scoring.composite_score != null
   scoring.residual_rating != null
   scoring.credit_impact_rating != null

If any of these five values is null despite sufficient factor assessments, DO NOT return the response yet. Complete the calculation first.

Return exactly one schema-conformant final assessment.
