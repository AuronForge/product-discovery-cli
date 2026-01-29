const fs = require("node:fs");
const path = require("node:path");

class ConfigLoader {
  load(configPath) {
    if (!configPath) return {};
    const absolutePath = path.isAbsolute(configPath)
      ? configPath
      : path.join(process.cwd(), configPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Config file not found: ${absolutePath}`);
    }

    const raw = fs.readFileSync(absolutePath, "utf-8");
    try {
      return JSON.parse(raw);
    } catch (error) {
      throw new Error(`Invalid JSON in config file: ${error.message}`);
    }
  }
}

module.exports = { ConfigLoader };
