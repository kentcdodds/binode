#!/usr/bin/env node

import { spawnSync } from "child_process";
import which from "which";

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === "--");
const nodeArgs = args.slice(0, separatorIndex);
const [bin, ...binArgs] = args.slice(separatorIndex + 1);

const whichBinPath = which.sync(bin);

spawnSync(whichBinPath, binArgs, {
  env: {
    ...process.env,
    NODE_OPTIONS: [process.env.NODE_OPTIONS, ...nodeArgs]
      .filter(Boolean)
      .join(" "),
  },
  stdio: "inherit",
});
