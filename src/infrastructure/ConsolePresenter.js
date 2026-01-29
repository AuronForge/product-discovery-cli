const { stdout: output } = require("node:process");
const chalk = require("chalk");
const boxen = require("boxen");
const ora = require("ora");
const pkg = require("../../package.json");

class ConsolePresenter {
  constructor(i18n = null) {
    this.i18n = i18n;
  }

  printHeader() {
    if (!this.i18n) return;
    const logo = chalk.cyan(
      String.raw`
 ____                _            _     ____  _                               
|  _ \ _ __ ___   __| |_   _  ___| |_  |  _ \(_)___  ___ _____   _____ _ __ 
| |_) | '__/ _ \ / _ | | | |/ __| __| | | | | / __|/ __/ _ \ \ / / _ \ '__|
|  __/| | | (_) | (_| | |_| | (__| |_  | |_| | \__ \ (_| (_) \ V /  __/ |   
|_|   |_|  \___/ \__,_|\__,_|\___|\__| |____/|_|___/\___\___/ \_/ \___|_|   
`
    );
    const title = chalk.bold.cyan(this.i18n.t("headerTitle"));
    const subtitle = chalk.gray(this.i18n.t("headerSubtitle"));
    const author = chalk.gray(`${this.i18n.t("headerAuthor")}: ${pkg.author}`);
    const version = chalk.gray(`${this.i18n.t("headerVersion")}: ${pkg.version}`);
    const license = chalk.gray(`${this.i18n.t("headerLicense")}: ${pkg.license}`);
    const banner = `${logo}\n${title}\n${subtitle}\n\n${author}\n${version}\n${license}`;
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
    output.write(`${chalk.red(this.i18n.t("error"))} ${message}\n\n`);
  }

  json(payload) {
    output.write(`\n${chalk.bold(this.i18n.t("generatedDiscovery"))}\n\n`);
    output.write(`${chalk.gray(JSON.stringify(payload, null, 2))}\n\n`);
  }

  spinner(text) {
    return ora(text).start();
  }

  goodbye() {
    if (!this.i18n) return;
    output.write("\n");
    output.write(
      boxen(
        `${chalk.bold.cyan(this.i18n.t("thankYou"))}\n${chalk.gray(this.i18n.t("closeConsole"))}`,
        {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "cyan"
        }
      )
    );
    output.write("\n");
  }
}
