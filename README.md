# binode

## Problem:

[This is the problem we're solving](https://twitter.com/kentcdodds/status/1506287157203423239):

You've got an npm package that exposes a CLI, we'll call it `sndwch` and accepts some args:

```sh
sndwch --topping ham --topping cheese
```

But then someone decides they want to run that with node's `--inspect-brk` flag (or maybe `--require` flag, or any other node-based flag). So they have to do this:

```sh
node --inspect-brk ./node_modules/.bin/sndwch --topping ham --topping cheese
```

**The problem is** that doesn't work on windows, so now you have to do this:

```sh
node --inspect-brk ./node_modules/sndwch/bin.js --topping ham --topping cheese
```

But now the location of your binary file in your package is part of the API and if you ever decide to change how that works it's technically a breaking change.

## Solution:

People can install this package and then do this instead:

```sh
binode --inspect-brk -- sndwch --topping ham --topping cheese
```

Sometimes a package has a different binary name from the package name (like [`which`](https://npm.im/which) calls it's binary `node-which`). There's no way to do a reverse-lookup of a binary to find the package for it, so you have to supply that by providing the package name along with the executable you want. Something like this:

```sh
binode --require ./mocks -- @remix-run/dev:remix dev
```

That's it..

Here's everything you need to know:

- Everything on the left side of the `--` is flags for node
- The first thing after the `--` is the binary you want to use
- Everything after the binary you want to use is flags for that binary
- If the package name and binary name are different, you must supply both after the `--` by separating them by a `:` (for example: `pkgName:binName`).

## Installation

```
npm install binode
```

## License

MIT
