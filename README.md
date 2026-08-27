Then run these two searches:

printenv | grep -E '^(RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL)=' || true
grep -RniE 'RPR_APPROVED_SONNET5_MODEL|STEP2_SONNET_MODEL|sonnet-5|sonnet5' app deploy 2>/dev/null | head -80
Why this search is necessary
