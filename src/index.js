import http from "node:http";
import { rssAsync } from "./routes/rss.js";
import { send } from "./routes/send.js";

export async function mainAsync(port = 8283) {
  await new Promise((resolve, reject) =>
    http
      .createServer(serveAsync)
      .on("close", resolve)
      .on("error", reject)
      .listen(port, () => console.log(`Running on http://localhost:${port}/`)),
  );
}

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} res
 */
async function routeAsync(requestUrl, res) {
  if (/^\/rss$/.test(requestUrl.pathname)) {
    await rssAsync(requestUrl, res);
  } else {
    send(requestUrl, res);
  }
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function serveAsync(req, res) {
  try {
    if (!req.url) return;
    const baseUrl = "http://localhost/";
    const requestUrl = new URL(req.url, baseUrl);
    await routeAsync(requestUrl, res);
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end();
  }
}
