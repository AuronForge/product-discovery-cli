class ProductDiscoveryApi {
  async runDiscovery(problemText, apiUrl) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem: problemText })
    });

    const text = await response.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }

    if (!response.ok) {
      const message = payload?.message || response.statusText || "Unknown error";
      throw new Error(`API error (${response.status}): ${message}`);
    }

    return payload;
  }
}

module.exports = { ProductDiscoveryApi };
