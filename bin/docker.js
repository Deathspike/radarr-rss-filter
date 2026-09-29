#!/usr/bin/env node
import process from "node:process";

import { mainAsync } from "../src/index.js";

const portArgument = process.env["PORT"];
const port = portArgument ? Number.parseInt(portArgument) || 0 : undefined;
await mainAsync(port);
