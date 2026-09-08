---
layout: home

hero:
  name: shell-is-all-you-need
  text: Give AI tools, not a blank shell
  tagline: Turn fixed process invocations into focused MCP tools with explicit inputs, filesystem boundaries, resource limits, and durable tasks.
  image:
    src: /logo.svg
    alt: shell-is-all-you-need
  actions:
    - theme: brand
      text: Install
      link: /guide/install
    - theme: alt
      text: Browse examples
      link: /examples/

features:
  - icon: ⚡
    title: One native binary
    details: No runtime dependencies. Install with Homebrew, Cargo, npm, pip, or run temporarily.
  - icon: 🧰
    title: Multiple focused tools
    details: One stdio server exposes independently described commands with typed scalar inputs.
  - icon: 🛡️
    title: Bound the blast radius
    details: Restrict paths, deny sensitive trees, and set timeout, output, concurrency, and rate limits.
  - icon: ⏳
    title: Durable MCP Tasks
    details: Persist long-running work with polling, cancellation, retention, and restart recovery.
---

## From command to MCP tool

This definition exposes `cargo fmt` as a no-argument tool. The child process is launched directly—there is no shell unless you explicitly configure one.

```sh
shell-is-all-you-need \
  --tool \
  --name format \
  --description "Format the Rust workspace." \
  --input-schema '{"type":"object","properties":{},"additionalProperties":false}' \
  --process-timeout-ms 120000 \
  --exec cargo fmt --all
```

::: tip Design principle
Start with the narrowest useful command. Add typed inputs and permissions only when the tool needs them.
:::

## What you control

| Layer | Controls |
| --- | --- |
| Model contract | Name, description, closed JSON Schema |
| Invocation | Fixed executable and argument templates |
| Filesystem | Path fields, allowed roots, denied paths |
| Resources | Timeout, output bytes, concurrency, request rate |
| Long-running work | Task store, polling interval, retention TTL |

[Build your first tool →](/guide/getting-started)
