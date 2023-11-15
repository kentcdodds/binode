#!/usr/bin/env node

const path = require("path");
const { spawnSync } = require("child_process");
const resolve = require("resolve");

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === "--");
const nodeArgs = args.slice(0, separatorIndex);
const [binPkg, ...binArgs] = args.slice(separatorIndex + 1);

let binName, pkgName;

if (binPkg.includes(":")) {
  [pkgName, binName] = binPkg.split(":");
} else {
  binName = pkgName = binPkg;
}

const modPkgPath = resolve.sync(`${pkgName}/package.json`, {
  basedir: process.cwd(),
});
const modPkgDir = path.dirname(modPkgPath);
const pkg = require(modPkgPath);
const binRelativePath =
  typeof pkg.bin === "string" ? pkg.bin : pkg.bin[binName];
const binPath = path.join(modPkgDir, binRelativePath);

spawnSync(node, [...nodeArgs, binPath, ...binArgs], {
  stdio: "inherit",
});
