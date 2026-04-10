import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

// Outbound policy for ChatGPT widget route (/)
// ChatGPT currently requires text/html+skybridge (older proprietary format)
export default async function (
  response: Response,
  request: ZuploRequest,
  context: ZuploContext,
) {
  const newResponse = new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
  newResponse.headers.set("Content-Type", "text/html+skybridge");
  return newResponse;
}