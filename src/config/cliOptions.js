const { Command } = require("commander");

function buildOptions(defaultApiUrl) {
  const program = new Command();
  program
    .name("product-discovery")
    .description("Generate a structured product discovery using the Product Discovery Agent API")
    .option("-u, --api-url <url>", "API URL", defaultApiUrl)
    .option("-c, --config <path>", "Path to JSON config file")
    .option("-s, --save", "Auto-save the JSON result without prompting")
    .option("-o, --output <dir>", "Default output directory")
    .option("-f, --file <name>", "Default output filename")
    .option("--no-save", "Disable saving prompt");

  program.parse(process.argv);
  return program.opts();
}

module.exports = { buildOptions };
