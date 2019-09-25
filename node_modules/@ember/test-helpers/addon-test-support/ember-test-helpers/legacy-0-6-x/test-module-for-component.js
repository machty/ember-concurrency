/* globals EmberENV, jQuery */
import { set, setProperties, get, getProperties } from '@ember/object';
import { isArray } from '@ember/array';
import { tryInvoke } from '@ember/utils';
import { run } from '@ember/runloop';
import { deprecate } from '@ember/application/deprecations';
import { getOwner } from '@ember/application';
import TestModule from './test-module';
import Ember from 'ember';
import hasEmberVersion from '../has-ember-version';
import { preGlimmerSetupIntegrationForComponent } from './-legacy-overrides';

let ACTION_KEY;
if (hasEmberVersion(2, 0)) {
  ACTION_KEY = 'actions';
} else {
  ACTION_KEY = '_actions';
}

const isPreGlimmer = !hasEmberVersion(1, 13);

export default class extends TestModule {
  constructor(componentName, description, callbacks) {
    // Allow `description` to be omitted
    if (!callbacks && typeof description === 'object') {
      callbacks = description;
      description = null;
    } else if (!callbacks) {
      callbacks = {};
    }

    let integrationOption = callbacks.integration;
    let hasNeeds = Array.isArray(callbacks.needs);

    super('component:' + componentName, description, callbacks);

    this.componentName = componentName;

    if (hasNeeds || callbacks.unit || integrationOption === false) {
      this.isUnitTest = true;
    } else if (integrationOption) {
      this.isUnitTest = false;
    } else {
      deprecate(
        'the component:' +
          componentName +
          ' test module is implicitly running in unit test mode, ' +
          'which will change to integration test mode by default in an upcoming version of ' +
          'ember-test-helpers. Add `unit: true` or a `needs:[]` list to explicitly opt in to unit ' +
          'test mode.',
        false,
        {
          id: 'ember-test-helpers.test-module-for-component.test-type',
          until: '0.6.0',
        }
      );
      this.isUnitTest = true;
    }

    if (!this.isUnitTest && !this.isLegacy) {
      callbacks.integration = true;
    }

    if (this.isUnitTest || this.isLegacy) {
      this.setupSteps.push(this.setupComponentUnitTest);
    } else {
      this.callbacks.subject = function() {
        throw new Error(
          "component integration tests do not support `subject()`. Instead, render the component as if it were HTML: `this.render('<my-component foo=true>');`. For more information, read: http://guides.emberjs.com/current/testing/testing-components/"
        );
      };
      this.setupSteps.push(this.setupComponentIntegrationTest);
      this.teardownSteps.unshift(this.teardownComponent);
    }

    if (Ember.View && Ember.View.views) {
      this.setupSteps.push(this._aliasViewRegistry);
      this.teardownSteps.unshift(this._resetViewRegistry);
    }
  }

  initIntegration(options) {
    this.isLegacy = options.integration === 'legacy';
    this.isIntegration = options.integration !== 'legacy';
  }

  _aliasViewRegistry() {
    this._originalGlobalViewRegistry = Ember.View.views;
    var viewRegistry = this.container.lookup('-view-registry:main');

    if (viewRegistry) {
      Ember.View.views = viewRegistry;
    }
  }

  _resetViewRegistry() {
    Ember.View.views = this._originalGlobalViewRegistry;
  }

  setupComponentUnitTest() {
    var _this = this;
    var resolver = this.resolver;
    var context = this.context;

    var layoutName = 'template:components/' + this.componentName;

    var layout = resolver.resolve(layoutName);

    var thingToRegisterWith = this.registry || this.container;
    if (layout) {
      thingToRegisterWith.register(layoutName, layout);
      thingToRegisterWith.injection(this.subjectName, 'layout', layoutName);
    }
    var eventDispatcher = resolver.resolve('event_dispatcher:main');
    if (eventDispatcher) {
      thingToRegisterWith.register('event_dispatcher:main', eventDispatcher);
    }

    context.dispatcher =
      this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');

    context._element = null;

    this.callbacks.render = function() {
      var subject;

      run(function() {
        subject = context.subject();
        subject.appendTo('#ember-testing');
      });

      context._element = subject.element;

      _this.teardownSteps.unshift(function() {
        run(function() {
          tryInvoke(subject, 'destroy');
        });
      });
    };

    this.callbacks.append = function() {
      deprecate(
        'this.append() is deprecated. Please use this.render() or this.$() instead.',
        false,
        {
          id: 'ember-test-helpers.test-module-for-component.append',
          until: '0.6.0',
        }
      );
      return context.$();
    };

    context.$ = function() {
      this.render();
      var subject = this.subject();

      return subject.$.apply(subject, arguments);
    };
  }

  setupComponentIntegrationTest() {
    if (isPreGlimmer) {
      return preGlimmerSetupIntegrationForComponent.apply(this, arguments);
    } else {
      return setupComponentIntegrationTest.apply(this, arguments);
    }
  }

  setupContext() {
    super.setupContext();

    // only setup the injection if we are running against a version
    // of Ember that has `-view-registry:main` (Ember >= 1.12)
    if (
      this.container.factoryFor
        ? this.container.factoryFor('-view-registry:main')
        : this.container.lookupFactory('-view-registry:main')
    ) {
      (this.registry || this.container).injection(
        'component',
        '_viewRegistry',
        '-view-registry:main'
      );
    }

    if (!this.isUnitTest && !this.isLegacy) {
      this.context.factory = function() {};
    }
  }

  teardownComponent() {
    var component = this.component;
    if (component) {
      run(component, 'destroy');
      this.component = null;
    }
  }
}

function getOwnerFromModule(module) {
  return (getOwner && getOwner(module.container)) || module.container.owner;
}

function lookupTemplateFromModule(module, templateFullName) {
  var template = module.container.lookup(templateFullName);
  if (typeof template === 'function') template = template(getOwnerFromModule(module));
  return template;
}

export function setupComponentIntegrationTest() {
  var module = this;
  var context = this.context;

  this.actionHooks = context[ACTION_KEY] = {};
  context.dispatcher =
    this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
  context.dispatcher.setup({}, '#ember-testing');

  var hasRendered = false;
  var OutletView = module.container.factoryFor
    ? module.container.factoryFor('view:-outlet')
    : module.container.lookupFactory('view:-outlet');
  var OutletTemplate = lookupTemplateFromModule(module, 'template:-outlet');
  var toplevelView = (module.component = OutletView.create());
  var hasOutletTemplate = !!OutletTemplate;
  var outletState = {
    render: {
      owner: getOwnerFromModule(module),
      into: undefined,
      outlet: 'main',
      name: 'application',
      controller: module.context,
      ViewClass: undefined,
      template: OutletTemplate,
    },

    outlets: {},
  };

  var element = document.getElementById('ember-testing');
  var templateId = 0;

  if (hasOutletTemplate) {
    run(() => {
      toplevelView.setOutletState(outletState);
    });
  }

  context.render = function(template) {
    if (!template) {
      throw new Error('in a component integration test you must pass a template to `render()`');
    }
    if (isArray(template)) {
      template = template.join('');
    }
    if (typeof template === 'string') {
      template = Ember.Handlebars.compile(template);
    }

    var templateFullName = 'template:-undertest-' + ++templateId;
    this.registry.register(templateFullName, template);
    var stateToRender = {
      owner: getOwnerFromModule(module),
      into: undefined,
      outlet: 'main',
      name: 'index',
      controller: module.context,
      ViewClass: undefined,
      template: lookupTemplateFromModule(module, templateFullName),
      outlets: {},
    };

    if (hasOutletTemplate) {
      stateToRender.name = 'index';
      outletState.outlets.main = { render: stateToRender, outlets: {} };
    } else {
      stateToRender.name = 'application';
      outletState = { render: stateToRender, outlets: {} };
    }

    run(() => {
      toplevelView.setOutletState(outletState);
    });

    if (!hasRendered) {
      run(module.component, 'appendTo', '#ember-testing');
      hasRendered = true;
    }

    if (EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false) {
      // ensure the element is based on the wrapping toplevel view
      // Ember still wraps the main application template with a
      // normal tagged view
      context._element = element = document.querySelector('#ember-testing > .ember-view');
    } else {
      context._element = element = document.querySelector('#ember-testing');
    }
  };

  context.$ = function(selector) {
    // emulates Ember internal behavor of `this.$` in a component
    // https://github.com/emberjs/ember.js/blob/v2.5.1/packages/ember-views/lib/views/states/has_element.js#L18
    return selector ? jQuery(selector, element) : jQuery(element);
  };

  context.set = function(key, value) {
    var ret = run(function() {
      return set(context, key, value);
    });

    if (hasEmberVersion(2, 0)) {
      return ret;
    }
  };

  context.setProperties = function(hash) {
    var ret = run(function() {
      return setProperties(context, hash);
    });

    if (hasEmberVersion(2, 0)) {
      return ret;
    }
  };

  context.get = function(key) {
    return get(context, key);
  };

  context.getProperties = function() {
    var args = Array.prototype.slice.call(arguments);
    return getProperties(context, args);
  };

  context.on = function(actionName, handler) {
    module.actionHooks[actionName] = handler;
  };

  context.send = function(actionName) {
    var hook = module.actionHooks[actionName];
    if (!hook) {
      throw new Error('integration testing template received unexpected action ' + actionName);
    }
    hook.apply(module.context, Array.prototype.slice.call(arguments, 1));
  };

  context.clearRender = function() {
    run(function() {
      toplevelView.setOutletState({
        render: {
          owner: module.container,
          into: undefined,
          outlet: 'main',
          name: 'application',
          controller: module.context,
          ViewClass: undefined,
          template: undefined,
        },
        outlets: {},
      });
    });
  };
}
