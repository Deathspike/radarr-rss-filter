import http from "node:http";

import { Filter } from "../Filter.js";

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} response
 */
export async function rssAsync(requestUrl, response) {
  const forbidden = requestUrl.searchParams.get("forbidden") ?? "";
  const required = requestUrl.searchParams.get("required") ?? "";
  const url = requestUrl.searchParams.get("url") ?? "";
  if (url) {
    const result = await fetch(url);
    const contentType = result.headers.get("content-type") ?? "";
    if (!result.ok) {
      response.writeHead(result.status);
      response.end();
    } else if (isRss(contentType)) {
      const rss = new Filter(forbidden, required).for(await result.text());
      response.writeHead(200, { "content-type": "application/xml" });
      response.end(rss);
    } else {
      response.writeHead(415);
      response.end();
    }
  } else {
    response.writeHead(400);
    response.end();
  }
}

/** @param {string} contentType */
function isRss(contentType) {
  return (
    contentType.startsWith("application/rss+xml") ||
    contentType.startsWith("application/xml") ||
    contentType.startsWith("text/xml")
  );
}
