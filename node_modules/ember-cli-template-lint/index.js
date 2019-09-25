'use strict';

/* eslint-env node */

const VersionChecker = require('ember-cli-version-checker');
const TemplateLinter = require('./broccoli-template-linter');
const PrintFailing = require('./lib/commands/print-failing');

module.exports = {
  name: 'ember-cli-template-lint',

  included: function (app) {
    this._super.included.apply(this, arguments);
    this._options = app.options['ember-cli-template-lint'] || {};

    if (!('testGenerator' in this._options)) {
      let VersionChecker = require('ember-cli-version-checker');
      let checker = new VersionChecker(this.project);

      if (checker.for('ember-cli-qunit', 'npm').exists() || checker.for('ember-qunit', 'npm').exists()) {
        this._options.testGenerator = 'qunit';
      } else if (checker.for('ember-cli-mocha', 'npm').exists() || checker.for('ember-mocha', 'npm').exists()) {
        this._options.testGenerator = 'mocha';
      } else {
        this.ui.writeWarnLine(
          '[ember-cli-template-lint] Test framework detection was unsuccessful. ' +
          'Please provide a "testGenerator" option explicitly to enable the test generators.'
        );
      }
    }
  },

  includedCommands() {
    return {
      'template-lint:print-failing': PrintFailing
    };
  },

  lintTree(type, tree) {
    let checker = new VersionChecker(this);
    checker.for('ember-cli', 'npm').assertAbove('2.4.1');

    if (type === 'templates') {
      let ui = this.ui;
      let mockConsole = {
        log(data) {
          ui.writeLine(data);
        },

        error(data) {
          ui.writeLine(data, 'ERROR');
        }
      };

      return TemplateLinter.create(tree, {
        annotation: 'TemplateLinter',
        templatercPath: this.project.root + '/.template-lintrc',
        testGenerator: this._options.testGenerator,
        groupName: (this._options.group !== false) ? type : undefined,
        console: mockConsole,
        project: this.project
      });
    }
  },

  setupPreprocessorRegistry(type, registry) {
    let RemoveConfigurationHtmlComments = require('./lib/plugins/remove-configuration-html-comments');

    registry.add('htmlbars-ast-plugin', {
      name: 'remove-configuration-html-comments',
      plugin: RemoveConfigurationHtmlComments(),
      baseDir() {
        return __dirname;
      }
    });
  }
};
