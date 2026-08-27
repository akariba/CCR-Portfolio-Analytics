Now search only for existing Citi-approved helpers. These commands are simple and ksh-safe. Run them one at a time:

find /home/ak54743/Application -type f -name '*token*' -print 2>/dev/null

then:

find /home/ak54743/Application -type f -name '*artif*' -print 2>/dev/null

then:

find /home/ak54743/.local -type f -name '*token*' -print 2>/dev/null

then:

find /home/ak54743/.local -type f -name '*artif*' -print 2>/dev/null

If those show nothing, run:

ls -la /home/ak54743/.local/bin 2>/dev/null
