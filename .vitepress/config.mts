import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/",
  title: "shell-is-all-you-need",
  description: "A dependency-free MCP server for fixed process invocations.",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#080b0d" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "shell-is-all-you-need" }],
    ["meta", { property: "og:description", content: "Turn fixed process invocations into focused MCP tools." }],
  ],
  themeConfig: {
    nav: [
      { text: "Get started", link: "/guide/getting-started" },
      { text: "Examples", link: "/examples/" },
      { text: "Media workflow", link: "/examples/media-workflow" },
      { text: "CLI reference", link: "/reference/cli" },
      {
        text: "Packages",
        items: [
          { text: "Releases", link: "https://github.com/shell-is-all-you-need/mcp/releases" },
          { text: "npm", link: "https://www.npmjs.com/package/shell-is-all-you-need" },
          { text: "PyPI", link: "https://pypi.org/project/shell-is-all-you-need/" },
          { text: "crates.io", link: "https://crates.io/crates/shell-is-all-you-need" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Get started",
        items: [
          { text: "Quick start", link: "/guide/getting-started" },
          { text: "Install", link: "/guide/install" },
        ],
      },
      {
        text: "Guides",
        items: [
          { text: "Configure tools", link: "/guide/configuration" },
          { text: "Secure tools", link: "/guide/security" },
          { text: "Durable tasks", link: "/guide/tasks" },
          { text: "Tool naming", link: "/guide/naming" },
          { text: "Troubleshooting", link: "/guide/troubleshooting" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Copy-ready tools", link: "/examples/" },
          { text: "Reddit → image → compare", link: "/examples/media-workflow" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "CLI parameters", link: "/reference/cli" },
          { text: "Input schemas", link: "/reference/schema" },
          { text: "Tool results", link: "/reference/output" },
        ],
      },
    ],
    search: { provider: "local" },
    outline: { level: [2, 3], label: "On this page" },
    editLink: {
      pattern: "https://github.com/shell-is-all-you-need/shell-is-all-you-need.github.io/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 shell-is-all-you-need",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/shell-is-all-you-need/mcp" },
    ],
  },
});
