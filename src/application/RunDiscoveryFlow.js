const { DiscoverySession } = require("../domain/DiscoverySession");

class RunDiscoveryFlow {
  constructor({ prompt, apiClient, storage, presenter }) {
    this.prompt = prompt;
    this.apiClient = apiClient;
    this.storage = storage;
    this.presenter = presenter;
  }

  async execute({ apiUrl, saveDefaults }) {
    this.presenter.printHeader();

    let continueOuter = true;

    while (continueOuter) {
      const session = new DiscoverySession();
      let shouldImprove = true;

      while (shouldImprove) {
        this.presenter.info("What do you want to run discovery for?");
        const idea = await this.prompt.askInput("Describe your idea/problem/application/pain:", {
          required: true
        });

        const attemptText = session.addIdea(idea);

        const spinner = this.presenter.spinner("Calling the discovery API...");
        let result;
        try {
          result = await this.apiClient.runDiscovery(attemptText, apiUrl);
          spinner.succeed("Discovery completed.");
        } catch (error) {
          spinner.fail("Discovery failed.");
          this.presenter.error(error.message);
          const retry = await this.prompt.askYesNo("Do you want to try again?");
          if (!retry) {
            return;
          }
          continue;
        }

        this.presenter.json(result);

        if (saveDefaults.autoSave === false) {
          const improve = await this.prompt.askYesNo("Do you want to improve the result?");
          if (!improve) {
            shouldImprove = false;
            continueOuter = false;
            break;
          }
          continue;
        }

        const saveInfo = await this.storage.saveJson(result, saveDefaults);
        if (saveInfo.saved) {
          this.presenter.success(`Saved to: ${saveInfo.fullPath}`);
          shouldImprove = false;
          continue;
        }

        const improve = await this.prompt.askYesNo("Do you want to improve the result?");
        if (!improve) {
          shouldImprove = false;
          continueOuter = false;
          break;
        }
      }

      if (!continueOuter) {
        break;
      }

      const another = await this.prompt.askYesNo("Do you want to run discovery for another idea?");
      if (!another) {
        continueOuter = false;
      }
    }
  }
}

module.exports = { RunDiscoveryFlow };
