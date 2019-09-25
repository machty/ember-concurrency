import { set, setProperties, get, getProperties } from '@ember/object';
import { run } from '@ember/runloop';
import { isArray } from '@ember/array';
import Component from '@ember/component';
import Ember from 'ember';

import hasEmberVersion from '../has-ember-version';

export function preGlimmerSetupIntegrationForComponent() {
  var module = this;
  var context = this.context;

  this.actionHooks = {};

  context.dispatcher =
    this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
  context.dispatcher.setup({}, '#ember-testing');
  context.actions = module.actionHooks;

  (this.registry || this.container).register('component:-test-holder', Component.extend());

  context.render = function(template) {
    // in case `this.render` is called twice, make sure to teardown the first invocation
    module.teardownComponent();

    if (!template) {
      throw new Error('in a component integration test you must pass a template to `render()`');
    }
    if (isArray(template)) {
      template = template.join('');
    }
    if (typeof template === 'string') {
      template = Ember.Handlebars.compile(template);
    }
    module.component = module.container.lookupFactory('component:-test-holder').create({
      layout: template,
    });

    module.component.set('context', context);
    module.component.set('controller', context);

    run(function() {
      module.component.appendTo('#ember-testing');
    });

    context._element = module.component.element;
  };

  context.$ = function() {
    return module.component.$.apply(module.component, arguments);
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
    hook.apply(module, Array.prototype.slice.call(arguments, 1));
  };

  context.clearRender = function() {
    module.teardownComponent();
  };
}
