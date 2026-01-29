const { Command } = require("commander");
const { getTranslator } = require("../infrastructure/i18n");

function buildOptions(defaultApiUrl) {
  // First pass: get lang to determine i18n
  const preProgram = new Command();
  preProgram
    .allowUnknownOption()
    .option("-l, --lang <language>", "Language code (pt-br, en-us)", "pt-br");
  
  preProgram.parse(process.argv);
  const preOpts = preProgram.opts();
  const i18n = getTranslator(preOpts.lang || "pt-br");
  
  // Second pass: full options with translations
  const program = new Command();
  program
    .name("product-discovery")
    .description(i18n.t("cliDescription"))
    .option("-u, --api-url <url>", i18n.t("optApiUrl"), defaultApiUrl)
    .option("-l, --lang <language>", i18n.t("optLang"), "pt-br")
    .option("-c, --config <path>", i18n.t("optConfig"))
    .option("-s, --save", i18n.t("optSave"))
    .option("-o, --output <dir>", i18n.t("optOutput"))
    .option("-f, --file <name>", i18n.t("optFile"))
    .option("--no-save", i18n.t("optNoSave"));

  program.parse(process.argv);
  return program.opts();
}

module.exports = { buildOptions };
