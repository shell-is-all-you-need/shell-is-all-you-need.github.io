# Configuration

Each `--tool` block defines one MCP tool. `--exec` starts direct child argv; the next exact `--tool` starts another definition.

```sh
shell-is-all-you-need \
  --tool \
  --name run \
  --description "Run a complete shell command." \
  --input-schema '{"type":"object","properties":{"command":{"type":"string"}},"required":["command"],"additionalProperties":false}' \
  --exec sh -c '{command}'
```

Use `{field}` to substitute validated scalar input values. Double an opening or closing brace to render that brace literally.

## Filesystem policy

Use `--fs-path-field FIELD` for inputs that become paths. Add `--fs-root DIR` to allow roots and `--fs-deny-path PATH` to deny sensitive subtrees. Denies take precedence.

## Process limits

Per-tool controls include timeout, output size, concurrency, and a fixed-window invocation rate limit. Run `shell-is-all-you-need --help` for the exact options and defaults.

## Durable tasks

Adding `--task-store-dir DIR` enables MCP Tasks for that tool. `mcp.example.json` includes `tasks_run`, an inline deterministic long-running mock that demonstrates the protocol without an external agent CLI.
