const { Command } = require("commander");
const { getTranslator } = require("../infrastructure/i18n");

function buildOptions(defaultApiUrl) {
  const program = new Command();
  program.parse(process.argv);
  const preOpts = program.opts();
  const i18n = getTranslator(preOpts.lang || "pt-br");
  
  const programWithDesc = new Command();
  programWithDesc
    .name("product-discovery")
    .description(i18n.t("cliDescription"))
    .option("-u, --api-url <url>", i18n.t("optApiUrl"), defaultApiUrl)
    .option("-l, --lang <language>", i18n.t("optLang"), "pt-br")
    .option("-c, --config <path>", i18n.t("optConfig"))
    .option("-s, --save", i18n.t("optSave"))
    .option("-o, --output <dir>", i18n.t("optOutput"))
    .option("-f, --file <name>", i18n.t("optFile"))
    .option("--no-save", i18n.t("optNoSave"));

  programWithDesc.parse(process.argv);
  return programWithDesc.opts();
}

module.exports = { buildOptions };
