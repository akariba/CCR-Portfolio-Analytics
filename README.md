-rwx------ ... setup_rpr_packages.sh

Do only these next steps. No more giant terminal pastes.

First:

cd /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

Then syntax-check the file:

/bin/sh -n setup_rpr_packages.sh && echo "SYNTAX OK"
If you see
SYNTAX OK

run:

./setup_rpr_packages.sh

It should stop and ask you for the Artifactory identity token. Paste the new/fresh token there and press Enter. Nothing should appear while you paste; that is intentional.

Then do not type anything else while the installer is running. Let it finish.

The outcome we want at the bottom is approximately:

ARTIFACTORY AUTHENTICATION SUCCESSFUL
...
CORE PYTHON PACKAGES: OK
GOOGLE ADK: OK
...
PACKAGE INSTALLATION SUCCESSFUL
