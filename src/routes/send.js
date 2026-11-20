import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import { getPathFromRoot } from "../utils/getPathFromRoot.js";

/**
 * @param {URL} requestUrl
 * @param {http.ServerResponse} response
 */
export async function sendAsync(requestUrl, response) {
  try {
    const relativeUrl = decodeURIComponent(requestUrl.pathname);
    const rootPath = getPathFromRoot("public") + path.sep;
    const file = path.join(rootPath, relativeUrl);
    if (file.startsWith(rootPath)) {
      await new Promise((resolve) => {
        const streamPath = file.endsWith(path.sep) ? file + "index.html" : file;
        const stream = fs.createReadStream(streamPath);
        stream.on("data", onChunk.bind(undefined, response, streamPath));
        stream.on("end", onEnd.bind(undefined, resolve, response, streamPath));
        stream.on("error", onError.bind(undefined, resolve, response));
        stream.pipe(response, { end: false });
      });
    } else {
      response.writeHead(404);
    }
  } catch {
    response.writeHead(404);
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
 * @param {http.ServerResponse} response
 * @param {string} streamPath
 */
function onChunk(response, streamPath) {
  if (!response.headersSent) {
    response.writeHead(200, {
      "cache-control": "no-cache",
      "content-type": getContentType(streamPath),
    });
  }
}

/**
 * @param {(value: any) => void} resolve
 * @param {http.ServerResponse} response
 * @param {string} streamPath
 */
function onEnd(resolve, response, streamPath) {
  if (!response.headersSent) {
    response.writeHead(200, {
      "cache-control": "no-cache",
      "content-type": getContentType(streamPath),
    });
  }
  resolve(void 0);
}

/**
 * @param {(value: any) => void} resolve
 * @param {http.ServerResponse} response
 */
function onError(resolve, response) {
  if (!response.headersSent) {
    response.writeHead(404, {
      "cache-control": "no-cache",
    });
  }
  resolve(void 0);
}
