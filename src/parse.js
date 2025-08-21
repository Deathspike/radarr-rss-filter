import http from "node:http";

/**
 * @param {URL} _requestUrl
 * @param {http.ServerResponse} res
 */
export async function parseAsync(_requestUrl, res) {
  res.writeHead(404);
  res.end();
}
