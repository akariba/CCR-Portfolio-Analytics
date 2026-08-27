grep -RniE '^[[:space:]]*(AllowTcpForwarding|PermitOpen|PermitListen|GatewayPorts)' \
  /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null

Then also:

grep -RniE '^[[:space:]]*(Match|AllowTcpForwarding|PermitOpen|PermitListen|GatewayPorts)' \
  /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null
