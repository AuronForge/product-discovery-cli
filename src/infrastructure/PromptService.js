const inquirer = require("inquirer");

class PromptService {
  async askYesNo(message) {
    const { answer } = await inquirer.prompt([
      {
        type: "confirm",
        name: "answer",
        message,
        default: false
      }
    ]);
    return answer;
  }

  async askInput(message, { required = false, requiredMessage = "This field is required." } = {}) {
    const { answer } = await inquirer.prompt([
      {
        type: "input",
        name: "answer",
        message,
        validate: required
          ? (value) => (value && value.trim() ? true : requiredMessage)
          : () => true
      }
    ]);
    return answer.trim();
  }
}

module.exports = { PromptService };
