Run exactly these two commands

First:

find /home/ak54743 -name refresh_token.sh -print 2>/dev/null

Then:

find /home/ak54743 -name update_token.sh -print 2>/dev/null

Nothing complicated. No parentheses, no pipes, no chained commands.

If both return nothing

Run:

ls -la /home/ak54743
