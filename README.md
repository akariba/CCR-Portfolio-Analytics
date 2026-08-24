Inspect the current workspace as source of truth and fix only the minimum blocker preventing the RPR backend from running. Strict bone rule: do NOT refactor, rewrite, replace, delete, rename, redesign, or “improve” any working code. Preserve Step 1, Step 2.1, Step 2.2, Step 2.3, v31 UI, model routing, prompts, APIs, and all accepted behavior exactly. Step 2.4 must remain purely additive.

Current symptoms: FastAPI previously failed on python-multipart; we changed upload routes to avoid that dependency, then runtime exposed missing anthropic in the active Python. Do not install packages, use public internet, add mocks/fallbacks, downgrade models, or change approved enterprise adapters.

First inspect the actual workspace, Python/runtime configuration, server.py, step2_routes.py, step22_portfolio_routes.py, llm_gateway.py, and existing approved environment. Find the already-working approved Python/runtime or adapter path used by this project before these changes. Make the smallest safe fix necessary.

Then run only minimal verification: backend import/start, /health, existing Step1 theme-assist call, and confirm Step2.2/2.3/2.4 routers load.

Before editing anything, tell me in maximum 5 lines: root cause, exact file(s) you propose changing, and why. If fixing requires changing any working bone behavior, STOP and ask approval. Minimize token use.
