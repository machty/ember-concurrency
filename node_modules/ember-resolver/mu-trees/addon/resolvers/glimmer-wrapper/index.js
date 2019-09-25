import { DEBUG } from '@glimmer/env';
import GlimmerResolver from '@glimmer/resolver/resolver';
import RequireJSRegistry from '../../module-registries/requirejs';
import GlobalsResolver from '@ember/application/globals-resolver';
import { dasherize } from '@ember/string';

function slasherize(dotted) {
  return dotted.replace(/\./g, '/');
}

const TEMPLATE_TO_PARTIAL = /^template:(.*\/)?_([\w-]+)/;

function isAbsoluteSpecifier(specifier) {
  return specifier.indexOf(':/') !== -1;
}

function cleanupEmberSpecifier(specifier, source, _namespace) {
  let [type, name] = specifier.split(':');
  if (!name) {
    return [specifier, null];
  }

  if (type === 'component' && name) {
    specifier = `${type}:${name}`;
  } else if (type === 'service') {
    /* Services may be camelCased */
    specifier = `service:${dasherize(name)}`;
  } else if (type === 'route') {
    /* Routes may have.dot.paths */
    specifier = `route:${slasherize(name)}`;
  } else if (type === 'controller') {
    /* Controllers may have.dot.paths */
    specifier = `controller:${slasherize(name)}`;
  } else if (type === 'template') {
    if (name && name.indexOf('components/') === 0) {
      let sliced = name.slice(11);
      specifier = `template:${sliced}`;
    } else {
      /*
       * Ember partials are looked up as templates. Here we replace the template
       * resolution with a partial resolute when appropriate. Try to keep this
       * code as "pay-go" as possible.
       */
      let match = TEMPLATE_TO_PARTIAL.exec(specifier);
      if (match) {
        let namespace = match[1] || '';
        let name = match[2];

        specifier = `partial:${namespace}${name}`;
      } else {
        if (source) {
          throw new Error(`Cannot look up a route template ${specifier} with a source`);
        }
        /*
         * Templates for routes must be looked up with a source. They may
         * have dots.in.paths
         */
        specifier = `template`;
        source = `route:/${_namespace}/routes/${slasherize(name)}`;
      }
    }
  }

  return [specifier, source];
}
const normalize = !DEBUG ? null : function(fullName) {
  // This method is called by `Registry#validateInjections` in dev mode.
  // https://github.com/ember-cli/ember-resolver/issues/299
  if (fullName) {
    const [type, name] = fullName.split(':', 2);
    if (name && (type === 'service' || type === 'controller')) {
      return `${type}:${dasherize(name)}`;
    }
  }
  return fullName;
};

/*
 * Wrap the @glimmer/resolver in Ember's resolver API. Although
 * this code extends from the DefaultResolver, it should never
 * call `_super` or call into that code.
 */
const Resolver = GlobalsResolver.extend({
  init() {
    this._super(...arguments);

    this._configRootName = this.config.app.rootName || 'app';

    if (!this.glimmerModuleRegistry) {
      this.glimmerModuleRegistry = new RequireJSRegistry(this.config, 'src');
    }

    this._glimmerResolver = new GlimmerResolver(this.config, this.glimmerModuleRegistry);
  },

  normalize,

  expandLocalLookup(specifier, source, namespace) {
    if (isAbsoluteSpecifier(specifier)) {
      return specifier; // specifier is absolute
    }

    if (source || namespace) {
      let rootName = namespace || this._configRootName;

      let [type] = specifier.split(':');

      /*
       * Ember components require their lookupString to be massaged. Make this
       * as "pay-go" as possible.
       */
      if (namespace) {
        // This is only required because:
        // https://github.com/glimmerjs/glimmer-di/issues/45
        source = `${type}:/${rootName}/`;
      } else if (source) {
        // make absolute
        let parts = source.split(':src/ui/');
        source = `${parts[0]}:/${rootName}/${parts[1]}`;
        source = source.split('/template.hbs')[0];
      }

      let [_specifier, _source] = cleanupEmberSpecifier(specifier, source, rootName);

      let absoluteSpecifier = this._glimmerResolver.identify(_specifier, _source);

      if (absoluteSpecifier) {
        return absoluteSpecifier;
      }

      absoluteSpecifier = this._glimmerResolver.identify(_specifier);

      if (absoluteSpecifier) {
        return specifier;
      }
    }

    return specifier;
  },

  resolve(specifier) {
    let source = null;
    if (!isAbsoluteSpecifier(specifier)) {
      let [_specifier, _source] = cleanupEmberSpecifier(specifier, source, this._configRootName);
      specifier = _specifier;
      source = _source;
    }

    return this._glimmerResolver.resolve(specifier, source);
  }

});

export default Resolver;
