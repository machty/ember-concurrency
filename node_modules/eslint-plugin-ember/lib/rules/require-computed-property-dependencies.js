'use strict';

function getTraverser() {
  let traverser;
  try {
    traverser = require('eslint/lib/shared/traverser'); // eslint >= 6
  } catch (e) {
    traverser = require('eslint/lib/util/traverser'); // eslint < 6
  }
  return traverser;
}

const Traverser = getTraverser();
const utils = require('../utils/utils');
const propertyGetterUtils = require('../utils/property-getter');

/**
 * Checks whether the node is an identifier and optionally, its name.
 *
 * @param {ASTNode} node
 * @param {string=} name
 * @returns {boolean}
 */
function isIdentifier(node, name) {
  if (!utils.isIdentifier(node)) {
    return false;
  }

  if (name) {
    return node.name === name;
  }

  return true;
}

/**
 * Determines whether a node is a simple member expression with the given object
 * and property.
 *
 * @param {ASTNode} node
 * @param {string} objectName
 * @param {string} propertyName
 * @returns {boolean}
 */
function isMemberExpression(node, objectName, propertyName) {
  if (!objectName && !propertyName) {
    return node && utils.isMemberExpression(node);
  }

  return (
    node &&
    utils.isMemberExpression(node) &&
    !node.computed &&
    (objectName === 'this'
      ? utils.isThisExpression(node.object)
      : isIdentifier(node.object, objectName)) &&
    isIdentifier(node.property, propertyName)
  );
}

/**
 * @param {ASTNode} node
 * @returns {boolean}
 */
function isEmberComputed(node) {
  return isIdentifier(node, 'computed') || isMemberExpression(node, 'Ember', 'computed');
}

/**
 * Builds an array by concatenating the results of a map.
 *
 * @template T, U
 * @param {Array<T>} array
 * @param {function(T): Array<U>} callback
 * @returns {Array<U>}
 */
function flatMap(array, callback) {
  return array.reduce((result, item) => result.concat(callback(item)), []);
}

/**
 * Splits arguments to `Ember.computed` into string keys and dynamic keys.
 *
 * @param {Array<ASTNode>} args
 * @returns {{keys: Array<ASTNode>, dynamicKeys: Array<ASTNode>}}
 */
function parseComputedDependencies(args) {
  const keys = [];
  const dynamicKeys = [];

  for (let i = 0; i < args.length - 1; i++) {
    const arg = args[i];

    if (utils.isStringLiteral(arg)) {
      keys.push(arg);
    } else {
      dynamicKeys.push(arg);
    }
  }

  return { keys, dynamicKeys };
}

const ARRAY_PROPERTIES = new Set(['length', 'firstObject', 'lastObject']);

/**
 * Determines whether a computed property dependency matches a key path.
 *
 * @param {string} dependency
 * @param {string} keyPath
 * @returns {boolean}
 */
function computedPropertyDependencyMatchesKeyPath(dependency, keyPath) {
  const dependencyParts = dependency.split('.');
  const keyPathParts = keyPath.split('.');
  const minLength = Math.min(dependencyParts.length, keyPathParts.length);

  for (let i = 0; i < minLength; i++) {
    const dependencyPart = dependencyParts[i];
    const keyPathPart = keyPathParts[i];

    if (dependencyPart === keyPathPart) {
      continue;
    }

    // When dealing with arrays some keys encompass others. For example, `@each`
    // encompasses `[]` and `length` because any `@each` is triggered on any
    // array mutation as well as for some element property. `[]` is triggered
    // only on array mutation and so will always be triggered when `@each` is.
    // Similarly, `length` will always trigger if `[]` triggers and so is
    // encompassed by it.
    if (dependencyPart === '[]' || dependencyPart === '@each') {
      const subordinateProperties = new Set(ARRAY_PROPERTIES);

      if (dependencyPart === '@each') {
        subordinateProperties.add('[]');
      }

      return (
        !keyPathPart || (keyPathParts.length === i + 1 && subordinateProperties.has(keyPathPart))
      );
    }

    return false;
  }

  // len(foo.bar.baz) > len(foo.bar), and so matches.
  return dependencyParts.length > keyPathParts.length;
}

/**
 * Recursively finds all calls to `Ember#get`, whether like `Ember.get(this, …)`
 * or `this.get(…)`.
 *
 * @param {ASTNode} node
 * @returns {Array<ASTNode>}
 */
function findEmberGetCalls(node) {
  const results = [];

  new Traverser().traverse(node, {
    enter(child) {
      if (utils.isCallExpression(child)) {
        const dependency = extractEmberGetDependencies(child);

        if (dependency.length > 0) {
          results.push(child);
        }
      }
    },
  });

  return results;
}

/**
 * Recursively finds all `this.property` usages.
 *
 * @param {ASTNode} node
 * @returns {Array<ASTNode>}
 */
function findThisGetCalls(node) {
  const results = [];

  new Traverser().traverse(node, {
    enter(child, parent) {
      if (
        utils.isMemberExpression(child) &&
        !(utils.isCallExpression(parent) && parent.callee === child) &&
        propertyGetterUtils.isSimpleThisExpression(child)
      ) {
        results.push(child);
      }
    },
  });

  return results;
}

/**
 * Get an array argument's elements or the rest params if the values were not
 * passed as a single array argument.
 *
 * @param {Array<ASTNode>} args
 * @returns {Array<ASTNode>}
 */
function getArrayOrRest(args) {
  if (args.length === 1 && utils.isArrayExpression(args[0])) {
    return args[0].elements;
  }
  return args;
}

/**
 * Extracts all static property keys used in the various forms of `Ember.get`.
 *
 * @param {ASTNode} call
 * @returns {Array<string>}
 */
function extractEmberGetDependencies(call) {
  if (
    isMemberExpression(call.callee, 'this', 'get') ||
    isMemberExpression(call.callee, 'this', 'getWithDefault')
  ) {
    const firstArg = call.arguments[0];

    if (utils.isStringLiteral(firstArg)) {
      return [firstArg.value];
    }
  } else if (
    isMemberExpression(call.callee, 'Ember', 'get') ||
    isMemberExpression(call.callee, 'Ember', 'getWithDefault')
  ) {
    const firstArg = call.arguments[0];
    const secondArgument = call.arguments[1];

    if (utils.isThisExpression(firstArg) && utils.isStringLiteral(secondArgument)) {
      return [secondArgument.value];
    }
  } else if (isMemberExpression(call.callee, 'this', 'getProperties')) {
    return getArrayOrRest(call.arguments)
      .filter(utils.isStringLiteral)
      .map(arg => arg.value);
  } else if (isMemberExpression(call.callee, 'Ember', 'getProperties')) {
    const firstArg = call.arguments[0];
    const rest = call.arguments.slice(1);

    if (utils.isThisExpression(firstArg)) {
      return getArrayOrRest(rest)
        .filter(utils.isStringLiteral)
        .map(arg => arg.value);
    }
  }

  return [];
}

function extractThisGetDependencies(memberExpression, context) {
  return propertyGetterUtils.nodeToDependentKey(memberExpression, context);
}

/**
 * Checks if the `key` is a prefix of any item in `keys`.
 *
 * Example:
 *    `keys`: `['a', 'b.c']`
 *    `key`: `'b'`
 *    Result: `true`
 *
 * @param {String[]} keys - list of dependent keys
 * @param {String} key - dependent key
 * @returns boolean
 */
function keyExistsAsPrefixInList(keys, key) {
  return keys.some(currentKey => computedPropertyDependencyMatchesKeyPath(currentKey, key));
}

function removeRedundantKeys(keys) {
  return keys.filter(currentKey => !keyExistsAsPrefixInList(keys, currentKey));
}

const ERROR_MESSAGE_NON_STRING_VALUE = 'Non-string value used as computed property dependency';

module.exports = {
  meta: {
    docs: {
      description: 'Requires dependencies to be declared statically in computed properties',
      category: 'Possible Errors',
      recommended: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          allowDynamicKeys: {
            type: 'boolean',
          },
        },
      },
    ],
  },

  ERROR_MESSAGE_NON_STRING_VALUE,

  create(context) {
    return {
      CallExpression(node) {
        if (isEmberComputed(node.callee) && node.arguments.length >= 1) {
          const declaredDependencies = parseComputedDependencies(node.arguments);

          if (context.options[0] && !context.options[0].allowDynamicKeys) {
            declaredDependencies.dynamicKeys.forEach(key => {
              context.report({
                node: key,
                message: ERROR_MESSAGE_NON_STRING_VALUE,
              });
            });
          }

          const computedPropertyFunction = node.arguments[node.arguments.length - 1];

          const usedKeys1 = flatMap(
            findEmberGetCalls(computedPropertyFunction.body),
            extractEmberGetDependencies
          );
          const usedKeys2 = flatMap(findThisGetCalls(computedPropertyFunction.body), node => {
            return extractThisGetDependencies(node, context);
          });
          const usedKeys = [...usedKeys1, ...usedKeys2];

          const expandedDeclaredKeys = expandKeys(
            declaredDependencies.keys.map(node => node.value)
          );

          const undeclaredKeys = removeRedundantKeys(
            usedKeys
              .filter(usedKey =>
                expandedDeclaredKeys.every(
                  declaredKey =>
                    declaredKey !== usedKey &&
                    !computedPropertyDependencyMatchesKeyPath(declaredKey, usedKey)
                )
              )
              .reduce((keys, key) => {
                if (keys.indexOf(key) < 0) {
                  keys.push(key);
                }
                return keys;
              }, [])
              .sort()
          );

          if (undeclaredKeys.length > 0) {
            context.report({
              node,
              message: `Use of undeclared dependencies in computed property: ${undeclaredKeys.join(
                ', '
              )}`,
              fix(fixer) {
                const sourceCode = context.getSourceCode();

                const missingDependenciesAsArgumentsForDynamicKeys = declaredDependencies.dynamicKeys.map(
                  dynamicKey => sourceCode.getText(dynamicKey)
                );
                const missingDependenciesAsArgumentsForStringKeys = collapseKeys(
                  removeRedundantKeys([...undeclaredKeys, ...expandedDeclaredKeys])
                );

                const missingDependenciesAsArguments = [
                  ...missingDependenciesAsArgumentsForDynamicKeys,
                  ...missingDependenciesAsArgumentsForStringKeys,
                ].join(', ');

                if (node.arguments.length > 1) {
                  const firstDependency = node.arguments[0];
                  const lastDependency = node.arguments[node.arguments.length - 2];

                  return fixer.replaceTextRange(
                    [firstDependency.range[0], lastDependency.range[1]],
                    missingDependenciesAsArguments
                  );
                } else {
                  return fixer.insertTextBefore(
                    computedPropertyFunction,
                    `${missingDependenciesAsArguments}, `
                  );
                }
              },
            });
          }
        }
      },
    };
  },
};

/**
 * Collapse dependency keys with braces if possible.
 *
 * Example:
 * Input: ["foo.bar", "foo.baz", "quux.[]"]
 * Output: ["foo.{bar,baz}", "quux.[]"]
 *
 * @param {Array<string>} keys
 * @returns string
 */
function collapseKeys(keys) {
  const uniqueKeys = Array.from(new Set(keys));

  function isBare(key) {
    return key.indexOf('.') === -1 || key.endsWith('[]');
  }

  const bareKeys = uniqueKeys.filter(isBare);
  const rest = uniqueKeys.filter(key => !isBare(key));

  const mapByParent = rest.reduce((mapByParent, key) => {
    const [head, ...rest] = key.split('.').reverse();
    const parent = rest.reverse().join('.');

    mapByParent.set(parent, mapByParent.get(parent) || []);
    mapByParent.get(parent).push(head);

    return mapByParent;
  }, new Map());

  const joined = Array.from(mapByParent.keys()).map(parent => {
    const children = mapByParent.get(parent);
    if (children.length > 1) {
      return `${parent}.{${children.sort().join(',')}}`;
    }
    return `${parent}.${children[0]}`;
  });

  return [...bareKeys, ...joined].sort().map(key => `'${key}'`);
}

/**
 * ["foo.{bar,baz}", "quux"] => ["foo.bar", "foo.baz", "quux"]
 * @param {Array<string>} keys
 * @returns {Array<string>}
 */
function expandKeys(keys) {
  // aka flat map
  return [].concat(...keys.map(expandKey));
}

/**
 * Expand any brace usage in a dependency key.
 *
 * Example:
 * Input: "foo.{bar,baz}"
 * Output: ["foo.bar", "foo.baz"]
 *
 * @param {string} key
 * @returns {Array<string>}
 */
function expandKey(key) {
  if (key.includes('{')) {
    // key = "foo.{bar,baz}"
    const keyParts = key.split('{'); // ["foo", "{bar,baz}"]
    const keyBeforeCurly = keyParts[0].substring(0, keyParts[0].length - 1); // "foo"
    const keyAfterCurly = keyParts[1]; // "{bar,baz}"
    const keyAfterCurlySplitByCommas = keyAfterCurly.replace(/\{|\}/g, '').split(','); // ["bar", "baz"]
    const keyRecombined = [[keyBeforeCurly], keyAfterCurlySplitByCommas]; // [["foo"], ["baz", "baz"]]
    return keyRecombined
      .reduce(
        (acc, nextParts) =>
          // iteration 1 (["foo"]): do nothing (duplicate 0 times), resulting in acc === [["foo"]]
          // iteration 2 (["bar", "baz"]): duplicate acc once, resulting in `[["foo"], ["foo"]]
          duplicateArrays(acc, nextParts.length - 1).map((base, index) =>
            // evenly distribute the parts across the repeated base keys.
            // nextParts[0 % 2] => "bar"
            // nextParts[1 % 2] => "baz"
            base.concat(nextParts[index % nextParts.length])
          ),
        [[]]
      ) // [["foo", "bar"], ["foo", "baz"]]
      .map(expanded => expanded.join('.')); // ["foo.bar", "foo.baz"]
  } else {
    // No braces.
    // Example: "hello.world"
    return key;
  }
}

/**
 * duplicateArrays([["a", "b"]], 2) -> [["a", "b"], ["a", "b"], ["a", "b"]]
 * @param {Array<Array>} arr
 * @param {number} times
 * @returns {Array<Array>}
 */
function duplicateArrays(arr, times) {
  const result = [];
  for (let i = 0; i <= times; i++) {
    result.push(...arr.map(a => a.slice(0)));
  }
  return result;
}
