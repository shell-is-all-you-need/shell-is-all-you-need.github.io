# Troubleshooting

## The command appears to hang

That is normal when running a configured server directly. It communicates over MCP on stdin/stdout and waits for the client. Use `--help` or `--version` to test the executable itself.

## Desktop client cannot find the command

Find the absolute path:

```sh
command -v shell-is-all-you-need
```

Use that path as the MCP server `command`, then fully restart the desktop client.

## `at least one --tool block is required`

The executable was started without a tool definition. Each process requires at least:

```sh
--tool --name NAME --exec COMMAND
```

## Schema and placeholder mismatch

Every command placeholder must have exactly one property and must appear in `required`. Extra and optional properties are rejected. See [Input schemas](/reference/schema).

## Path denied or outside allowed roots

Paths are resolved against the server's working directory and canonicalized. Check:

- the MCP client's configured working directory
- every `--fs-root` and `--fs-deny-path`
- symlinks in the requested path
- whether the field was marked with `--fs-path-field`

## Output is cut off

Inspect `stdoutTruncated` and `stderrTruncated` in the structured result. Increase `--process-output-limit-bytes` only if the model needs more output; a narrower command is often better.

## Launcher download fails

The npm and Python packages need access to GitHub Releases on first run. Verify proxy/firewall access to `github.com`, or point the launcher at an existing binary:

```sh
export SHELL_IS_ALL_YOU_NEED_BINARY=/absolute/path/to/shell-is-all-you-need
```

To force a clean download, set `SHELL_IS_ALL_YOU_NEED_CACHE_DIR` to a new directory.

## `cargo install` reports an old compiler

Building from source requires Rust 1.98.1 or newer:

```sh
rustup update stable
rustc --version
```
