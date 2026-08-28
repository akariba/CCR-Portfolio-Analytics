Fix the demonstrated Step 2.5 SEC + Web runtime defect.

The implementation passes backend tests, but the real browser does not run the assessment.

# Evidence from the real browser

The screenshots show:

* The browser is opened from a local `file:///C:/.../icm-pm-rapid-portfolio-review-v31.html` path.
* Step 2.5 shows only the original assessment-type cards:

  * SEC + Web
  * CAM + Web
  * CAM + SEC + Web
  * Run Assessment
* The expected new UI is absent:

  * No fixture-mode banner.
  * No readiness panel.
  * No CIK card.
  * No run progress.
  * No SEC lane.
  * No web lane.
  * No assessment panel.
  * No conflict/gap section.
* Clicking Run Assessment produces no visible result.
* Step 2.4 previously failed because:

```text
helix auth access-token print -a
timed out after 15 seconds
```

* The Step 2.4 UI incorrectly displays that exception text as if it were a sector factor.
* The backend is reachable at:

```text
http://127.0.0.1:8000
```

This is now a defect-diagnosis and repair task. Do not provide another plan.

# 1. Preserve scope

Do not:

* Enable live SEC access.
* Call `data.sec.gov`.
* Call `www.sec.gov`.
* Run live approved-web search.
* Fix or redesign Helix authentication.
* Change R2D2/COIN.
* Modify Steps 1–2.4 except for the smallest defensive validation needed to prevent an exception string from becoming a Step 2.5 factor.
* Change RRR.
* Replace the v31 UI.
* Create another Step 2.5 page.
* Install new packages.
* Perform destructive Git operations.

Use:

```text
RPR_STEP25_SEC_MODE=fixture
RPR_STEP25_WEB_MODE=fixture
RPR_STEP25_LIVE_SEC_ENABLED=false
LLM_PROVIDER=mock
```

The fixture demo must run without Helix, R2D2, SEC connectivity, public-web connectivity, or current Step 2.4 generation.

# 2. Diagnose before editing

Inspect the actual v31 HTML and answer these questions with code evidence:

1. Is `rpr_step25_append.js` referenced by the actual HTML file?
2. Is `rpr_step25_append.css` referenced?
3. Are the paths correct relative to the HTML file?
4. Are the tags placed before the closing `</body>`?
5. Does either file return a load error?
6. Is the JavaScript traditional script or `type="module"`?
7. Does `file://` prevent it from loading?
8. Does the script execute before the Step 2.5 DOM exists?
9. Does `#t1-step-4` exist at initialization time?
10. Does `#step25-rpr-panel` get created?
11. Is it immediately hidden by existing tab-navigation logic?
12. Is the script adding its own button while the visible button remains the legacy Run Assessment button?
13. What is the actual ID/class of the visible Run Assessment button?
14. Does another existing click handler intercept it?
15. Does the new handler call `preventDefault` or stop propagation incorrectly?
16. Does the handler throw before making a fetch request?
17. What API base URL does the JavaScript calculate under `file://`?
18. Does the browser send any request after clicking?
19. Is the request blocked by CORS or a `null` origin?
20. Does browser caching leave an older HTML/JS version active?

Inspect browser console and network output if available.

Do not guess. Identify the first failed link in this chain:

```text
HTML loads
-> Step 2.5 JS loads
-> DOM mount succeeds
-> visible button is bound
-> click handler runs
-> preflight request succeeds
-> run request succeeds
-> evidence/assessment requests succeed
-> result renders
```

# 3. Integrate with the visible legacy Step 2.5 UI

Do not create an unrelated hidden Step 2.5 experience.

Use the existing visible controls.

The visible `SEC + Web` card and visible `Run Assessment` button must drive the new Step 2.5 router.

Requirements:

* Preserve the three existing assessment-type cards.
* Preserve their styling.
* Preserve CAM choices for later work.
* When `SEC + Web` is selected, the visible Run Assessment button must execute the Step 2.5 SEC + Web flow.
* Do not require the user to find a second Run button.
* If a dedicated new results panel is used, mount it directly below the existing assessment-type selection and Run Assessment controls.
* Ensure the new panel becomes visible whenever the existing Step 2.5 tab is visible.
* Ensure it hides only when the user navigates away from Step 2.5.
* Do not attach duplicate click handlers.
* Do not allow the legacy handler to swallow the SEC + Web click.
* CAM + Web and CAM + SEC + Web must retain their current behavior or display a clear “not implemented in this increment” message. They must not accidentally invoke SEC + Web.

If the existing Run Assessment button lacks a stable ID, add one additively without renaming or removing existing classes.

# 4. Make initialization reliable

The Step 2.5 script must initialize under all supported load orders.

Use an idempotent initialization pattern:

```text
If DOM is loading -> initialize on DOMContentLoaded
Otherwise -> initialize immediately
```

Also ensure:

* Initialization can safely run only once.
* The panel is not duplicated.
* Existing tab navigation can call a Step 2.5 refresh method without remounting.
* All required selectors are validated.
* A missing selector produces a visible controlled error and a useful console message.
* The code does not fail silently.
* JavaScript exceptions do not leave the Run Assessment button permanently disabled.

Add a small diagnostic marker consistent with project logging, such as:

```text
Step 2.5 SEC+Web UI initialized
```

Do not log evidence payloads or secrets.

# 5. Stop using `file://` for the final demo

The final browser test must not use a local file URL.

Use the project’s existing supported frontend-serving mechanism.

Preferred order:

1. Existing backend static-file route, if present.
2. Existing project UI development server, if present.
3. Existing approved local static-server command already used by the project.

Do not introduce a new framework or dependency.

The final URL must be HTTP, for example:

```text
http://127.0.0.1:<port>/.../icm-pm-rapid-portfolio-review-v31.html
```

Do not claim the browser test passed while the address bar still begins with:

```text
file:///
```

If the backend does not currently serve the v31 file and the project has no UI server, implement the smallest safe static-file mounting consistent with the current FastAPI application. Do not expose the entire repository directory. Mount only the required UI/static asset directory.

Confirm that these assets return HTTP 200:

```text
icm-pm-rapid-portfolio-review-v31.html
rpr_step25_append.js
rpr_step25_append.css
```

Ensure the script and stylesheet paths work over HTTP.

# 6. API base URL

Use the application’s existing backend URL configuration.

The screenshot indicates:

```text
http://127.0.0.1:8000
```

Requirements:

* Do not infer the API host incorrectly from a `file://` origin.
* Reuse the same API-base helper used by Steps 2.3 and 2.4 if one exists.
* Do not hardcode a second conflicting backend URL.
* Preflight must call the real Step 2.5 status route.
* Log a controlled visible error if the backend is unavailable.
* Check response status before parsing JSON.
* Parse structured errors.
* Always restore the Run Assessment button state in `finally`.

# 7. Fixture demo must be independent of failed Step 2.4 live generation

The screenshot shows the current Step 2.4 live generation failed because Helix authentication timed out.

For fixture mode:

* Use the committed Step 2.5 demo company.
* Use committed fixture Step 2.3 factors.
* Use committed fixture Step 2.4 sector factors.
* Use committed SEC fixtures.
* Use committed web fixtures.
* Use `LLM_PROVIDER=mock`.
* Do not invoke Step 2.4 generation.
* Do not acquire a Helix token.
* Do not call `llm_gateway.py` with R2D2.
* Do not require real Step 2.4 workflow completion.
* Clearly label the result as a fully isolated demo fixture.
* Show that current portfolio/upstream state is not being used.

Display:

```text
DEMO FIXTURE CONTEXT
This assessment uses the committed demo company and fixture Step 2.3/2.4 factors. It does not assess the currently selected portfolio company.
```

For a future non-fixture production run:

* Real Step 2.2–2.4 readiness remains required.
* Failed or unconfirmed upstream factors must block with `STEP25_UPSTREAM_NOT_READY`.
* Never turn an upstream exception string into a risk factor.

# 8. Reject invalid upstream factor records

The UI currently displays this error as if it were a sector factor:

```text
Command ['helix', 'auth', 'access-token', 'print', '-a'] timed out after 15 seconds
```

Step 2.5 must reject upstream factor records that are actually errors.

Add defensive validation at the Step 2.5 boundary:

* Factor must have a valid factor ID.
* Factor must have a nonempty factor label.
* Factor must have an approved/confirmed status when required.
* Factor text matching a backend exception or command traceback must not be accepted.
* Error response objects must not be converted into factor rows.
* Missing factor collections must produce an explicit gap/blocker.
* Do not silently treat zero factors as a successful production assessment.
* Do not modify the authoritative Step 2.4 record in this task.

Fixture Step 2.5 must use its own valid fixture factor records and therefore remain runnable.

Add a test proving that a Helix timeout message cannot enter the Step 2.5 assessment input as a sector factor.

# 9. Visible run behavior

When the user:

1. Opens Step 2.5.
2. Selects `SEC + Web`.
3. Clicks the existing visible `Run Assessment` button.

The UI must immediately:

* Disable the button.
* Display “Starting Step 2.5 fixture assessment.”
* Show the fixture-mode banner.
* Show the demo fixture company.
* Call preflight.
* Create the run.
* Display real returned phases.
* Retrieve evidence.
* Retrieve assessment.
* Retrieve manifest if used.
* Render results.
* Re-enable the button.

The final page must visibly contain:

## Readiness

```text
Fixture company
Fixture Step 2.3 factors
Fixture Step 2.4 version
As-of date
Ready
```

## CIK card

For the Apple fixture:

```text
CIK: 0000320193
Status: CIK_CONFIRMED
```

## SEC evidence

At least:

* One filing.
* Accession number.
* One reported XBRL fact.
* One filing excerpt.
* Source URL.
* Evidence ID.

## Web evidence

At least:

* One fixture web record.
* Title.
* Publisher/domain.
* Snippet.
* Source URL.
* Evidence ID.
* Demo-only label.

## Conflict/gap

At least:

* One fixture conflict or disconfirming relationship.
* Both evidence IDs.
* Analyst review required.
* One evidence gap.

## Assessment

At least:

* Assessment ID.
* Mock provider label.
* Headline.
* Risk direction.
* Confidence.
* Nonbinding RRR recommendation.
* Supporting evidence.
* Disconfirming evidence.
* Clickable citations.
* Workflow action.
* Visible statement:

```text
Review recommendation only.
No RRR value was changed.
```

# 10. Error visibility

The previous behavior appears inert. Silent failure is unacceptable.

If any stage fails, show:

* Stage.
* Structured error code.
* Human-readable message.
* Whether retry is appropriate.
* Backend URL used.
* HTTP status when available.

Do not show a raw traceback to the user.

Keep full technical details in the developer console only.

Handle at least:

```text
STEP25_UI_NOT_INITIALIZED
STEP25_BACKEND_UNAVAILABLE
STEP25_UPSTREAM_NOT_READY
CIK_REVIEW_REQUIRED
CIK_UNRESOLVED
SEC_LIVE_MODE_BLOCKED
WEB_SOURCE_UNAVAILABLE
INSUFFICIENT_EVIDENCE
MODEL_OUTPUT_INVALID
```

# 11. Browser cache

Because the visible page may be an older cached version:

* Add or update the existing asset version query convention if the project uses one.
* Do not invent aggressive cache busting.
* Confirm the browser receives the updated JavaScript.
* Provide exact hard-refresh instructions.
* Verify the loaded script source in the browser network panel.

# 12. Required automated tests

Keep all existing 40 Step 2.5 tests passing.

Add tests for:

1. The v31 HTML references the Step 2.5 JS and CSS using valid paths.
2. The expected Step 2.5 mount location exists.
3. The visible legacy Run Assessment control has a stable selector.
4. SEC + Web maps to the Step 2.5 fixture run.
5. CAM choices do not accidentally call SEC + Web.
6. Initialization is idempotent.
7. A failed API request restores the button.
8. An exception string is rejected as an upstream factor.
9. Fixture mode does not call Helix.
10. Fixture mode does not call R2D2.
11. Fixture mode does not make SEC requests.
12. Fixture mode does not make web requests.
13. The offline router run reaches `COMPLETED`.
14. Returned citations resolve to evidence.
15. RRR is not mutated.

Use the existing test tools. Do not install a new JavaScript framework.

# 13. Real browser verification

After fixing:

1. Start the backend with:

```text
RPR_STEP25_SEC_MODE=fixture
RPR_STEP25_WEB_MODE=fixture
RPR_STEP25_LIVE_SEC_ENABLED=false
LLM_PROVIDER=mock
```

2. Serve the real v31 frontend over HTTP.
3. Open the HTTP URL.
4. Hard refresh.
5. Navigate to Step 2.5.
6. Select SEC + Web.
7. Click the visible Run Assessment button.
8. Verify the request in the network panel.
9. Verify the page renders the result.
10. Verify no SEC/public-web/Helix request occurs.
11. Verify the console has no uncaught error.
12. Verify the result says no RRR changed.

Do not use TestClient alone as proof. TestClient already passed while the real browser failed.

If you cannot control the browser directly, provide the exact HTTP URL and commands, but still verify HTML asset serving and API contracts programmatically.

# 14. Final report

Return:

```text
DEFECT RESULT
- FIXED / PARTIAL / BLOCKED

ROOT CAUSE
- First broken link in the browser execution chain
- Why the visible button did nothing
- Whether file:// contributed
- Whether the JS/CSS loaded
- Whether the new panel mounted
- Whether the legacy handler intercepted the click

FILES CHANGED
- Exact files and defect fixed

FRONTEND URL
- Must be an http:// URL

ASSET VERIFICATION
- HTML status
- JS status
- CSS status

BUTTON VERIFICATION
- Visible button selector
- Bound handler
- Selected assessment type
- Request URL
- HTTP result

FIXTURE RUN
- Company
- CIK
- Run ID
- Final phase
- SEC evidence count
- Web evidence count
- Assessment ID
- Provider
- Conflict count
- Gap count
- Recommendation
- Nonbinding flag

UPSTREAM ISOLATION
- Helix calls: zero
- R2D2 calls: zero
- Step 2.4 generation calls: zero
- Invalid error factors rejected: yes/no

NETWORK SAFETY
- SEC requests: zero
- Public-web requests: zero
- TLS bypass: none

TESTS
- Exact commands
- Exact pass/fail counts

BROWSER RESULT
- Console errors
- Failed requests
- Visible mode banner
- Visible evidence lanes
- Visible assessment
- Clickable citation verified
- No-RRR-change disclaimer verified

REMAINING BLOCKERS
- Only genuine remaining items
```

Begin by diagnosing the real v31 browser load path. Do not return another plan.
