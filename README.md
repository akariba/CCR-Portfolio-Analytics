HIGH PRIORITY: COMPLETE THE FINAL V31 PARITY AND STEP 2.5 QUALITY-DATA POC FIXES

Continue working directly in:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

TARGET APPLICATION:
UI Design/step23.html and its active CSS/JavaScript/backend integration files.

IMMUTABLE REFERENCE:
UI Design/icm-pm-rapid-portfolio-review-v31.html

Treat v31 as the authoritative visual and interaction baseline for Steps 2.1 through 2.5, especially Steps 2.4 and 2.5. Do not modify v31.

This is a local PoC. Do not stop because production governance, production activation, Fiddler, proxy configuration, Runner Service authorization, or production approval is unavailable. Those may remain fail-closed in production mode, but they must not block or dominate the local PoC interface.

Do not replace working code unnecessarily. Preserve the existing backend hybrid Step 2.5 pipeline, live SEC/web research integration, model assessment, persistence, response schemas, tests, and accepted functionality. Make targeted additive changes.

## 1. Correct interpretation of Step 2.5

Step 2.5 is not:

* a readiness dashboard;
* a production-deployment configuration page;
* a generic company research report;
* a place for invented demo assessments;
* an LLM-generated replacement for Steps 2.2–2.4;
* a single-company debug form.

Step 2.5 is the final name-level credit assessment workspace for the confirmed Step 2.2 portfolio.

For every portfolio company, it must consolidate:

1. Company identity and exposure from Step 2.2.
2. Event-driven factors and deterministic ED score from Step 2.3.
3. Sector-inherent factors and deterministic SI score from Step 2.4.
4. Current credit state, including current RRR/classification when available.
5. Current, attributable SEC and public-web evidence.
6. A model-generated assessment of what that evidence means for the previously approved factors.
7. A non-binding recommended credit action.
8. Analyst-controlled override and commentary fields.

The model must not recalculate or silently replace authoritative deterministic ED, SI, composite, exposure, current RRR, or current-class values.

## 2. Current discrepancy that must be fixed

The supplied screenshots prove that `step23.html` is not yet visually or structurally equivalent to v31.

The current `step23.html` shows large primary-flow sections such as:

* “Step 2.5 — Local PoC Readiness”
* server production mode
* web-provider activation
* production deployment configuration
* red local-run blocker messages
* a separate company-selection/debug area
* an empty portfolio-summary area

These diagnostic elements are not the main Step 2.5 experience in v31.

In v31, the primary flow is:

1. Step 2.5 tab and heading.
2. Assessment-type cards.
3. Run Assessment action.
4. Assessment Outcome — Portfolio Summary.
5. Full portfolio table.
6. Expandable company detail rows.
7. Analyst override/commentary controls.
8. Export and Confirm Assessment.
9. Feedback section.

Restructure `step23.html` to match that hierarchy.

Diagnostic and production-readiness information may remain available only in a collapsed secondary “Technical diagnostics” details panel. It must not push the assessment table down, display a dominant red blocker during local PoC mode, or make the user believe Step 2.5 is unavailable.

## 3. V31 visual parity requirements

Perform a direct DOM, CSS, spacing, and interaction comparison against v31. Do not settle for approximate styling.

Match v31 for:

* overall content width and page density;
* assessment journey header;
* Step 2.1–2.5 navigation pills;
* Step 2.5 active-state styling;
* section titles and borders;
* assessment-type card grid;
* selected-card appearance;
* Run Assessment position;
* table placement;
* header height;
* column widths;
* filter row;
* font size and weight;
* row height;
* borders and background colors;
* horizontal scrolling;
* score and rating badges;
* expand/collapse controls;
* override dropdowns;
* commentary text areas;
* Export and Confirm Assessment actions;
* feedback section;
* right-side workflow status panel where present in v31.

Do not merely confirm that new CSS is served. Demonstrate that the rendered DOM uses the intended classes and produces the v31 structure.

## 4. Required Step 2.5 portfolio table

Restore the v31 portfolio table with the full applicable column set, including:

* Company Name
* CAGID
* Ticker / ID
* Country of Risk
* Limit Industry L1
* Limit Industry L2
* Limit Industry L3
* Total OSUC
* OSUC-P
* OSUC-PWL
* OSUC-SM
* OSUC-SS
* OSUC-D/L
* ED Score (80%)
* SI Score (20%)
* Composite Score
* Residual Rating
* Credit Impact Rating
* Current RRR
* Recommended RRR Action
* Current Class
* Recommended Class Action
* Key Risk Driver
* Impact Rating Override
* User Credit Commentary

Preserve v31’s compact table density, filter inputs, sticky header/filter behavior, horizontal scrolling, score coloring, badges, expandable rows, and footer actions.

If a field is genuinely unavailable, display “Not available” or “Not assessed.” Do not invent it and do not remove the column.

## 5. Expanded company row

Each company row must expand to show:

* Event-Driven Factors from Step 2.3.
* Sector-Inherent Factors from Step 2.4.
* Factor IDs, labels, weights, and deterministic scores.
* Overall risk narrative.
* Supporting evidence.
* Disconfirming or mitigating evidence.
* Evidence source names, publication/filing dates, and clickable URLs.
* SEC form, accession number, and filing date where applicable.
* Key risk driver.
* Evidence gaps.
* Model confidence.
* Suggested credit action.
* Analyst commentary.

The expanded row must preserve v31’s presentation and must be populated from the assessment associated with that exact company.

Never display a Salesforce assessment under Academy Securities or any other company. Validate company ID, name, ticker, and CIK before binding a saved run to a row.

## 6. Accurate and quality-data behavior

The Step 2.5 assessment prompt and orchestration must react in this order:

### A. Resolve identity

Verify the company using the confirmed Step 2.2 identity:

* internal company ID;
* legal company name;
* ticker;
* CIK;
* country;
* relevant aliases.

If SEC or web evidence belongs to another entity, subsidiary, or similarly named company, reject that evidence or label the relationship explicitly.

An unresolved identity mismatch is a typed assessment error. It must never produce a normal assessment.

### B. Preserve upstream assessments

Load Steps 2.2, 2.3, and 2.4 and preserve their:

* factor IDs;
* factor labels;
* weights;
* scores;
* exposure values;
* current credit state.

The model analyzes evidence against those factors. It does not create a different factor framework.

### C. Perform targeted research

Research queries must be based on the actual company and actual Step 2.3/2.4 factors.

For example, research should target relevant subjects such as:

* revenue and earnings deterioration;
* leverage and liquidity;
* debt maturities;
* covenant or refinancing risk;
* customer concentration;
* litigation or regulatory events;
* acquisitions and divestitures;
* cybersecurity events;
* management or auditor changes;
* sector demand;
* competitive pressure;
* supply-chain dependence;
* technology disruption.

Do not perform only a generic company-name search.

### D. Use a source-quality hierarchy

Prefer:

1. SEC filings and official regulatory records.
2. Company investor-relations materials.
3. Official government or regulator publications.
4. Recognized rating-agency or market disclosures when accessible.
5. Reputable financial and business reporting.
6. Other sources only when clearly identified and corroborated.

For the PoC, require at minimum:

* one verified official filing or regulatory source; and
* one independent credible public source,

unless the system explicitly returns “insufficient evidence.”

Prefer recent 10-K, 10-Q, and relevant 8-K filings. Research must respect the assessment as-of date and must not use later information without clearly marking it.

### E. Validate every material claim

Every material factual claim must map to one or more evidence IDs.

Evidence records must contain:

* evidence ID;
* source title;
* source organization;
* source type;
* publication or filing date;
* retrieval date;
* exact URL;
* SEC form/accession when applicable;
* factual statement supported;
* factor IDs affected;
* evidence direction: supporting, disconfirming, mixed, or contextual.

Quantitative claims must include the reporting period, units, and source. Derived amounts or ratios must be labeled as derived and retain their calculation inputs.

Model memory is not evidence.

### F. Search for disconfirming evidence

Do not gather only negative information. Search for evidence that could weaken or contradict the risk conclusion, including:

* liquidity improvements;
* deleveraging;
* refinancing;
* stronger earnings;
* resolved litigation;
* insurance recovery;
* successful integration;
* improved sector conditions;
* mitigating controls.

Retain contradictory evidence and explain why one source or conclusion is given more weight.

### G. Make a controlled recommendation

The model may recommend:

* Maintain
* Review
* Upgrade consideration
* Downgrade consideration
* Special mention review
* Insufficient evidence / no recommendation

The recommendation is non-binding. It must cite the evidence and explain what changed relative to the current state.

If evidence is insufficient, stale, contradictory, or identity cannot be verified, do not force a downgrade or upgrade. Return an honest insufficient-evidence result.

### H. Return schema-valid output

Return only the existing structured Step25Assessment schema.

Before accepting the result, validate:

* company identity consistency;
* all cited evidence IDs exist;
* URLs are non-empty and attributable;
* factor IDs exist upstream;
* required fields are present;
* deterministic scores were not changed;
* recommendation values are allowed;
* assessment as-of date is respected.

Attempt one repair pass for schema or citation-reference errors. If repair fails, preserve diagnostics and show a clear typed failure.

## 7. Local PoC state and restart behavior

A backend restart must not destroy the demonstrable Step 2.5 workflow.

Implement one of these controlled local-PoC mechanisms:

* persist confirmed Step 2.2–2.4 workflow state; or
* restore the most recent valid saved portfolio snapshot; or
* allow an explicitly labeled PoC bootstrap portfolio based on existing repository data.

Do not silently substitute Apple or unrelated fixture data.

Any bootstrap portfolio must be clearly identified internally as PoC input. Live SEC/web/model outputs must still be real and must not be prewritten.

The page must load with usable portfolio rows after restoration, instead of presenting only “No confirmed portfolio companies available.”

## 8. Local-versus-production gating

In local PoC mode:

* production activation is non-applicable;
* Fiddler is not required;
* Runner Service is not required;
* production approval is not required;
* approved-web-mode flags must not prevent the existing hybrid SEC/web path;
* the Run Assessment button must invoke the working hybrid pipeline.

In production mode, existing fail-closed governance may remain unchanged.

Do not weaken production controls globally. Scope the bypass explicitly to local PoC mode.

## 9. Loading, completion, and error behavior

Fix the stuck “Processing…” state.

The UI must implement explicit states:

* idle;
* validating company;
* collecting SEC evidence;
* collecting public-web evidence;
* generating assessment;
* validating output;
* persisting result;
* completed;
* completed with insufficient evidence;
* failed.

Every terminal path must clear the spinner and re-enable the appropriate controls.

Switching steps or tabs must not leave stale loading state.

A business result such as “insufficient evidence” is not a technical crash. Render it as a completed assessment with limitations.

## 10. Step 2.4 parity

Also compare Step 2.4 directly to v31.

Restore v31’s:

* table organization;
* factor labels and weights;
* compact row spacing;
* score badges;
* expandable company details;
* summary placement;
* navigation behavior.

Keep current backend values and working formulas. Change presentation and interaction where needed for parity.

## 11. Verification requirements

Do not finish after editing files or confirming HTTP 200 responses.

Verify:

1. v31 remains unchanged.
2. `step23.html` loads through the active backend.
3. Steps 2.1–2.5 remain navigable.
4. Step 2.4 matches v31 structurally and visually.
5. Step 2.5 matches v31 structurally and visually.
6. The primary Step 2.5 screen does not display production-readiness blockers.
7. Portfolio rows appear after normal workflow or local snapshot restoration.
8. Run Assessment completes through the hybrid pipeline.
9. The spinner always terminates.
10. The exact assessed company receives the result.
11. Evidence URLs, SEC accession data, dates, and evidence IDs render correctly.
12. Expanded rows show ED/SI factors and evidence.
13. Override and commentary edits persist.
14. Export works.
15. Confirm Assessment works in local PoC mode.
16. Existing regression tests still pass.

Use a real rendered browser comparison when possible, including screenshots at the same viewport width. If automated screenshot capability is unavailable, inspect the live DOM and computed styles using an existing local browser tool or Playwright. Do not claim visual parity based only on static-file delivery.

## 12. Required completion report

At completion, provide:

* files changed;
* exact discrepancies corrected;
* local-PoC gating behavior;
* restored/persisted workflow-state behavior;
* evidence-quality rules implemented;
* browser verification performed;
* test commands and results;
* remaining differences from v31;
* whether a real end-to-end Step 2.5 assessment was executed;
* assessed company name, ticker, CIK, and run ID;
* source count by type;
* explicit final verdict.

Use one of these verdicts:

* COMPLETE — V31 PARITY AND QUALITY-DATA POC VERIFIED
* BACKEND VERIFIED — UI PARITY NOT YET VERIFIED
* PARTIAL — LIST REMAINING GAPS
* FAILED — INCLUDE THE EXACT TECHNICAL FAILURE

Do not use “complete” merely because CSS/JavaScript was served successfully. Completion requires rendered parity and a real company-specific end-to-end result.
