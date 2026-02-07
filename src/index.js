#!/usr/bin/env node

const { CliController } = require("./presentation/CliController");
const { PromptService } = require("./infrastructure/PromptService");
const { ConsolePresenter } = require("./infrastructure/ConsolePresenter");
const { ProductDiscoveryApi } = require("./infrastructure/ProductDiscoveryApi");
const { JsonFileStorage } = require("./infrastructure/JsonFileStorage");
const { RunDiscoveryFlow } = require("./application/RunDiscoveryFlow");

const DEFAULT_API_URL = process.env.API_URL || "http://localhost:3000/api/v1/discovery";

const prompt = new PromptService();
const presenter = new ConsolePresenter(null);
const apiClient = new ProductDiscoveryApi();
const storage = new JsonFileStorage();
const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });

const controller = new CliController({
  defaultApiUrl: DEFAULT_API_URL,
  prompt,
  presenter,
  apiClient,
  storage,
  useCase
});

controller.start().catch((error) => {
  presenter.error(`Unexpected error: ${error.message}`);
});
