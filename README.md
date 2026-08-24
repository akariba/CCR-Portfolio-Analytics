Here’s the short but detailed pre → post → impact summary for Step 2.4.

Area	Pre – current implementation	Post – V6.0 prompt	Impact
Purpose	Expand a predefined/approved sector factor list into metrics/scoring	Research and identify the sector’s inherent factors itself, then build full framework	Step 2.4 becomes a real sector-risk discovery step, not just an expansion step
Input	L1/L2/L3 plus existing factor names/details from CSV	Only L1/L2/L3 + optional as-of date; factor names are explicitly no longer required inputs	Current CSV dependency for factor discovery becomes obsolete
Factor identification	Factors already exist before model call	Model researches and identifies 4–5 structural sector-inherent factors	Works for any sector without manually creating factor rows first
Sector test	Implicit/static taxonomy	Explicit Structural Persistence Test: would factor exist ~1 year ago and ~1 year from now independent of a dated event?	Strong separation between 2.3 event risks and 2.4 structural risks
Research	Limited; mostly reasoning over provided taxonomy	Must research current sector conditions using rating agencies, regulators, industry sources, sector disclosures, etc.	Step 2.4 needs a proper retrieval/research stage before Opus synthesis
Event-driven contamination	Possible if static factor set is poorly designed	Explicitly excludes one-off M&A, specific policy events, geopolitical shocks, quarterly macro events, etc.	Cleaner separation between Step 2.3 and 2.4
Factor output	Factor name + generated metrics/rationale	Factor name + structural rationale + source basis + complete methodology	Richer, more auditable framework
Number of factors	Current implementation may accept governed list size	Minimum 4, maximum 5	Backend validator should enforce 4–5 for Step 2.4
Vulnerability metrics	Generated from predefined factors	Minimum 3 quantitative metrics per factor, with formulas and VH/H/M/L bands	Existing UI can mostly render this already
Buffer metrics	Generated	Directly correspond to vulnerability metrics; Strong/Moderate/Weak/Negligible thresholds	Existing metric-card architecture remains useful
Scoring	Net score concept already implemented	Raw Vulnerability – Buffer Credit, floor 1, ceiling 5	Current deterministic backend logic largely aligns
Buffer credit	Strong −2 / Moderate −1 / Weak 0	Same	No major change
Score 5	Current logic has critical-condition concept	Explicitly reserved for simultaneous breach of all critical conditions	Backend should enforce this deterministically
Importance	HIGH=2, MEDIUM=1	Same	No change
Weights	Deterministic weights from importance	Same: score / total scores × 100%	Keep Python calculation exactly as-is
Composite score	Existing framework has reference/composite score	Explicit weighted composite: Σ(weight × net score)	Can stay deterministic in Python
CSV role	Source of governed factor names/details	Should become cache/version/history of researched + analyst-confirmed frameworks, not mandatory factor input	Major backend/data-model change
Analyst confirmation	Generate → review/edit → confirm	Same concept remains	Working UI workflow can stay
Current working UI	Sector handoff, rendering, save/confirm now works	Still suitable	Do not rebuild UI; change generation logic behind it
Step 2.3 relationship	2.3 event-driven, 2.4 static sector taxonomy	2.3 = event-contingent; 2.4 = structural/persistent independent research	Much clearer methodology boundary
Architecture impact

The old flow is essentially:

Step 2.2 sector → CSV factor taxonomy → Opus expands metrics → deterministic scoring → analyst confirms

The V6.0 flow should become:

Step 2.2 confirmed L1/L2/L3 → approved sector research/retrieval → Opus V6 identifies 4–5 inherent factors + methodology → deterministic validation/scoring/weights → analyst review → confirmation/versioning

What we should preserve

The good news is that we do not need to rebuild Step 2.4 from scratch. The current sector handoff, API structure, rendering, factor cards, metric tables, HIGH=2/MEDIUM=1 weighting, Save/Confirm, and feedback workflow can remain.

The main change is upstream of rendering: stop requiring a preloaded factor taxonomy and make the V6.0 research prompt generate the factor set from L1/L2/L3.

Overall impact

Functional impact: high. Visual impact: very low.

The current UI can stay almost entirely intact. The significant correction is the business-generation architecture and data role behind Step 2.4. This also removes the current limitation where only sectors already present in sector_inherent_factors.csv can work.
