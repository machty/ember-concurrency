'use strict';

const EMBER_NAMESPACES = ['inject.controller', 'inject.service'];

// Both the Controller module and Service module each make available the
// "inject" namespace. In order to make it more readable, so it's more
// explicit at first glance from which module the "inject" namespace
// belongs to or is being imported from, let's check against this so we
// can properly populate the import specifier to report the ESLint error.
// Ex: import { inject as service } from '@ember/service';
function isNamespace(obj) {
  return EMBER_NAMESPACES.includes(`${obj.parent}.${obj.key}`);
}

function isNamedExport(obj) {
  return obj.match.export !== 'default';
}

function getReplacementSpecifier(obj) {
  let importSpecifier;

  if (isNamedExport(obj) && !isNamespace(obj)) {
    importSpecifier =
      obj.match.localName && obj.match.localName !== obj.match.export
        ? `{ ${obj.match.export} as ${obj.match.localName} }`
        : `{ ${obj.match.export} }`;
  } else if (isNamedExport(obj) && isNamespace(obj)) {
    importSpecifier = `{ ${obj.parent} as ${obj.key} }`;
  } else {
    importSpecifier = obj.match.localName || obj.customKey || obj.key;
  }

  return importSpecifier;
}

function buildMessage(obj) {
  let message;

  const importSpecifier = getReplacementSpecifier(obj);

  const replacement = `import ${importSpecifier} from '${obj.match.module}';`;

  if (obj.type === 'Property') {
    const global = obj.match.global.match(/^DS/) ? 'DS' : 'Ember';
    message = `Use \`${replacement}\` instead of using ${global} destructuring`;
  } else {
    message = `Use \`${replacement}\` instead of using ${obj.fullName}`;
  }

  return message;
}

/**
 * This function returns a fix function. The fix function can update the old
 * imports to the new ones.
 * @param {Object} node - the AST node related to the import problem
 * @param {Object} modulesData - the data set that maps old imports to the new
 * ones. It is an object like this one:
 * {
 *   'ember-array': {
 *     default: ['@ember/array'],
 *   },
 *   'ember-array/mutable': {
 *     default: ['@ember/array/mutable'],
 *   },
 *   'ember-array/utils': {
 *     A: ['@ember/array', 'A'],
 *     isEmberArray: ['@ember/array', 'isArray'],
 *     wrap: ['@ember/array', 'makeArray'],
 *   },
 * }
 * @return {function(fixer: Object): function} a function that applies a fix to
 * update the import
 */
function buildFix(node, modulesData) {
  const moduleName = node.source.value;

  function fix(fixer) {
    const newImports = buildNewImports(node, modulesData, moduleName);

    const lines = buildLines(newImports);

    return fixer.replaceText(node, lines.join('\n'));
  }

  return fix;
}

function buildNewImports(node, modulesData, moduleName) {
  const newImports = {};

  node.specifiers.forEach(specifier => {
    const localName = specifier.local.name;

    let importedName;
    if (specifier.type === 'ImportDefaultSpecifier') {
      importedName = 'default';
    } else {
      importedName = specifier.imported.name;
    }

    let module;
    const moduleMapping = modulesData[moduleName][importedName];
    if (!moduleMapping) {
      module = moduleName;
    } else {
      module = moduleMapping[0];
      importedName = moduleMapping[1] || 'default';
    }

    newImports[module] = newImports[module] || [];
    newImports[module].push({ localName, importedName });
  });

  return newImports;
}

function buildLines(newImports) {
  return Object.keys(newImports).map(module => {
    const newModuleImport = newImports[module];

    const defaultImport = newModuleImport
      .filter(it => it.importedName === 'default')
      .map(it => it.localName);

    const namedImports = newModuleImport
      .filter(it => it.importedName !== 'default')
      .map(it =>
        it.importedName !== it.localName ? `${it.importedName} as ${it.localName}` : it.importedName
      )
      .join(', ');

    const specifiers = defaultImport
      .concat(namedImports ? `{ ${namedImports} }` : '')
      .filter(Boolean)
      .join(', ');

    return `import ${specifiers} from '${module}';`;
  });
}

function getFullNames(prefix, node) {
  let fullName = prefix;
  const fullNames = [];

  let parentNode = node.parent;
  while (parentNode.type === 'MemberExpression') {
    fullName += `.${parentNode.property.name}`;
    fullNames.unshift(fullName);
    parentNode = parentNode.parent;
  }

  return fullNames;
}

function isInitImportedFrom(node, module) {
  const { name } = node.init;
  const pp = node.parent.parent;

  if (!pp || !pp.body || !pp.body.some) {
    return false;
  }

  return pp.body.some(n => {
    function containsInitSpecifier(specifiers) {
      return specifiers.some(s => {
        return s.local.name === name;
      });
    }

    return (
      n.type === 'ImportDeclaration' &&
      n.source.value === module &&
      containsInitSpecifier(n.specifiers)
    );
  });
}

module.exports = {
  buildFix,
  buildMessage,
  getFullNames,
  isInitImportedFrom,
};
