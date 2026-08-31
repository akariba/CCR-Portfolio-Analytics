For question 1, enter:

Citi ICM Rapid Portfolio Review Windows PoC ak54743@citi.com

For the remaining questions use:

Proxy routing

Use explicit HTTP_PROXY and HTTPS_PROXY = http://127.0.0.1:8888. Do not depend on the Windows system-proxy setting.

CA bundle

Leave RPR_SEC_DEV_CA_BUNDLE unset. Use normal verified TLS with the default SSL context; never use verify=False. The previous SEC call succeeded through Fiddler without a custom CA bundle.

Target company

Use an existing confirmed Step 2.2 company that resolves to an SEC CIK. Do not add or substitute a company. If none exists, report NO_CONFIRMED_SEC_REGISTRANT and list the confirmed companies.

Leave Fiddler open. You do not need to click its yellow “reenable system proxy” banner because the application will explicitly use 127.0.0.1:8888.
