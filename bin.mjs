#!/usr/bin/env node

import path from 'path';
import { spawnSync } from 'child_process';
import resolve from 'resolve';
import { promises as fs } from 'fs';

const [node, me, ...args] = process.argv;

const separatorIndex = args.findIndex((arg) => arg === '--');
const nodeArgs = args.slice(0, separatorIndex);
const [binPkg, ...binArgs] = args.slice(separatorIndex + 1);

let binName, pkgName;

if (binPkg.includes(':')) {
  [pkgName, binName] = binPkg.split(':');
} else {
  binName = pkgName = binPkg;
}

const modPkgPath = resolve.sync(`${pkgName}/package.json`, {
  basedir: process.cwd(),
});
const modPkgDir = path.dirname(modPkgPath);

fs.readFile(modPkgPath, 'utf8')
  .then((data) => {
    const pkg = JSON.parse(data);
    const binRelativePath =
      typeof pkg.bin === 'string' ? pkg.bin : pkg.bin[binName];
    const binPath = path.join(modPkgDir, binRelativePath);

    spawnSync(node, [...nodeArgs, binPath, ...binArgs], {
      stdio: 'inherit',
    });
  })
  .catch((error) => {
    console.error('Error loading module:', error);
  });
