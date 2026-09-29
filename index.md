---
layout: home

hero:
  name: shell-is-all-you-need
  text: The small bridge between a command and an AI tool.
  tagline: Publish exactly the commands you trust as typed MCP tools. No bespoke server, no blank-check shell access.
  image:
    src: /logo.svg
    alt: shell-is-all-you-need
  actions:
    - theme: brand
      text: Get started →
      link: /guide/getting-started
    - theme: alt
      text: Explore examples
      link: /examples/

features:
  - icon: ⚡
    title: One native binary
    details: The server needs no runtime dependencies. Install via Homebrew, Cargo, npm, or pip.
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

<div class="home-flow" aria-label="How it works">
  <div><span class="flow-number">01 / DEFINE</span><strong>Fix the command</strong><p>Choose the executable and argument template. The model never chooses a program.</p></div>
  <div><span class="flow-number">02 / CONSTRAIN</span><strong>Describe the inputs</strong><p>Expose typed fields, permitted paths, and resource limits for each tool.</p></div>
  <div><span class="flow-number">03 / CONNECT</span><strong>Speak MCP</strong><p>One native stdio server advertises the tools and returns structured results.</p></div>
</div>

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

## A real multi-tool workflow

Download a Reddit post, edit its image with Muse Image, and ask DeepSeek to compare the before and after. A fourth tool generates images from scratch. Credentials stay in the server environment.

[Explore the live media workflow →](/examples/media-workflow)
