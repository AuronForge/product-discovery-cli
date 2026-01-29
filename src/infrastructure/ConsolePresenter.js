const { stdout: output } = require("node:process");
const chalk = require("chalk");
const boxen = require("boxen");
const ora = require("ora");

class ConsolePresenter {
  printHeader() {
    const logo = chalk.cyan(
      String.raw`
 ____                _            _     ____  _                               
|  _ \ _ __ ___   __| |_   _  ___| |_  |  _ \(_)___  ___ _____   _____ _ __ 
| |_) | '__/ _ \ / _ | | | |/ __| __| | | | | / __|/ __/ _ \ \ / / _ \ '__|
|  __/| | | (_) | (_| | |_| | (__| |_  | |_| | \__ \ (_| (_) \ V /  __/ |   
|_|   |_|  \___/ \__,_|\__,_|\___|\__| |____/|_|___/\___\___/ \_/ \___|_|   
`
    );
    const title = chalk.bold.cyan("Product Discovery CLI");
    const subtitle = chalk.gray("Generate a structured product discovery via the Product Discovery Agent API.");
    const banner = `${logo}\n${title}\n${subtitle}`;
    output.write(
      boxen(banner, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "cyan"
      })
    );
    output.write("\n");
  }

  info(message) {
    output.write(`${chalk.bold(message)}\n`);
  }

  success(message) {
    output.write(`${chalk.green(message)}\n\n`);
  }

  error(message) {
    output.write(`${chalk.red("Error:")} ${message}\n\n`);
  }

  json(payload) {
    output.write(`\n${chalk.bold("Generated discovery JSON:")}\n\n`);
    output.write(`${chalk.gray(JSON.stringify(payload, null, 2))}\n\n`);
  }

  spinner(text) {
    return ora(text).start();
  }
}

module.exports = { ConsolePresenter };
