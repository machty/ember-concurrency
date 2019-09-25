'use strict';

const Reporter = require('./lib/reporter');
const DependencyChecker = require('./lib/dependency-checker');

module.exports = {
  name: 'ember-cli-dependency-checker',
  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    const reporter = new Reporter();
    const dependencyChecker = new DependencyChecker(this.project, reporter);
    dependencyChecker.checkDependencies();
  }
};
