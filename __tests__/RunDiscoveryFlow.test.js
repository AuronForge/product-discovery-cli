const { RunDiscoveryFlow } = require("../src/application/RunDiscoveryFlow");

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
      saveDefaults: { autoSave: true }
    });

    expect(presenter.printHeader).toHaveBeenCalled();
    expect(prompt.askInput).toHaveBeenCalled();
    expect(apiClient.runDiscovery).toHaveBeenCalledWith("My idea", "http://localhost/api");
    expect(storage.saveJson).toHaveBeenCalled();
    expect(prompt.askYesNo).toHaveBeenCalledWith("Do you want to run discovery for another idea?");
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
      saveDefaults: { autoSave: false }
    });

    expect(prompt.askYesNo).toHaveBeenCalledWith("Do you want to improve the result?");
    expect(storage.saveJson).not.toHaveBeenCalled();
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
      saveDefaults: { autoSave: true }
    });

    expect(apiClient.runDiscovery).toHaveBeenCalledTimes(2);
    expect(presenter.error).toHaveBeenCalledWith("API down");
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
      saveDefaults: { autoSave: true }
    });

    expect(storage.saveJson).toHaveBeenCalled();
    expect(prompt.askYesNo).toHaveBeenCalledWith("Do you want to improve the result?");
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
      saveDefaults: { autoSave: true }
    });

    expect(prompt.askYesNo).toHaveBeenCalledWith("Do you want to try again?");
    expect(storage.saveJson).not.toHaveBeenCalled();
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
      saveDefaults: { autoSave: false }
    });

    expect(apiClient.runDiscovery).toHaveBeenCalledTimes(2);
    expect(prompt.askYesNo).toHaveBeenCalledWith("Do you want to improve the result?");
  });
});
