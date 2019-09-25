/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');
var path = require('path');
var git = require('./lib/git');

module.exports = {
  name: 'ember-cli-deploy-git',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      configure: function(context) {
        var pluginConfig = context.config[this.name] || {};
        return getMyRepo(context).then(function(myRepo) {
          var worktreePath = pluginConfig.worktreePath || defaultWorktree(context);
          return {
            gitDeploy: {
              myRepo: myRepo,
              worktreePath: worktreePath,
              destDir: path.resolve(worktreePath, pluginConfig.destDir || ''),
              repo: pluginConfig.repo || myRepo,
              branch: pluginConfig.branch || 'gh-pages',
              commitMessage: pluginConfig.commitMessage || 'Deployed %@'
            }
          };
        }).catch(showStderr(context.ui));
      },
      prepare: function(context) {
        var d = context.gitDeploy;
        this.log("preparing git in " + d.worktreePath, { verbose: true });
        return git.prepareTree(d.worktreePath, d.myRepo, d.repo, d.branch);
      },
      upload: function(context) {
        var d = context.gitDeploy;
        var distDir = context.distDir || path.join(context.project.root, 'dist');
        return git.replaceTree(d.destDir, distDir, d.commitMessage)
          .then(function(didCommit) {
            if (didCommit) {
              return git.push(d.worktreePath, d.repo, d.branch);
            } else {
              console.log("Nothing to deploy");
            }
          }).catch(showStderr(context.ui));
      }
    });
    return new DeployPlugin();
  }


};

function showStderr(ui) {
  return function(err) {
    if (err.stderr) {
      ui.write(err.stderr);
    }
    throw err;
  };
}

function getMyRepo(context) {
  return git.origin(context.project.root);
}

function defaultWorktree(context) {
  return path.join(context.project.root, '../deploy-' + context.project.name());
}
