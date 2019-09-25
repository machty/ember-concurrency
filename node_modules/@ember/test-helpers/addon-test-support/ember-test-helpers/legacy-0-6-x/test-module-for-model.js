/* global DS, requirejs */ // added here to prevent an import from erroring when ED is not present

import { run } from '@ember/runloop';
import require from 'require';
import TestModule from './test-module';

export default class extends TestModule {
  constructor(modelName, description, callbacks) {
    super('model:' + modelName, description, callbacks);

    this.modelName = modelName;

    this.setupSteps.push(this.setupModel);
  }

  setupModel() {
    var container = this.container;
    var defaultSubject = this.defaultSubject;
    var callbacks = this.callbacks;
    var modelName = this.modelName;

    var adapterFactory = container.factoryFor
      ? container.factoryFor('adapter:application')
      : container.lookupFactory('adapter:application');
    if (!adapterFactory) {
      if (requirejs.entries['ember-data/adapters/json-api']) {
        adapterFactory = require('ember-data/adapters/json-api')['default'];
      }

      // when ember-data/adapters/json-api is provided via ember-cli shims
      // using Ember Data 1.x the actual JSONAPIAdapter isn't found, but the
      // above require statement returns a bizzaro object with only a `default`
      // property (circular reference actually)
      if (!adapterFactory || !adapterFactory.create) {
        adapterFactory = DS.JSONAPIAdapter || DS.FixtureAdapter;
      }

      var thingToRegisterWith = this.registry || this.container;
      thingToRegisterWith.register('adapter:application', adapterFactory);
    }

    callbacks.store = function() {
      var container = this.container;
      return container.lookup('service:store') || container.lookup('store:main');
    };

    if (callbacks.subject === defaultSubject) {
      callbacks.subject = function(options) {
        var container = this.container;

        return run(function() {
          var store = container.lookup('service:store') || container.lookup('store:main');
          return store.createRecord(modelName, options);
        });
      };
    }
  }
}
