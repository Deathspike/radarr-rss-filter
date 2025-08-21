import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { getPathFromRoot } from "../utils/getPathFromRoot.js";

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} res
 */
export function send(requestUrl, res) {
  try {
    const relativeUrl = decodeURIComponent(requestUrl.pathname);
    const rootPath = getPathFromRoot("public") + path.sep;
    const file = path.join(rootPath, relativeUrl);
    if (file.startsWith(rootPath)) {
      const streamPath = file.endsWith(path.sep) ? file + "index.html" : file;
      const stream = fs.createReadStream(streamPath);
      stream.on("data", onChunk.bind(undefined, res, streamPath));
      stream.on("end", onChunk.bind(undefined, res, streamPath));
      stream.on("error", onError.bind(undefined, res));
      stream.pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } catch (err) {
    res.writeHead(404);
    res.end();
  }
}

/** @param {string} streamPath */
function getContentType(streamPath) {
  switch (path.extname(streamPath)) {
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    default:
      return "application/octet-stream";
  }
}

/**
 * @param {http.ServerResponse} res
 * @param {string} streamPath
 */
function onChunk(res, streamPath) {
  if (!res.headersSent) {
    res.writeHead(200, {
      "cache-control": "no-cache",
      "content-type": getContentType(streamPath),
    });
  }
}

/** @param {http.ServerResponse} res */
function onError(res) {
  if (!res.headersSent) {
    res.writeHead(404);
  }
}
