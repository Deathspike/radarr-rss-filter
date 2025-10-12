import http from "node:http";

import { rssAsync } from "./routes/rss.js";
import { send } from "./routes/send.js";
import { getServerPort } from "./utils/getServerPort.js";

export async function mainAsync(port = 8283) {
  await new Promise((resolve, reject) => {
    const server = http
      .createServer((request, response) => void serveAsync(request, response))
      .on("close", resolve)
      .on("error", reject);
    server.listen(port, () =>
      console.log(`Running on http://localhost:${getServerPort(server)}/`),
    );
  });
}

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} response
 */
async function routeAsync(requestUrl, response) {
  if (/^\/rss$/.test(requestUrl.pathname)) {
    await rssAsync(requestUrl, response);
  } else {
    send(requestUrl, response);
  }
}

/**
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */
async function serveAsync(request, response) {
  try {
    if (!request.url) return;
    const baseUrl = "http://localhost/";
    const requestUrl = new URL(request.url, baseUrl);
    await routeAsync(requestUrl, response);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end();
  }
}
