/* jshint node:true */

var GitRepo = require('../utils/git');
var NPM = require('../utils/npm');
var tagPrefix = require('../utils/tag-prefix');
var findBy = require('../utils/find-by');
var withArgs = require('../utils/with-args');
var slice = require('../utils/slice');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var merge = require('merge');
var makeArray = require('make-array');
var nopt = require('nopt');
var requireDir = require('require-dir');
var RSVP = require('rsvp');
var SilentError = require('silent-error');

var Promise = RSVP.Promise;
var resolve = RSVP.resolve;
var resolveAll = RSVP.all;
var resolveHash = RSVP.hash;
var denodeify = RSVP.denodeify;
var readFile = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);

var readJSON = function(filePath, options) {
  return readFile(filePath, options).then(function(data) {
    return JSON.parse(data);
  });
};
var writeJSON = function(filePath, object, options) {
  var contents = JSON.stringify(object, null, 2) + '\n';
  return writeFile(filePath, contents, options);
};

var configPath = 'config/release.js';

var availableHooks = [
  'init',
  'beforeCommit',
  'afterPush',
  'afterPublish',
];

var availableOptions = [
  {
    name: 'local',
    type: Boolean,
    aliases: [ 'l' ],
    default: false,
    description: "whether release commit and tags are locally or not (not pushed to a remote)",
    validInConfig: true,
  },
  {
    name: 'remote',
    type: String,
    aliases: [ 'r' ],
    default: 'origin',
    description: "the git origin to push tags to, ignored if the '--local' option is true",
    validInConfig: true,
  },
  {
    name: 'tag',
    type: String,
    aliases: [ 't' ],
    description: "the name of the git tag to create",
  },
  {
    name: 'annotation',
    type: String,
    aliases: [ 'a' ],
    description: "a message passed to the `--message` option of `git tag`, indicating that to the tag should be created with the `--annotated` option (default is lightweight), the string '%@' is replaced with the tag name",
    validInConfig: true,
  },
  {
    name: 'message',
    type: String,
    aliases: [ 'm' ],
    default: 'Released %@',
    description: "a message passed to the `--message` option of `git commit`, the string '%@' is replaced with the tag name",
    validInConfig: true,
  },
  {
    name: 'manifest',
    type: Array,
    default: [ 'package.json', 'bower.json' ],
    description: "a set of JSON files to replace the top-level `version` property in with the new tag name",
    validInConfig: true,
  },
  {
    name: 'publish',
    type: Boolean,
    aliases: [ 'p' ],
    default: false,
    description: "whether to publish package to NPM after tagging or not",
    validInConfig: true,
  },
  {
    name: 'yes',
    type: Boolean,
    aliases: [ 'y' ],
    default: false,
    description: "whether to skip confirmation prompts or not (answer 'yes' to all questions)",
  },
  {
    name: 'strategy',
    type: String,
    aliases: [ 's' ],
    default: 'semver',
    description: "strategy for auto-generating the tag name, either 'semver' or 'date', ignored if the 'name' option is specified",
    validInConfig: true,
  },
];

function hasModifications(status) {
  var modifications = status.split('\n').filter(function(str) {
    return !!str && str.indexOf('??') !== 0;
  });

  return !!modifications.length;
}

module.exports = {
  name: 'release',
  description: 'Create a new git tag at HEAD',
  works: 'insideProject',

  run: function(options) {
    var command = this;
    var ui = this.ui;
    var project = this.project;
    var repo = this.git();
    var strategies = this.strategies();
    var hooks = this.config().hooks;
    var pushQueue = [];

    function proceedPrompt(message) {
      if (options.yes) {
        return resolve();
      }

      return ui.prompt({
        type: 'confirm',
        name: 'proceed',
        message: chalk.yellow(message + ", proceed?"),
        choices: [
          { key: 'y', value: true },
          { key: 'n', value: false }
        ]
      }).then(function(response) {
        if (!response.proceed) {
          throw new SilentError("Aborted.");
        }
      });
    }

    function getTaggingStrategy() {
      var strategyName = options.strategy;

      if (typeof strategyName === 'object') {
        return strategyName;
      }

      if (!(strategyName in strategies)) {
        throw new SilentError("Unknown tagging strategy: '" + strategyName + "'");
      }

      return strategies[strategyName];
    }

    function abortIfAtTag() {
      return repo.currentTag().then(function(currentTag) {
        if (currentTag) {
          throw new SilentError("Skipped tagging, HEAD already at tag: " + currentTag);
        }
      });
    }

    function abortIfCannotPublish() {
      if (!options.publish) { return; }

      if (options.local) {
        throw new SilentError("The --publish and --local options are incompatible.");
      }

      if (options.strategy !== 'semver') {
        throw new SilentError("Publishing to NPM requires SemVer.");
      }

      var npm = command.npm();

      // Second argument prevents the function from printing the username
      return npm.whoami([], true).then(function(username) {
        var registry = npm.config.get('registry');

        ui.writeLine(chalk.green("Using NPM registry " + registry + " as user '" + username + "'"));
      }).catch(function(error) {
        // Fail gracefully if the user is not logged in
        if (error && error.code === 'ENEEDAUTH') {
          throw new SilentError("Must be logged in to perform NPM publish.");
        }

        // Fail hard on an unexpected error
        throw error;
      });
    }

    function promptIfWorkingTreeDirty() {
      return repo.status().then(function(status) {
        if (hasModifications(status)) {
          return proceedPrompt("Your working tree contains modifications that will be added to the release commit");
        }
      });
    }

    function getTags() {
      if (options.tag) {
        // Use tag name if specified
        return {
          next: options.tag
        };
      } else {
        // Otherwise fetch all tags to pass to the tagging strategy
        return repo.tags().then(function(tags) {
          var strategy = getTaggingStrategy();
          var tagNames = tags.map(function(tag) {
            return tag.name;
          });

          return resolveHash({
            latest: strategy.getLatestTag ? strategy.getLatestTag(project, tagNames, options): null,
            next: strategy.getNextTag(project, tagNames, options),
          });
        }).then(function(tags) {
          if (!tags || typeof tags.next !== 'string') {
            throw new SilentError("Tagging strategy must return a non-empty tag name");
          }

          return tags;
        });
      }
    }

    function printLatestTag(latestTag) {
      if (latestTag) {
        ui.writeLine(chalk.green('Latest tag: ' + latestTag));
      }
    }

    function replaceVersionsInManifests(nextVersion) {
      return resolveAll(options.manifest.map(function(fileName) {
        var filePath = path.join(project.root, fileName);

        return readJSON(filePath, 'utf8').then(function(pkg) {
          // Skip replace if 'version' key does not exist
          if (pkg.version) {
            pkg.version = nextVersion;

            return writeJSON(filePath, pkg, 'utf8');
          }
        }, function(error) {
          // Ignore if the file doesn't exist
          if (error && error.code === 'ENOENT') { return; }

          throw error;
        });
      }));
    }

    function createCommit(nextTag) {
      return repo.status().then(function(status) {
        // Don't bother committing if for some reason the working tree is clean
        if (hasModifications(status)) {
          return repo.currentBranch().then(function(branchName) {
            if (!branchName) {
              throw new SilentError("Must have a branch checked out to commit to");
            }

            // Allow the name to be in the message
            var message = options.message.replace(/%@/g, nextTag);

            return repo.commitAll(message).then(function() {
              pushQueue.push(branchName);
            }).then(function() {
              ui.writeLine(chalk.green("Successfully committed changes '" + message + "' locally."));
            });
          });
        }
      });
    }

    function promptToCreateTag(nextTag) {
      return proceedPrompt("About to create tag '" + nextTag + "'" + (options.local ? "" : " and push to remote '" + options.remote + "'"));
    }

    function createTag(tagName) {
      var message = null;

      if (options.annotation) {
        // Allow the tag name to be in the message
        message = options.annotation.replace(/%@/g, tagName);
      }

      return repo.createTag(tagName, message).then(function() {
        pushQueue.push(tagName);
      }).then(function() {
        ui.writeLine(chalk.green("Successfully created git tag '" + tagName + "' locally."));
      });
    }

    function pushChanges() {
      if (options.local || !pushQueue.length) { return; }

      return resolveAll(pushQueue.map(function(treeish) {
        return repo.push(options.remote, treeish).then(function() {
          ui.writeLine(chalk.green("Successfully pushed '" + treeish + "' to remote '" + options.remote + "'."));
        });
      }));
    }

    function performPublish() {
      if (!options.publish) { return; }

      var npm = command.npm();
      var filePath = path.join(project.root, 'package.json');

      return readJSON(filePath, 'utf8').then(function(pkg) {
        return proceedPrompt("About to publish " + pkg.name + "@" + pkg.version);
      }).then(function() {
        ui.writeLine(chalk.green("Publishing..."));
        return npm.publish([ project.root ]);
      }).then(function() {
        ui.writeLine(chalk.green("Publish successful."));
      });
    }

    function executeHook(hookName /* ...args */) {
      var args = slice(arguments, 1);
      var hook = hooks[hookName];

      // The first arg to all hooks is the project
      args.unshift(project);

      if (hook) {
        return new Promise(function(resolve, reject) {
          // Handle errors thrown directly from hook
          try {
            resolve(hook.apply(hooks, args));
          } catch(error) {
            reject(error);
          }
        }).catch(function(error) {
          // Preserve stack traces in hook errors if a real error is thrown,
          // otherwise wrap friendly errors in `SilentError`
          if (!(error instanceof Error)) {
            error = new SilentError(error);
          }

          // Provide more context in the error message
          error.message = "Error encountered in `" + hookName + '` hook: "' + error.message + '"';

          throw error;
        });
      } else {
        return resolve();
      }
    }

    return resolve()
      .then(abortIfAtTag)
      .then(abortIfCannotPublish)
      .then(getTags)
      .then(function(tags) {
        return executeHook('init', tags)
          .then(promptIfWorkingTreeDirty)
          .then(withArgs(printLatestTag, tags.latest))
          .then(withArgs(replaceVersionsInManifests, tagPrefix.strip(tags.next)))
          .then(withArgs(executeHook, 'beforeCommit', tags))
          .then(withArgs(createCommit, tags.next))
          .then(withArgs(promptToCreateTag, tags.next))
          .then(withArgs(createTag, tags.next))
          .then(pushChanges)
          .then(withArgs(executeHook, 'afterPush', tags))
          .then(performPublish)
          .then(function() {
            if (options.publish) {
              return executeHook('afterPublish', tags);
            }
          });
      });
  },

  // Merge options specified on the command line with those defined in the config
  init: function() {
    this._super.init && this._super.init.apply(this, arguments);
    var baseOptions = this.baseOptions();
    var optionsFromConfig = this.config().options;
    var mergedOptions = baseOptions.map(function(availableOption) {
      var option = merge(true, availableOption);

      if ((optionsFromConfig[option.name] !== undefined) && (option.default !== undefined)) {
        option.default = optionsFromConfig[option.name];
        option.description = option.description + ' (configured in ' + configPath + ')';
      }

      return option;
    });

    // Merge custom strategy options if specified
    var strategy = optionsFromConfig.strategy;
    if (typeof strategy === 'object' && Array.isArray(strategy.availableOptions)) {
      mergedOptions = mergedOptions.concat(strategy.availableOptions);
    }

    this.registerOptions({
      availableOptions: mergedOptions
    });
  },

  // Combine base options with strategy specific options
  baseOptions: function() {
    if (this._baseOptions) {
      return this._baseOptions;
    }

    var strategies = this.strategies();
    var strategyOptions = Object.keys(strategies).reduce(function(result, strategyName) {
      var options = strategies[strategyName].availableOptions;

      if (Array.isArray(options)) {
        // Add strategy qualifier to option descriptions
        options.forEach(function(option) {
          option.description = "when strategy is '" + strategyName + "', " + option.description;
        });

        result = result.concat(options);
      }

      return result;
    }, []);

    return this._baseOptions = availableOptions.concat(strategyOptions);
  },

  strategies: function() {
    if (this._strategies) {
      return this._strategies;
    }

    return this._strategies = requireDir('../strategies');
  },

  git: function() {
    if (this._repo) {
      return this._repo;
    }

    return this._repo = new GitRepo(this.project.root);
  },

  npm: function() {
    if (this._npm) {
      return this._npm;
    }

    return this._npm = new NPM({});
  },

  config: function() {
    if (!this._parsedConfig) {
      var ui = this.ui;
      var fullConfigPath = path.join(this.project.root, configPath);
      var config = {};
      var strategy;

      if (fs.existsSync(fullConfigPath)) {
        config = require(fullConfigPath);
      }

      // Preserve strategy if it's a function
      if (typeof config.strategy === 'function') {
        strategy = {
          getNextTag: config.strategy
        };
      } else if (typeof config.strategy === 'object') {
        if (typeof config.strategy.getNextTag === 'function') {
          strategy = config.strategy;
        } else {
          ui.writeLine(chalk.yellow("Warning: a custom `strategy` object must define a `getNextTag` function, ignoring"));
        }
      }

      // Extract hooks
      var hooks = availableHooks.reduce(function(result, hookName){
        if (typeof config[hookName] === 'function') {
          result[hookName] = config[hookName];
          delete config[hookName];
        } else if (config[hookName] !== undefined) {
          ui.writeLine(chalk.yellow("Warning: `" + hookName + "` is not a function in " + configPath + ", ignoring"));
        }

        return result;
      }, {});

      var baseOptions = this.baseOptions();
      var configOptions = baseOptions.filter(function(option) {
        return option.validInConfig;
      });
      var optionTypeMap = configOptions.reduce(function(result, option) {
        result[option.name] = option.type;
        return result;
      }, {});

      // Extract whitelisted options
      var options = Object.keys(config).reduce(function(result, optionName) {
        if (findBy(configOptions, 'name', optionName)) {
          result[optionName] = optionTypeMap[optionName] === Array ? makeArray(config[optionName]) : config[optionName];
        } else if (findBy(baseOptions, 'name', optionName)) {
          ui.writeLine(chalk.yellow("Warning: cannot specify option `" + optionName + "` in " + configPath + ", ignoring"));
        } else {
          ui.writeLine(chalk.yellow("Warning: invalid option `" + optionName + "` in " + configPath + ", ignoring"));
        }

        return result;
      }, {});

      // Coerce options into their expected type; this is not done for us since
      // the options are not coming from the CLI arg string
      nopt.clean(options, optionTypeMap);

      // If the strategy was a function, it got stomped on
      if (strategy) {
        options.strategy = strategy;
      }

      this._parsedConfig = {
        options: options,
        hooks: hooks
      };
    }

    return this._parsedConfig;
  }
};
