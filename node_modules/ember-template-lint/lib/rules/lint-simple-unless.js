'use strict';

const Rule = require('./base');
const AstNodeInfo = require('../helpers/ast-node-info');
const createErrorMessage = require('../helpers/create-error-message');

const messages = {
  followingElseBlock: 'Using an {{else}} block with {{unless}} should be avoided.',
  asElseUnlessBlock: 'Using an `{{else unless}}` block should be avoided.',
  withHelper: 'Using {{unless}} in combination with other helpers should be avoided.',
};

const DEFAULT_CONFIG = {
  whitelist: [],
  blacklist: [],
  maxHelpers: 0,
};

function isValidConfigObjectFormat(config) {
  for (let key in DEFAULT_CONFIG) {
    let value = config[key];
    let valueIsArray = Array.isArray(value);

    if (value === undefined) {
      config[key] = DEFAULT_CONFIG[key];
    } else if (key === 'whitelist' && !valueIsArray) {
      return false;
    } else if (key === 'blacklist' && !valueIsArray) {
      return false;
    }
  }

  return true;
}

module.exports = class LintSimpleUnless extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        // if `true` use `DEFAULT_CONFIG`
        return config ? DEFAULT_CONFIG : false;
      case 'object':
        if (isValidConfigObjectFormat(config)) {
          return config;
        }
        break;
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * boolean -- `true` for enabled / `false` for disabled\n' +
          '  * object --\n' +
          "    *  `whitelist` -- array - `['or']` for specific helpers / `[]` for wildcard\n" +
          "    *  `blacklist` -- array - `['or']` for specific helpers / `[]` for none\n" +
          '    *  `maxHelpers` -- number - use -1 for no limit',
      ],
      config
    );

    throw new Error(errorMessage);
  }

  visitor() {
    return {
      MustacheStatement(node) {
        if (node.path.original === 'unless' && node.params[0].path) {
          this._withHelper(node);
        }
      },

      BlockStatement(node) {
        const nodeInverse = node.inverse;

        if (nodeInverse) {
          if (AstNodeInfo.isUnless(node)) {
            if (nodeInverse.body[0] && AstNodeInfo.isIf(nodeInverse.body[0])) {
              this._followingElseIfBlock(node);
            } else {
              this._followingElseBlock(node);
            }
          } else if (this._isElseUnlessBlock(nodeInverse.body[0])) {
            this._asElseUnlessBlock(node);
          }
        } else if (AstNodeInfo.isUnless(node) && node.params[0].path) {
          this._withHelper(node);
        }
      },
    };
  }

  _followingElseBlock(block) {
    let loc = block.program.loc.end;
    let actual = '{{else}}';

    this._logMessage(messages.followingElseBlock, loc.line, loc.column, actual);
  }

  _followingElseIfBlock(block) {
    let inverse = block.inverse;
    let loc = block.program.loc.end;
    let parameter = inverse.body[0].params[0].original;
    let actual = `{{else if ${parameter}}}`;

    this._logMessage(messages.followingElseBlock, loc.line, loc.column, actual);
  }

  _asElseUnlessBlock(block) {
    let inverse = block.inverse;
    let loc = inverse.body[0].loc.start;
    let actual = '{{else unless ...';

    this._logMessage(messages.asElseUnlessBlock, loc.line, loc.column, actual);
  }

  _withHelper(node) {
    const whitelist = this.config.whitelist; // let { whitelist, blacklist, maxHelpers } = this.config;
    const blacklist = this.config.blacklist;
    const maxHelpers = this.config.maxHelpers;

    let params;
    let nextParams = node.params;
    let helperCount = 0;
    let containsSubexpression = false;

    do {
      params = nextParams;
      nextParams = [];

      params.forEach(param => {
        if (param.type === 'SubExpression') {
          if (++helperCount > maxHelpers && maxHelpers > -1) {
            let loc = param.loc.start;
            let actual = `{{unless ${helperCount > 1 ? '(... ' : ''}(${param.path.original} ...`;
            let message = `${messages.withHelper} MaxHelpers: ${maxHelpers}`;

            this._logMessage(message, loc.line, loc.column, actual);
          }

          if (whitelist.length > 0 && !whitelist.includes(param.path.original)) {
            let loc = param.loc.start;
            let actual = `{{unless ${helperCount > 1 ? '(... ' : ''}(${param.path.original} ...`;
            let message = `${messages.withHelper} Allowed helper${
              whitelist.length > 1 ? 's' : ''
            }: ${whitelist.toString()}`;

            this._logMessage(message, loc.line, loc.column, actual);
          }

          if (blacklist.length > 0 && blacklist.includes(param.path.original)) {
            let loc = param.loc.start;
            let actual = `{{unless ${helperCount > 1 ? '(... ' : ''}(${param.path.original} ...`;
            let message = `${messages.withHelper} Restricted helper${
              blacklist.length > 1 ? 's' : ''
            }: ${blacklist.toString()}`;

            this._logMessage(message, loc.line, loc.column, actual);
          }

          param.params.forEach(param => nextParams.push(param)); // nextParams.push(...param.params);
        }
      });

      containsSubexpression = nextParams.some(param => param.type === 'SubExpression');
    } while (containsSubexpression);
  }

  _isElseUnlessBlock(node) {
    return (
      node &&
      node.path &&
      node.path.original === 'unless' &&
      this.sourceForNode(node).startsWith('{{else ')
    );
  }

  _logMessage(message, line, column, source) {
    return this.log({
      message,
      line,
      column,
      source,
    });
  }
};

module.exports.messages = messages;
