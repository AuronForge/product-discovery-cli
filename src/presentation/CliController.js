const { buildOptions } = require("../config/cliOptions");
const { ConfigLoader } = require("../infrastructure/ConfigLoader");
const { getTranslator } = require("../infrastructure/i18n");

class CliController {
  constructor({ defaultApiUrl, prompt, presenter, apiClient, storage, useCase }) {
    this.defaultApiUrl = defaultApiUrl;
    this.prompt = prompt;
    this.presenter = presenter;
    this.apiClient = apiClient;
    this.storage = storage;
    this.useCase = useCase;
  }

  async start() {
    const cliOptions = buildOptions(this.defaultApiUrl);
    const lang = cliOptions.lang || "pt-br";
    const i18n = getTranslator(lang);
    
    // Update presenter with i18n
    this.presenter.i18n = i18n;
    
    let config = {};
    try {
      config = new ConfigLoader().load(cliOptions.config);
    } catch (error) {
      this.presenter.error(`${i18n.t("configError")} ${error.message}`);
      return;
    }

    const apiUrl = cliOptions.apiUrl || config.apiUrl || process.env.PRODUCT_DISCOVERY_API_URL || this.defaultApiUrl;
    const saveDefaults = {
      autoSave: typeof cliOptions.save === "boolean" ? cliOptions.save : config.autoSave,
      directory: cliOptions.output || config.defaultOutputDir,
      filename: cliOptions.file || config.defaultFileName,
      defaultDir: cliOptions.output || config.defaultOutputDir,
      defaultFileName: cliOptions.file || config.defaultFileName,
      prompt: this.prompt
    };

    await this.useCase.execute({ apiUrl, lang, saveDefaults, i18n });
  }
}

module.exports = { CliController };
