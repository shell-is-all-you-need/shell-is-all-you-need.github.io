# CLI parameters

Every server starts with one or more tool blocks:

```text
shell-is-all-you-need --tool --name NAME [TOOL_OPTIONS] --exec COMMAND [ARG_TEMPLATE ...] [--tool ...]
```

Options are scoped to the current tool. Except where marked repeatable, an option may appear only once per tool.

## Tool definition

| Parameter | Required | Description |
| --- | --- | --- |
| `--tool` | Yes | Starts a tool definition and ends the preceding child argv |
| `--name NAME` | Yes | Tool name exposed through MCP; 1–128 ASCII letters, digits, `.`, `_`, or `-` |
| `--description TEXT` | No | Model-facing description; defaults to a generated description of the command |
| `--input-schema JSON\|@FILE` | No | Closed, flat JSON Schema 2020-12 contract; inferred as required strings when omitted |
| `--exec COMMAND [ARGS...]` | Yes | Starts the fixed child executable and argument templates |

Everything after `--exec` is passed as child argv until the next exact `--tool` or end of input. The executable itself cannot contain a placeholder; placeholders belong in argument templates.

## Filesystem policy

| Parameter | Default | Description |
| --- | --- | --- |
| `--fs-path-field FIELD` | None | Marks a string placeholder as a path; repeatable |
| `--fs-root DIR` | Current directory | Allows a root for marked paths; repeatable |
| `--fs-deny-path PATH` | None | Denies a path and all descendants; repeatable |

Roots and denied paths require at least one path field. A path field must be a declared string placeholder. Denies take precedence over roots.

- A template containing a path-field placeholder must start with the placeholder or have a literal prefix ending in `/` (`{path}`, `.agents/skills/{skill_id}/SKILL.md`). Otherwise, such as with `--out={path}`, the server refuses to start.
- A rendered path beginning with `-` is rejected at call time; use `./-name`.
- Denied paths are re-resolved on every call and matched case-insensitively.

## Process limits

| Parameter | Default | Description |
| --- | --- | --- |
| `--process-timeout-ms MILLISECONDS` | Unlimited | Positive per-call deadline; timeout terminates the child process tree |
| `--process-output-limit-bytes BYTES` | `1048576` | Positive cap applied separately to stdout and stderr |
| `--process-max-concurrency COUNT` | `1` | Positive number of simultaneous calls to this tool |
| `--process-rate-limit-count COUNT` | `60` | Positive number of admitted calls in one rate window |
| `--process-rate-limit-window-ms MS` | `60000` | Positive fixed-window duration |

The two rate-limit options must be specified together when overriding defaults. Limits are independent per tool; total server throughput is the aggregate. The concurrency limit is checked before the rate limiter, so a call rejected for concurrency does not consume rate budget.

## Task execution

| Parameter | Default | Description |
| --- | --- | --- |
| `--task-store-dir DIR` | Disabled | Enables MCP Tasks and persists task records |
| `--task-ttl-ms MILLISECONDS` | Unlimited | Positive retention time for terminal records |
| `--task-poll-interval-ms MILLISECONDS` | Server-selected | Positive suggested client polling interval |

Task timing options require a task store. Millisecond values must not exceed `9007199254740991`, the maximum JSON-safe integer.

## Other commands

| Parameter | Description |
| --- | --- |
| `-h`, `--help` | Print complete usage information |
| `-V`, `--version` | Print the installed version |

These commands must be used alone.

## Parsing rules

- The first argument of a configured server must be `--tool`.
- Tool names must be unique within one process.
- The exact child argument `--tool` is reserved and cannot be forwarded.
- Numeric settings accept positive integers only—zero is invalid.
- Child stdin is closed; stdout and stderr are captured separately.
- Relative roots, denied paths, task stores, and child paths resolve from the server working directory.
- Configuration errors are printed to stderr as `shell-is-all-you-need: <message>` with exit status 2; runtime failures (for example, unreadable stdin) exit with status 1.
