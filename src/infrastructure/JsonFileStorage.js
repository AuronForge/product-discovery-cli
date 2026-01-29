const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { sanitizeForFolderName, timestampForPath, ensureJsonExtension } = require("../domain/PathNaming");

class JsonFileStorage {
  resolveDesktopPath() {
    const home = os.homedir();
    const desktop = path.join(home, "Desktop");
    if (fs.existsSync(desktop)) return desktop;
    return home;
  }

  resolveSaveTarget({ result, directoryInput, filenameInput, defaultDir, defaultFileName }) {
    const productName = sanitizeForFolderName(result?.name || "product");
    const defaultFolderName = `product-${productName}-${timestampForPath()}`;

    let targetDir = "";
    let targetFilename = "";

    if (!directoryInput && !filenameInput) {
      const baseDir = defaultDir || this.resolveDesktopPath();
      targetDir = path.join(baseDir, defaultFolderName);
      targetFilename = defaultFileName || "discovery.json";
    } else if (directoryInput && !filenameInput) {
      targetDir = path.join(directoryInput, defaultFolderName);
      targetFilename = defaultFileName || "discovery.json";
    } else if (!directoryInput && filenameInput) {
      targetDir = defaultDir || this.resolveDesktopPath();
      targetFilename = filenameInput;
    } else {
      targetDir = directoryInput;
      targetFilename = filenameInput;
    }

    targetFilename = ensureJsonExtension(targetFilename);
    return { targetDir, targetFilename };
  }

  async saveJson(result, options) {
    const wantsSave = options.autoSave ?? (await options.prompt.askYesNo("Do you want to save the JSON file?"));
    if (!wantsSave) return { saved: false };

    const directoryInput = options.directory ?? (await options.prompt.askInput("Directory (optional, press Enter to skip):"));
    const filenameInput = options.filename ?? (await options.prompt.askInput("Filename (optional, press Enter to skip):"));

    const { targetDir, targetFilename } = this.resolveSaveTarget({
      result,
      directoryInput,
      filenameInput,
      defaultDir: options.defaultDir,
      defaultFileName: options.defaultFileName
    });

    fs.mkdirSync(targetDir, { recursive: true });
    const fullPath = path.join(targetDir, targetFilename);

    fs.writeFileSync(fullPath, JSON.stringify(result, null, 2), "utf-8");
    return { saved: true, fullPath };
  }
}

module.exports = { JsonFileStorage };
