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

Scoring

Apply the authoritative Step 3a five-scale financial methodology.

For every supplied factor:
- assess the factor using genuine SEC/Web evidence;
- preserve its supplied factor_id, source step and weight;
- assign a factor score from 1.0 to 5.0 where the methodology permits assessment;
- explain the evidence supporting the score.

Calculate:

ED_SCORE = weighted result of confirmed Step 2.3 Event-Driven factors.

SI_SCORE = weighted result of confirmed Step 2.4 Sector-Inherent factors.

COMPOSITE_SCORE = (ED_SCORE × 0.80) + (SI_SCORE × 0.20)

Round the final displayed COMPOSITE_SCORE to two decimal places.

For a successfully completed assessment, all five final scoring fields are mandatory:

scoring.ed_score
scoring.si_score
scoring.composite_score
scoring.residual_rating
scoring.credit_impact_rating

Requirements:

scoring.ed_score MUST be numeric from 1.0 to 5.0.

scoring.si_score MUST be numeric from 1.0 to 5.0.

scoring.composite_score MUST be numeric from 1.0 to 5.0.

scoring.residual_rating MUST be exactly one of:
LOW
MEDIUM
HIGH

scoring.credit_impact_rating MUST be exactly one of:
LOW_IMPACT
MEDIUM_IMPACT
HIGH_IMPACT

These five fields MUST NOT be null, blank, empty, omitted, or "Not available" after the supplied Event-Driven and Sector-Inherent factors have been successfully assessed.

Do not fabricate evidence.

If evidence for an individual factor is genuinely insufficient, record the specific limitation in evidence_gaps and follow the authoritative Step 3a methodology for treatment of that factor.

A completed assessment containing successfully assessed factors but missing any of the five mandatory final scoring fields is INVALID.


Follow rpr_step25_secweb_output_schema_v1.json.
