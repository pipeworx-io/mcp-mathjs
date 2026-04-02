/**
 * Math.js MCP — wraps the mathjs.org API (free, no auth)
 *
 * Tools:
 * - evaluate: Evaluate a mathematical expression
 * - convert_units: Convert a value from one unit to another
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.mathjs.org/v4';

// --- Tool definitions ---

const tools: McpToolExport['tools'] = [
  {
    name: 'evaluate',
    description:
      'Evaluate a mathematical expression. Supports arithmetic, algebra, trigonometry, statistics, and more. Returns the computed result as a string.',
    inputSchema: {
      type: 'object',
      properties: {
        expression: {
          type: 'string',
          description:
            'Mathematical expression to evaluate (e.g., "2 + 3 * 4", "sqrt(16)", "sin(pi/2)", "det([1,2;3,4])")',
        },
      },
      required: ['expression'],
    },
  },
  {
    name: 'convert_units',
    description:
      'Convert a value from one unit to another using mathjs unit syntax. Returns the converted value as a string.',
    inputSchema: {
      type: 'object',
      properties: {
        value: {
          type: 'number',
          description: 'Numeric value to convert (e.g., 5)',
        },
        from: {
          type: 'string',
          description: 'Source unit (e.g., "inches", "kg", "celsius", "mph")',
        },
        to: {
          type: 'string',
          description: 'Target unit (e.g., "cm", "lbs", "fahrenheit", "km/h")',
        },
      },
      required: ['value', 'from', 'to'],
    },
  },
];

// --- callTool dispatcher ---

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'evaluate':
      return evaluate(args.expression as string);
    case 'convert_units':
      return convertUnits(args.value as number, args.from as string, args.to as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// --- Tool implementations ---

async function evaluate(expression: string) {
  const params = new URLSearchParams({ expr: expression });
  const res = await fetch(`${BASE_URL}/?${params}`);
  if (!res.ok) throw new Error(`mathjs error: ${res.status}`);

  const result = await res.text();

  return {
    expression,
    result: result.trim(),
  };
}

async function convertUnits(value: number, from: string, to: string) {
  const expr = `${value} ${from} to ${to}`;
  const params = new URLSearchParams({ expr });
  const res = await fetch(`${BASE_URL}/?${params}`);
  if (!res.ok) throw new Error(`mathjs error: ${res.status}`);

  const result = await res.text();

  return {
    input: `${value} ${from}`,
    output: result.trim(),
    to,
  };
}

export default { tools, callTool } satisfies McpToolExport;
