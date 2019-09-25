/* eslint-disable no-console */
'use strict';

const chalk = require('chalk');
const co = require('co');
const fs = require('fs');
const inquirer = require('inquirer');
const glob = require('glob');
const mkdirp = require('mkdirp');
const p = require('util.promisify');
const path = require('path');
const strip = require('../utils').strip;

const ComponentFile = strip`
  import Component from '@ember/component';

  export default Component.extend({
  });
`;

/* This forces strip`` to start counting the indentaiton */
const INDENT_START = '';

module.exports = {
  description: 'Use Glimmer Components semantics for template-only components (component templates with no corresponding .js file).',
  url: 'https://github.com/emberjs/rfcs/pull/278',
  default: false,
  since: '3.1.0',
  callback: co.wrap(function *(project, value) {
    if (value !== true) {
      return;
    }

    let root = project.root;
    let prefix = project.config().podModulePrefix;
    let isPod = !!prefix;

    let templates = [];
    let components = [];

    if (isPod) {
      // TODO
      console.log(chalk.yellow(`${chalk.bold('Note:')} There is an automated refactor script available for this feature, but it does not currently support "pod" apps. PRs welcome!\n`));
      return;
    } else {
      let templatesRoot = path.join(root, 'app/templates/components');
      let templateCandidates = yield p(glob)('**/*.hbs', { cwd: templatesRoot });

      let componentsRoot = path.join(root, 'app/components');
      let componentCandidates = yield p(glob)('**/*.@(j|t)s', { cwd: componentsRoot });

      templateCandidates.forEach(templatePath => {
        let jsPath = templatePath.replace(/\.hbs$/, '.js');
        let tsPath = templatePath.replace(/\.hbs$/, '.ts');

        let foundJs = componentCandidates.indexOf(jsPath) >= 0;
        let foundTs = componentCandidates.indexOf(tsPath) >= 0;
        if (!foundJs && !foundTs) {
          templates.push(path.join('app/templates/components', templatePath));
          components.push(path.join('app/components', jsPath)); // Always offer to create JS
        }
      });
    }

    if (templates.length === 0) {
      return;
    }

    console.log(strip`
      Enabling ${chalk.bold('template-only-glimmer-components')}...

      This will change the semantics for template-only components (components without a \`.js\` file).

      Some notable differences include...

        - They will not have a component instance, so statements like \`{{this}}\`, \`{{this.foo}}\` and \`{{foo}}\` will be \`null\` or \`undefined\`.

        - They will not have a wrapper element: what you have in the template will be what is rendered on the screen.

        - Passing classes in the invocation (i.e. \`{{my-component class="..."}}\`) will not work, since there is no wrapper element to apply the classes to.

      For more information, see ${chalk.underline('https://github.com/emberjs/rfcs/pull/278')}.

      While these changes may be desirable for ${chalk.italic('new components')}, they may unexpectedly break the styling or runtime behavior of your ${chalk.italic('existing components')}.

      To be conservative, it is recommended that you add a \`.js\` file for existing template-only components. (You can always delete them later if you aren't relying on the differences.)

      The following components are affected:`);

    for (let i=0; i<templates.length; i++) {
      console.log(strip`
        ${INDENT_START}
          - ${chalk.underline(templates[i])}
            ${chalk.gray(`(Recommendation: add ${chalk.cyan.underline(components[i])})`)}
      `);
    }

    let response = yield inquirer.prompt({
      type: 'confirm',
      name: 'shouldGenerate',
      message: 'Would you like me to generate these component files for you?',
      default: true
    });

    console.log();

    if (response.shouldGenerate) {
      for (let i=0; i<components.length; i++) {
        let componentPath = components[i];
        console.log(`  ${chalk.green('create')} ${componentPath}`);
        let absolutePath = path.join(project.root, componentPath);
        yield p(mkdirp)(path.dirname(absolutePath));
        yield p(fs.writeFile)(absolutePath, ComponentFile, { encoding: 'UTF-8' });
      }

      console.log();
    }
  })
};
