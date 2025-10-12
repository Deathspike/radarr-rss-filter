#!/usr/bin/env node
import process from "node:process";

import { mainAsync } from "../src/index.js";

/** @param {string} name */
function getArgument(name) {
  for (let index = 2; index < process.argv.length; index++) {
    const argument = process.argv[index];
    if (!argument) {
      continue;
    } else if (argument === `--${name}` && process.argv[index + 1]) {
      return process.argv[index + 1];
    } else if (argument.startsWith(`--${name}=`)) {
      return argument.slice(name.length + 3);
    }
  }
  return;
}

const portArgument = getArgument("port") ?? process.env["PORT"];
const port = portArgument ? Number.parseInt(portArgument) || 0 : undefined;
await mainAsync(port);
