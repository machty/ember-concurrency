/* eslint-disable no-console */
'use strict';

const chalk = require('chalk');
const co = require('co');
const fs = require('fs');
const inquirer = require('inquirer');
const p = require('util.promisify');
const path = require('path');
const strip = require('../utils').strip;

module.exports = {
  description: 'Wrap the top-level application template (application.hbs) with a \`<div class="ember-view">\` element.',
  url: 'https://github.com/emberjs/rfcs/pull/280',
  default: true,
  since: '3.1.0',
  callback: co.wrap(function *(project, value) {
    if (value !== false) {
      return;
    }

    let root = project.root;
    let prefix = project.config().podModulePrefix;
    let isPod = !!prefix;

    let templatePath, originalContent;

    if (isPod) {
      // TODO
      console.log(chalk.yellow(`${chalk.bold('Note:')} There is an automated refactor script available for this feature, but it does not currently support "pod" apps. PRs welcome!\n`));
      return;
    } else {
      templatePath = 'app/templates/application.hbs';
    }

    let absolutePath = path.join(root, templatePath);

    try {
      originalContent = yield p(fs.readFile)(absolutePath, { encoding: 'UTF-8' });
    } catch(err) {
      if (err.code === 'ENOENT') {
        return;
      } else {
        throw err;
      }
    }

    console.log(strip`
      Disabling ${chalk.bold('application-template-wrapper')}...

      This will remove the \`<div class="ember-view">\` wrapper for the top-level application template (\`${templatePath}\`).

      While this may be a desirable change, it might break your styling in subtle ways:

        - Perhaps you were targeting the \`.ember-view\` class in your CSS.

        - Perhaps you were targeting the \`<div>\` element in your CSS (e.g. \`body > div > .some-child\`).

        - Depending on your choice of \`rootElement\`, your app might not be wrapped inside a block-level element anymore.

      For more information, see ${chalk.underline('https://github.com/emberjs/rfcs/pull/280')}.

      To be very conservative, I could add the \`<div class="ember-view">\` wrapper to your application.hbs. (You can always remove it later.)
    `);

    let response = yield inquirer.prompt({
      type: 'confirm',
      name: 'shouldRewrite',
      message: 'Would you like me to do that for you?',
      default: false
    });

    console.log();

    if (response.shouldRewrite) {
      let lines = originalContent.split('\n');
      let hasFinalNewLine;

      let lastLine = lines.pop();

      if (lastLine === '') {
        hasFinalNewLine = true;
      } else {
        // put it back
        lines.push(lastLine);
        hasFinalNewLine = false;
      }

      let content = [];

      content.push('<div class="ember-view">');

      lines.forEach(line => {
        content.push(line === '' ? '' : `  ${line}`);
      });

      content.push('</div>');

      if (hasFinalNewLine) {
        content.push('');
      }

      console.log(`  ${chalk.yellow('overwrite')} ${templatePath}`);

      yield p(fs.writeFile)(templatePath, content.join('\n'), { encoding: 'UTF-8' });

      console.log();
    }
  })
};
