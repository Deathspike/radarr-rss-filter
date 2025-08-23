import http from "node:http";
import { Filter } from "../Filter.js";

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} res
 */
export async function rssAsync(requestUrl, res) {
  const forbidden = requestUrl.searchParams.get("forbidden") ?? "";
  const required = requestUrl.searchParams.get("required") ?? "";
  const url = requestUrl.searchParams.get("url") ?? "";
  if (url) {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) {
      res.writeHead(response.status);
      res.end();
    } else if (!isRss(contentType)) {
      res.writeHead(415);
      res.end();
    } else {
      const result = await response.text();
      const filter = new Filter(forbidden, required);
      res.writeHead(200, { "content-type": "application/xml" });
      res.end(filter.for(result));
    }
  } else {
    res.writeHead(400);
    res.end();
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
