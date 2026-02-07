module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.spec.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html", "lcov"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
