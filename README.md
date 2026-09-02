EXECUTION ONLY — DO NOT REOPEN STEP 2.5 IMPLEMENTATION.

The latest real acceptance run proves that the Step 2.5 six-input contract is wired correctly.

CURRENT VERIFIED STATE:
- Step22 company context = present
- Step21 scenario context = present
- Step23 confirmed factors = present
- Step24 confirmed factors = present
- Step25 feedback plumbing = present
- AssessmentASOFDATE = present
- six-input Stylus contract implemented
- backend/frontend integration implemented
- v31 Step 2.5 rendering changes already implemented
- current ONLY blocker = Runner authentication

Latest failure:
STEP25_MODEL_AUTH_NOT_READY
Runner HTTP 401
TOKEN_EXPIRED / invalid token

The token produced by the current fetch_runner_token/bootstrap path appears to be callback-oriented and is not accepted by Runner.

STRICT RULES:
1. DO NOT change Step 2.5 business logic.
2. DO NOT change the six-input contract.
3. DO NOT change the preset prompt/schema/knowledge.
4. DO NOT refactor stylus_engine.py, router.py, models, or frontend.
5. DO NOT redesign anything.
6. DO NOT change v31 UI.
7. DO NOT create another authentication framework.
8. DO NOT loop through architecture investigation.
9. Preserve all existing working building blocks.
10. The sole target is to obtain/use a Runner-service-valid credential and immediately execute Step 2.5.

IMPORTANT EXISTING EVIDENCE:
In the authenticated Stylus browser session, DevTools previously showed successful requests such as:

/runner-service/oauth/status
/runner-service/notification/<conversation-id>/stream

These requests carried an Authorization: Bearer token and returned HTTP 200.

TASK:

A. Inspect the EXISTING authentication/token-loading code only enough to determine the safest supported way to seed a known-good Runner bearer token.

B. Prefer the EXISTING supported credential inputs already mentioned by the application:
- GENAI_BEARER_TOKEN
- GENAI_REFRESH_TOKEN
- .runner_token
or whatever existing runner client already consumes.

DO NOT invent a new mechanism.

C. Tell me the exact ONE local location/variable where I should paste a freshly captured Runner-valid bearer token from my authenticated Stylus browser session.

Do NOT ask me to paste the token into Claude chat.

D. Once I place it locally, immediately:
1. restart only what is necessary;
2. verify Runner authentication with the lightest possible Runner call;
3. if HTTP 200, immediately execute one real Step 2.5 SEC+Web assessment;
4. use the existing Apple test only for this acceptance execution;
5. confirm SEC Filing executed;
6. confirm Web Search executed;
7. confirm model response parsed;
8. confirm factor assessments returned;
9. confirm ED / SI / Composite / Residual / Credit Impact outputs;
10. confirm UI renders the real outputs.

E. Do not spend time producing a large report.
Return only:

RUNNER_AUTH = PASS/FAIL
STEP25_HTTP = ...
SEC_TOOL = PASS/FAIL
WEB_TOOL = PASS/FAIL
MODEL_RESPONSE = PASS/FAIL
FACTOR_OUTPUTS = count
SCORING = PASS/FAIL
UI_RENDER = PASS/FAIL
FINAL_STATUS = PASS/FAIL

If auth fails, give ONLY:
- HTTP status
- exact Runner error
- token source used
- whether audience/expiry/issuer caused rejection

STOP there. Do not modify unrelated code.
