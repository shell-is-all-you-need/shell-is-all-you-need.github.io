# Tool naming

Use the MCP server name as a namespace and the tool name as a short verb. AI clients commonly combine both names when exposing tools to a model.

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

The repository's `mcp.example.json` follows this convention and is exercised by the deterministic example test suite.
