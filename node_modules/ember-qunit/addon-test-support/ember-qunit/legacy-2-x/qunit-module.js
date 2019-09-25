import Ember from 'ember';
import { module as qunitModule } from 'qunit';

function noop() {}

function callbackFor(name, callbacks) {
  if (typeof callbacks !== 'object') {
    return noop;
  }
  if (!callbacks) {
    return noop;
  }

  var callback = noop;

  if (callbacks[name]) {
    callback = callbacks[name];
    delete callbacks[name];
  }

  return callback;
}

export function createModule(Constructor, name, description, callbacks) {
  if (!callbacks && typeof description === 'object') {
    callbacks = description;
    description = name;
  }

  var before = callbackFor('before', callbacks);
  var beforeEach = callbackFor('beforeEach', callbacks);
  var afterEach = callbackFor('afterEach', callbacks);
  var after = callbackFor('after', callbacks);

  var module;
  var moduleName = typeof description === 'string' ? description : name;

  qunitModule(moduleName, {
    before() {
      // storing this in closure scope to avoid exposing these
      // private internals to the test context
      module = new Constructor(name, description, callbacks);
      return before.apply(this, arguments);
    },

    beforeEach() {
      // provide the test context to the underlying module
      module.setContext(this);

      return module.setup(...arguments).then(() => {
        return beforeEach.apply(this, arguments);
      });
    },

    afterEach() {
      let result = afterEach.apply(this, arguments);
      return Ember.RSVP.resolve(result).then(() => module.teardown(...arguments));
    },

    after() {
      try {
        return after.apply(this, arguments);
      } finally {
        after = afterEach = before = beforeEach = callbacks = module = null;
      }
    },
  });
}
