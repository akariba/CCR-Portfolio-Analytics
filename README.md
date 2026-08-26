I would do one more small performance enhancement

Do not redesign Step 2.2.

Keep the exact same business logic and real XLSX files as source of truth, but add a prepared local cache.

The flow should become:

Source XLSX files
→ parse/normalize only when changed
→ create local indexed/cache representation
→ subsequent backend startups load that prepared representation in perhaps 1–3 seconds instead of 60–100 seconds.

The three original XLSX files remain authoritative. Calculate a fingerprint from:

filename + size + modified timestamp

If none changed, load cache.

If one changed, rebuild it automatically.

I would prefer SQLite for this over another CSV/XLSX because Python has it built in, it handles your 84k relationships + 414k MLE rows easily, and it can index:

CAGID
country
geography
MLE
L1
L2
L3

This does not turn RPR into a database project. It's just a generated runtime cache.

Then your target becomes:

Backend start → Step2.2 cache ready within a few seconds → catalog <100 ms → search <1 sec.
