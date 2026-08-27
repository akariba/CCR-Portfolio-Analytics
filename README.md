RPR MARKETDEV / HELIX / TECTIA AUTHENTICATION — FULL FORENSIC DIAGNOSIS

I need you to diagnose an authentication/tunneling problem. Do not change application code, do not modify RPR files, do not reinstall anything, do not change Tectia configuration, do not kill processes, do not restart services, and do not expose any credentials or tokens.

Your job in this pass is READ-ONLY FORENSICS ONLY.

I have spent several hours on this and I do not want another trial-and-error sequence. Investigate systematically and give me a technically defensible root cause.

1. OBJECTIVE

I have migrated my RPR FastAPI application from a working Windows development environment to a MarketDev UNIX host.

The application itself now starts successfully on MarketDev.

The remaining blocker is Helix H2M authentication.

On Windows, Helix authentication works persistently because a prior successful browser OAuth/PKCE login created a persisted credential under the user's .helix directory. Subsequently:

helix auth access-token print -a

works without launching a browser and Helix can auto-renew the token.

On MarketDev, Helix CLI and the auth plugin are installed, but MarketDev does not yet have the equivalent persisted OAuth credential.

Therefore I am attempting the one-time supported flow:

export BROWSER=echo
helix auth access-token set --scope <RPR COIN SCOPE>

Helix prints a browser authorization URL containing:

redirect_uri=http://localhost:8822/callback

I open that URL in the Windows browser and complete Citi authentication.

The browser is then redirected to:

http://localhost:8822/callback?code=...&state=...

but Edge shows:

ERR_CONNECTION_RESET

Eventually the MarketDev Helix command reports:

failed to acquire token; session timed out

No MarketDev persisted *-oidc.cred appears.

I need you to determine why the callback never reaches the waiting Helix process.

2. ARCHITECTURE
Windows workstation

Windows browser runs here.

Tectia SSH Client is used to connect to MarketDev.

Tectia profile:

Profile: Market Dev
Remote host: sd-f34e-972f.nam.nsroot.net
SSH port: 22

Tectia has a configured LOCAL TCP tunnel:

Windows listen port: 8822
Destination host: 127.0.0.1
Destination port: 8822
Allow local connections only: YES
Type: TCP

Intended topology:

Windows Edge
      |
      | http://localhost:8822/callback
      v
Windows TCP 8822
      |
      | Tectia LOCAL SSH forward
      v
MarketDev 127.0.0.1:8822
      |
      v
Helix OAuth callback listener

This is intentionally a LOCAL tunnel, not a remote tunnel, because the browser is on Windows and Helix is on MarketDev.

3. FACTS ALREADY OBSERVED

Do not assume these facts prove more than they actually prove.

MarketDev

Helix version:

helix --version
version 1.1.4

Auth plugin:

helix plugins ls

shows auth installed around:

auth v1.6.0

The command:

helix auth access-token set --scope <scope>

starts the OAuth flow.

While that command is actively waiting, a separate MarketDev terminal shows:

ss -ltnp 2>/dev/null | grep 8822

producing a LISTEN entry on port 8822, with the process identified as the Helix/auth process.

Example shape:

LISTEN ... *:8822 ... users:(("auth",pid=...,fd=3))

Therefore Helix appears to have an active listener while OAuth is pending.

Do not reveal OAuth authorization URLs, codes, state values, JWTs, credentials, or token material in your report.

Windows

While the MarketDev OAuth command is waiting:

netstat -ano | findstr :8822

shows:

TCP 127.0.0.1:8822 ... LISTENING

The owning Windows process is:

ssh-broker-g3

which appears to be Tectia.

Also:

Test-NetConnection 127.0.0.1 -Port 8822

returns:

TcpTestSucceeded : True

Therefore the Windows side of the local tunnel is listening.

Important: This only establishes that Windows can connect to the local Tectia listener. It does NOT necessarily prove that Tectia successfully opens the remote forwarded connection to MarketDev.

Browser

After successful Citi SSO, browser redirects to:

http://localhost:8822/callback?...REDACTED...

Edge then reports:

ERR_CONNECTION_RESET

This has happened repeatedly.

Helix later times out.

4. IMPORTANT WINDOWS REFERENCE

Windows has a previously persisted Helix credential in:

%USERPROFILE%\.helix\

The persisted file is client-specific and has an *-oidc.cred form.

DO NOT read, copy, print, parse, hash, base64, inspect the content,

Connection interrupted. Waiting for the complete answer
