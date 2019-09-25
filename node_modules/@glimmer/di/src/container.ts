import { Factory, FactoryDefinition } from './factory';
import { RegistryReader, Injection } from './registry';
import { Resolver } from './resolver';
import { Dict } from './dict';

interface Lookup {
  factory: Factory<any>;
  instance: any;
}

export default class Container {
  private _registry: RegistryReader;
  private _resolver: Resolver;
  private _lookups: Dict<Lookup>;
  private _factoryDefinitionLookups: Dict<FactoryDefinition<any>>;

  constructor(registry: RegistryReader, resolver: Resolver = null) {
    this._registry = registry;
    this._resolver = resolver;
    this._lookups = {};
    this._factoryDefinitionLookups = {};
  }

  factoryFor(specifier: string): Factory<any> {
    let factoryDefinition: FactoryDefinition<any> = this._factoryDefinitionLookups[specifier];

    if (!factoryDefinition) {
      if (this._resolver) {
        factoryDefinition = this._resolver.retrieve(specifier);
      }

      if (!factoryDefinition) {
        factoryDefinition = this._registry.registration(specifier);
      }

      if (factoryDefinition) {
        this._factoryDefinitionLookups[specifier] = factoryDefinition;
      }
    }

    if (!factoryDefinition) {
      return;
    }

    return this.buildFactory(specifier, factoryDefinition);
  }

  lookup(specifier: string): any {
    let singleton = (this._registry.registeredOption(specifier, 'singleton') !== false);

    if (singleton) {
      let lookup = this._lookups[specifier];
      if (lookup) {
        return lookup.instance;
      }
    }

    let factory = this.factoryFor(specifier);
    if (!factory) { return; }

    if (this._registry.registeredOption(specifier, 'instantiate') === false) {
      return factory.class;
    }

    let instance = factory.create();

    if (singleton && instance) {
      this._lookups[specifier] = { factory, instance };
    }

    return instance;
  }

  defaultInjections(specifier: string): object {
    return {};
  }

  teardown(): void {
    let specifiers = Object.keys(this._lookups);

    for (let i=0;i<specifiers.length;i++) {
      let specifier = specifiers[i];
      let { factory, instance } = this._lookups[specifier];
      factory.teardown(instance);
    }
  }

  defaultTeardown(instance): void {
  }

  private buildInjections(specifier: string): object {
    let hash = this.defaultInjections(specifier);
    let injections: Injection[] = this._registry.registeredInjections(specifier);
    let injection: Injection;

    for (let i = 0; i < injections.length; i++) {
      injection = injections[i];
      hash[injection.property] = this.lookup(injection.source);
    }

    return hash;
  }

  private buildFactory(specifier: string, factoryDefinition: FactoryDefinition<any>): Factory<any> {
    let injections = this.buildInjections(specifier);

    return {
      class: factoryDefinition,
      teardown: (instance) => {
        if (factoryDefinition.teardown) {
          factoryDefinition.teardown(instance);
        } else {
          this.defaultTeardown(instance);
        }
      },
      create(options) {
        let mergedOptions = Object.assign({}, injections, options);

        return factoryDefinition.create(mergedOptions);
      }
    }
  }
}
