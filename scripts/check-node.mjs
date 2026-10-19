const requiredMajor = 26;
const currentMajor = Number(process.versions.node.split('.')[0]);

if (currentMajor !== requiredMajor) {
  console.error(`Node.js ${requiredMajor} is required. Run nvm use (see .nvmrc).`);
  process.exit(1);
}
