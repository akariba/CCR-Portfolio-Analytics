Approved direction: fix ONLY the Step2.2 → Step2.4 state handoff.

Preserve all working bone: Step1, Step2.1, Step2.2, Step2.3, backend services, CSV, prompts, models, scoring, v31 HTML/CSS and existing behavior.

Make the smallest additive fix:

expose a read-only getter from the existing Step2.2/2.3 IIFE for the current STEP22_CONFIRMED_PORTFOLIO;
make rpr_step24_append.js use that getter instead of trying to access the private variable directly.
Do NOT duplicate portfolio state, do NOT move/refactor the variable, do NOT use mock/default sectors.
Do NOT treat onSectorChange as the root fix unless it independently blocks the final browser test.

Then run ONE real browser-path verification:
confirmed Step2.2 portfolio → open Step2.4 → Generate Sector Factors → POST /api/v1/rpr/step24/sector-factors/generate → render 5 Software factors → finalize.

Verify: sector = Software, 5 factors displayed, HIGH=2 / MEDIUM=1, weights=100%, finalize succeeds.

If anything else fails, diagnose only and stop. Report changed files/lines + PASS/FAIL. Minimal tokens.
