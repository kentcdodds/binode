#!/usr/bin/env node

import { spawnSync } from "child_process";
import which from "which";

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === "--");
const nodeArgs = args.slice(0, separatorIndex);
const [bin, ...binArgs] = args.slice(separatorIndex + 1);

const fullPath = await which(bin);

const fullArgs = [...nodeArgs, fullPath, ...binArgs];

spawnSync(node, fullArgs, { stdio: "inherit" });
