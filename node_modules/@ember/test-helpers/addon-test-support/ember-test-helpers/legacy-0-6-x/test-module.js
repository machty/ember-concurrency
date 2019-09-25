import Ember from 'ember';
import EmberRouter from '@ember/routing/router';
import { deprecate } from '@ember/application/deprecations';
import { tryInvoke } from '@ember/utils';
import { set } from '@ember/object';
import { run } from '@ember/runloop';
import { setOwner } from '@ember/application';
import AbstractTestModule from './abstract-test-module';
import { getResolver } from '@ember/test-helpers';
import buildRegistry from './build-registry';
import hasEmberVersion from '@ember/test-helpers/has-ember-version';

export default class extends AbstractTestModule {
  constructor(subjectName, description, callbacks) {
    // Allow `description` to be omitted, in which case it should
    // default to `subjectName`
    if (!callbacks && typeof description === 'object') {
      callbacks = description;
      description = subjectName;
    }

    super(description || subjectName, callbacks);

    this.subjectName = subjectName;
    this.description = description || subjectName;
    this.resolver = this.callbacks.resolver || getResolver();

    if (this.callbacks.integration && this.callbacks.needs) {
      throw new Error("cannot declare 'integration: true' and 'needs' in the same module");
    }

    if (this.callbacks.integration) {
      this.initIntegration(callbacks);
      delete callbacks.integration;
    }

    this.initSubject();
    this.initNeeds();
  }

  initIntegration(options) {
    if (options.integration === 'legacy') {
      throw new Error("`integration: 'legacy'` is only valid for component tests.");
    }
    this.isIntegration = true;
  }

  initSubject() {
    this.callbacks.subject = this.callbacks.subject || this.defaultSubject;
  }

  initNeeds() {
    this.needs = [this.subjectName];
    if (this.callbacks.needs) {
      this.needs = this.needs.concat(this.callbacks.needs);
      delete this.callbacks.needs;
    }
  }

  initSetupSteps() {
    this.setupSteps = [];
    this.contextualizedSetupSteps = [];

    if (this.callbacks.beforeSetup) {
      this.setupSteps.push(this.callbacks.beforeSetup);
      delete this.callbacks.beforeSetup;
    }

    this.setupSteps.push(this.setupContainer);
    this.setupSteps.push(this.setupContext);
    this.setupSteps.push(this.setupTestElements);
    this.setupSteps.push(this.setupAJAXListeners);
    this.setupSteps.push(this.setupPromiseListeners);

    if (this.callbacks.setup) {
      this.contextualizedSetupSteps.push(this.callbacks.setup);
      delete this.callbacks.setup;
    }
  }

  initTeardownSteps() {
    this.teardownSteps = [];
    this.contextualizedTeardownSteps = [];

    if (this.callbacks.teardown) {
      this.contextualizedTeardownSteps.push(this.callbacks.teardown);
      delete this.callbacks.teardown;
    }

    this.teardownSteps.push(this.teardownSubject);
    this.teardownSteps.push(this.teardownContainer);
    this.teardownSteps.push(this.teardownContext);
    this.teardownSteps.push(this.teardownTestElements);
    this.teardownSteps.push(this.teardownAJAXListeners);
    this.teardownSteps.push(this.teardownPromiseListeners);

    if (this.callbacks.afterTeardown) {
      this.teardownSteps.push(this.callbacks.afterTeardown);
      delete this.callbacks.afterTeardown;
    }
  }

  setupContainer() {
    if (this.isIntegration || this.isLegacy) {
      this._setupIntegratedContainer();
    } else {
      this._setupIsolatedContainer();
    }
  }

  setupContext() {
    var subjectName = this.subjectName;
    var container = this.container;

    var factory = function() {
      return container.factoryFor
        ? container.factoryFor(subjectName)
        : container.lookupFactory(subjectName);
    };

    super.setupContext({
      container: this.container,
      registry: this.registry,
      factory: factory,
      register() {
        var target = this.registry || this.container;
        return target.register.apply(target, arguments);
      },
    });

    if (setOwner) {
      setOwner(this.context, this.container.owner);
    }

    this.setupInject();
  }

  setupInject() {
    var module = this;
    var context = this.context;

    if (Ember.inject) {
      var keys = (Object.keys || keys)(Ember.inject);

      keys.forEach(function(typeName) {
        context.inject[typeName] = function(name, opts) {
          var alias = (opts && opts.as) || name;
          run(function() {
            set(context, alias, module.container.lookup(typeName + ':' + name));
          });
        };
      });
    }
  }

  teardownSubject() {
    var subject = this.cache.subject;

    if (subject) {
      run(function() {
        tryInvoke(subject, 'destroy');
      });
    }
  }

  teardownContainer() {
    var container = this.container;
    run(function() {
      container.destroy();
    });
  }

  defaultSubject(options, factory) {
    return factory.create(options);
  }

  // allow arbitrary named factories, like rspec let
  contextualizeCallbacks() {
    var callbacks = this.callbacks;
    var context = this.context;

    this.cache = this.cache || {};
    this.cachedCalls = this.cachedCalls || {};

    var keys = (Object.keys || keys)(callbacks);
    var keysLength = keys.length;

    if (keysLength) {
      var deprecatedContext = this._buildDeprecatedContext(this, context);
      for (var i = 0; i < keysLength; i++) {
        this._contextualizeCallback(context, keys[i], deprecatedContext);
      }
    }
  }

  _contextualizeCallback(context, key, callbackContext) {
    var _this = this;
    var callbacks = this.callbacks;
    var factory = context.factory;

    context[key] = function(options) {
      if (_this.cachedCalls[key]) {
        return _this.cache[key];
      }

      var result = callbacks[key].call(callbackContext, options, factory());

      _this.cache[key] = result;
      _this.cachedCalls[key] = true;

      return result;
    };
  }

  /*
    Builds a version of the passed in context that contains deprecation warnings
    for accessing properties that exist on the module.
  */
  _buildDeprecatedContext(module, context) {
    var deprecatedContext = Object.create(context);

    var keysForDeprecation = Object.keys(module);

    for (var i = 0, l = keysForDeprecation.length; i < l; i++) {
      this._proxyDeprecation(module, deprecatedContext, keysForDeprecation[i]);
    }

    return deprecatedContext;
  }

  /*
    Defines a key on an object to act as a proxy for deprecating the original.
  */
  _proxyDeprecation(obj, proxy, key) {
    if (typeof proxy[key] === 'undefined') {
      Object.defineProperty(proxy, key, {
        get() {
          deprecate(
            'Accessing the test module property "' + key + '" from a callback is deprecated.',
            false,
            {
              id: 'ember-test-helpers.test-module.callback-context',
              until: '0.6.0',
            }
          );
          return obj[key];
        },
      });
    }
  }

  _setupContainer(isolated) {
    var resolver = this.resolver;

    var items = buildRegistry(
      !isolated
        ? resolver
        : Object.create(resolver, {
            resolve: {
              value() {},
            },
          })
    );

    this.container = items.container;
    this.registry = items.registry;

    if (hasEmberVersion(1, 13)) {
      var thingToRegisterWith = this.registry || this.container;
      var router = resolver.resolve('router:main');
      router = router || EmberRouter.extend();
      thingToRegisterWith.register('router:main', router);
    }
  }

  _setupIsolatedContainer() {
    var resolver = this.resolver;
    this._setupContainer(true);

    var thingToRegisterWith = this.registry || this.container;

    for (var i = this.needs.length; i > 0; i--) {
      var fullName = this.needs[i - 1];
      var normalizedFullName = resolver.normalize(fullName);
      thingToRegisterWith.register(fullName, resolver.resolve(normalizedFullName));
    }

    if (!this.registry) {
      this.container.resolver = function() {};
    }
  }

  _setupIntegratedContainer() {
    this._setupContainer();
  }
}
