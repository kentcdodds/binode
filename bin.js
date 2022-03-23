#!/usr/bin/env node

const { spawnSync } = require("child_process");
const resolveBin = require("resolve-bin");

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === "--");
const nodeArgs = args.slice(0, separatorIndex);
const [bin, ...binArgs] = args.slice(separatorIndex + 1);

const resolvedBinPath = resolveBin.sync(bin);

const fullArgs = [...nodeArgs, resolvedBinPath, ...binArgs];

spawnSync(node, fullArgs, { stdio: "inherit" });
