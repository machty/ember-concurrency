'use strict';

const utils = require('./utils');

module.exports = {
  isDSModel,
  isModule,
  isModuleByFilePath,
  isTestFile,

  isEmberCoreModule,
  isEmberComponent,
  isEmberController,
  isEmberMixin,
  isEmberRoute,
  isEmberService,

  isSingleLineFn,
  isMultiLineFn,
  isFunctionExpression,

  getModuleProperties,
  getEmberImportAliasName,

  isInjectedServiceProp,
  isInjectedControllerProp,
  isObserverProp,
  isObjectProp,
  isArrayProp,
  isComputedProp,
  isCustomProp,
  isActionsProp,
  isRouteLifecycleHook,

  isRelation,

  isComponentLifecycleHook,

  isRoute,
  isRouteDefaultProp,

  isControllerDefaultProp,
  parseDependentKeys,
  unwrapBraceExpressions,
  hasDuplicateDependentKeys,

  isEmberObject,

  isReopenObject,
  isReopenClassObject,
};

// Private

function isLocalModule(callee, element) {
  return (
    (utils.isIdentifier(callee) && callee.name === element) ||
    (utils.isIdentifier(callee.object) && callee.object.name === element)
  );
}

function isEmberModule(callee, element, module) {
  const memberExp = utils.isMemberExpression(callee.object) ? callee.object : callee;

  return (
    isLocalModule(memberExp, module) &&
    utils.isIdentifier(memberExp.property) &&
    memberExp.property.name === element
  );
}

function isPropOfType(node, type) {
  const calleeNode = node.callee;

  return (
    utils.isCallExpression(node) &&
    ((utils.isIdentifier(calleeNode) && calleeNode.name === type) ||
      (utils.isMemberExpression(calleeNode) &&
        utils.isIdentifier(calleeNode.property) &&
        calleeNode.property.name === type))
  );
}

// Public

function isModule(node, element, module) {
  const moduleName = module || 'Ember';

  return (
    utils.isCallExpression(node) &&
    (isLocalModule(node.callee, element) || isEmberModule(node.callee, element, moduleName))
  );
}

function isDSModel(node, filePath) {
  const isExtended = isEmberObject(node);
  let isModuleByPath = false;

  if (filePath && isExtended) {
    isModuleByPath = isModuleByFilePath(filePath, 'model');
  }

  return isModule(node, 'Model', 'DS') || isModuleByPath;
}

function isModuleByFilePath(filePath, module) {
  const fileName = `${module}.js`;
  const folderName = `${module}s`;

  /* Check both folder and filename to support both classic and POD's structure */
  return filePath.indexOf(fileName) > -1 || filePath.indexOf(folderName) > -1;
}

function isTestFile(fileName) {
  return fileName.endsWith('-test.js');
}

function isEmberCoreModule(node, module, filePath) {
  const isExtended = isEmberObject(node);
  let isModuleByPath;

  if (filePath) {
    isModuleByPath = isModuleByFilePath(filePath, module.toLowerCase()) && isExtended;
  }

  return isModule(node, module) || isModuleByPath;
}

function isEmberObject(node) {
  return (
    node.callee.property &&
    (node.callee.property.name === 'extend' || node.callee.property.value === 'extend')
  );
}

function isReopenClassObject(node) {
  return node.callee.property && node.callee.property.name === 'reopenClass';
}

function isReopenObject(node) {
  return node.callee.property && node.callee.property.name === 'reopen';
}

function isEmberComponent(node, filePath) {
  return isEmberCoreModule(node, 'Component', filePath);
}

function isEmberController(node, filePath) {
  return isEmberCoreModule(node, 'Controller', filePath);
}

function isEmberMixin(node, filePath) {
  return isEmberCoreModule(node, 'Mixin', filePath);
}

function isEmberRoute(node, filePath) {
  return isEmberCoreModule(node, 'Route', filePath);
}

function isEmberService(node, filePath) {
  return isEmberCoreModule(node, 'Service', filePath);
}

function isInjectedServiceProp(node) {
  return isPropOfType(node, 'service') || isPropOfType(node, 'inject');
}
function isInjectedControllerProp(node) {
  return isPropOfType(node, 'controller');
}

function isObserverProp(node) {
  return isPropOfType(node, 'observer');
}

function isComputedProp(node) {
  const allowedMemberExpNames = ['volatile', 'readOnly', 'property', 'meta'];
  if (utils.isMemberExpression(node.callee) && utils.isCallExpression(node.callee.object)) {
    return (
      isModule(node.callee.object, 'computed') &&
      utils.isIdentifier(node.callee.property) &&
      allowedMemberExpNames.indexOf(node.callee.property.name) > -1
    );
  }
  return isModule(node, 'computed');
}

function isArrayProp(node) {
  if (utils.isNewExpression(node.value)) {
    const parsedCallee = utils.parseCallee(node.value);
    return parsedCallee.pop() === 'A';
  }

  return utils.isArrayExpression(node.value);
}

function isObjectProp(node) {
  if (utils.isNewExpression(node.value)) {
    const parsedCallee = utils.parseCallee(node.value);
    return parsedCallee.pop() === 'Object';
  }

  return utils.isObjectExpression(node.value);
}

function isCustomProp(property) {
  const value = property.value;
  const isCustomObjectProp = utils.isObjectExpression(value) && property.key.name !== 'actions';

  return (
    utils.isLiteral(value) ||
    utils.isIdentifier(value) ||
    utils.isArrayExpression(value) ||
    utils.isUnaryExpression(value) ||
    isCustomObjectProp ||
    utils.isConditionalExpression(value) ||
    utils.isTaggedTemplateExpression(value)
  );
}

function isRouteLifecycleHook(property) {
  return isFunctionExpression(property.value) && isRouteLifecycleHookName(property.key.name);
}

function isActionsProp(property) {
  return property.key.name === 'actions' && utils.isObjectExpression(property.value);
}

function isComponentLifecycleHookName(name) {
  return (
    [
      'didReceiveAttrs',
      'willRender',
      'willInsertElement',
      'didInsertElement',
      'didRender',
      'didUpdateAttrs',
      'willUpdate',
      'didUpdate',
      'willDestroyElement',
      'willClearRender',
      'didDestroyElement',
    ].indexOf(name) > -1
  );
}

function isComponentLifecycleHook(property) {
  return isFunctionExpression(property.value) && isComponentLifecycleHookName(property.key.name);
}

function isRoute(node) {
  return (
    utils.isMemberExpression(node.callee) &&
    utils.isThisExpression(node.callee.object) &&
    utils.isIdentifier(node.callee.property) &&
    node.callee.property.name === 'route'
  );
}

function isRouteLifecycleHookName(name) {
  return (
    [
      'activate',
      'afterModel',
      'beforeModel',
      'deactivate',
      'model',
      'redirect',
      'renderTemplate',
      'resetController',
      'serialize',
      'setupController',
    ].indexOf(name) > -1
  );
}

function isRouteProperty(name) {
  return (
    [
      'actions',
      'concatenatedProperties',
      'controller',
      'controllerName',
      'isDestroyed',
      'isDestroying',
      'mergedProperties',
      'queryParams',
      'routeName',
      'templateName',
    ].indexOf(name) > -1
  );
}

function isRouteDefaultProp(property) {
  return isRouteProperty(property.key.name) && property.key.name !== 'actions';
}

function isControllerProperty(name) {
  return (
    [
      'actions',
      'concatenatedProperties',
      'isDestroyed',
      'isDestroying',
      'mergedProperties',
      'model',
      'queryParams',
      'target',
    ].indexOf(name) > -1
  );
}

function isControllerDefaultProp(property) {
  return isControllerProperty(property.key.name) && property.key.name !== 'actions';
}

function getModuleProperties(module) {
  const firstObjectExpressionNode = utils.findNodes(module.arguments, 'ObjectExpression')[0];
  return firstObjectExpressionNode ? firstObjectExpressionNode.properties : [];
}

/**
 * Get alias name of default ember import.
 *
 * @param  {ImportDeclaration} importDeclaration node to parse
 * @return {String}            import name
 */
function getEmberImportAliasName(importDeclaration) {
  if (!importDeclaration.source) return null;
  if (importDeclaration.source.value !== 'ember') return null;
  return importDeclaration.specifiers[0].local.name;
}

function isSingleLineFn(property) {
  return (
    utils.isCallExpression(property.value) &&
    utils.getSize(property.value) === 1 &&
    !isObserverProp(property.value) &&
    (isComputedProp(property.value) || !utils.isCallWithFunctionExpression(property.value))
  );
}

function isMultiLineFn(property) {
  return (
    utils.isCallExpression(property.value) &&
    utils.getSize(property.value) > 1 &&
    !isObserverProp(property.value) &&
    (isComputedProp(property.value) || !utils.isCallWithFunctionExpression(property.value))
  );
}

function isFunctionExpression(property) {
  return (
    utils.isFunctionExpression(property) ||
    utils.isArrowFunctionExpression(property) ||
    utils.isCallWithFunctionExpression(property)
  );
}

function isRelation(property) {
  const relationAttrs = ['hasMany', 'belongsTo'];
  let result = false;

  relationAttrs.forEach(relation => {
    if (isModule(property.value, relation, 'DS')) {
      result = true;
    }
  });

  return result;
}

/**
 * Checks whether a computed property has duplicate dependent keys.
 *
 * @param  {CallExpression} callExp Given call expression
 * @return {Boolean}        Flag whether dependent keys present.
 */
function hasDuplicateDependentKeys(callExp) {
  if (!isComputedProp(callExp)) return false;

  const dependentKeys = parseDependentKeys(callExp);
  const uniqueKeys = dependentKeys.filter((val, index, self) => self.indexOf(val) === index);

  return uniqueKeys.length !== dependentKeys.length;
}

/**
 * Parses dependent keys from call expression and returns them in an array.
 *
 * It also unwraps the expressions, so that `model.{foo,bar}` becomes `model.foo, model.bar`.
 *
 * @param  {CallExpression} callExp CallExpression to examine
 * @return {String[]}       Array of unwrapped dependent keys
 */
function parseDependentKeys(callExp) {
  // Check whether we have a MemberExpression, eg. computed(...).volatile()
  const isMemberExpCallExp =
    !callExp.arguments.length &&
    utils.isMemberExpression(callExp.callee) &&
    utils.isCallExpression(callExp.callee.object);

  const args = isMemberExpCallExp ? callExp.callee.object.arguments : callExp.arguments;

  const dependentKeys = args.filter(arg => utils.isLiteral(arg)).map(literal => literal.value);

  return unwrapBraceExpressions(dependentKeys);
}

/**
 * Unwraps brace expressions.
 *
 * @param  {String[]} dependentKeys array of strings containing unprocessed dependent keys.
 * @return {String[]} Array of unwrapped dependent keys
 */
function unwrapBraceExpressions(dependentKeys) {
  const braceExpressionRegexp = /{.+}/g;

  const unwrappedExpressions = dependentKeys.map(key => {
    if (typeof key !== 'string' || !braceExpressionRegexp.test(key)) return key;

    const braceExpansionPart = key.match(braceExpressionRegexp)[0];
    const prefix = key.replace(braceExpansionPart, '');
    const properties = braceExpansionPart
      .replace('{', '')
      .replace('}', '')
      .split(',');

    return properties.map(property => `${prefix}${property}`);
  });

  return unwrappedExpressions.reduce((acc, cur) => acc.concat(cur), []);
}
