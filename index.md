---
layout: home

hero:
  name: shell-is-all-you-need
  text: Small process tools for MCP
  tagline: One dependency-free Rust binary. Explicit argv, schemas, filesystem boundaries, limits, and optional durable tasks.
  image:
    src: /logo.svg
    alt: shell-is-all-you-need
  actions:
    - theme: brand
      text: Install
      link: /guide/install
    - theme: alt
      text: Configure tools
      link: /guide/configuration

features:
  - title: Zero Rust dependencies
    details: The core server is implemented with the Rust standard library.
  - title: Multi-tool
    details: One stdio MCP process can expose multiple independently constrained tools.
  - title: AI-friendly names
    details: Namespace servers and use short tool verbs, such as shell + run → shell_run.
---
