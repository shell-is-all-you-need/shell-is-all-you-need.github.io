# Copy-ready examples

For a real three-tool workflow with Reddit and image models, see [Reddit → Muse Image → DeepSeek](./media-workflow).

These examples are starting points. Review executable availability and narrow filesystem roots for your environment before exposing them to a model.

## Read a workspace file

```sh
shell-is-all-you-need \
  --tool --name read \
  --description "Read one UTF-8 file inside the workspace." \
  --input-schema '{"type":"object","properties":{"path":{"type":"string","description":"Workspace-relative file path."}},"required":["path"],"additionalProperties":false}' \
  --fs-path-field path \
  --fs-root . \
  --fs-deny-path .env \
  --fs-deny-path .git \
  --exec cat -- '{path}'
```

## Search source code

This example uses ripgrep and fixes the search root to `src`:

```sh
shell-is-all-you-need \
  --tool --name search \
  --description "Search source code with a regular expression." \
  --input-schema '{"type":"object","properties":{"pattern":{"type":"string","description":"Rust-compatible regular expression."}},"required":["pattern"],"additionalProperties":false}' \
  --process-output-limit-bytes 524288 \
  --exec rg --line-number --color never -- '{pattern}' src
```

## Format one supported file

The marked path is canonicalized before Prettier receives it:

```sh
shell-is-all-you-need \
  --tool --name format \
  --description "Format one supported source file with Prettier." \
  --input-schema '{"type":"object","properties":{"path":{"type":"string","description":"Source file to format."}},"required":["path"],"additionalProperties":false}' \
  --fs-path-field path \
  --fs-root src \
  --fs-root docs \
  --fs-deny-path .env \
  --process-timeout-ms 30000 \
  --exec npx prettier --write -- '{path}'
```

## Inspect a Git revision

```sh
shell-is-all-you-need \
  --tool --name show \
  --description "Show the summary and changed paths for one Git revision." \
  --input-schema '{"type":"object","properties":{"revision":{"type":"string","description":"Commit, branch, or tag."}},"required":["revision"],"additionalProperties":false}' \
  --process-timeout-ms 10000 \
  --exec git show --stat --oneline --no-renames '{revision}'
```

::: warning Child option parsing
Not every program supports `--` in every argument position. Test how the fixed child handles values beginning with `-`, and prefer commands that provide an explicit end-of-options marker.
:::

## Fetch an HTTP URL

The configured Python snippet validates the scheme before opening the URL. Doubled braces preserve the Python dictionary literal.

```sh
shell-is-all-you-need \
  --tool --name fetch \
  --description "Fetch one HTTP or HTTPS URL as text." \
  --input-schema '{"type":"object","properties":{"url":{"type":"string","description":"Complete HTTP or HTTPS URL."}},"required":["url"],"additionalProperties":false}' \
  --process-timeout-ms 35000 \
  --exec python3 -c 'import sys,urllib.parse,urllib.request; u=sys.argv[1]; p=urllib.parse.urlsplit(u); (p.scheme in ("http","https") and p.netloc) or sys.exit("invalid URL"); r=urllib.request.Request(u,headers={{"User-Agent":"shell-is-all-you-need"}}); print(urllib.request.urlopen(r,timeout=30).read().decode("utf-8","replace"))' '{url}'
```

## Controlled deployment command

Use typed fields for fixed positional arguments rather than accepting a whole command:

```sh
shell-is-all-you-need \
  --tool --name deploy \
  --description "Deploy a known service to a named environment." \
  --input-schema '{"type":"object","properties":{"service":{"type":"string"},"environment":{"type":"string"}},"required":["service","environment"],"additionalProperties":false}' \
  --process-timeout-ms 600000 \
  --process-max-concurrency 1 \
  --process-rate-limit-count 3 \
  --process-rate-limit-window-ms 3600000 \
  --exec internal-deploy --service '{service}' --environment '{environment}'
```

Schema types validate shape, not an allowed-value list. If only specific service or environment values are permitted, make the fixed child validate that allowlist before taking action.

## Raw shell (privileged)

```sh
shell-is-all-you-need \
  --tool --name run \
  --description "Run a complete shell command. Privileged; use only in a trusted workspace." \
  --input-schema '{"type":"object","properties":{"command":{"type":"string"}},"required":["command"],"additionalProperties":false}' \
  --process-timeout-ms 120000 \
  --process-output-limit-bytes 1048576 \
  --exec sh -c '{command}'
```

Prefer every narrower example above when possible.

## Full tool collection

The source repository includes [`mcp.example.json`](https://github.com/shell-is-all-you-need/mcp/blob/main/mcp.example.json), a tested multi-server collection providing:

- `files_read`, `files_write`, `files_edit`, and `files_patch`
- `search_glob` and `search_grep`
- `web_fetch` and `web_search`
- `shell_run`
- `tasks_run`
- `skills_list` and `skills_get`

Copy only the servers you need into your MCP client's configuration.
