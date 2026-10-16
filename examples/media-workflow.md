# Reddit → Muse Image → DeepSeek

Give an assistant four focused tools rather than a general-purpose shell. The assistant chooses `sort`, `posts`, image paths, and prompts; the server keeps the Reddit cookies and API key out of the tool schema.

::: warning Live services and costs
This workflow contacts Reddit and the configured OpenAI-compatible API (OpenRouter by default), downloads public media, and incurs model charges. Inspect the selected posts before using their images; respect copyright, privacy, and each service's terms. The generated image is an edit, not a byte-level patch of the original.
:::

## Set up

1. Install the [MCP server](/guide/install), Python 3, and the Reddit CLI: `cargo install reddit`.
2. Download the standalone [`mcp.media.workflow.json`](https://github.com/shell-is-all-you-need/mcp/blob/main/mcp.media.workflow.json) into your workspace. It contains the complete inline tool implementations—**no cloned repository or helper script is needed**.
3. Put your browser-exported Netscape `cookies.txt` in the same workspace. Keep it private; do not commit it.
4. Provide your API key to the MCP server process. The tools read `OPENAI_API_KEY` (falling back to `OPENROUTER_API_KEY` when it is unset) and send requests to `OPENAI_BASE_URL`, which defaults to `https://openrouter.ai/api/v1`:

```sh
export OPENAI_API_KEY='your-key-here'
# optional: any OpenAI-compatible endpoint
export OPENAI_BASE_URL='https://openrouter.ai/api/v1'
```

Configure your MCP client with the `media` server entry from `mcp.media.workflow.json`. Set its working directory to the workspace containing `cookies.txt` (the tools create `media-work/` automatically). Pass the key (and base URL) as **secret environment variables**, not a tool argument. If your client cannot set a working directory, start it with a wrapper that changes to your workspace before executing the server. No file other than the copied JSON and your existing cookies is required by these tool definitions; Python 3 and `reddit` are command-line prerequisites. The MCP binary itself remains dependency-free.

## Ask the assistant

> Download the first 5 new posts from the `funny` subreddit. Pick an image from the results and add a vivid purple border and a yellow star while keeping the scene recognizable. Then compare the original and edited images and tell me what changed.

The first tool executes the equivalent of:

```sh
reddit funny --sort new --posts 5 --cookies ./cookies.txt --out-dir media-work/reddit --no-icon
```

Try “top” instead of “new”, or another count from 1 to 10. The `fetch_funny` tool validates both fields, returns titles, URLs, and downloaded image paths, and never accepts a cookie path from the model. Posts without downloadable images have a `null` image path.

The `generate_image` tool creates an image from just a prompt. The `edit_image` tool submits an existing image and prompt to the [OpenRouter-style Image API](https://openrouter.ai/docs/guides/overview/multimodal/image-generation.md) using `input_references` and the model in `OPENAI_IMAGE_MODEL` (default `meta/muse-image`). Both save the returned base64 image inside `media-work/edits`. The `compare_images` tool sends two local images and a question as image URL data payloads to the model in `OPENAI_VISION_MODEL` (default `deepseek/deepseek-v4.1-flash`) on the chat completions API. The tools return text and paths, **not** base64 image data to the assistant.

The `edit_image` and `compare_images` tools declare their image inputs as `--fs-path-field` paths with `--fs-root media-work`, so the server rejects any image outside `media-work` (including via symlinks or a leading `-`) before the script runs; the inline code also checks file type and size. Only use this configuration with a trusted local MCP client. It is a convenience boundary, not an OS sandbox: the child process can still read files accessible to its user. Keep the cookies and key out of other exposed workspace tools.

## Run the same live test

For the repository's opt-in test, place your `.env` in the workspace root with `OPENAI_API_KEY`, `OPENAI_BASE_URL=https://openrouter.ai/api/v1`, and `OPENAI_MODEL` set to a tool-calling model. Optionally set `OPENAI_IMAGE_MODEL` and `OPENAI_VISION_MODEL`; the test passes its environment to the MCP server. In the `mcp` source directory run:

```sh
python3 tests/live_openrouter.py --media
```

The test copies only `mcp.media.workflow.json` and a link to `cookies.txt` into a temporary directory, then uses the configured LLM to select each MCP tool's arguments. It checks that five real new posts were retrieved, the edited image exists and differs from its source, the comparison model returned a substantive description, and a separate prompt generated a new image. Temporary results are removed after the test. Network and provider availability can affect this opt-in test.
