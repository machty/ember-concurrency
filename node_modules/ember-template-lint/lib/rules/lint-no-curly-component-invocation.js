const Rule = require('./base');
const createErrorMessage = require('../helpers/create-error-message');
const { transformTagName } = require('../helpers/curly-component-invocation');
const BUILT_IN_HELPERS = [
  'action',
  'array',
  'component',
  'concat',
  'debugger',
  'each',
  'each-in',
  'fn',
  'get',
  'hasBlock',
  'hasBlockParams',
  'hash',
  'if',
  'input',
  'let',
  'link-to',
  'loc',
  'log',
  'mount',
  'mut',
  'on',
  'outlet',
  'partial',
  'query-params',
  'textarea',
  'unbound',
  'unless',
  'with',
  'yield',
  '-in-element',
  'in-element',
];
const DEFAULT_CONFIG = {
  allow: [],
  disallow: [],
  requireDash: true,
};

module.exports = class NoCurlyComponentInvocation extends Rule {
  parseConfig(config) {
    let configType = typeof config;

    switch (configType) {
      case 'boolean':
        // if `true` use `DEFAULT_CONFIG`
        return config ? DEFAULT_CONFIG : false;
      case 'object':
        return Object.assign({}, DEFAULT_CONFIG, config);
      case 'undefined':
        return false;
    }

    let errorMessage = createErrorMessage(
      this.ruleName,
      [
        '  * boolean - `true` to enable / `false` to disable',
        '  * object -- An object with the following keys:',
        '    * `allow` -- array: A list of whitelisted helpers to be allowed used with curly component syntax',
        '    * `disallow` -- array: A list of component names to not allow use with curly component syntax',
        '    * `requireDash` -- boolean: The codemod assumes that all components have a dash in their name. `true` to enable (default) / `false` to disable',
      ],
      config
    );

    throw new Error(errorMessage);
  }
  logNode({ message, node }) {
    this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }

  getCurlyInvocationSyntaxError(node) {
    let name = node.path.original;
    if (node.path.type !== 'PathExpression') {
      return '';
    }
    if (
      node.type === 'BlockStatement' &&
      !BUILT_IN_HELPERS.includes(name) &&
      !this.isAllowed(name)
    ) {
      return this.generateError(name);
    }
    if (name.startsWith('this.') || name.startsWith('@') || this.isAllowed(name)) {
      return '';
    }
    if (this.isDisallowed(name) || !this.config.requireDash) {
      return this.generateError(name);
    }
    return /\w+-\w+/g.test(name) ? this.generateError(name) : '';
  }

  isDisallowed(name) {
    return this.config.disallow && this.config.disallow.includes(name);
  }

  isAllowed(name) {
    return (
      BUILT_IN_HELPERS.includes(name) || (this.config.allow && this.config.allow.includes(name))
    );
  }

  generateError(name) {
    let angleBracketName = transformTagName(name);
    return `You are using the component {{${name}}} with curly component syntax. You should use <${angleBracketName}> instead. If it is actually a helper you must manually add it to the 'no-curly-component-invocation' rule configuration, e.g. \`'no-curly-component-invocation': { allow: ['${name}'] }\`.`;
  }

  visitor() {
    return {
      MustacheStatement(node) {
        let message = this.getCurlyInvocationSyntaxError(node);
        if (message) {
          this.logNode({ message, node });
        }
      },

      BlockStatement(node) {
        let message = this.getCurlyInvocationSyntaxError(node);
        if (message) {
          this.logNode({ message, node });
        }
      },
    };
  }
};
