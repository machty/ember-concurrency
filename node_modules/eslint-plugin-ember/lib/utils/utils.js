'use strict';

module.exports = {
  findNodes,
  isIdentifier,
  isLiteral,
  isUnaryExpression,
  isMemberExpression,
  isCallExpression,
  isObjectExpression,
  isObjectPattern,
  isArrayExpression,
  isFunctionExpression,
  isExpressionStatement,
  isAnyFunctionExpression,
  isArrowFunctionExpression,
  isConciseArrowFunctionWithCallExpression,
  isNewExpression,
  isCallWithFunctionExpression,
  isThisExpression,
  isConditionalExpression,
  isTemplateLiteral,
  isTaggedTemplateExpression,
  isGlobalCallExpression,
  isString,
  isStringLiteral,
  getSize,
  parseCallee,
  parseArgs,
  findUnorderedProperty,
  getPropertyValue,
  collectObjectPatternBindings,
  isEmptyMethod,
  isBinaryExpression,
  isLogicalExpression,
  isReturnStatement,
  getParent,
};

/**
 * Find nodes of given name
 *
 * @param  {Node[]} body Array of nodes
 * @param  {String} nodeName
 * @return {Node[]}
 */
function findNodes(body, nodeName) {
  let nodesArray = [];

  if (body) {
    nodesArray = body.filter(node => node.type === nodeName);
  }

  return nodesArray;
}

/**
 * Check whether or not a node is an Identifier.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an Identifier.
 */
function isIdentifier(node) {
  return node !== undefined && node.type === 'Identifier';
}

/**
 * Check whether or not a node is an Literal.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an Literal.
 */
function isLiteral(node) {
  return node !== undefined && node.type === 'Literal';
}

/**
 * Check whether or not a node is an UnaryExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an Literal.
 */
function isUnaryExpression(node) {
  return node !== undefined && node.type === 'UnaryExpression';
}

/**
 * Check whether or not a node is an MemberExpression.
 *
 * @param {Object} node The node to check.
 * @return {boolean} Whether or not the node is an MemberExpression.
 */
function isMemberExpression(node) {
  return node !== undefined && node.type === 'MemberExpression';
}

/**
 * Check whether or not a node is an CallExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an CallExpression.
 */
function isCallExpression(node) {
  return node !== undefined && node.type === 'CallExpression';
}

/**
 * Check whether or not a node is an BinaryExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an BinaryExpression.
 */
function isBinaryExpression(node) {
  return node !== undefined && node.type === 'BinaryExpression';
}

/**
 * Check whether or not a node is an LogicalExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an LogicalExpression.
 */
function isLogicalExpression(node) {
  return node !== undefined && node.type === 'LogicalExpression';
}

/**
 * Check whether or not a node is an ObjectExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ObjectExpression.
 */
function isObjectExpression(node) {
  return node !== undefined && node.type === 'ObjectExpression';
}

/**
 * Check whether or not a node is an ObjectPattern.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ObjectPattern.
 */
function isObjectPattern(node) {
  return node !== undefined && node.type === 'ObjectPattern';
}

/**
 * Check whether or not a node is an ArrayExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ArrayExpression.
 */
function isArrayExpression(node) {
  return node !== undefined && node.type === 'ArrayExpression';
}

/**
 * Check whether or not a node is an FunctionExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an FunctionExpression.
 */
function isFunctionExpression(node) {
  return node !== undefined && node.type === 'FunctionExpression';
}

/**
 * Check whether or not a node is an isExpressionStatement.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an isExpressionStatement.
 */
function isExpressionStatement(node) {
  return node !== undefined && node.type === 'ExpressionStatement';
}

/**
 * Check whether or not a node is an ArrowFunctionExpression or FunctionExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ArrowFunctionExpression or FunctionExpression.
 */
function isAnyFunctionExpression(node) {
  return isArrowFunctionExpression(node) || isFunctionExpression(node);
}

/**
 * Check whether or not a node is an ArrowFunctionExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ArrowFunctionExpression.
 */
function isArrowFunctionExpression(node) {
  return node !== undefined && node.type === 'ArrowFunctionExpression';
}

/**
 * Check whether or not a node is an ArrowFunctionExpression with concise body
 * that contains a call expression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ArrowFunctionExpression
 * with concise body.
 */
function isConciseArrowFunctionWithCallExpression(node) {
  return isArrowFunctionExpression(node) && node.expression && isCallExpression(node.body);
}

/**
 * Check whether or not a node is an NewExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an NewExpression.
 */
function isNewExpression(node) {
  return node !== undefined && node.type === 'NewExpression';
}

/**
 * Check whether or not a node is a CallExpression that has a FunctionExpression
 * as first argument, eg.:
 * tSomeAction: mysteriousFnc(function(){})
 *
 * @param  {[type]}  node [description]
 * @return {Boolean}      [description]
 */
function isCallWithFunctionExpression(node) {
  const callObj = isMemberExpression(node.callee) ? node.callee.object : node;
  const firstArg = callObj.arguments ? callObj.arguments[0] : null;
  return (
    callObj !== undefined && isCallExpression(callObj) && firstArg && isFunctionExpression(firstArg)
  );
}

/**
 * Check whether or not a node is a ReturnStatement
 *
 * @param {Object} node The node to check.
 * @return {Boolean} Whether or not the node is a ReturnStatement.
 */
function isReturnStatement(node) {
  return node !== undefined && node.type && node.type === 'ReturnStatement';
}

/**
 * Check whether or not a node is an ThisExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ThisExpression.
 */
function isThisExpression(node) {
  return node !== undefined && node.type === 'ThisExpression';
}

/**
 * Check whether or not a node is a ConditionalExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is a ConditionalExpression.
 */
function isConditionalExpression(node) {
  return node !== undefined && node.type === 'ConditionalExpression';
}

/**
 * Check whether or not a node is a TaggedTemplateExpression.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is a TaggedTemplateExpression.
 */
function isTaggedTemplateExpression(node) {
  return node !== undefined && node.type === 'TaggedTemplateExpression';
}

/**
 * Check whether or not a node is a TemplateLiteral.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is a TemplateLiteral.
 */
function isTemplateLiteral(node) {
  return node !== undefined && node.type === 'TemplateLiteral';
}

/**
 * Check if given call is a global call
 *
 * This function checks whether given CallExpression node contains global
 * function call (name is provided in the aliases array). It also gives option to check against
 * already destructrued name and checking aliases.
 *
 * @param  {CallExpression} node The node to check.
 * @param  {String}         destructuredName The desctructured name.
 * @param  {String[]}       aliases array of aliases of the global function.
 * @return {Boolean}        Whether function is a global call
 */
function isGlobalCallExpression(node, destructuredName, aliases) {
  const isDestructured = node && node.callee && node.callee.name === destructuredName;
  const isGlobalCall = node.callee && aliases.indexOf(node.callee.name) > -1;

  return !isDestructured && isGlobalCall;
}

function isString(node) {
  return isTemplateLiteral(node) || (isLiteral(node) && typeof node.value === 'string');
}

function isStringLiteral(node) {
  return isLiteral(node) && typeof node.value === 'string';
}

/**
 * Get size of expression in lines
 *
 * @param  {Object} node The node to check.
 * @return {Integer} Number of lines
 */
function getSize(node) {
  return node.loc.end.line - node.loc.start.line + 1;
}

/**
 * Parse CallExpression or NewExpression to get array of properties and object name
 *
 * @param  {Object} node The node to parse
 * @return {String[]} eg. ['Ember', 'computed', 'alias']
 */
function parseCallee(node) {
  const parsedCallee = [];
  let callee;

  if (isCallExpression(node) || isNewExpression(node)) {
    callee = node.callee;

    while (isMemberExpression(callee)) {
      if (isIdentifier(callee.property)) {
        parsedCallee.push(callee.property.name);
      }
      callee = callee.object;
    }

    if (isIdentifier(callee)) {
      parsedCallee.push(callee.name);
    }
  }

  return parsedCallee.reverse();
}

/**
 * Parse CallExpression to get array of arguments
 *
 * @param  {Object} node Node to parse
 * @return {String[]} Literal function's arguments
 */
function parseArgs(node) {
  let parsedArgs = [];

  if (isCallExpression(node)) {
    parsedArgs = node.arguments
      .filter(argument => isLiteral(argument) && argument.value)
      .map(argument => argument.value);
  }

  return parsedArgs;
}

/**
 * Find property that is in wrong order
 *
 * @param  {Object[]} arr Properties with their order value
 * @return {Object}       Unordered property or null
 */
function findUnorderedProperty(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].order > arr[i + 1].order) {
      return arr[i];
    }
  }

  return null;
}

/**
 * Gets a property's value either by property path.
 *
 * @example
 * getPropertyValue('name');
 * getPropertyValue('parent.key.name');
 *
 * @param {Object} node
 * @param {String} path
 * @returns
 */
function getPropertyValue(node, path) {
  const parts = typeof path === 'string' ? path.split('.') : path;

  if (parts.length === 1) {
    return node[path];
  }

  const property = node[parts[0]];

  if (property && parts.length > 1) {
    parts.shift();
    return getPropertyValue(property, parts);
  }

  return property;
}

/**
 * Find deconstructed bindings based on the initialObjToBinding hash.
 *
 * Extracts the names of destructured properties, even if they are aliased.
 * `initialObjToBinding` should should have variable names as keys and bindings array as values.
 * Given `const { $: foo } = Ember` it will return `['foo']`.
 *
 * @param  {VariableDeclarator} node node to parse
 * @param  {Object}             initialObjToBinding relevant bindings
 * @return {String[]}           list of object pattern bindings
 */
function collectObjectPatternBindings(node, initialObjToBinding) {
  if (!isObjectPattern(node.id)) return [];

  const identifiers = Object.keys(initialObjToBinding);
  const objBindingName = node.init.name;
  const bindingIndex = identifiers.indexOf(objBindingName);
  if (bindingIndex === -1) return [];

  const binding = identifiers[bindingIndex];

  return node.id.properties
    .filter(props => initialObjToBinding[binding].indexOf(props.key.name) > -1)
    .map(props => props.value.name);
}

/**
 * Check whether or not a node is a empty method.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an empty method.
 */
function isEmptyMethod(node) {
  return node.value.body && node.value.body.body && node.value.body.body.length <= 0;
}

/**
 * Travels up the ancestors of a given node, if the predicate function returns
 * truthy for a given node or ancestor, return that node, otherwise return null
 *
 * @name getParent
 * @param {Object} node The child node to start at
 * @param {Function} predicate Function that should return a boolean for a given value
 * @returns {Object|null} The first node that matches predicate, otherwise null
 */
function getParent(node, predicate) {
  let currentNode = node;
  while (currentNode) {
    if (predicate(currentNode)) {
      return currentNode;
    }

    currentNode = currentNode.parent;
  }

  return null;
}
