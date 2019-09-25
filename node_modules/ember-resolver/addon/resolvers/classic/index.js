/* globals requirejs, require */

import Ember from 'ember';
import { assert, deprecate, warn } from '@ember/debug';
import EmberObject, { get, computed } from '@ember/object';
import { dasherize, classify, underscore } from '@ember/string';
import { DEBUG } from '@glimmer/env';
import classFactory from '../../utils/class-factory';
import makeDictionary from '../../utils/make-dictionary';

if (typeof requirejs.entries === 'undefined') {
  requirejs.entries = requirejs._eak_seen;
}

export class ModuleRegistry {
  constructor(entries) {
    this._entries = entries || requirejs.entries;
  }
  moduleNames() {
    return Object.keys(this._entries);
  }
  has(moduleName) {
    return moduleName in this._entries;
  }
  get(moduleName) {
    return require(moduleName);
  }
}

/**
 * This module defines a subclass of Ember.DefaultResolver that adds two
 * important features:
 *
 *  1) The resolver makes the container aware of es6 modules via the AMD
 *     output. The loader's _moduleEntries is consulted so that classes can be
 *     resolved directly via the module loader, without needing a manual
 *     `import`.
 *  2) is able to provide injections to classes that implement `extend`
 *     (as is typical with Ember).
 */

function parseName(fullName) {
  if (fullName.parsedName === true) { return fullName; }

  let prefix, type, name;
  let fullNameParts = fullName.split('@');

  if (fullNameParts.length === 2) {
    let prefixParts = fullNameParts[0].split(':');

    if (prefixParts.length === 2) {
      if (prefixParts[1].length === 0) {
        type = prefixParts[0];
        name = `@${fullNameParts[1]}`;
      } else {
        prefix = prefixParts[1];
        type = prefixParts[0];
        name = fullNameParts[1];
      }
    } else {
      let nameParts = fullNameParts[1].split(':');

      prefix = fullNameParts[0];
      type = nameParts[0];
      name = nameParts[1];
    }

    if (type === 'template' && prefix.lastIndexOf('components/', 0) === 0) {
      name = `components/${name}`;
      prefix = prefix.slice(11);
    }
  } else {
    fullNameParts = fullName.split(':');
    type = fullNameParts[0];
    name = fullNameParts[1];
  }

  let fullNameWithoutType = name;
  let namespace = get(this, 'namespace');
  let root = namespace;

  return {
    parsedName: true,
    fullName: fullName,
    prefix: prefix || this.prefix({type: type}),
    type: type,
    fullNameWithoutType: fullNameWithoutType,
    name: name,
    root: root,
    resolveMethodName: "resolve" + classify(type)
  };
}

function resolveOther(parsedName) {
  assert('`modulePrefix` must be defined', this.namespace.modulePrefix);

  let normalizedModuleName = this.findModuleName(parsedName);

  if (normalizedModuleName) {
    let defaultExport = this._extractDefaultExport(normalizedModuleName, parsedName);

    if (defaultExport === undefined) {
      throw new Error(` Expected to find: '${parsedName.fullName}' within '${normalizedModuleName}' but got 'undefined'. Did you forget to 'export default' within '${normalizedModuleName}'?`);
    }

    if (this.shouldWrapInClassFactory(defaultExport, parsedName)) {
      defaultExport = classFactory(defaultExport);
    }

    return defaultExport;
  }
}

const Resolver = EmberObject.extend({
  resolveOther,
  parseName,
  pluralizedTypes: null,
  moduleRegistry: null,

  makeToString(factory, fullName) {
    return '' + this.namespace.modulePrefix + '@' + fullName + ':';
  },

  shouldWrapInClassFactory(/* module, parsedName */){
    return false;
  },

  init() {
    this._super();
    this.moduleBasedResolver = true;

    if (!this._moduleRegistry) {
      this._moduleRegistry = new ModuleRegistry();
    }

    this._normalizeCache = makeDictionary();

    this.pluralizedTypes = this.pluralizedTypes || makeDictionary();

    if (!this.pluralizedTypes.config) {
      this.pluralizedTypes.config = 'config';
    }
    this._deprecatedPodModulePrefix = false;
  },

  normalize(fullName) {
    return this._normalizeCache[fullName] || (this._normalizeCache[fullName] = this._normalize(fullName));
  },

  resolve(fullName) {
    let parsedName = this.parseName(fullName);
    let resolveMethodName = parsedName.resolveMethodName;
    let resolved;

    if (typeof this[resolveMethodName] === 'function') {
      resolved = this[resolveMethodName](parsedName);
    }

    if (resolved == null) {
      resolved = this.resolveOther(parsedName);
    }

    return resolved;
  },

  _normalize(fullName) {
    // A) Convert underscores to dashes
    // B) Convert camelCase to dash-case, except for components (their
    //    templates) and helpers where we want to avoid shadowing camelCase
    //    expressions
    // C) replace `.` with `/` in order to make nested controllers work in the following cases
    //      1. `needs: ['posts/post']`
    //      2. `{{render "posts/post"}}`
    //      3. `this.render('posts/post')` from Route

    let split = fullName.split(':');
    if (split.length > 1) {
      let type = split[0];

      if (
        type === 'component' ||
        type === 'helper' ||
        (type === 'template' && split[1].indexOf('components/') === 0)
      ) {
        return type + ':' + split[1].replace(/_/g, '-');
      } else {
        return type + ':' + dasherize(split[1].replace(/\./g, '/'));
      }
    } else {
      return fullName;
    }
  },

  pluralize(type) {
    return this.pluralizedTypes[type] || (this.pluralizedTypes[type] = type + 's');
  },

  podBasedLookupWithPrefix(podPrefix, parsedName) {
    let fullNameWithoutType = parsedName.fullNameWithoutType;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    return podPrefix + '/' + fullNameWithoutType + '/' + parsedName.type;
  },

  podBasedModuleName(parsedName) {
    let podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

    return this.podBasedLookupWithPrefix(podPrefix, parsedName);
  },

  podBasedComponentsInSubdir(parsedName) {
    let podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;
    podPrefix = podPrefix + '/components';

    if (parsedName.type === 'component' || /^components/.test(parsedName.fullNameWithoutType)) {
      return this.podBasedLookupWithPrefix(podPrefix, parsedName);
    }
  },

  resolveEngine(parsedName) {
    let engineName = parsedName.fullNameWithoutType;
    let engineModule = engineName + '/engine';

    if (this._moduleRegistry.has(engineModule)) {
      return this._extractDefaultExport(engineModule);
    }
  },

  resolveRouteMap(parsedName) {
    let engineName = parsedName.fullNameWithoutType;
    let engineRoutesModule = engineName + '/routes';

    if (this._moduleRegistry.has(engineRoutesModule)) {
      let routeMap = this._extractDefaultExport(engineRoutesModule);

      assert(`The route map for ${engineName} should be wrapped by 'buildRoutes' before exporting.` , routeMap.isRouteMap);

      return routeMap;
    }
  },

  resolveTemplate(parsedName) {
    let resolved = this.resolveOther(parsedName);
    if (resolved == null) {
      resolved = Ember.TEMPLATES[parsedName.fullNameWithoutType];
    }
    return resolved;
  },

  mainModuleName(parsedName) {
    if (parsedName.fullNameWithoutType === 'main') {
      // if router:main or adapter:main look for a module with just the type first
      return parsedName.prefix + '/' + parsedName.type;
    }
  },

  defaultModuleName(parsedName) {
    return parsedName.prefix + '/' +  this.pluralize(parsedName.type) + '/' + parsedName.fullNameWithoutType;
  },

  prefix(parsedName) {
    let tmpPrefix = this.namespace.modulePrefix;

    if (this.namespace[parsedName.type + 'Prefix']) {
      tmpPrefix = this.namespace[parsedName.type + 'Prefix'];
    }

    return tmpPrefix;
  },

  /**

   A listing of functions to test for moduleName's based on the provided
   `parsedName`. This allows easy customization of additional module based
   lookup patterns.

   @property moduleNameLookupPatterns
   @returns {Ember.Array}
   */
  moduleNameLookupPatterns: computed(function(){
    return [
      this.podBasedModuleName,
      this.podBasedComponentsInSubdir,
      this.mainModuleName,
      this.defaultModuleName
    ];
  }).readOnly(),

  findModuleName(parsedName, loggingDisabled){
    let moduleNameLookupPatterns = this.get('moduleNameLookupPatterns');
    let moduleName;

    for (let index = 0, length = moduleNameLookupPatterns.length; index < length; index++) {
      let item = moduleNameLookupPatterns[index];

      let tmpModuleName = item.call(this, parsedName);

      // allow treat all dashed and all underscored as the same thing
      // supports components with dashes and other stuff with underscores.
      if (tmpModuleName) {
        tmpModuleName = this.chooseModuleName(tmpModuleName, parsedName);
      }

      if (tmpModuleName && this._moduleRegistry.has(tmpModuleName)) {
        moduleName = tmpModuleName;
      }

      if (!loggingDisabled) {
        this._logLookup(moduleName, parsedName, tmpModuleName);
      }

      if (moduleName) {
        return moduleName;
      }
    }
  },

  chooseModuleName(moduleName, parsedName) {
    let underscoredModuleName = underscore(moduleName);

    if (moduleName !== underscoredModuleName && this._moduleRegistry.has(moduleName) && this._moduleRegistry.has(underscoredModuleName)) {
      throw new TypeError(`Ambiguous module names: '${ moduleName}' and '${underscoredModuleName }'`);
    }

    if (this._moduleRegistry.has(moduleName)) {
      return moduleName;
    } else if (this._moduleRegistry.has(underscoredModuleName)) {
      return underscoredModuleName;
    }
    // workaround for dasherized partials:
    // something/something/-something => something/something/_something
    let partializedModuleName = moduleName.replace(/\/-([^/]*)$/, '/_$1');

    if (this._moduleRegistry.has(partializedModuleName)) {
      deprecate('Modules should not contain underscores. ' +
      'Attempted to lookup "'+moduleName+'" which ' +
      'was not found. Please rename "'+partializedModuleName+'" '+
      'to "'+moduleName+'" instead.', false,
      { id: 'ember-resolver.underscored-modules', until: '3.0.0' });

      return partializedModuleName;
    }

    if (DEBUG) {
      let isCamelCaseHelper = parsedName.type === 'helper' && /[a-z]+[A-Z]+/.test(moduleName);
      if (isCamelCaseHelper) {
        this._camelCaseHelperWarnedNames = this._camelCaseHelperWarnedNames || [];
        let alreadyWarned = this._camelCaseHelperWarnedNames.indexOf(parsedName.fullName) > -1;
        if (!alreadyWarned && this._moduleRegistry.has(dasherize(moduleName))) {
          this._camelCaseHelperWarnedNames.push(parsedName.fullName);
          warn('Attempted to lookup "' + parsedName.fullName + '" which ' +
          'was not found. In previous versions of ember-resolver, a bug would have ' +
          'caused the module at "' + dasherize(moduleName) + '" to be ' +
          'returned for this camel case helper name. This has been fixed. ' +
          'Use the dasherized name to resolve the module that would have been ' +
          'returned in previous versions.',
          false,
          { id: 'ember-resolver.camelcase-helper-names', until: '3.0.0' });
        }
      }
    }
  },

  // used by Ember.DefaultResolver.prototype._logLookup
  lookupDescription(fullName) {
    let parsedName = this.parseName(fullName);

    let moduleName = this.findModuleName(parsedName, true);

    return moduleName;
  },

  // only needed until 1.6.0-beta.2 can be required
  _logLookup(found, parsedName, description) {
    if (!Ember.ENV.LOG_MODULE_RESOLVER && !parsedName.root.LOG_RESOLVER) {
      return;
    }

    let padding;
    let symbol = found ? '[✓]' : '[ ]';

    if (parsedName.fullName.length > 60) {
      padding = '.';
    } else {
      padding = new Array(60 - parsedName.fullName.length).join('.');
    }

    if (!description) {
      description = this.lookupDescription(parsedName);
    }

    /* eslint-disable no-console */
    if (console && console.info) {
      console.info(symbol, parsedName.fullName, padding, description);
    }
  },

  knownForType(type) {
    let moduleKeys = this._moduleRegistry.moduleNames();

    let items = makeDictionary();
    for (let index = 0, length = moduleKeys.length; index < length; index++) {
      let moduleName = moduleKeys[index];
      let fullname = this.translateToContainerFullname(type, moduleName);

      if (fullname) {
        items[fullname] = true;
      }
    }

    return items;
  },

  translateToContainerFullname(type, moduleName) {
    let prefix = this.prefix({ type });

    // Note: using string manipulation here rather than regexes for better performance.
    // pod modules
    // '^' + prefix + '/(.+)/' + type + '$'
    let podPrefix = prefix + '/';
    let podSuffix = '/' + type;
    let start = moduleName.indexOf(podPrefix);
    let end = moduleName.indexOf(podSuffix);

    if (start === 0 && end === (moduleName.length - podSuffix.length) &&
        moduleName.length > (podPrefix.length + podSuffix.length)) {
      return type + ':' + moduleName.slice(start + podPrefix.length, end);
    }

    // non-pod modules
    // '^' + prefix + '/' + pluralizedType + '/(.+)$'
    let pluralizedType = this.pluralize(type);
    let nonPodPrefix = prefix + '/' + pluralizedType + '/';

    if (moduleName.indexOf(nonPodPrefix) === 0 && moduleName.length > nonPodPrefix.length) {
      return type + ':' + moduleName.slice(nonPodPrefix.length);
    }
  },

  _extractDefaultExport(normalizedModuleName) {
    let module = require(normalizedModuleName, null, null, true /* force sync */);

    if (module && module['default']) {
      module = module['default'];
    }

    return module;
  }
});

Resolver.reopenClass({
  moduleBasedResolver: true
});

export default Resolver;
