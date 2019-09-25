'use strict';

const CoreObject = require('core-object');
const chalk = require('chalk');
const Table = require('cli-table3');

module.exports = CoreObject.extend({
  print() {
    let task = this;
    let colorAndMessage;
    let failMessage;
    let countPassed = 0;
    let countFailed = 0;
    let allowedFailCount = 0;
    task._printResultHeader();

    this.results.forEach((scenario) => {
      if (scenario.result) {
        colorAndMessage = chalk.green(`Scenario ${scenario.scenario}: SUCCESS`);
        countPassed++;
      } else {
        failMessage = `Scenario ${scenario.scenario}: FAIL`;

        if (scenario.allowedToFail) {
          failMessage = `${failMessage} (Allowed)`;
          allowedFailCount++;
        }

        colorAndMessage = chalk.red(failMessage);
        countFailed++;
      }
      task.ui.writeLine(colorAndMessage);
      task.ui.writeLine(`Command run: ${scenario.command}`);
      if (scenario.envState) {
        task.ui.writeLine(`with env: ${JSON.stringify(scenario.envState, null, 2)}`);
      }
      task._printDependencyTable(scenario.dependencyState);
    });

    task.ui.writeLine('');
    task._printResultsSummary(countFailed, countPassed, allowedFailCount, this.results.length);
  },
  _printResultHeader() {
    let task = this;
    task.ui.writeLine('');
    task.ui.writeLine('------ RESULTS ------');
    task.ui.writeLine('');
  },
  _printDependencyTable(dependencyStatus) {
    if (!dependencyStatus.length) { return; }
    let task = this;
    let colorForDepFn;
    let tableRow;
    let table = new Table({
      head: [chalk.gray('Dependency'), chalk.gray('Expected'), chalk.gray('Used'), chalk.gray('Type')],
      colWidths: [20, 20, 30, 10],
    });
    dependencyStatus.forEach((dep) => {
      if (dep.versionExpected === dep.versionSeen) {
        colorForDepFn = chalk.green;
      } else {
        colorForDepFn = chalk.yellow;
      }
      tableRow = [dep.name, dep.versionExpected || 'Not Installed', dep.versionSeen || 'Not Installed', dep.packageManager].map((column) => {
        return colorForDepFn(column);
      });
      table.push(tableRow);
    });
    task.ui.writeLine(table);
    task.ui.writeLine('');
  },
  _printResultsSummary(countFailed, countPassed, allowedFailCount, total) {
    let task = this;
    if (countFailed) {
      let failMessage = `${countFailed} scenarios failed`;
      if (allowedFailCount) {
        failMessage = `${failMessage} (${allowedFailCount} allowed)`;
      }
      task.ui.writeLine(chalk.red(failMessage));
      task.ui.writeLine(chalk.green(`${countPassed} scenarios succeeded`));
      task.ui.writeLine(chalk.gray(`${total} scenarios run`));
    } else {
      task.ui.writeLine(chalk.green(`All ${countPassed} scenarios succeeded`));
    }
  },
});
