#!/usr/bin/env node

const { spawnSync } = require("child_process");
const which = require("which");

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === "--");
const nodeArgs = args.slice(0, separatorIndex);
const [bin, ...binArgs] = args.slice(separatorIndex + 1);

const whichBinPath = which.sync(bin);

spawnSync(whichBinPath, binArgs, {
  env: { ...process.env, NODE_OPTIONS: nodeArgs },
  stdio: "inherit",
});
