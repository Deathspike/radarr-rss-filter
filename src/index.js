import http from "node:http";

import { rssAsync } from "./routes/rss.js";
import { sendAsync } from "./routes/send.js";
import { getServerPort } from "./utils/getServerPort.js";

export async function mainAsync(port = 8283) {
  await new Promise((resolve, reject) => {
    const server = http
      .createServer((req, res) => void serveAsync(req, res))
      .on("close", resolve)
      .on("error", reject);
    server.listen(port, () => {
      const serverPort = getServerPort(server);
      console.log(`Running on http://localhost:${serverPort.toString()}/`);
    });
  });
}

/**
 * @param {string} method
 * @param {URL} requestUrl
 * @param {http.ServerResponse} response
 */
async function routeAsync(method, requestUrl, response) {
  if (method !== "GET") {
    response.writeHead(405, { allow: "GET" });
  } else if (/^\/rss$/.test(requestUrl.pathname)) {
    await rssAsync(requestUrl, response);
  } else {
    await sendAsync(requestUrl, response);
  }
}

/**
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */
async function serveAsync(request, response) {
  try {
    if (!request.method || !request.url) return;
    const baseUrl = "http://localhost/";
    const requestUrl = new URL(request.url, baseUrl);
    await routeAsync(request.method, requestUrl, response);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
  } finally {
    response.end();
  }
}
