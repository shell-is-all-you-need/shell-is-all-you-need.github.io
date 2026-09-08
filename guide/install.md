# Install

## Rust

```sh
cargo install shell-is-all-you-need
```

## Run without installing

The npm and PyPI launchers download the matching versioned GitHub Release binary on first run, verify its SHA-256 checksum, and cache it. The npm launcher requires Node.js 24 or newer.

```sh
npx -y shell-is-all-you-need --help
uvx shell-is-all-you-need --help
pipx run shell-is-all-you-need --help
```

## Install a launcher

```sh
npm install -g shell-is-all-you-need
pip install shell-is-all-you-need
pipx install shell-is-all-you-need
```


PyPI keeps only the canonical project and command.

Launchers support Linux, macOS, and Windows on x86-64 and ARM64. Set `SHELL_IS_ALL_YOU_NEED_BINARY` to an existing binary to disable downloads.
