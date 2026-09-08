# Secure tools

`shell-is-all-you-need` enforces the boundaries you configure. It cannot make an inherently broad command narrow, so start with fixed executables and arguments instead of `sh -c`.

## Prefer direct execution

```sh
# Preferred: the input remains one grep argument
--exec grep -R -n -- '{pattern}' .

# Privileged: the input is interpreted as shell syntax
--exec sh -c '{command}'
```

Use a raw shell tool only when the client, users, and workspace are all trusted.

## Restrict path inputs

Mark every input that contributes to a path:

```sh
shell-is-all-you-need \
  --tool --name read \
  --description "Read a UTF-8 file inside the workspace." \
  --input-schema '{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}' \
  --fs-path-field path \
  --fs-root . \
  --fs-deny-path .env \
  --fs-deny-path .git \
  --fs-deny-path .mcp-tasks \
  --exec cat -- '{path}'
```

Paths are checked after canonicalization, including symlink resolution. A symlink cannot escape an allowed root. Denied paths override allowed roots.

If a path field has no explicit `--fs-root`, the current working directory is used as its root.

::: warning Path policy scope
Path policy protects rendered argv items containing marked fields. It does not sandbox every filesystem access the child process may perform independently.
:::

## Set resource limits

```sh
--process-timeout-ms 30000 \
--process-output-limit-bytes 262144 \
--process-max-concurrency 2 \
--process-rate-limit-count 20 \
--process-rate-limit-window-ms 60000
```

- A timeout terminates the child process tree.
- The output limit applies separately to stdout and stderr.
- Concurrency and rate limits are independent per tool.
- Rate count and window must be configured together.

## Security checklist

- Use an absolute executable path for security-sensitive system tools.
- Put `--` before user-controlled positional arguments when the child supports it.
- Deny `.env`, `.git`, credential stores, and task state.
- Give write tools narrower roots than read tools.
- Avoid passing secrets as arguments; process arguments may be observable.
- Keep descriptions honest about privileged or destructive behavior.
- Test paths containing spaces, symlinks, and leading hyphens.
