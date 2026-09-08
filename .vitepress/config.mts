import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/",
  title: "shell-is-all-you-need",
  description: "A dependency-free MCP server for fixed process invocations.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: "Guide", link: "/guide/install" }],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Install", link: "/guide/install" },
          { text: "Tool naming", link: "/guide/naming" },
          { text: "Configuration", link: "/guide/configuration" },
        ],
      },
    ],
    search: { provider: "local" },
    socialLinks: [
      { icon: "github", link: "https://github.com/shell-is-all-you-need/mcp" },
    ],
  },
});
