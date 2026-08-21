Read the original `rpr-v8-consolidated-test (2).html` directly.

I already have the CSS exactly, including the complete `<style>...</style>` block.

I now need ONLY the exact static HTML body markup, from the literal opening:

<body>

through the last line immediately BEFORE the opening:

<script>

Do NOT include the JavaScript yet.

OBJECTIVE:
Recover the original body markup verbatim so another engineer can reconstruct the same frontend without guessing.

INCLUDE EVERYTHING INSIDE `<body>` BEFORE `<script>`, including:

- loading overlay
- modal overlay and modal contents
- global header
- Citi/logo area
- connectivity chip
- app shell
- chevron navigation
- Step 1 pane
- Trigger 1
- Trigger 2
- theme table structure
- AI Assist area
- scan controls
- event summary area
- pre-scan state
- event tree/sidebar
- event detail container
- Trigger 2 narrative area
- Step 2 panel
- Step 2.1
- Step 2.2
- Step 2.3
- Step 2.4
- Step 2.5
- Step 3
- all feedback panels
- Workflow Status panel
- all 7 workflow rows
- system log container
- every static input
- every textarea
- every select
- every button
- every anchor/download link
- every id
- every class
- every `data-*` attribute
- every `onclick`
- every `onchange`
- every `oninput`
- every drag/drop handler
- every inline `style`
- every `aria-*` attribute
- every visible label
- every placeholder
- every static empty-state message

STRICT EXTRACTION RULES:

1. VERBATIM SOURCE ONLY.
2. Start with the exact original `<body>` line.
3. Stop immediately before the first `<script>` line.
4. Do NOT include `<script>`.
5. Do NOT include CSS.
6. Do NOT summarize.
7. Do NOT explain any element.
8. Do NOT reformat or pretty-print the HTML.
9. Do NOT normalize whitespace or indentation.
10. Do NOT fix invalid HTML.
11. Do NOT remove apparently unused elements.
12. Do NOT add missing elements.
13. Do NOT modify text.
14. Do NOT rename IDs/classes.
15. Do NOT replace content with `...`, `[snip]`, “same as above”, or comments.
16. Preserve duplicate markup and dead controls exactly as they exist.
17. Preserve known incomplete Step 2.2 / Step 2.4 / Step 2.5 / Step 3 markup exactly as-is.
18. Preserve the current v31 visual structure exactly.

If the body is too large for one response, split it into sequential artifacts:

RPR_BODY_RECOVERY_01.html
RPR_BODY_RECOVERY_02.html
RPR_BODY_RECOVERY_03.html
...

Rules for splitting:
- Part 2 must continue exactly where Part 1 stopped.
- No omitted lines.
- No overlap unless explicitly marked.
- Do not restart from `<body>` in every part.
- Continue until the line immediately before `<script>`.

If any source character genuinely cannot be recovered, do not guess.
Insert exactly:

[[UNCERTAIN_SOURCE]]

at that location.

At the end, after all body source has been emitted, give ONLY:

BODY START `<body>`: CONFIRMED
BODY END BEFORE `<script>`: CONFIRMED
BODY MARKUP COMPLETE: YES / NO
UNCERTAIN_SOURCE COUNT: <number>

Do not provide any other explanation.
