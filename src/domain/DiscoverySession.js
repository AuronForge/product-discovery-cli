class DiscoverySession {
  constructor() {
    this.baseIdea = "";
  }

  addIdea(text) {
    if (!this.baseIdea) {
      this.baseIdea = text;
      return this.baseIdea;
    }
    return `${this.baseIdea}\n\nAdditional details: ${text}`;
  }
}

module.exports = { DiscoverySession };
