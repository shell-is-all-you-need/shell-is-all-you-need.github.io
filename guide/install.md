# Install

Choose a native installation or a launcher. The npm and Python launchers fetch the matching GitHub Release binary on first use, verify its SHA-256 checksum, and cache it locally.

| Method | Requirement | Best for |
| --- | --- | --- |
| Homebrew | Homebrew | macOS and Linux workstations |
| Cargo | Rust 1.98.1+ | Rust development environments |
| npm / npx | Node.js 24+ | JavaScript tooling and temporary runs |
| pip / pipx / uvx | Python 3.9+ | Python tooling and isolated runs |

## Homebrew

```sh
brew install shell-is-all-you-need/tap/shell-is-all-you-need
```

Or add the tap once and use the short name:

```sh
brew tap shell-is-all-you-need/tap
brew install shell-is-all-you-need
```

## Rust

```sh
cargo install shell-is-all-you-need
```

Rust 1.98.1 or newer is required.

## npm

Install globally:

```sh
npm install -g shell-is-all-you-need
```

Or run without installing:

```sh
npx -y shell-is-all-you-need --help
```

Node.js 24 or newer is required.

## Python

For an isolated CLI installation:

```sh
pipx install shell-is-all-you-need
```

Standard pip is also supported:

```sh
pip install shell-is-all-you-need
```

## Run without installing

```sh
npx -y shell-is-all-you-need --help
uvx shell-is-all-you-need --help
pipx run shell-is-all-you-need --help
```

## Platforms

Release binaries and launchers support:

- Linux: x86-64 and ARM64 (static musl binaries)
- macOS: Intel and Apple silicon
- Windows: x86-64 and ARM64

## Launcher environment variables

| Variable | Purpose |
| --- | --- |
| `SHELL_IS_ALL_YOU_NEED_BINARY` | Use an existing binary and disable downloading |
| `SHELL_IS_ALL_YOU_NEED_CACHE_DIR` | Override the downloaded binary cache directory |
| `SHELL_IS_ALL_YOU_NEED_GITHUB_REPOSITORY` | Override the release repository, primarily for testing or mirrors |

## Upgrade or remove

::: code-group
```sh [Homebrew]
brew upgrade shell-is-all-you-need
brew uninstall shell-is-all-you-need
```

```sh [Cargo]
cargo install shell-is-all-you-need --force
cargo uninstall shell-is-all-you-need
```

```sh [npm]
npm update -g shell-is-all-you-need
npm uninstall -g shell-is-all-you-need
```

```sh [pipx]
pipx upgrade shell-is-all-you-need
pipx uninstall shell-is-all-you-need
```
:::
