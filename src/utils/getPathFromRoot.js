import path from "node:path";
import url from "node:url";

/** @param {string} relativePath */
export function getPathFromRoot(relativePath) {
  const sourcePath = url.fileURLToPath(import.meta.url);
  const parentPath = path.dirname(sourcePath);
  return path.join(parentPath, "..", "..", relativePath);
}
