# Input schemas

Input schemas are deliberately small, closed, and flat. This keeps validation deterministic without runtime dependencies.

## Complete example

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Search files",
  "description": "Inputs accepted by the search tool.",
  "type": "object",
  "properties": {
    "pattern": {
      "type": "string",
      "title": "Regular expression",
      "description": "Expression passed to grep."
    },
    "line_number": {
      "type": "boolean",
      "description": "Whether to include line numbers."
    }
  },
  "required": ["pattern", "line_number"],
  "additionalProperties": false
}
```

Save this as `schemas/search.json` and load it with `--input-schema @schemas/search.json`.

## Supported keywords

At the root:

- `$schema` — when present, must be the JSON Schema 2020-12 URI
- `$comment`, `title`, `description` — strings
- `type` — must be `object`
- `properties` — required object
- `required` — every property exactly once; optional only for an empty schema
- `additionalProperties` — must be `false`

On each property:

- `$comment`, `title`, `description` — strings
- `type` — one of `string`, `number`, `integer`, or `boolean`

Nested objects, arrays, optional fields, defaults, enums, patterns, and numeric ranges are not supported.

## Placeholder contract

Properties must match command placeholders exactly:

```sh
--input-schema '{"type":"object","properties":{"path":{"type":"string"}},"required":["path"],"additionalProperties":false}' \
--exec cat -- '{path}'
```

This fails at startup if:

- `{path}` is missing from `properties`
- a property is never used by an argument template
- a property is omitted from `required`
- an undeclared field is sent at call time
- a value has the wrong JSON scalar type

## Inferred schemas

When no schema is supplied, placeholders become required strings:

```sh
--exec printf '%s\n' '{message}'
```

is equivalent to:

```json
{
  "type": "object",
  "properties": { "message": { "type": "string" } },
  "required": ["message"],
  "additionalProperties": false
}
```

Use explicit schemas for production tools so the model receives meaningful titles, descriptions, and correct scalar types.

## Rendering values

- Strings are inserted as their decoded JSON value.
- Numbers and integers use their normalized JSON text.
- Booleans render as `true` or `false`.
- A rendered NUL byte is rejected.
- Two consecutive opening or closing braces render one literal brace.

Rendering does not perform shell escaping because commands are executed directly. If you explicitly invoke a shell, the shell interprets the rendered string.
