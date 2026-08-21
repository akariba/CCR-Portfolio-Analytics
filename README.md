Read the uploaded `rpr-v8-consolidated-test (2).html` directly.

I already have the forensic report A–W. I do NOT want another summary, comparison, explanation, redesign, or analysis.

I need a SOURCE-RECOVERY package containing ONLY the exact original source that is still missing for byte-faithful reconstruction.

Extract VERBATIM from the HTML:

1. THE COMPLETE `<style>...</style>` BLOCK
- Every CSS rule.
- Every selector.
- Every `:root`.
- V6 + V31 + audit overrides + feedback + Step 1/2/3 + responsive rules.
- Preserve exact values, comments, ordering and duplicate declarations.
- Absolutely no `...`, truncation, paraphrasing or “same as above”.

2. THE COMPLETE STATIC `<body>` MARKUP
From `<body>` until immediately before the inline `<script>`.
Include all:
- header
- navigation
- Step 1 / Trigger 1 / Trigger 2
- AI Assist
- event tree/detail
- modal
- Step 2.1–2.5
- Step 3
- every feedback panel
- workflow status
- system log
- every button, textarea, input, select, ID, class, inline style, data attribute, onclick/onchange handler and exact visible text.

3. THE COMPLETE INLINE `<script>` SOURCE
I want the original JavaScript, not descriptions.

Extract from:
`<script>`
through:
`</script>`

Include ALL constants, global variables and ALL functions in their original order, including dead code, duplicate/overridden functions, stubs and known bugs.

Especially make sure these are complete and not merely referenced:
- renderThemes
- theme assist helpers + assistThemes
- runScan
- pollScanProgressive
- applyProgressivePayload
- retryFailedItems
- resolveThemeId
- eventFromPayload
- renderEvTree
- renderEvDetail
- buildAccordion
- confirmEv
- modal functions
- diagnosis/enhancement functions
- applyT1Enhancement / applyT1Rescan
- all Trigger-2 functions
- switchTab / switchTrig / switchStep
- workflow functions
- Step 2.1 upload/scenario functions
- Step 2.2 functions
- Step 2.3 functions
- feedback functions
- initialization / DOMContentLoaded
- and every other function present in the real source.

4. END OF FILE
Include the real:
`</script>`
`</body>`
`</html>`

STRICT RULES:

- DO NOT FIX ANYTHING.
- DO NOT IMPROVE ANYTHING.
- DO NOT OPTIMIZE ANYTHING.
- DO NOT CHANGE THE V31 DESIGN.
- DO NOT CHANGE TRIGGER 1.
- DO NOT change the Bible rule: up to 3 events per accepted theme.
- DO NOT implement missing L2/L3.
- DO NOT implement portfolio upload.
- DO NOT implement missing Step 2.4/2.5/3 behavior.
- Preserve bugs, unused functions, duplicate declarations, dangling references and empty stubs exactly as they exist.
- Never use `...`, `[snip]`, “unchanged”, “same as above”, or prose instead of source.

If the output is too large, create multiple artifacts:

RPR_SOURCE_RECOVERY_01.txt
RPR_SOURCE_RECOVERY_02.txt
RPR_SOURCE_RECOVERY_03.txt
...

Continue automatically until the ENTIRE original HTML source is reproduced.

Each artifact must continue exactly from the previous character/line — no overlaps and no missing ranges.

If any source character genuinely cannot be read, DO NOT GUESS. Put:

[[UNCERTAIN_SOURCE]]

at that exact location.

At the very end give only:

FULL CSS: COMPLETE / INCOMPLETE
FULL BODY HTML: COMPLETE / INCOMPLETE
FULL JAVASCRIPT: COMPLETE / INCOMPLETE
FULL FILE ENDING: COMPLETE / INCOMPLETE
UNCERTAIN_SOURCE COUNT: <number>

The objective is exact source recovery, not functional equivalence.
