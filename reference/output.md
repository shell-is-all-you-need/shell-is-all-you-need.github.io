# Tool results

Every completed process returns text content and a machine-readable `structuredContent` object.

```json
{
  "exitCode": 0,
  "stdout": "rustc 1.98.1\n",
  "stderr": "",
  "timedOut": false,
  "stdoutTruncated": false,
  "stderrTruncated": false
}
```

## Fields

| Field | Type | Meaning |
| --- | --- | --- |
| `exitCode` | integer or `null` | Native child exit status; may be null when no code is available |
| `stdout` | string | Captured standard output, converted lossily to UTF-8 if necessary |
| `stderr` | string | Captured standard error, converted lossily to UTF-8 if necessary |
| `timedOut` | boolean | Whether the configured deadline terminated the process |
| `stdoutTruncated` | boolean | Whether stdout exceeded its byte limit |
| `stderrTruncated` | boolean | Whether stderr exceeded its byte limit |

The output byte limit applies independently to each stream. The process continues to be drained after the cap so a full pipe cannot deadlock it.

## Success and errors

A call succeeds only when `exitCode` is `0` and `timedOut` is false. On success, primary text content is stdout. On failure, text content includes a summary of exit status, timeout, stdout, and stderr, and MCP `isError` is true.

Validation, policy, spawn, concurrency, and rate-limit failures also return a structured error with `exitCode: null` and the message in `stderr`.

## Cancellation

For synchronous calls, MCP cancellation terminates the owned child process tree and suppresses a late response. For task calls, cancellation persists a terminal task state that clients can retrieve later.
