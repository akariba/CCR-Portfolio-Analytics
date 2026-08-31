CORRECTION: FIDDLER IS NOT REQUIRED

The colleague’s working application does not use Fiddler. Stop treating Fiddler or proxy approval as a prerequisite.

Inspect pe-sponsor-search\app 1.py and reproduce its working direct Runner Service connectivity:

* Same corporate TLS/CA approach
* Same current-user token acquisition and refresh pattern
* Same working request headers and payload structure
* Same POST /chat SSE implementation
* Same Google-search-enabled preset mechanism
* Same-session follow-up handling

Do not force HTTP_PROXY or HTTPS_PROXY. Do not enable RPR_SEC_DEV_PROXY. Let requests use the normal Windows/corporate network configuration exactly as the working colleague application does.

For the first PoC, simplify Step 2.5 to one real direct-runner vertical slice. The live runner and its Google search capability should collect both:

1. SEC evidence from official sec.gov filing URLs.
2. Additional credible public web evidence.

Do not wait for a separate SEC transport or production approval. If the existing direct SEC client works using normal verified HTTPS, it may supplement the results, but its failure must not block this PoC.

Remove Fiddler, SEC-egress approval, and production-ready status from local_live_ready. In local PoC mode, readiness means only:

* Current-user runner token available
* Runner Service reachable
* Real model enabled
* Google search enabled
* Real company supplied or deterministically selected

CREATE A NEW STEP 2.5 POC PRESET

Use the colleague’s YAML structure as the mechanical template, but create an RPR-specific prompt. Do not alter the colleague’s original preset.

The Step 2.5 research prompt should instruct the live model:

“You are an evidence-first name-level risk assessment analyst. Research the supplied public company using live search.

First resolve the company’s exact legal name, ticker and SEC CIK.

Collect an SEC evidence lane using official sec.gov sources. Prefer the latest 10-K and the most relevant recent 10-Q or 8-K. For each item provide the filing type, filing date, title, exact URL and the specific supported fact.

Collect a separate web evidence lane from credible public sources. For every claim provide the source title, publisher, publication date when available, exact URL and supported fact.

Do not invent facts, dates, URLs, quotations or citations. If something cannot be verified, mark it unavailable. Keep SEC and web provenance separate.

Identify important risk signals, contradictions between sources, stale evidence and material limitations.

Produce a concise name-level assessment based only on the collected evidence. Every assessment claim must reference one or more evidence IDs.

Return only valid JSON conforming exactly to the Step 2.5 response schema supplied below. Do not wrap JSON in Markdown.”

Include the actual existing Step 2.5 JSON schema in the prompt rather than inventing a parallel UI model.

RUNNER BEHAVIOR

* Set google_search_enabled=true.
* Set mock_llm=false.
* Use the real available Claude model.
* Temperature 0.
* Accept POST /chat HTTP 200 or 201.
* Parse the complete SSE stream.
* Preserve grounding URLs and citation metadata.
* If search/tool events arrive but final content is empty, send exactly one follow-up on the same session:

“Return the completed Step 2.5 assessment now as JSON only, using the evidence already collected in this session.”

* Validate the returned JSON.
* Validate every evidence URL and evidence ID.
* Reject unknown citations.
* Persist and render the successful result in step23.html.

Do not copy colleague-specific SOEID, email, token, client identity, PE Sponsor prompt, or business-output fields. Use the current user and existing RPR data structures.

Do not implement batch processing, email, Excel export, artifact versioning or Streamlit UI before the single-company result works.

Execute the real call now. Do not stop for approval questions, Fiddler configuration, readiness reports or more unit-test-only work. Success requires a genuine live-search/live-model Step 2.5 result displayed in the active RPR frontend.
