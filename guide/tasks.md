# Durable MCP Tasks

Use tasks for work that may outlive one synchronous request, such as builds, migrations, or internal agent jobs.

## Enable task execution

Add a unique persistent store directory to the tool:

```sh
shell-is-all-you-need \
  --tool --name build \
  --description "Build the project as a durable task." \
  --input-schema '{"type":"object","properties":{},"additionalProperties":false}' \
  --task-store-dir ./.mcp-tasks/build \
  --task-poll-interval-ms 500 \
  --task-ttl-ms 86400000 \
  --process-timeout-ms 1800000 \
  --exec cargo build --release --locked
```

| Setting | Meaning |
| --- | --- |
| `--task-store-dir` | Enables tasks and stores durable records |
| `--task-poll-interval-ms` | Suggested delay between client polls |
| `--task-ttl-ms` | Removes terminal task records after this age |

Both timing values must be positive and require `--task-store-dir`. Without a TTL, records are retained indefinitely.

## Lifecycle

1. The client negotiates MCP Tasks support.
2. A tool call creates a durable task record.
3. The process runs while the client polls task state.
4. Completion, failure, or cancellation is persisted.
5. Interrupted tasks are marked failed when the store reopens.

The server supports task listing, retrieval, result retrieval, and cancellation. Cancellation terminates the owned child process tree.

## Store design

- Use one canonical store directory per task-enabled tool.
- Deny the store from file tools with `--fs-deny-path .mcp-tasks`.
- Keep the store on persistent local storage.
- Do not share one store concurrently between server processes; the store is exclusively locked.
- Set a TTL or implement cleanup if completed task volume is high.

::: info Negotiation
Task capabilities are advertised only when at least one tool has a task store and the client negotiates the extension. The server uses MCP protocol version `2026-07-28`.
:::
