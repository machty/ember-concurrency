/* eslint-disable no-console */
import { defer } from 'rsvp';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

const originalWarn = console.warn;

module('Unit: self-cancel loops', function(hooks) {
  hooks.afterEach(function() {
    console.warn = originalWarn;
    Ember.ENV.DEBUG_TASKS = false;
  });

  test("a warning is logged when a non-link-specified cross object parent->child cancelation occurs due to parent object's destruction", function(assert) {
    assert.expect(2);

    let warnings = [];
    console.warn = (...args) => {
      warnings.push(args);
    };

    let Obj = EmberObject.extend({
      a: task(function * () {
        yield this.get('child.b').perform();
      }),

      b: task(function * () {
        yield defer().promise;
      }),

      c: task(function * () {
        yield this.get('child.b').linked().perform();
      }),

      child: null,
    });

    let child, canceledParent, destroyedParent;
    run(() => {
      child = Obj.create();
      canceledParent = Obj.create({ child });
      destroyedParent = Obj.create({ child });
      canceledParent.get('a').perform();
      destroyedParent.get('a').perform();
    });

    run(() => {
      destroyedParent.destroy();
      canceledParent.get('a').cancelAll();
    });

    assert.deepEqual(warnings, [
      [
        "ember-concurrency detected a potentially hazardous \"self-cancel loop\" between parent task `a` and child task `b`. If you want child task `b` to be canceled when parent task `a` is canceled, please change `.perform()` to `.linked().perform()`. If you want child task `b` to keep running after parent task `a` is canceled, change it to `.unlinked().perform()`"
      ]
    ]);
    warnings.length = 0;

    run(() => {
      child = Obj.create();
      destroyedParent = Obj.create({ child });
      destroyedParent.get('c').perform();
    });

    run(() => { destroyedParent.destroy(); });
    assert.equal(warnings.length, 0);
  });
});
