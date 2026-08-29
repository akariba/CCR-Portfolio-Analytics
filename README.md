You are working in the current RPR project:

`C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI`

Implement and verify a focused production-readiness repair for the existing Step 2.5 SEC + Web workflow.

# 1. Immutable project rules

These rules are mandatory:

1. The active frontend is exclusively:

   `UI Design\step23.html`

2. Do not use, modify, copy from, or wire any v31 HTML file.

3. Preserve every currently working RPR behavior as immutable building bones:

   * Step 1 Trigger 1.
   * Step 1 Trigger 2.
   * Step 2.1.
   * Step 2.2 portfolio selection.
   * Step 2.3 factors.
   * Step 2.4 factors.
   * Existing feedback panels.
   * Existing workflow sidebar.
   * Existing backend endpoints.
   * Existing visual layout and CSS.
   * Existing model-routing logic unless a confirmed defect requires an additive fix.

4. Make additive, narrow changes. Do not refactor or rewrite working modules merely for cleanliness.

5. Strictly no runtime demo behavior:

   * No demo company.
   * No Apple/AAPL default.
   * No fixture company.
   * No fixture SEC response.
   * No fixture web evidence.
   * No mock assessment.
   * No mock provider fallback.
   * No sample results displayed in the production UI.
   * No hidden development bypass.
   * Test doubles are permitted only inside automated tests.

6. Do not fabricate or automatically set:

   * SEC egress approval.
   * Approval ID.
   * Approver.
   * Approval date.
   * Approved hosts.
   * SEC User-Agent/contact.
   * H2M authentication.
   * Step 2.2 confirmation.
   * Step 2.4 confirmation.

7. Do not make live SEC or live public-web requests during automated testing.

8. Do not print, log, store, or return an H2M access token.

9. Do not use `verify=False`, suppress TLS verification, or introduce fail-open behavior.

10. Do not use COIN/M2M credentials. Current assessment authentication is H2M:

* `LLM_PROVIDER=r2d2`
* `R2D2_AUTH_MODE=h2m`

# 2. Observed execution state

The last real execution showed the following:

## Step 2.5 preflight

The API correctly returned:

* HTTP `409`
* Error code: `STEP25_RUN_BLOCKED`

Reported blockers included:

* `STEP25_SEC_ACCESS_NOT_APPROVED: RPR_STEP25_SEC_MODE must be 'live'`
* `STEP25_SEC_ACCESS_NOT_APPROVED: RPR_STEP25_LIVE_SEC_ENABLED must be 'true'`
* `STEP25_SEC_EGRESS_BLOCKED: RPR_SEC_EGRESS_APPROVED must be 'true'`
* `STEP25_SEC_USER_AGENT_MISSING: RPR_SEC_USER_AGENT must be configured`
* `STEP25_WEB_PROVIDER_NOT_READY: RPR_STEP25_WEB_MODE must be 'approved'`

The UI also showed:

* Step 2.3 confirmed with six factors.
* Step 2.4 reported `No` inside Step 2.5.
* The workflow sidebar appeared to show Sector-Inherent Factors as confirmed.
* Portfolio Selection appeared as `In Progress`.
* Step 2.5 displayed `Assessment Model H2M: Ready`.
* CIK resolution said it would be evaluated per run and required company name/ticker.
* The selected real company was `CHINA INFRASTRUCTURE INVESTMENT CORPORATION`.

## H2M runtime failure

A separate real model call failed in the shared gateway:

`theme_assistant_batch.py → llm_gateway.py → get_h2m_token()`

The command:

`helix auth access-token print -a`

timed out after 15 seconds.

Therefore:

* Step 2.5 preflight currently fails before SEC/Web execution.
* The H2M timeout is a separate shared model-gateway problem.
* The UI’s “H2M Ready” result is not reliable because actual token acquisition failed.
* The workflow contains conflicting confirmation/status displays.

# 3. Phase A — mandatory read-only inspection

Before changing anything:

1. Inspect the repository structure.
2. Inspect current working-tree changes if Git is available.
3. Do not reset or revert anything.
4. Identify the exact files and functions responsible for:

   * Step 2.2 confirmation and selected-company state.
   * Step 2.3 confirmation.
   * Step 2.4 confirmation/finalization.
   * Workflow-sidebar statuses.
   * Step 2.5 preflight.
   * Step 2.5 frontend rendering.
   * Step 2.5 Run Assessment handler.
   * H2M readiness.
   * H2M token acquisition.
   * SEC configuration.
   * Approved-web configuration.
   * CIK resolution.
   * Backend persistence.

Inspect at minimum, where present:

* `UI Design/step23.html`
* `UI Design/rpr_step25_append.js`
* `UI Design/rpr_step25_append.css`
* `backend/server.py`
* `backend/llm_gateway.py`
* `backend/theme_assistant_batch.py`
* `backend/step25/`
* Step 2.2, Step 2.3, and Step 2.4 routers/services
* `RUNTIME_ENV.ps1`
* Existing Step 2.5 tests and documentation

Produce a short internal map of the real data flow before editing.

Do not assume that a frontend variable, browser local storage, or workflow-sidebar label is authoritative.

# 4. Fix authoritative workflow-state consistency

There are visible contradictions:

* Portfolio Selection appears `In Progress`, although later steps have data.
* Step 2.4 appears confirmed in the sidebar but unconfirmed in Step 2.5.
* Step 2.5 may be reading a different state source than the sidebar.

Find the root cause.

Implement one authoritative backend-derived state model for Steps 2.2–2.5.

Requirements:

1. Step 2.2 confirmation must come from the backend’s confirmed portfolio record.
2. Step 2.3 confirmation must come from the backend’s confirmed factor record.
3. Step 2.4 confirmation must come from the backend’s finalized/versioned sector-factor record.
4. The workflow sidebar and Step 2.5 preflight must consume the same authoritative state.
5. Browser state may display backend state but must not override it.
6. Page refresh must not create contradictory statuses.
7. Selecting a company must not implicitly confirm the portfolio.
8. Generating Step 2.4 factors must not implicitly finalize them.
9. Do not force confirmation.
10. Preserve the existing analyst confirmation buttons and workflows.

If Step 2.4 is genuinely unconfirmed, the sidebar must say so.

If it is genuinely confirmed, Step 2.5 preflight must recognize the same version.

Include in the authoritative response:

* Step identifier.
* Status.
* Record/version ID.
* Confirmation timestamp.
* Confirmed-by identifier if available.
* Applicable company or sector identifier.
* Reason when not ready.

After Step 2.2 or Step 2.4 confirmation succeeds, refresh the backend-derived workflow state and update all relevant UI components.

# 5. Fix H2M readiness and token timeout handling

The UI currently reports H2M as ready even though token acquisition times out.

This is a real defect.

Inspect the shared H2M implementation in `llm_gateway.py`, especially:

* `get_h2m_token()`
* `_acquire_token()`
* `_get_client()`
* `_call_text_once()`
* `_call_with_quota_fallback()`

Implement explicit H2M readiness states such as:

* `NOT_CONFIGURED`
* `CLI_NOT_FOUND`
* `CONFIGURED_NOT_TESTED`
* `AUTHENTICATED`
* `NOT_AUTHENTICATED`
* `TOKEN_TIMEOUT`
* `TOKEN_EMPTY`
* `TOKEN_COMMAND_FAILED`
* `READY`

Requirements:

1. “Ready” must never mean only that two environment variables are populated.

2. Preflight must distinguish configuration readiness from actual authentication readiness.

3. Resolve the Helix executable using a safe method such as `shutil.which`.

4. Keep `shell=False`.

5. Make the token acquisition timeout configurable, for example:

   `RPR_H2M_TOKEN_TIMEOUT_SECONDS`

6. Validate the configured timeout with safe minimum and maximum bounds.

7. Do not simply create an unbounded wait.

8. A timeout must produce a typed, actionable exception rather than a raw traceback in the UI.

9. Do not include stdout containing a token in logs or error messages.

10. Sanitize stderr before returning it.

11. Do not automatically trigger interactive login.

12. Do not fall back to mock, fixtures, M2M, COIN, or another provider.

13. If safe and compatible with the existing design, cache a successfully acquired token only in process memory and only according to the existing approved token-lifetime pattern.

14. Never write the token to a file.

15. Never return it through an API response.

Add a safe authentication-readiness endpoint or extend the existing preflight response. It may report only:

* Provider.
* Auth mode.
* CLI availability.
* Authentication/readiness status.
* Checked timestamp.
* Typed error code.
* Human-readable corrective action.

It must never return the token.

The frontend must display, for example:

* “H2M configured; authentication not yet verified.”
* “H2M token acquisition timed out.”
* “H2M authenticated and ready.”

Do not display “Ready” after a timeout.

Because the H2M gateway is shared, verify that the fix does not break Step 1, Theme Quality Gate, or other existing model calls.

# 6. Fix Step 2.5 production preflight reporting

Keep the current fail-closed HTTP 409 behavior.

Do not bypass it.

Improve the preflight response so that blockers are grouped into:

## Upstream workflow

* Step 2.2 portfolio not confirmed.
* Step 2.3 factors not confirmed.
* Step 2.4 factors not confirmed or version unavailable.

## SEC access

* SEC mode not live.
* Live SEC execution disabled.
* Egress approval absent.
* Approval metadata incomplete.
* SEC User-Agent absent.
* Approved SEC hosts absent.
* TLS/CA configuration unavailable where required.

## Approved web

* Web mode not approved.
* Approved enterprise provider unavailable.
* Authentication unavailable.
* Provider readiness check failed.

## Assessment model

* R2D2 not configured.
* Auth mode not H2M.
* Helix CLI unavailable.
* H2M authentication not established.
* Token acquisition timeout.

## Company identity

* Authoritative Step 2.2 company missing.
* Ticker/CIK unavailable.
* CIK unresolved.
* CIK review required.
* SEC applicability unresolved.

Each blocker must contain:

* Stable error code.
* Stage.
* Safe message.
* Whether retry may help.
* Whether user action is required.
* Whether platform/security approval is required.
* No secrets.

The UI must render these groups clearly and disable Run Assessment while a hard blocker exists.

A blocked preflight must not create a run record that falsely appears to be an assessment attempt unless the existing audit design intentionally records blocked attempts. If recorded, label it `PREFLIGHT_BLOCKED`.

# 7. Correct production configuration handling

Inspect how `RUNTIME_ENV.ps1` and server startup load environment variables.

Do not put fake values into the active environment.

Implement or document a validated production configuration contract for:

* `RPR_STEP25_SEC_MODE`
* `RPR_STEP25_LIVE_SEC_ENABLED`
* `RPR_SEC_EGRESS_APPROVED`
* `RPR_SEC_EGRESS_APPROVAL_ID`
* `RPR_SEC_EGRESS_APPROVAL_DATE`
* `RPR_SEC_EGRESS_APPROVER`
* `RPR_SEC_EGRESS_APPROVED_HOSTS`
* `RPR_SEC_USER_AGENT`
* `RPR_STEP25_WEB_MODE`
* Approved-web provider configuration already used by the repository
* `LLM_PROVIDER`
* `R2D2_AUTH_MODE`
* `RPR_H2M_TOKEN_TIMEOUT_SECONDS`
* Existing CA/proxy variables, if required

Rules:

1. Do not change approval variables to `true`.
2. Do not invent a User-Agent email/contact.
3. Do not invent approved hosts.
4. Do not expose tokens.
5. Configuration validation must run before external access.
6. A string such as `true` must be parsed strictly and consistently.
7. Startup logs may print variable presence/status, never secrets or token values.
8. If documentation or a template is created, use placeholders and make it impossible for placeholders to be mistaken for active approval.

Clearly state which values are:

* Safe technical configuration.
* Human/platform approval evidence.
* Sensitive.
* H2M runtime state.

# 8. Fix approved-web readiness

Step 2.5 reports:

`RPR_STEP25_WEB_MODE must be 'approved'`

Inspect the existing enterprise-approved web integration. Reuse the current audited adapter. Do not introduce direct public search or a new provider.

Determine:

* Which provider Step 2.5 currently calls.
* Whether it uses H2M.
* Which configuration establishes approved mode.
* Whether provider readiness is currently configuration-only or actually tested.
* Whether Step 2.5 is accidentally pointing to fixture or mock code.

Requirements:

1. Production Step 2.5 must have no fixture fallback.
2. Provider mode must be explicitly `approved`.
3. Provider readiness must be represented independently from SEC readiness.
4. Authentication failure must be typed and visible.
5. No public web request may occur during preflight.
6. No web result may be displayed unless returned by the approved adapter.
7. Preserve citations and source URLs.
8. Do not silently continue with SEC-only evidence if the selected assessment type is SEC + Web and approved web is unavailable.

# 9. Fix authoritative company identity and CIK input

The UI currently says CIK resolution requires `company_name/ticker`.

The Step 2.5 request must not trust arbitrary browser-supplied identity fields.

Use the selected, confirmed Step 2.2 company’s authoritative backend record.

Pass only its stable internal company ID from `step23.html`, then load on the server:

* Internal company ID/CAGID.
* Legal name.
* Ticker, if available.
* Exchange, if available.
* Country.
* LEI, if available.
* Existing CIK, if available.
* Step 2.2 confirmation state/version.

Requirements:

1. Reject unknown company IDs.

2. Reject unconfirmed Step 2.2 companies.

3. Reject browser identity values that conflict with the backend record.

4. Do not replace the selected company with Apple or another known filer.

5. Do not invent a ticker.

6. Do not use fuzzy company-name similarity as CIK confirmation.

7. If the company is not an SEC filer, classify it honestly.

8. Distinguish:

   * `CIK_CONFIRMED`
   * `CIK_REVIEW_REQUIRED`
   * `CIK_UNRESOLVED`
   * `SEC_NOT_APPLICABLE`

9. A missing ticker is not automatically `SEC_NOT_APPLICABLE`.

10. A foreign company is not automatically `SEC_NOT_APPLICABLE`.

11. Do not allow CIK resolution to run until the Step 2.2 identity is authoritative.

For the currently selected `CHINA INFRASTRUCTURE INVESTMENT CORPORATION`, do not assume that an SEC filing exists. The result must come from the real resolution process after authorization.

# 10. Fix step23.html integration

Only modify `UI Design/step23.html` and its legitimate additive assets if needed.

Do not touch v31.

The production Step 2.5 panel must display:

* Confirmed Step 2.2 company.
* Internal company ID.
* Step 2.2 confirmation/version.
* Step 2.3 factor count and confirmation/version.
* Step 2.4 confirmation/version.
* SEC readiness.
* Approved-web readiness.
* H2M configuration and authentication readiness separately.
* Persistence readiness.
* CIK status only after evaluated.
* Grouped blockers.
* Retry guidance.
* Correct HTTP status information.

Fix stale UI state:

* Refresh authoritative state when entering Step 2.5.
* Refresh after Step 2.2 confirmation.
* Refresh after Step 2.4 finalization.
* Refresh after a preflight call.
* Do not use stale sidebar labels as input.
* Do not show permanent “Processing…” after a blocked response.
* Always clear loading state in a `finally` path.
* Do not create a second Run Assessment button.
* Keep existing styling and layout.

# 11. Automated tests

Use mocked subprocesses and mocked network clients only inside tests.

Do not perform live SEC/web/H2M calls in automated tests.

Add focused tests for:

1. Step 2.2 sidebar and preflight use the same backend status.
2. Step 2.4 sidebar and preflight use the same backend status.
3. Unconfirmed Step 2.4 returns a typed blocker.
4. Confirmed Step 2.4 version is recognized after refresh.
5. Run Assessment remains disabled with blockers.
6. Loading state clears after HTTP 409.
7. H2M config alone does not report `READY`.
8. Missing Helix CLI produces `CLI_NOT_FOUND`.
9. Helix timeout produces `TOKEN_TIMEOUT`.
10. Empty token produces `TOKEN_EMPTY`.
11. Nonzero command result produces a typed error.
12. Successful mocked token acquisition produces readiness without exposing the token.
13. Token content is absent from logs and API responses.
14. Timeout configuration bounds are enforced.
15. No mock-provider fallback occurs.
16. No M2M/COIN path is selected.
17. Approved-web configuration is checked separately.
18. Browser identity mismatch is rejected.
19. Missing ticker/CIK does not substitute another company.
20. Foreign company does not automatically become `SEC_NOT_APPLICABLE`.
21. Preflight makes no SEC or public-web requests.
22. `step23.html` is the only active frontend target.
23. No v31 reference exists in new Step 2.5 wiring.
24. Existing Step 1 and Steps 2.1–2.4 tests remain unchanged or pass.
25. No RRR, factors, or confirmation records are mutated by blocked Step 2.5 preflight.

# 12. Safe manual verification

After tests pass:

1. Start the real backend using the project’s normal environment.
2. Serve/open the active `step23.html`.
3. Verify the existing Steps 1–2.4 still render and work.
4. Open Step 2.5.
5. Verify the sidebar and Step 2.5 display identical authoritative statuses.
6. Verify H2M does not say Ready if token acquisition times out.
7. Verify Run Assessment is disabled when preflight is blocked.
8. Verify no live SEC or web request was made.
9. Do not set approval variables or fake successful production activation.

If an already authenticated H2M session exists and a safe token-readiness check is authorized, verify only that the readiness state works. Do not print the token.

# 13. Required final report

Return a detailed report with:

## Root causes

For every observed issue, identify the exact cause:

* Portfolio Selection status inconsistency.
* Step 2.4 status inconsistency.
* H2M false-positive readiness.
* Helix token timeout.
* SEC preflight blockers.
* Approved-web blocker.
* CIK input limitation.
* Persistent Processing indicator, if reproduced.

## Files changed

List every changed file and explain each change.

Separate:

* Backend production code.
* Frontend.
* Tests.
* Configuration/documentation.

## Tests

Report exact commands and results:

* Focused tests.
* Step 2.5 tests.
* Full backend regression.
* Frontend/static tests.

Separate new failures from pre-existing failures.

## Approval/configuration matrix

For every unresolved blocker, classify it as:

* Fixed in code.
* Requires configuration.
* Requires H2M login.
* Requires MarketDev/platform approval.
* Requires approved SEC User-Agent.
* Requires analyst Step 2.2/2.4 action.
* Requires company identity review.

## Exact next activation steps

Provide the minimum safe steps needed after approvals are obtained.

Do not include fake values.

## Explicit confirmations

Confirm:

* Active frontend is `UI Design/step23.html`.
* No v31 file was modified.
* No demo/fixture runtime was introduced.
* No approval was fabricated.
* No token was logged.
* No live SEC/web request was made.
* Working RPR behavior was preserved.

Do not declare Step 2.5 production-ready while any genuine approval, authentication, identity, or upstream-confirmation blocker remains.
