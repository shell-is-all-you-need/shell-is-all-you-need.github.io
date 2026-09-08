# Quick start

Build and connect your first focused MCP tool in a few minutes.

## 1. Install

```sh
brew install shell-is-all-you-need/tap/shell-is-all-you-need
```

Other package managers and temporary runners are listed in the [installation guide](./install).

Verify the command:

```sh
shell-is-all-you-need --version
```

## 2. Define a tool

The following server exposes one tool named `version`. It accepts no inputs and always runs the same command.

```sh
shell-is-all-you-need \
  --tool \
  --name version \
  --description "Print the installed Rust compiler version." \
  --input-schema '{"type":"object","properties":{},"additionalProperties":false}' \
  --exec rustc --version
```

The process waits for MCP JSON-RPC messages on standard input. Running it in a terminal appears idle; that is expected.

## 3. Connect an MCP client

Add the command and arguments to your client's MCP configuration:

```json
{
  "mcpServers": {
    "rust": {
      "command": "shell-is-all-you-need",
      "args": [
        "--tool",
        "--name", "version",
        "--description", "Print the installed Rust compiler version.",
        "--input-schema", "{\"type\":\"object\",\"properties\":{},\"additionalProperties\":false}",
        "--exec", "rustc", "--version"
      ]
    }
  }
}
```

Some clients call the top-level object `servers`. Preserve the command and argument array when adapting the surrounding configuration.

## 4. Reload and verify

Restart or reload the MCP client. It should discover a model-facing tool named `rust_version`.

If a desktop client cannot find the executable, replace the command with the result of:

```sh
command -v shell-is-all-you-need
```

## Next steps

- Add validated parameters with [argument templates and schemas](./configuration).
- Copy practical [file, search, formatting, and task examples](/examples/).
- Apply [filesystem and process safeguards](./security).
- Review every available [CLI parameter](/reference/cli).
