# Configuration

Each `--tool` block defines one MCP tool. `--exec` starts direct child argv; the next exact `--tool` starts another definition.

## Anatomy of a tool

```sh
shell-is-all-you-need \
  --tool \
  --name run \
  --description "Print one Git commit using its validated revision argument." \
  --input-schema '{"type":"object","properties":{"revision":{"type":"string","description":"Commit, branch, or tag to inspect."}},"required":["revision"],"additionalProperties":false}' \
  --process-timeout-ms 10000 \
  --process-output-limit-bytes 262144 \
  --exec git show --stat --oneline '{revision}'
```

The command is `git`. Every item after it is a separate argument—no shell parses the result.

## Argument templates

Use `{field}` inside an argument to substitute a validated scalar value:

```sh
--exec grep -R -n -- '{pattern}' '{directory}'
```

Each input is rendered into its existing argv item. It cannot add extra arguments or shell operators unless the configured executable interprets the string itself.

To produce literal braces, double them:

```sh
--exec printf '{{"value":"{value}"}}\n'
```

The exact child argument `--tool` is reserved because it starts the next tool block.

## Schema from a file

Pass inline JSON or prefix a path with `@`:

```sh
--input-schema @schemas/search.json
```

If `--input-schema` is omitted, a closed schema is inferred with every placeholder typed as a required string. An explicit schema is recommended because titles and descriptions help the model call tools correctly.

## Multiple tools in one server

Repeat the whole block:

```sh
shell-is-all-you-need \
  --tool --name check \
  --description "Type-check the project." \
  --input-schema '{"type":"object","properties":{},"additionalProperties":false}' \
  --exec cargo check --locked \
  --tool --name test \
  --description "Run the project test suite." \
  --input-schema '{"type":"object","properties":{},"additionalProperties":false}' \
  --process-timeout-ms 300000 \
  --exec cargo test --locked
```

Limits, path policy, and task settings belong only to the tool block where they appear.

## Filesystem policy

Use `--fs-path-field FIELD` for inputs that become paths. Add `--fs-root DIR` to allow roots and `--fs-deny-path PATH` to deny sensitive subtrees. Denies take precedence. See [Secure tools](./security) for complete examples.

## Process limits

Per-tool controls include timeout, output size, concurrency, and a fixed-window invocation rate limit. See the [CLI parameter reference](/reference/cli#process-limits).

## Durable tasks

Adding `--task-store-dir DIR` enables MCP Tasks for that tool. Read the [durable tasks guide](./tasks) before enabling it.
