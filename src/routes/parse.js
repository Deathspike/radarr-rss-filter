import http from "node:http";
import { Filter } from "../Filter.js";

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} res
 */
export async function parseAsync(requestUrl, res) {
  const forbidden = requestUrl.searchParams.get("forbidden") ?? "";
  const required = requestUrl.searchParams.get("required") ?? "";
  const url = requestUrl.searchParams.get("url") ?? "";
  if (url) {
    const response = await fetch(url);
    const result = await response.text();
    if (response.ok) {
      const filter = new Filter(forbidden, required);
      res.writeHead(200, { "content-type": "application/xml" });
      res.end(filter.for(result));
    } else {
      res.writeHead(response.status);
      res.end(result);
    }
  } else {
    res.writeHead(400);
    res.end();
  }
}
