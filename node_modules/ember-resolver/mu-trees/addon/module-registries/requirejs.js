import {
  deserializeSpecifier
} from '@glimmer/di';

export default class RequireJSRegistry {

  constructor(config, modulePrefix, require=self.requirejs) {
    this._config = config;
    this._modulePrefix = modulePrefix;
    this._require = require;
  }

  _baseSegments(s) {
    let collectionDefinition = this._config.collections[s.collection];
    let group = collectionDefinition && collectionDefinition.group;
    let segments = [ s.rootName, this._modulePrefix ];

    if (group) {
      segments.push(group);
    }

    // Special case to handle definitiveCollection for templates
    // eventually want to find a better way to address.
    // Dgeb wants to find a better way to handle these
    // in config without needing definitiveCollection.
    let ignoreCollection = s.type === 'template' &&
      s.collection === 'routes' &&
      s.namespace === 'components';

    if (s.collection !== 'main' && !ignoreCollection) {
      segments.push(s.collection);
    }

    if (s.namespace) {
      segments.push(s.namespace);
    }

    if (s.name !== 'main' || s.collection !== 'main') {
      segments.push(s.name);
    }

    return segments;
  }

  _detectModule(specifier, lookupDefault, lookupNamed) {
    let segments = this._baseSegments(specifier);
    let basePath = `${segments.join('/')}`;
    let typedPath = `${basePath}/${specifier.type}`;

    let lookupResult = lookupDefault(typedPath);

    if (!lookupResult) {
      if (this._checkDefaultType(specifier)) {
        lookupResult = lookupDefault(basePath);
      } else {
        lookupResult = lookupNamed(basePath);
      }
    }

    return lookupResult;
  }

  _checkDefaultType(specifier) {
    let collection = this._config.collections[specifier.collection];
    return collection && collection.defaultType && collection.defaultType === specifier.type;
  }

  has(specifierString) {
    let specifier = deserializeSpecifier(specifierString);

    /* return a boolean */
    return this._detectModule(specifier, path => {
      return (path in this._require.entries);
    }, path => {
      if (path in this._require.entries) {
        let result = this._require(path);
        return (specifier.type in result);
      }
    });
  }

  get(specifierString) {
    let specifier = deserializeSpecifier(specifierString);

    /* return an export */
    let moduleExport = this._detectModule(specifier, path => {
      return (path in this._require.entries) && this._require(path).default;
    }, path => {
      return (path in this._require.entries) && this._require(path)[specifier.type];
    });

    return moduleExport;
  }
}
