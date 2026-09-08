# Tool naming

Use the MCP server name as a namespace and the tool name as a short verb. AI clients commonly combine both names when exposing tools to a model.

## Recommended pattern

| Server | Tool | Model-facing name |
| --- | --- | --- |
| `shell` | `run` | `shell_run` |
| `files` | `read` | `files_read` |
| `files` | `write` | `files_write` |
| `files` | `edit` | `files_edit` |
| `files` | `patch` | `files_patch` |
| `search` | `glob` | `search_glob` |
| `search` | `grep` | `search_grep` |
| `web` | `fetch` | `web_fetch` |
| `web` | `search` | `web_search` |
| `tasks` | `run` | `tasks_run` |
| `skills` | `list` | `skills_list` |
| `skills` | `get` | `skills_get` |

Avoid repeating the noun at both levels (`shell` + `shell` → `shell_shell`). Group related tools in one server when they share a natural namespace.

Good tool names are:

- **Short:** `read`, `search`, `format`, `deploy`
- **Action-oriented:** describe what happens when called
- **Stable:** do not encode versions or implementation details
- **Distinct:** every `--name` in one server process must be unique

Tool names may contain 1–128 ASCII letters, digits, `.`, `_`, or `-`.

## Descriptions matter

The model sees the tool description. State what the tool does, when to use it, and any important constraint:

```text
Search Rust source files with a regular expression. Returns path, line number,
and matching text. Use this before reading a full file.
```

Avoid descriptions such as “run command” that do not help the model select the right tool.

The repository's `mcp.example.json` follows this convention and is exercised by the deterministic example test suite.
