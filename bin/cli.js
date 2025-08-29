#!/usr/bin/env node
import process from "node:process";
import { mainAsync } from "../src/index.js";

(async function () {
  const portArg = getArg("port") ?? process.env["PORT"];
  const port = portArg ? parseInt(portArg, 10) || 0 : undefined;
  await mainAsync(port);
})();

/** @param {string} name */
function getArg(name) {
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (!arg) {
      continue;
    } else if (arg === `--${name}` && process.argv[i + 1]) {
      return process.argv[i + 1];
    } else if (arg.startsWith(`--${name}=`)) {
      return arg.slice(name.length + 3);
    }
  }
  return undefined;
}
