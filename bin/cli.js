#!/usr/bin/env node
import process from "node:process";

import { mainAsync } from "../src/index.js";

/** @param {string} name */
function getArgument(name) {
  const args = process.argv.slice(2);
  const option = `--${name}`;
  for (const [index, parameter] of args.entries()) {
    if (parameter === option && args[index + 1]) {
      return args[index + 1];
    } else if (parameter.startsWith(`${option}=`)) {
      return parameter.slice(option.length + 1);
    }
  }
  return;
}

const portArgument = getArgument("port");
const port = portArgument ? Number.parseInt(portArgument) || 0 : undefined;
await mainAsync(port);
