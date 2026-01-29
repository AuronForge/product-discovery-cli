const { RunDiscoveryFlow } = require("../src/application/RunDiscoveryFlow");

const mockI18n = {
  t: jest.fn((key) => key)
};

describe("RunDiscoveryFlow", () => {
  test("runs discovery, saves, and stops", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest.fn().mockResolvedValue(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest.fn().mockResolvedValue({ name: "Test Product" })
    };
    const storage = {
      saveJson: jest.fn().mockResolvedValue({ saved: true, fullPath: "/tmp/file.json" })
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: true },
      i18n: mockI18n
    });

    expect(presenter.printHeader).toHaveBeenCalled();
    expect(prompt.askInput).toHaveBeenCalled();
    expect(apiClient.runDiscovery).toHaveBeenCalledWith("My idea", "http://localhost/api", "pt-br");
    expect(storage.saveJson).toHaveBeenCalled();
    expect(presenter.goodbye).toHaveBeenCalled();
  });

  test("asks to improve when not saving and exits on no", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest.fn().mockResolvedValueOnce(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest.fn().mockResolvedValue({ name: "Test Product" })
    };
    const storage = {
      saveJson: jest.fn()
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: false },
      i18n: mockI18n
    });

    expect(prompt.askYesNo).toHaveBeenCalledWith("askImprove");
    expect(storage.saveJson).not.toHaveBeenCalled();
    expect(presenter.goodbye).toHaveBeenCalled();
  });

  test("retries when discovery fails and user chooses to retry", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest
        .fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest
        .fn()
        .mockRejectedValueOnce(new Error("API down"))
        .mockResolvedValueOnce({ name: "Recovered" })
    };
    const storage = {
      saveJson: jest.fn().mockResolvedValue({ saved: true, fullPath: "/tmp/file.json" })
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: true },
      i18n: mockI18n
    });

    expect(apiClient.runDiscovery).toHaveBeenCalledTimes(2);
    expect(presenter.error).toHaveBeenCalledWith("API down");
    expect(presenter.goodbye).toHaveBeenCalled();
  });

  test("prompts to improve after save declined", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest
        .fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest.fn().mockResolvedValue({ name: "Test Product" })
    };
    const storage = {
      saveJson: jest.fn().mockResolvedValue({ saved: false })
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: true },
      i18n: mockI18n
    });

    expect(storage.saveJson).toHaveBeenCalled();
    expect(prompt.askYesNo).toHaveBeenCalledWith("askImprove");
    expect(presenter.goodbye).toHaveBeenCalled();
  });

  test("stops when discovery fails and user declines retry", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest.fn().mockResolvedValue(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest.fn().mockRejectedValue(new Error("API down"))
    };
    const storage = {
      saveJson: jest.fn()
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: true },
      i18n: mockI18n
    });

    expect(prompt.askYesNo).toHaveBeenCalledWith("askRetry");
    expect(storage.saveJson).not.toHaveBeenCalled();
    expect(presenter.goodbye).toHaveBeenCalled();
  });

  test("continues when autoSave false and user wants to improve", async () => {
    const prompt = {
      askInput: jest.fn().mockResolvedValue("My idea"),
      askYesNo: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false)
    };
    const presenter = {
      printHeader: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      json: jest.fn(),
      success: jest.fn(),
      goodbye: jest.fn(),
      spinner: jest.fn().mockReturnValue({ succeed: jest.fn(), fail: jest.fn() })
    };
    const apiClient = {
      runDiscovery: jest.fn().mockResolvedValue({ name: "Test Product" })
    };
    const storage = {
      saveJson: jest.fn()
    };

    const useCase = new RunDiscoveryFlow({ prompt, apiClient, storage, presenter });
    await useCase.execute({
      apiUrl: "http://localhost/api",
      lang: "pt-br",
      saveDefaults: { autoSave: false },
      i18n: mockI18n
    });

    expect(apiClient.runDiscovery).toHaveBeenCalledTimes(2);
    expect(prompt.askYesNo).toHaveBeenCalledWith("askImprove");
    expect(presenter.goodbye).toHaveBeenCalled();
  });
});
