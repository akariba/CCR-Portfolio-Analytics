RPR MarketDev SSH/Tectia forwarding forensic — READ ONLY

We are diagnosing an OAuth callback tunnel for an RPR application running on a Citi MarketDev UNIX host.

Do not modify anything. Do not restart sshd. Do not change firewall rules, SSH configuration, Tectia configuration, Helix configuration, RPR files, certificates, permissions, or authentication. Do not use sudo unless only to report that it would be required. Do not display credentials, tokens, private keys, cookies, OAuth authorization codes, or secrets.

I need an evidence-based diagnosis, not speculative fixes.

Confirmed topology

Windows corporate workstation → Tectia SSH Client → MarketDev UNIX.

Tectia profile: Market Dev.

We configured a LOCAL TCP tunnel:

Windows 127.0.0.1:8822 → SSH → MarketDev 127.0.0.1:8822

Tectia on Windows is confirmed listening:

127.0.0.1:8822 LISTENING

owned by the Tectia/SSH broker process.

Windows:

Test-NetConnection 127.0.0.1 -Port 8822

returns:

TcpTestSucceeded : True

But an HTTP request through the tunnel fails/reset.

On MarketDev, while this command is running:

helix auth access-token set --scope <approved COIN scope>

Helix prints the corporate OAuth URL and waits for callback.

Simultaneously:

ss -ltnp | grep 8822

shows the Helix auth process listening on *:8822.

More importantly, local MarketDev connectivity to Helix is proven working:

curl -4 -v --max-time 5 http://127.0.0.1:8822/

connects successfully and returns:

HTTP/1.1 404 Not Found

That 404 is expected because / is not the OAuth callback path. It proves TCP + HTTP reaches the Helix listener locally.

But from Windows:

Invoke-WebRequest http://127.0.0.1:8822/

results in the connection being closed/reset.

Therefore the likely failing segment is:

Windows Tectia listener → SSH forwarding channel → MarketDev loopback

rather than Helix itself.

New finding

On MarketDev we ran:

grep -RniE '^[[:space:]]*(AllowTcpForwarding|PermitOpen|PermitListen|GatewayPorts)' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null

and:

grep -RniE '^[[:space:]]*(Match|AllowTcpForwarding|PermitOpen|PermitListen|GatewayPorts)' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null

Both returned no output.

Do not interpret that automatically as allow/deny.

Your task

Determine exactly what SSH server and policy are controlling TCP forwarding on this MarketDev host.

Run only safe/read-only inspection commands.

Establish:

What SSH server implementation is actually accepting this connection: OpenSSH, Tectia server, wrapper/gateway, PAM-integrated service, or something else?
Exact server binary/version/package where observable.
Which configuration file(s) are actually loaded.
Whether /etc/ssh/sshd_config uses Include.
Whether forwarding policy can come from an included file, central policy, Match block, authorized-key restriction, certificate option, PAM/session policy, SSH gateway, or Tectia-specific mechanism.
Effective value of:
AllowTcpForwarding
DisableForwarding
PermitOpen
PermitListen
GatewayPorts
If Match conditions exist, determine the effective values for my current user/session, not merely global defaults.
Determine whether the current SSH connection negotiated/accepted the local port-forward request.
Determine whether sshd is subsequently rejecting the direct-tcpip request to 127.0.0.1:8822.
Determine whether the Windows Tectia configuration is actually sending destination 127.0.0.1:8822 as expected.
Determine whether server-side logs available to an ordinary user expose an SSH forwarding refusal. Do not access privileged logs if I am not authorized.
Determine whether a centrally managed MarketDev policy intentionally prohibits SSH TCP forwarding.
Useful read-only commands

Use these only where appropriate; adapt them to the actual platform:

id
uname -a
hostname
ps -ef | grep '[s]shd'
ps -ef | grep -Ei '[t]ectia|[s]sh'
type sshd 2>/dev/null
command -v sshd 2>/dev/null
ls -l /etc/ssh 2>/dev/null
grep -nE '^[[:space:]]*(Include|Match|AllowTcpForwarding|DisableForwarding|PermitOpen|PermitListen|GatewayPorts)' /etc/ssh/sshd_config 2>/dev/null
grep -RniE '^[[:space:]]*(Include|Match|AllowTcpForwarding|DisableForwarding|PermitOpen|PermitListen|GatewayPorts)' /etc/ssh/sshd_config.d 2>/dev/null

If OpenSSH sshd -T works without privilege:

sshd -T 2>/dev/null | egrep 'allowtcpforwarding|disableforwarding|permitopen|permitlisten|gatewayports'

If Match blocks exist, investigate whether sshd -T -C ... can safely determine the effective configuration for the current user. Do not invent -C values; derive them from the actual session where possible.

Inspect environment/session metadata safely:

printf 'USER=%s\nHOME=%s\nSSH_CONNECTION=%s\nSSH_CLIENT=%s\n' \
  "$USER" "$HOME" "$SSH_CONNECTION" "$SSH_CLIENT"

Do not print SSH_AUTH_SOCK contents, keys, tokens, or credentials.

Also inspect package metadata using whatever package manager exists:

rpm -qa 2>/dev/null | grep -Ei 'openssh|tectia|ssh'

or platform-equivalent read-only commands.

Important diagnostic distinction

Do not claim that 127.0.0.1:8822 versus *:8822 is itself a bind mismatch. A listener on *:8822 normally includes IPv4 interfaces, and our direct MarketDev curl to 127.0.0.1:8822 already succeeds.

Also do not blame Helix when:

curl http://127.0.0.1:8822/

on MarketDev gives an HTTP response.

Focus specifically on the SSH forwarding channel.

Output required

Give me:

A. SSH server architecture

Exact server implementation, process, version/package, loaded configs, and connection path.

B. Effective forwarding policy

A table:

Setting | Effective value | Evidence | Confidence

C. Current tunnel path

Show:

Windows browser → Windows Tectia 127.0.0.1:8822 → SSH direct-tcpip channel → MarketDev 127.0.0.1:8822 → Helix

Mark each segment PASS / FAIL / UNKNOWN.

D. Definitive diagnosis

Identify the first failing segment using observed evidence.

E. Next read-only test

Give at most 3 commands that will distinguish the remaining hypotheses.

F. Remediation

Only after the root cause is established, say whether:

user-side Tectia configuration can fix it,
MarketDev SSH configuration/policy requires platform-team intervention,
or some other supported corporate mechanism is required.

Do not recommend bypassing corporate controls, copying Helix credential files between machines, extracting tokens, disabling TLS verification, or weakening SSH/security settings.

Label every conclusion [VERIFIED], [STRONG INFERENCE], or [UNKNOWN].

One correction to the previous diagnosis is important: your latest MarketDev curl result proves *:8822 is not a problem by itself. curl 127.0.0.1:8822 → HTTP 404 proves Helix accepts IPv4 loopback connections. So we should not spend more time changing the Helix bind address.
