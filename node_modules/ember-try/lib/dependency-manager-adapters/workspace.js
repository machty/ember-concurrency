'use strict';

const CoreObject = require('core-object');
const fs = require('fs-extra');
const RSVP = require('rsvp');
const path = require('path');
const extend = require('extend');
const debug = require('debug')('ember-try:dependency-manager-adapter:workspaces');
const walkSync = require('walk-sync');

const NpmAdapter = require('./npm');

module.exports = CoreObject.extend({
  init() {
    this._super.apply(this, arguments);
    this.run = this.run || require('../utils/run');

    if (!this.useYarnCommand) {
      throw new Error('workspaces are currently only supported by Yarn, you must set `useYarn` to true');
    }
  },

  packageJSON: 'package.json',

  setup(options) {
    if (!options) {
      options = {};
    }

    let packageJSON = JSON.parse(fs.readFileSync(this.packageJSON));
    let workspaceGlobs = packageJSON.workspaces;

    if (!workspaceGlobs || !workspaceGlobs.length) {
      throw new Error('you must define the `workspaces` property in package.json with at least one workspace to use workspaces with ember-try');
    }

    // workspaces is a list of globs, loop over the list and find
    // all paths that contain a `package.json` file
    let workspacePaths = walkSync('.', { globs: workspaceGlobs }).filter(workspacePath => {
      let packageJSONPath = path.join(this.cwd, workspacePath, 'package.json');
      return fs.existsSync(packageJSONPath);
    });

    this._packageAdapters = workspacePaths.map(workspacePath => {
      return new NpmAdapter({
        cwd: workspacePath,
        run: this.run,
        managerOptions: this.managerOptions,
        useYarnCommand: true,
      });
    });

    return RSVP.all(this._packageAdapters.map(adapter => adapter.setup(options)));
  },

  changeToDependencySet(depSet) {
    this._packageAdapters.forEach(adapter => {
      adapter.applyDependencySet(depSet);
    });

    return this._install().then(() => {
      let deps = extend({}, depSet.dependencies || {}, depSet.devDependencies || {});
      let currentDeps = Object.keys(deps).map((dep) => {
        return {
          name: dep,
          versionExpected: deps[dep],
          versionSeen: this._findCurrentVersionOf(dep),
          packageManager: 'yarn',
        };
      });

      debug('Switched to dependencies: \n', currentDeps);

      return RSVP.Promise.resolve(currentDeps);
    });
  },

  cleanup() {
    return RSVP.all(this._packageAdapters.map(adapter => adapter.cleanup()));
  },

  _install() {
    let mgrOptions = this.managerOptions || [];

    debug('Run yarn install with options %s', mgrOptions);

    if (mgrOptions.indexOf('--no-lockfile') === -1) {
      mgrOptions = mgrOptions.concat(['--no-lockfile']);
    }
    // npm warns on incompatible engines
    // yarn errors, not a good experience
    if (mgrOptions.indexOf('--ignore-engines') === -1) {
      mgrOptions = mgrOptions.concat(['--ignore-engines']);
    }

    return this.run('yarn', [].concat(['install'], mgrOptions), { cwd: this.cwd });
  },

  _findCurrentVersionOf(dep) {
    return this._packageAdapters[0]._findCurrentVersionOf(dep);
  },
});
