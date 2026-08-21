Please inspect the original `rpr-v8-consolidated-test (2).html` and return ONLY the exact literal wrapper around the CSS block.

I need:

1. The exact line containing the opening `<style>` tag.
2. The exact line immediately before the first CSS character, if there is anything between `<style>` and `:root`.
3. The exact final CSS rule after:
   `.portfolio-confirm-footer{...}`
   if any CSS exists after it.
4. The exact line containing the closing `</style>` tag.
5. The exact next line immediately after `</style>`.

Do NOT return the CSS I already extracted.
Do NOT summarize.
Do NOT modify formatting.
Do NOT add or remove whitespace.
Do NOT use ellipses.
Do NOT fix anything.

If `.portfolio-confirm-footer{...}` is truly the final CSS rule, explicitly output:

FINAL CSS RULE CONFIRMED: YES

Then show the exact closing sequence verbatim.

If it is not the final rule, output every remaining CSS rule verbatim until `</style>`.

Return source only.
