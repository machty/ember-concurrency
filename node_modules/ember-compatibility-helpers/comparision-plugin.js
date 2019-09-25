'use strict';

const semver = require('semver');
const VersionChecker = require('ember-cli-version-checker');
const extractTrueVersion = require('./utils/extract-true-version');

function versionFor(depName, state) {
  let VERSIONS = state.version_cache;
  let version = VERSIONS[depName];

  if (version === undefined) {
    let checker = new VersionChecker(
      {
        name: state.opts.name,
        root: state.opts.root
      }
    ).for(depName, 'npm');

    if (!checker.version) {
      throw new Error(`Expected "${state.opts.name}" to have "${depName}" as a dependency, but it was not found.`);
    }

    version = VERSIONS[depName] = extractTrueVersion(checker.version);
  }

  return version;
}
function shouldReplaceLegacyCallWithTrue(testFn, path, state) {
  let argument = path.node.arguments[0];

  return testFn(state.opts.emberVersion, argument.value);
}

function shouldReplaceCallWithTrue(testFn, path, state) {
  if (path.node.arguments.length === 1) {
    return shouldReplaceLegacyCallWithTrue(testFn, path, state);
  }

  let depNameArgument = path.node.arguments[0];
  let versionArgument = path.node.arguments[1];
  let depVersion = versionFor(depNameArgument.value, state);

  return testFn(depVersion, versionArgument.value);
}

function comparisonPlugin(babel) {
  const t = babel.types;

  const trueIdentifier = t.identifier('true');
  const falseIdentifier = t.identifier('false');

  return {
    name: "ember-compatibility-helpers",
    visitor: {
      ImportSpecifier(path, state) {
        if (path.parent.source.value === 'ember-compatibility-helpers') {
          state.version_cache = state.version_cache || Object.create(null);
          let importedName = path.node.imported.name;
          if (importedName === 'gte') {
            state.gteImportId = state.gteImportId || path.scope.generateUidIdentifierBasedOnNode(path.node.id);
            path.scope.rename(path.node.local.name, state.gteImportId.name);
            path.remove();
          }

          if (importedName === 'lte') {
            state.lteImportId = state.lteImportId || path.scope.generateUidIdentifierBasedOnNode(path.node.id);
            path.scope.rename(path.node.local.name, state.lteImportId.name);
            path.remove();
          }
        }
      },

      CallExpression(path, state) {
        if (state.gteImportId && path.node.callee.name === state.gteImportId.name) {
          let replacementIdentifier = shouldReplaceCallWithTrue(semver.gte, path, state) ? trueIdentifier : falseIdentifier;

          path.replaceWith(replacementIdentifier);
        } else if (state.lteImportId && path.node.callee.name === state.lteImportId.name) {
          let replacementIdentifier = shouldReplaceCallWithTrue(semver.lte, path, state) ? trueIdentifier : falseIdentifier;

          path.replaceWith(replacementIdentifier);
        }
      }
    }
  };
}

comparisonPlugin.baseDir = () => __dirname;

module.exports = comparisonPlugin;
