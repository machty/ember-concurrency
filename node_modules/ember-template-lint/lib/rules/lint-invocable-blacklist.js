'use strict';

const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');
const dasherize = require('../helpers/dasherize-component-name');

module.exports = class InvocableBlacklist extends Rule {
  parseConfig(config) {
    switch (typeof config) {
      case 'boolean':
        if (!config) {
          return false;
        }
        break;
      case 'object':
        if (Array.isArray(config)) {
          return config;
        }
        break;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      ['  * array of strings - helpers or components to blacklist'],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    let checkBlacklist = node => {
      let blacklist = this.config;

      for (let name of blacklist) {
        this._checkNode(node, name);
      }
    };

    return {
      BlockStatement: checkBlacklist,
      ElementNode: checkBlacklist,
      MustacheStatement: checkBlacklist,
      SubExpression: checkBlacklist,
    };
  }

  _checkNode(node, name) {
    if (this.isLocal(node)) {
      return;
    }

    if (node.type === 'ElementNode') {
      if (dasherize(node.tag) === name || node.tag === name) {
        this._logNode(node, `<${node.tag} />`);
      }
    } else {
      if (node.path.original === name || checkForComponentHelper(node, name)) {
        this._logNode(node, `{{${name}}}`);
      }
    }
  }

  _logNode(node, name) {
    this.log({
      message: `Cannot use blacklisted helper or component '${name}'`,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }
};

function checkForComponentHelper(node, name) {
  return node.path.original === 'component' && node.params[0] && node.params[0].original === name;
}
