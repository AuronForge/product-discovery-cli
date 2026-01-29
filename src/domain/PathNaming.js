function sanitizeForFolderName(value) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "product"
  );
}

function timestampForPath() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureJsonExtension(filename) {
  if (!filename.toLowerCase().endsWith(".json")) {
    return `${filename}.json`;
  }
  return filename;
}

module.exports = { sanitizeForFolderName, timestampForPath, ensureJsonExtension };
