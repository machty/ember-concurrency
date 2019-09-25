'use strict';

function installCommand(type) {
  switch (type) {
  case 'npm':
    return 'npm install';
  case 'yarn':
    return 'yarn';
  case 'npm-shrinkwrap':
    return 'rm -rf node_modules/ && npm install';
  case 'bower':
    return 'bower install';
  }
}

class Reporter {
  constructor() {
    this.messages = [];
  }

  unsatisfiedPackages(type, packages) {
    this.chalk = this.chalk || require('chalk');
    this.EOL   = this.EOL || require('os').EOL;

    const chalk = this.chalk;
    const EOL   = this.EOL;

    if (packages.length > 0) {
      let message = '';
      message += EOL + chalk.red('Missing ' + type + ' packages: ') + EOL;

      packages.forEach(function(pkg) {
        message += chalk.reset('Package: ') + chalk.cyan(pkg.name) + EOL;
        if (pkg.parents) {
          message += chalk.reset('Required by: ') + chalk.cyan(pkg.parents.join(' / ')) + EOL;
        }
        message += chalk.grey('  * Specified: ') + chalk.reset(pkg.versionSpecified) + EOL;
        message += chalk.grey('  * Installed: ') + chalk.reset(pkg.versionInstalled || '(not installed)') + EOL + EOL;
      });

      message += chalk.red('Run `'+ installCommand(type) +'` to install missing dependencies.') + EOL;
      this.messages.push(message);
    }
  }

  reportUnsatisfiedSymlinkedPackages(type, packages) {
    this.chalk = this.chalk || require('chalk');
    this.EOL   = this.EOL || require('os').EOL;

    const chalk = this.chalk;
    const EOL   = this.EOL;

    if (packages.length > 0) {
      let message = '';
      message += EOL + chalk.yellow('Missing symlinked ' + type + ' packages: ') + EOL;
      packages.forEach(function(pkg) {
        message += chalk.reset('Package: ') + chalk.cyan(pkg.name) + EOL;
        message += chalk.grey('  * Specified: ') + chalk.reset(pkg.versionSpecified) + EOL;
        message += chalk.grey('  * Symlinked: ') + chalk.reset(pkg.versionInstalled || '(not available)') + EOL + EOL;
      });
      process.stdout.write(message);
    }
  }

  report() {
    if (this.messages.length) {
      const DependencyError = require('./dependency-error');
      throw new DependencyError(this.messages.join(''));
    }
  }
}

module.exports = Reporter;
