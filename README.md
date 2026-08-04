# mcp-mathjs

Math.js MCP — wraps the mathjs.org API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `evaluate` | Evaluate mathematical expressions: arithmetic, algebra, trigonometry, statistics. Returns computed result. E.g., "2+2", "sin(pi/2)", "sqrt(16)", "mean([1,2,3])". Use when you need to calculate or simplify math. |
| `convert_units` | Convert between units: length, weight, temperature, volume, time, etc. Returns converted value. E.g., "5 m to ft", "100 kg to lbs", "32 degF to degC". Use for unit conversions. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "mathjs": {
      "url": "https://gateway.pipeworx.io/mathjs/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Mathjs data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
