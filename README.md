Correction: the active RPR application is `step23.html`, not `icm-pm-rapid-portfolio-review-v31.html`.

Stop treating v31 as the runtime frontend.

The user has consistently developed and tested the application through `step23.html`. All Step 2.5 SEC + Web integration, browser verification, static serving, documentation, and tests must target the actual active `step23.html`.

# Required correction

1. Locate the exact active `step23.html` file.
2. Confirm its absolute path.
3. Confirm it matches the UI shown in the screenshots:

   * Steps 2.1–2.5 navigation.
   * SEC + Web assessment card.
   * CAM + Web card.
   * CAM + SEC + Web card.
   * Visible Run Assessment button.
4. Inspect its existing DOM, scripts, CSS, navigation, API-base logic, and assessment handlers.
5. Integrate the already-working Step 2.5 backend into this file.
6. Do not redesign or replace `step23.html`.
7. Do not rename existing DOM IDs.
8. Do not change Steps 1–2.4.
9. Do not use v31 for further testing.
10. Do not claim completion based on v31.

# Preserve backend work

Keep the verified backend implementation:

* Real `server:app`.
* Step 2.5 router.
* Fixture SEC transport.
* Fixture approved-web provider.
* CIK resolution.
* Filing/XBRL normalization.
* Conflict detection.
* Mock assessment.
* Evidence and manifest endpoints.
* Live SEC fail-closed controls.
* Existing passing backend tests.

Do not rebuild the backend.

# Handle previous v31 edits safely

Because this repository has no Git baseline:

* Do not delete or revert v31 changes blindly.
* Do not use destructive Git commands.
* Identify exactly which edits were made solely for the mistaken v31 integration.
* List those edits in the final report.
* Do not modify v31 further.
* Leave safely removing the mistaken v31-only wiring until it can be attributed precisely.
* Shared Step 2.5 JS/CSS may be reused if appropriate, but they must now be loaded and mounted by `step23.html`.

# Integrate into the real Step 2.5 screen

The visible controls in `step23.html` are authoritative.

When the user:

1. Opens `step23.html`.
2. Navigates to Step 2.5.
3. Selects `SEC + Web`.
4. Clicks the existing visible `Run Assessment` button.

The button must call the implemented Step 2.5 backend.

Do not add a second competing Run Assessment button.

Use the existing selection card and button.

Map only:

```text
SEC + Web -> Step 2.5 SEC + Web pipeline
```

Do not accidentally invoke this pipeline for:

```text
CAM + Web
CAM + SEC + Web
```

Those options must retain their existing behavior or show a controlled not-yet-implemented message.

# Mount the result UI in step23.html

Add the Step 2.5 results directly below the existing assessment selector and Run Assessment controls.

The active `step23.html` must show:

* Fixture-mode banner.
* Demo fixture context.
* Readiness status.
* CIK card.
* Actual run progress.
* SEC evidence lane.
* Approved-web evidence lane.
* Conflict and gap panel.
* Assessment result.
* Clickable evidence citations.
* Nonbinding RRR recommendation.
* “No RRR value was changed” disclaimer.
* Structured errors.

Use existing `step23.html` styling and conventions.

Do not import v31-specific navigation assumptions or selectors.

# Script and stylesheet integration

If reusing:

```text
rpr_step25_append.js
rpr_step25_append.css
```

then:

* Add correct references to `step23.html`.
* Verify relative paths from the real file.
* Ensure scripts load after required DOM elements exist.
* Make initialization idempotent.
* Bind the actual visible Run Assessment button in `step23.html`.
* Validate every selector against the real DOM.
* Ensure the panel follows the existing Step 2.5 show/hide behavior.
* Prevent duplicate handlers.
* Do not fail silently.
* Always restore the button state after an error.

If the existing Step 2.5 JavaScript architecture in `step23.html` has a better integration point, use it rather than forcing the append-file pattern.

# Fixture-mode isolation

Use:

```text
RPR_STEP25_SEC_MODE=fixture
RPR_STEP25_WEB_MODE=fixture
RPR_STEP25_LIVE_SEC_ENABLED=false
LLM_PROVIDER=mock
```

The offline demo must:

* Use the committed fixture company.
* Use fixture Step 2.3 factors.
* Use fixture Step 2.4 factors.
* Not call Helix.
* Not call R2D2.
* Not generate live Step 2.4 factors.
* Not contact SEC.
* Not perform live web search.
* Not consume the Helix timeout message as a sector factor.

Display:

```text
DEMO FIXTURE CONTEXT
This run uses committed demo Step 2.3 and Step 2.4 factors and does not assess the currently selected production portfolio company.
```

# Serve the correct file over HTTP

Serve `step23.html` over the project’s supported HTTP static route.

Do not use:

```text
file:///
```

Do not serve or open v31.

Return an exact URL such as:

```text
http://127.0.0.1:<port>/<actual-static-path>/step23.html
```

Use the actual filename and route discovered in the repository.

Confirm HTTP 200 for:

* `step23.html`
* Required Step 2.5 JavaScript
* Required Step 2.5 CSS
* Step 2.5 preflight endpoint

# Browser verification

Test the real `step23.html` execution chain:

```text
step23.html loads
-> Step 2.5 JS loads
-> Step 2.5 DOM mounts
-> SEC + Web selection is detected
-> Existing Run Assessment button is bound
-> Click creates a real HTTP request
-> Run reaches COMPLETED
-> Evidence is fetched
-> Assessment is fetched
-> Results render in step23.html
```

Expected fixture result:

```text
Company: Apple
CIK: 0000320193
Phase: COMPLETED
Evidence records: 9
Conflicts: 1
Provider: mock
Recommendation is nonbinding: true
RRR changed: false
```

Check the browser console and network panel.

There must be:

* No uncaught JavaScript exception.
* No 404 for JS/CSS.
* No CORS error.
* No duplicate handler.
* No request to SEC.
* No live web request.
* No Helix call.
* No R2D2 call.

# Tests

Keep all existing Step 2.5 backend tests passing.

Update or add tests proving:

1. The actual `step23.html` references required Step 2.5 assets.
2. The real Step 2.5 container exists.
3. The visible Run Assessment button has a stable selector.
4. SEC + Web maps to the Step 2.5 router.
5. CAM selections do not map to SEC + Web.
6. The Step 2.5 panel mounts in `step23.html`.
7. Initialization is idempotent.
8. Fixture mode makes zero Helix/SEC/live-web calls.
9. Invalid Step 2.4 error text is rejected.
10. RRR is not mutated.
11. v31 is not the frontend used by the browser-verification test.

# Documentation correction

Update `STEP25_IMPLEMENTATION.md`:

* Replace v31 as the active frontend with the exact `step23.html` path.
* Replace the v31 demo URL with the `step23.html` HTTP URL.
* State that the earlier v31 target was incorrect.
* Document any remaining mistaken v31-only edits separately.
* Keep backend activation and security documentation unchanged.

# Final report

Return:

```text
TARGET CORRECTION
- Active frontend:
- Absolute path:
- Previous incorrect target:
- v31 used for runtime: no

STEP23 INTEGRATION
- Existing Step 2.5 container:
- Visible Run Assessment selector:
- SEC + Web selector:
- JS loaded:
- CSS loaded:
- Panel mounted:

HTTP VERIFICATION
- step23 URL:
- HTML status:
- JS status:
- CSS status:
- Preflight status:

BROWSER RUN
- Button click observed:
- POST URL:
- HTTP status:
- Run ID:
- Phase:
- Company:
- CIK:
- SEC evidence count:
- Web evidence count:
- Conflict count:
- Assessment ID:
- Provider:
- Nonbinding:
- RRR changed:

NETWORK ISOLATION
- Helix calls:
- R2D2 calls:
- SEC calls:
- Live web calls:

FILES CHANGED
- Exact files and purpose

V31 CLEANUP STATUS
- Exact mistaken edits identified:
- Removed safely or left documented:
- No destructive revert performed:

TESTS
- Exact commands and results

REMAINING ISSUES
- Only genuine blockers
```

Begin by locating and reading the actual `step23.html`. Do not continue work against v31.
