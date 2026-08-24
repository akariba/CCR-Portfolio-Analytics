Approved. Implement ONLY the two diagnosed Step 2.4 fixes.

In the current working HTML, change only the Step 2.4 Confirm button binding so it calls confirmStep24() directly. Preserve the existing confirmStep24() generate-before-confirm behavior; do not rewrite it.
Restore only the identified Step 2.4 v31 table header classes/widths and action-row alignment from the original v31 HTML. No shared/global CSS changes.
Do not touch Step1, 2.1, 2.2, 2.3, models, prompts, backend services, scoring, or any other UI.
Then run ONE real Step 2.4 test from confirmed Step 2.3 and verify: backend generation called → sector-inherent factors rendered → user confirms → Step2.4 becomes confirmed. Report PASS/FAIL and changed lines only. Stop afterward.
