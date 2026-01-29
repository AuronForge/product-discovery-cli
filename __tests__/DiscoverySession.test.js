const { DiscoverySession } = require("../src/domain/DiscoverySession");

describe("DiscoverySession", () => {
  test("appends additional details after base idea", () => {
    const session = new DiscoverySession();
    const first = session.addIdea("Base idea");
    const second = session.addIdea("More details");

    expect(first).toBe("Base idea");
    expect(second).toBe("Base idea\n\nAdditional details: More details");
  });
});
