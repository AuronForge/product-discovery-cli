const { DiscoverySession } = require("../domain/DiscoverySession");

class RunDiscoveryFlow {
  constructor({ prompt, apiClient, storage, presenter }) {
    this.prompt = prompt;
    this.apiClient = apiClient;
    this.storage = storage;
    this.presenter = presenter;
  }

  async execute({ apiUrl, lang, saveDefaults, i18n }) {
    this.i18n = i18n;
    this.presenter.printHeader();

    let continueOuter = true;

    while (continueOuter) {
      const session = new DiscoverySession();
      let shouldImprove = true;

      while (shouldImprove) {
        this.presenter.info(this.i18n.t("askIdea"));
        const idea = await this.prompt.askInput(this.i18n.t("describeIdea"), {
          required: true,
          requiredMessage: this.i18n.t("required")
        });

        const attemptText = session.addIdea(idea);

        const spinner = this.presenter.spinner(this.i18n.t("callingApi"));
        let result;
        try {
          result = await this.apiClient.runDiscovery(attemptText, apiUrl, lang);
          spinner.succeed(this.i18n.t("discoveryCompleted"));
        } catch (error) {
          spinner.fail(this.i18n.t("discoveryFailed"));
          this.presenter.error(error.message);
          const retry = await this.prompt.askYesNo(this.i18n.t("askRetry"));
          if (!retry) {
            return;
          }
          continue;
        }

        this.presenter.json(result);

        if (saveDefaults.autoSave === false) {
          const improve = await this.prompt.askYesNo(this.i18n.t("askImprove"));
          if (!improve) {
            shouldImprove = false;
            continueOuter = false;
            break;
          }
          continue;
        }

        const saveInfo = await this.storage.saveJson(result, saveDefaults);
        if (saveInfo.saved) {
          this.presenter.success(`${this.i18n.t("savedTo")} ${saveInfo.fullPath}`);
          shouldImprove = false;
          continue;
        }

        const improve = await this.prompt.askYesNo(this.i18n.t("askImprove"));
        if (!improve) {
          shouldImprove = false;
          continueOuter = false;
          break;
        }
      }

      if (!continueOuter) {
        break;
      }

      const another = await this.prompt.askYesNo(this.i18n.t("askAnother"));
      if (!another) {
        continueOuter = false;
      }
    }

    this.presenter.goodbye();
  }
}

module.exports = { RunDiscoveryFlow };
