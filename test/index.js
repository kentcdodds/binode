import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const result = spawnSync("npm", ["run", "run-binode", "--silent"], {
  cwd: __dirname,
});
const stderr = result.stderr.toString();
const stdout = result.stdout.toString();

if (result.status !== 0) {
  throw new Error(
    `
npm run run-binode failed with status ${result.status}:

--------- stderr ---------
${stderr}

--------- stdout ---------
${stdout}
  `.toString()
  );
}

if (!stderr.includes("Debugger listening")) {
  throw new Error(`--inspect flag not set: \n\n${stderr}`);
}

if (!stdout.includes("🐮")) {
  throw new Error(`--require is not working\n\n${stdout}`);
}

if (!stdout.includes("futile")) {
  throw new Error(`"futile" not found in output\n\n${stdout}`);
}

console.log("✅ Tests passed!");
