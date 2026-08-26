CONTEXT

You are working on my existing Rapid Portfolio Review AI application.

CURRENT WINDOWS PROJECT ROOT:
C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

IMPORTANT:
This project is currently WORKING on my Windows/client environment.

I am preparing to migrate the application to a Market Dev UNIX server so that the app can eventually be accessible to other users.

DO NOT migrate it yet.
DO NOT redesign it.
DO NOT refactor working code.
DO NOT "clean up" code stylistically.

Your task in this phase is ONLY:

1. inspect the complete project,
2. determine exactly which files are truly required for the working application,
3. identify files that are definitely unnecessary for runtime/deployment,
4. safely clean the project without breaking anything,
5. leave me with a clean, portable deployment baseline ready to copy to UNIX.

==================================================
ABSOLUTE RPR SAFETY RULE / BIBLE RULE
==================================================

The current known-working application is the immutable baseline.

Any code, frontend behaviour, prompt, endpoint, workflow, or feature that currently works is part of the permanent backbone.

DO NOT:
- rewrite working modules,
- refactor working modules,
- reorganize code simply for aesthetics,
- rename runtime files,
- change API routes,
- change frontend IDs,
- change frontend behaviour,
- alter model routing,
- alter Step 1 / Step 2 logic,
- remove prompts because they "look old",
- remove Python files because they "look unused",
- remove templates based only on filename,
- remove helper files unless you have proven they are not required,
- change the frozen visual/UI baseline,
- change the working RPR workflow.

If there is ANY uncertainty about whether a file is required:
KEEP IT.

False positives are unacceptable.

==================================================
CURRENT RPR ARCHITECTURE / WORKING BASELINE
==================================================

The application is a FastAPI-based RPR application.

Important known project components include, but are not limited to:

backend/
templates/
RUNTIME_ENV.ps1

Known backend/runtime files from the working project include things such as:

server.py
market_event_scout.py
rpr_search_agent.py
narrative_enricher.py
rpr_enhancement_routes.py
main.py
llm_gateway.py
models.py
scoring.py
prompt_loader.py
r2d2_prompt.py

There may be additional newer Step 2.x modules added since this list was created.
You MUST discover those from the actual source tree rather than assuming this list is complete.

Known functional areas include:

Step 1
- Trigger 1 Market Scanner
- up to 3 events per theme
- discovery
- evidence enrichment
- refinement
- per-event pipelines
- AI Assist replacement-theme functionality
- feedback functionality

Step 1 Trigger 2
- User Narrative functionality remains present

Step 2.1
- Scenario & Assumptions
- additional context
- assumptions files/templates

Step 2.2
- Portfolio Selection
- portfolio / sector / CAGID related backend logic where implemented

Step 2.3 / Step 2.4
- Event Driven Risk Factors / Sector Inherent Risk Factors where implemented

There may also be new code implemented after this summary.
The FILESYSTEM and SOURCE CODE are authoritative.

The frontend currently uses the accepted v31-derived working visual baseline.
Do NOT alter its layout or behaviour.

==================================================
MODEL / ENTERPRISE ENVIRONMENT CONTEXT
==================================================

This is a company-controlled environment.

Do NOT introduce:
- public internet APIs,
- pip libraries purely for convenience unless already required,
- new external services,
- consumer API keys,
- hardcoded secrets.

Current application may use enterprise model/API configuration via environment variables.

Likely routing includes:
- Gemini enterprise search/retrieval
- Claude models
- organization-approved endpoints/tokens/certs

Do NOT expose secrets.

Do NOT print token values.

==================================================
WHY WE ARE CLEANING
==================================================

The Windows project root has accumulated development artifacts.

Examples visible in the root currently include things such as:

server_stdout.log
server_stderr.log

.rpr_v31_visual_upgrade_state.json

apply_rpr_v31_full_visual_upgrade.py
rollback_rpr_v31_full_visual_upgrade.py
validate_rpr_v31_full_visual_upgrade.py

apply_rpr_v31_visual_patch.py
apply_rpr_v31_visual_patch_v2.py
apply_rpr_v31_visual_patch_v3.py

PROJECT_STATE_HANDOFF.md
PROJECT_KNOWLEDGE_TRANSFER.md
RESTART_GUIDE.md
KNOWN_ISSUES.md

extract_resp.json

outputs/
Testing/
tests/
docs/
UI Design/
portfolio-agent/

There may be many other files.

IMPORTANT:
The names above DO NOT mean they should automatically be deleted.

You must determine whether each is:
A. runtime critical
B. deployment critical
C. development-only but useful
D. generated/transient
E. obsolete and safe to exclude

==================================================
PHASE 1 — COMPLETE INVENTORY
==================================================

First recursively inspect the full project tree.

Do not modify anything yet.

Produce an inventory grouped by:

1. Runtime application code
2. Frontend/runtime templates
3. Prompt files
4. Configuration/environment files
5. Data files required by runtime
6. Static resources
7. Tests
8. Documentation
9. Logs
10. Generated output
11. Temporary/cache files
12. Migration/patch/helper scripts
13. Duplicate files
14. Unknown files requiring further investigation

For every file considered for removal, determine:

- Is it imported by Python?
- Is it dynamically imported?
- Is it referenced by another file?
- Is its filename constructed dynamically?
- Is it loaded by PromptLoader?
- Is it opened/read via Path/open/json/csv/pandas/etc.?
- Is it referenced by FastAPI routes?
- Is it referenced by HTML/JS?
- Is it referenced by environment/configuration?
- Is it referenced by a startup script?
- Is it used by Step 1?
- Is it used by Step 2.x?
- Is it used as a runtime template?
- Is it required by a download/template endpoint?
- Is it required by tests that validate runtime behaviour?
- Is it the only copy of some required resource?
- Is it a migration/rollback artifact only?
- Is it simply generated output/log/cache?

Do NOT infer this from filenames alone.

==================================================
PHASE 2 — DEPENDENCY AND REFERENCE ANALYSIS
==================================================

Perform repository-wide searches for references before classifying anything as removable.

At minimum inspect:

Python imports:
import ...
from ... import ...

Dynamic imports

Path operations:
open(
Path(
read_text
read_bytes
json.load
json.loads
pandas.read_csv
pandas.read_excel
csv
glob
rglob

Template loading

Prompt loading

HTML fetch calls

JavaScript API routes

Static file references

FastAPI include_router calls

FastAPI route registrations

startup scripts

environment variable names

subprocess calls

filesystem-relative paths

absolute Windows paths

references to:
backend
templates
prompts
UI Design
outputs
Testing
tests
docs
portfolio-agent

Also inspect whether modules are referenced indirectly by:
server.py
main.py
FastAPI router registration
PromptLoader
frontend JavaScript

==================================================
PHASE 3 — DETERMINE REAL STARTUP PATH
==================================================

Establish the CURRENT working application startup chain.

Determine exactly:

1. Which Python module creates the FastAPI app.
2. Which command currently starts it.
3. Whether the app is currently run as something like:

uvicorn server:app
or
uvicorn backend.server:app
or
another target.

Do not guess.

Inspect the actual code and the current startup documentation/logs.

Determine which Python modules become reachable from startup.

Create a dependency map:

STARTUP
  ->
FastAPI app
  ->
routers
  ->
services
  ->
model gateways
  ->
prompt loaders
  ->
prompt files
  ->
templates/data

This map will be used to prove which files are deployable runtime dependencies.

==================================================
PHASE 4 — PROMPTS ARE HIGH RISK: DO NOT CASUALLY DELETE
==================================================

Prompt files require special handling.

Search the complete repository for every prompt-loading mechanism.

Determine:

- exact prompt directories
- prompt_loader mappings
- hardcoded prompt names
- dynamically generated prompt names
- Step 1 prompts
- Step 2 prompts
- R2D2 prompts
- assessment prompts
- refinement prompts
- discovery prompts
- enrichment prompts
- quality-gate prompts

A prompt may look unused but still be loaded dynamically.

DO NOT delete any prompt unless you can prove there is no runtime or planned current UI/backend path to it.

If uncertain:
KEEP IT.

==================================================
PHASE 5 — WINDOWS → UNIX PORTABILITY AUDIT
==================================================

We will later run this application on UNIX.

DO NOT change behaviour yet.

But identify portability issues.

Search for:

C:\
backslashes in constructed paths
Windows-only commands
PowerShell-only runtime dependencies
.ps1 startup assumptions
case-insensitive filename assumptions
drive letters
OneDrive paths
localhost assumptions
127.0.0.1 assumptions
hard-coded usernames
hard-coded project roots
Windows certificate paths
Windows temporary directories
os.system calls
subprocess calls using Windows utilities

Also identify:

case-sensitive import problems that would work on Windows but fail on UNIX.

Example:
file:
Market_Event_Scout.py

import:
market_event_scout

That could behave differently on UNIX.

DO NOT fix these yet unless the change is completely mechanical and risk-free.

Report them first.

==================================================
PHASE 6 — PYTHON DEPENDENCY AUDIT
==================================================

Determine the actual Python packages required by runtime.

Inspect all Python imports.

Separate imports into:

A. Python standard library
B. third-party runtime dependencies
C. development/test-only dependencies

Check whether the repository already has:

requirements.txt
requirements-dev.txt
pyproject.toml
poetry.lock
Pipfile
environment.yml
setup.py
setup.cfg

Do NOT generate a huge requirements file from `pip freeze`.

We need only packages actually required by this application.

Prepare a proposed minimal runtime dependency list.

DO NOT uninstall anything from my Windows machine.

==================================================
PHASE 7 — CLASSIFICATION
==================================================

Classify every candidate cleanup item into one of these categories:

KEEP_RUNTIME
KEEP_DEPLOYMENT
KEEP_REFERENCE
ARCHIVE_ONLY
SAFE_TO_DELETE
UNKNOWN_KEEP

Use a conservative standard.

SAFE_TO_DELETE must mean:
you have strong evidence that removing it cannot affect the current working application.

Examples that are usually candidates but still need verification:

__pycache__/
*.pyc
.pytest_cache/
temporary files
old server logs
generated stdout/stderr logs
temporary JSON responses
generated outputs
old patch installers
old visual migration scripts
rollback scripts for already-frozen versions

But even these require repository verification.

==================================================
PHASE 8 — DO NOT DELETE UNIQUE SAFETY MATERIAL
==================================================

Files such as these may not be runtime dependencies but can still be valuable:

PROJECT_STATE_HANDOFF.md
PROJECT_KNOWLEDGE_TRANSFER.md
RESTART_GUIDE.md
KNOWN_ISSUES.md
docs/
tests/

Do NOT simply delete useful documentation or tests.

Instead distinguish between:

runtime deployment bundle
and
development/reference repository.

For deployment preparation, we may exclude development-only artifacts from the UNIX transfer while still preserving them locally.

==================================================
PHASE 9 — SAFE CLEANING APPROACH
==================================================

I want a clean deployable directory.

However, do NOT permanently destroy questionable files.

Preferred strategy:

1. Keep the current working project untouched as much as possible.
2. Identify SAFE_TO_DELETE transient artifacts.
3. Remove only clearly generated/cache/log files.
4. For obsolete but potentially useful development artifacts, place them outside the deployable baseline or classify them as ARCHIVE_ONLY.
5. Do not move files that existing runtime code expects at a particular path.

If changing paths would be required:
DO NOT MOVE THE FILE.

The application working state is more important than cosmetic folder cleanliness.

==================================================
PHASE 10 — VERIFY CLEANUP DOES NOT BREAK RPR
==================================================

After cleanup, run the application's existing validation/tests.

At minimum verify:

1. Python modules import successfully.
2. FastAPI app starts.
3. No ModuleNotFoundError.
4. No FileNotFoundError.
5. No missing prompt.
6. No missing template.
7. No missing CSV/XLSX template.
8. No broken frontend asset.
9. No broken API route registration.
10. Main frontend loads.
11. Existing key API endpoints still respond.

Where practical, verify the currently working RPR endpoints.

DO NOT trigger expensive external model calls unnecessarily.

Use health/startup/basic local endpoint validation first.

If existing tests exist, run the relevant non-destructive tests.

==================================================
PHASE 11 — CREATE DEPLOYMENT MANIFEST
==================================================

Create:

MARKETDEV_DEPLOYMENT_MANIFEST.md

It must contain:

SECTION 1 — Startup
Exact Windows startup command currently used.

SECTION 2 — Application entrypoint
Exact FastAPI module and app variable.

SECTION 3 — Required runtime directories
Example:
backend/
templates/
prompts/
etc.

Use actual discovered paths.

SECTION 4 — Required runtime files
List the important files.

SECTION 5 — Required Python packages
Only actual runtime dependencies.

SECTION 6 — Required environment variables
NAMES ONLY.

Example:
MODEL_ENDPOINT
API_TOKEN
CERT_PATH

NEVER include secret values.

SECTION 7 — Required external enterprise services
Describe them generically.

SECTION 8 — Required filesystem resources
CSV files
Excel templates
prompts
etc.

SECTION 9 — Windows-specific dependencies
Anything that must be replaced on UNIX.

SECTION 10 — Known UNIX migration risks
Case sensitivity
paths
permissions
certificates
ports
proxy
environment variables
etc.

SECTION 11 — Files excluded from deployment
Explain why each excluded category is unnecessary.

==================================================
PHASE 12 — CREATE A DEPLOYMENT FILE LIST
==================================================

Create:

MARKETDEV_FILELIST.txt

This must list exactly which files/directories should be transferred to Market Dev.

Do not include logs/cache/transient output.

But include all runtime dependencies.

==================================================
PHASE 13 — CREATE CLEANUP REPORT
==================================================

Create:

MARKETDEV_CLEANUP_REPORT.md

Show:

A. Files removed
B. Files archived/excluded
C. Files retained despite looking obsolete
D. Why they were retained
E. Dependency evidence supporting each significant decision
F. Runtime validation performed
G. Result of validation
H. Anything uncertain

==================================================
PHASE 14 — GIT / RECOVERY SAFETY
==================================================

Before modifying anything:

Check whether this directory is a Git repository.

Run:
git status

Do not discard existing uncommitted work.

Do not reset the repository.

Do not checkout older versions.

Do not use:
git reset --hard
git clean -fd
git restore .
or anything destructive.

If Git is available, record the starting state in the cleanup report.

==================================================
PHASE 15 — IMPORTANT FILES VISIBLE IN ROOT
==================================================

I can currently see files including:

.gitignore
server_stdout.log
server_stderr.log
RUNTIME_ENV.ps1

backend/
templates/
UI Design/

.rpr_v31_visual_upgrade_state.json

apply_rpr_v31_full_visual_upgrade.py
rollback_rpr_v31_full_visual_upgrade.py
validate_rpr_v31_full_visual_upgrade.py

apply_rpr_v31_visual_patch.py
apply_rpr_v31_visual_patch_v2.py
apply_rpr_v31_visual_patch_v3.py

PROJECT_STATE_HANDOFF.md
RESTART_GUIDE.md
KNOWN_ISSUES.md
PROJECT_KNOWLEDGE_TRANSFER.md

extract_resp.json

portfolio-agent/
tests/
docs/
outputs/
Testing/

Again:

DO NOT DELETE THESE BASED ON NAME.

Trace them first.

Some patch scripts may now only be historical artifacts because the current v31 frontend is already the accepted baseline.

If they are proven historical only:
they can be excluded from the Market Dev deployment.

But do not change the resulting v31 frontend.

==================================================
PHASE 16 — DO NOT TOUCH SECRETS
==================================================

Inspect configuration STRUCTURE but do not print secret values.

If RUNTIME_ENV.ps1 contains sensitive values:

Do not reproduce them in reports.

Instead list variable names only.

We will create the UNIX equivalent separately after the cleanup.

==================================================
FINAL EXECUTION RULE
==================================================

Proceed conservatively.

You are authorized to remove ONLY files that are clearly:

- generated logs
- caches
- temporary outputs
- proven obsolete helper artifacts

AND whose removal has been demonstrated not to affect runtime.

For anything else:
retain it and report it.

The objective is NOT to make the directory as small as possible.

The objective is:

"A clean, auditable, minimal-enough, known-working RPR deployment baseline that can safely be moved from Windows to Market Dev UNIX."

==================================================
FINAL RESPONSE TO ME
==================================================

When complete, report ONLY:

1. CLEANUP RESULT
2. FILES REMOVED
3. FILES EXCLUDED FROM MARKET DEV
4. FILES RETAINED BECAUSE THEY MAY MATTER
5. CURRENT VERIFIED STARTUP COMMAND
6. FASTAPI ENTRYPOINT
7. REQUIRED RUNTIME DIRECTORIES
8. REQUIRED PYTHON PACKAGES
9. WINDOWS-SPECIFIC ITEMS TO REPLACE ON UNIX
10. VALIDATION RESULTS
11. MARKETDEV_FILELIST.txt location
12. MARKETDEV_DEPLOYMENT_MANIFEST.md location
13. MARKETDEV_CLEANUP_REPORT.md location
14. ANY BLOCKER BEFORE COPYING TO UNIX

Do not start the UNIX migration yet.
Stop after the clean Windows deployment baseline has been validated.
