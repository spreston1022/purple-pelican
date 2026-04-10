import { ZuploContext, ZuploMcpSdk, ZuploRequest } from "@zuplo/runtime";

const CLAUDE_WIDGET_URI = "ui://widget/charity-claude.html";

export default async function (
  response: Response,
  request: ZuploRequest,
  context: ZuploContext,
) {
  const sdk = new ZuploMcpSdk(context);

  // Only shape the response for MCP tool calls
  const mcpRequest = sdk.getRawCallToolRequest();
  if (!mcpRequest) {
    return response; // not an MCP call — pass through unchanged
  }

  const data = await response.json();

  sdk.setRawCallToolResult({
    content: [{ type: "text", text: JSON.stringify(data) }],
    structuredContent: data,
    _meta: {
      ui: { resourceUri: CLAUDE_WIDGET_URI },
    },
  });

  return Response.json(data);
}