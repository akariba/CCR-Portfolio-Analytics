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

MANDATORY SCORING RULES

For a successfully completed Step 2.5 assessment:

- scoring.ed_score MUST be a numeric value from 1.0 to 5.0.
- scoring.si_score MUST be a numeric value from 1.0 to 5.0.
- scoring.composite_score MUST be a numeric value from 1.0 to 5.0.
- scoring.residual_rating MUST be exactly one of:
  LOW
  MEDIUM
  HIGH

- scoring.credit_impact_rating MUST be exactly one of:
  LOW_IMPACT
  MEDIUM_IMPACT
  HIGH_IMPACT

These five fields MUST NOT be null, blank, empty-string, omitted, or "Not available"
when the supplied Event-Driven and Sector-Inherent factors have been successfully assessed.

Composite calculation:

composite_score = (0.80 * ed_score) + (0.20 * si_score)

Round only the final displayed composite score to two decimal places.

A response with successfully assessed factors but any of these five scoring fields
missing or null is NOT a valid completed Step 2.5 assessment.
