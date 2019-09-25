import {
  Resolver as IResolver,
  Specifier,
  isSpecifierStringAbsolute,
  isSpecifierObjectAbsolute,
  deserializeSpecifier,
  serializeSpecifier
} from '@glimmer/di';
import { assert } from './utils/debug';
import { detectLocalResolutionCollection } from './utils/specifiers';
import { ModuleRegistry } from './module-registry';
import { ResolverConfiguration } from './resolver-configuration';

export default class Resolver implements IResolver {
  public config: ResolverConfiguration;
  public registry: ModuleRegistry;

  constructor(config: ResolverConfiguration, registry: ModuleRegistry) {
    this.config = config;
    this.registry = registry;
  }

  identify(specifier: string, referrer?: string): string {
    if (isSpecifierStringAbsolute(specifier)) {
      return specifier;
    }

    let s = deserializeSpecifier(specifier);
    let result: string;

    if (referrer) {
      let r = deserializeSpecifier(referrer);

      if (isSpecifierObjectAbsolute(r)) {
        assert('Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer', s.rootName === undefined && s.collection === undefined && s.namespace === undefined);

        s.rootName = r.rootName;
        s.collection = r.collection;
        let definitiveCollection = this._definitiveCollection(s.type);

        if (!s.name) {
          /*
           * For specifiers without a name use the referrer's name and
           * do not fallback to any other resolution rules.
           */
          s.namespace = r.namespace;
          s.name = r.name;
          return this._serializeAndVerify(s);
        }

        s.namespace = r.namespace ? r.namespace + '/' + r.name : r.name;
        if (detectLocalResolutionCollection(s) === definitiveCollection) {
          /*
           * For specifiers with a name, try local resolution. Based on
           * the referrer.
           */
          if (result = this._serializeAndVerify(s)) { return result; }
        }

        // Look for a private collection in the referrer's namespace
        if (definitiveCollection) {
          s.namespace += '/-' + definitiveCollection;
          if (result = this._serializeAndVerify(s)) { return result; }
        }

        // Because local and private resolution has failed, clear all but `name` and `type`
        // to proceed with top-level resolution
        s.rootName = s.collection = s.namespace = undefined;
      } else {
        assert('Referrer must either be "absolute" or include a `type` to determine the associated type', r.type);

        // Look in the definitive collection for the associated type
        s.collection = this._definitiveCollection(r.type);
        if (!s.namespace) {
          s.namespace = r.rootName;
        }
        assert(`'${r.type}' does not have a definitive collection`, s.collection);
      }
    }

    // If the collection is unspecified, use the definitive collection for the `type`
    if (!s.collection) {
      s.collection = this._definitiveCollection(s.type);
      assert(`'${s.type}' does not have a definitive collection`, s.collection);
    }

    if (!s.rootName) {
      // If the root name is unspecified, try the app's `rootName` first
      s.rootName = this.config.app.rootName || 'app';
      if (result = this._serializeAndVerify(s)) { return result; }

      // Then look for an addon with a matching `rootName`
      if (s.namespace) {
        s.rootName = s.namespace;
        s.namespace = undefined;

      } else {
        s.rootName = s.name;
        s.name = 'main';
      }
    }

    if (result = this._serializeAndVerify(s)) { return result; }
  }

  retrieve(specifier: string): any {
    return this.registry.get(specifier);
  }

  resolve(specifier: string, referrer?: string): any {
    let id = this.identify(specifier, referrer);
    if (id) {
      return this.retrieve(id);
    }
  }

  private _definitiveCollection(type: string): string {
    let typeDef = this.config.types[type];
    assert(`'${type}' is not a recognized type`, typeDef);
    return typeDef.definitiveCollection;
  }

  private _serializeAndVerify(specifier: Specifier): string {
    let serialized = serializeSpecifier(specifier);
    if (this.registry.has(serialized)) {
      return serialized;
    }
  }
}
