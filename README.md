# @pipeworx/mcp-mathjs

MCP server for mathematical expression evaluation and unit conversion via the [mathjs API](https://api.mathjs.org/). Free, no authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `evaluate` | Evaluate a mathematical expression (arithmetic, algebra, trig, statistics, etc.) |
| `convert_units` | Convert a value from one unit to another |

## Quickstart via Pipeworx Gateway

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "mathjs__evaluate",
      "arguments": { "expression": "sqrt(16) + 3^2" }
    },
    "id": 1
  }'
```

## License

MIT
