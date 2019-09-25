import { run } from '@ember/runloop';
import { Promise as EmberPromise, resolve } from 'rsvp';
import { assign } from '@ember/polyfills';
import { _setupPromiseListeners, _teardownPromiseListeners } from './ext/rsvp';
import { _setupAJAXHooks, _teardownAJAXHooks } from '@ember/test-helpers/settled';
import { getContext, setContext, unsetContext } from '@ember/test-helpers';

import Ember from 'ember';

export default class {
  constructor(name, options) {
    this.context = undefined;
    this.name = name;
    this.callbacks = options || {};

    this.initSetupSteps();
    this.initTeardownSteps();
  }

  setup(assert) {
    Ember.testing = true;
    Ember.run.backburner.DEBUG = true;
    return this.invokeSteps(this.setupSteps, this, assert).then(() => {
      this.contextualizeCallbacks();
      return this.invokeSteps(this.contextualizedSetupSteps, this.context, assert);
    });
  }

  teardown(assert) {
    return this.invokeSteps(this.contextualizedTeardownSteps, this.context, assert)
      .then(() => {
        return this.invokeSteps(this.teardownSteps, this, assert);
      })
      .then(() => {
        this.cache = null;
        this.cachedCalls = null;
      })
      .finally(function() {
        Ember.testing = false;
      });
  }

  initSetupSteps() {
    this.setupSteps = [];
    this.contextualizedSetupSteps = [];

    if (this.callbacks.beforeSetup) {
      this.setupSteps.push(this.callbacks.beforeSetup);
      delete this.callbacks.beforeSetup;
    }

    this.setupSteps.push(this.setupContext);
    this.setupSteps.push(this.setupTestElements);
    this.setupSteps.push(this.setupAJAXListeners);
    this.setupSteps.push(this.setupPromiseListeners);

    if (this.callbacks.setup) {
      this.contextualizedSetupSteps.push(this.callbacks.setup);
      delete this.callbacks.setup;
    }
  }

  invokeSteps(steps, context, assert) {
    steps = steps.slice();

    function nextStep() {
      var step = steps.shift();
      if (step) {
        // guard against exceptions, for example missing components referenced from needs.
        return new EmberPromise(resolve => {
          resolve(step.call(context, assert));
        }).then(nextStep);
      } else {
        return resolve();
      }
    }
    return nextStep();
  }

  contextualizeCallbacks() {}

  initTeardownSteps() {
    this.teardownSteps = [];
    this.contextualizedTeardownSteps = [];

    if (this.callbacks.teardown) {
      this.contextualizedTeardownSteps.push(this.callbacks.teardown);
      delete this.callbacks.teardown;
    }

    this.teardownSteps.push(this.teardownContext);
    this.teardownSteps.push(this.teardownTestElements);
    this.teardownSteps.push(this.teardownAJAXListeners);
    this.teardownSteps.push(this.teardownPromiseListeners);

    if (this.callbacks.afterTeardown) {
      this.teardownSteps.push(this.callbacks.afterTeardown);
      delete this.callbacks.afterTeardown;
    }
  }

  setupTestElements() {
    let testElementContainer = document.querySelector('#ember-testing-container');
    if (!testElementContainer) {
      testElementContainer = document.createElement('div');
      testElementContainer.setAttribute('id', 'ember-testing-container');
      document.body.appendChild(testElementContainer);
    }

    let testEl = document.querySelector('#ember-testing');
    if (!testEl) {
      let element = document.createElement('div');
      element.setAttribute('id', 'ember-testing');

      testElementContainer.appendChild(element);
      this.fixtureResetValue = '';
    } else {
      this.fixtureResetValue = testElementContainer.innerHTML;
    }
  }

  setupContext(options) {
    let context = this.getContext();

    assign(
      context,
      {
        dispatcher: null,
        inject: {},
      },
      options
    );

    this.setToString();
    setContext(context);
    this.context = context;
  }

  setContext(context) {
    this.context = context;
  }

  getContext() {
    if (this.context) {
      return this.context;
    }

    return (this.context = getContext() || {});
  }

  setToString() {
    this.context.toString = () => {
      if (this.subjectName) {
        return `test context for: ${this.subjectName}`;
      }

      if (this.name) {
        return `test context for: ${this.name}`;
      }
    };
  }

  setupAJAXListeners() {
    _setupAJAXHooks();
  }

  teardownAJAXListeners() {
    _teardownAJAXHooks();
  }

  setupPromiseListeners() {
    _setupPromiseListeners();
  }

  teardownPromiseListeners() {
    _teardownPromiseListeners();
  }

  teardownTestElements() {
    document.getElementById('ember-testing-container').innerHTML = this.fixtureResetValue;

    // Ember 2.0.0 removed Ember.View as public API, so only do this when
    // Ember.View is present
    if (Ember.View && Ember.View.views) {
      Ember.View.views = {};
    }
  }

  teardownContext() {
    var context = this.context;
    this.context = undefined;
    unsetContext();

    if (context && context.dispatcher && !context.dispatcher.isDestroyed) {
      run(function() {
        context.dispatcher.destroy();
      });
    }
  }
}
