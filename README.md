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

CompanyContextJSON

{
  "company_name": "Apple Inc.",
  "ticker": "AAPL",
  "cik": "0000320193"
}

ScenarioContextJSON

{
  "assessment_horizon": "12M",
  "base_case": "Soft landing",
  "stress_case": "Regulatory escalation"
}

EventDrivenFactorsJSON

[
  {
    "factor_id": "ED-1",
    "factor_name": "Leadership transition",
    "weight": 0.3
  },
  {
    "factor_id": "ED-2",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.4
  }
]

SectorInherentFactorsJSON

[
  {
    "factor_id": "SI-1",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.2
  }



## FINAL OUTPUT AND TERMINATION CONTRACT

Return exactly ONE machine-readable JSON object conforming to the attached Step 2.5 SEC+Web output schema.

The JSON object is the COMPLETE and FINAL deliverable for this preset.

CRITICAL EXECUTION RULES:

- Do NOT create a Markdown artifact.
- Do NOT create a supporting commentary artifact.
- Do NOT generate charts, graphs, diagrams, tables, visualizations, or dashboards.
- Do NOT invoke charts_generator.
- Do NOT invoke any presentation/document-generation tool.
- Do NOT create a second artifact of any kind.
- Do NOT provide prose before the JSON.
- Do NOT provide prose after the JSON.
- Do NOT summarize the JSON separately.
- Do NOT continue analysis after the schema-conformant JSON has been produced.

Use SEC Filing and Web Search only as required to gather evidence for the assessment.

Once the final schema-conformant JSON object has been produced, TERMINATE THE RESPONSE IMMEDIATELY.

The required execution sequence is:

1. Read supplied RPR inputs.
2. Retrieve only necessary SEC/Web evidence.
3. Assess supplied Step 2.3 and Step 2.4 factors.
4. Calculate all mandatory Step 2.5 scoring fields.
5. Construct the schema-conformant JSON.
6. Return that JSON.
7. STOP.

A successful execution produces exactly ONE final JSON artifact and no other artifact.
