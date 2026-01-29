const {
  sanitizeForFolderName,
  timestampForPath,
  ensureJsonExtension
} = require("../src/domain/PathNaming");

describe("PathNaming", () => {
  test("sanitizeForFolderName normalizes input", () => {
    expect(sanitizeForFolderName("My Product!! 2024")).toBe("my-product-2024");
  });

  test("sanitizeForFolderName falls back to product", () => {
    expect(sanitizeForFolderName("###")).toBe("product");
  });

  test("timestampForPath returns a safe string", () => {
    const value = timestampForPath();
    expect(value).toMatch(/\d{4}-\d{2}-\d{2}T/);
    expect(value).not.toMatch(/[:.]/);
  });

  test("ensureJsonExtension appends extension", () => {
    expect(ensureJsonExtension("discovery")).toBe("discovery.json");
    expect(ensureJsonExtension("report.JSON")).toBe("report.JSON");
  });
});
