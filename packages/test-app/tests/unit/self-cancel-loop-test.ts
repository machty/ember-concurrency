/* eslint-disable no-console */
import { destroy } from '@ember/destroyable';
import { run } from '@ember/runloop';
import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';
import { defer } from 'rsvp';

const originalWarn = console.warn;

module('Unit: self-cancel loops', function (hooks) {
  hooks.afterEach(function () {
    console.warn = originalWarn;
    Ember.ENV.DEBUG_TASKS = false;
  });

  test("a warning is logged when a non-link-specified cross object parent->child cancelation occurs due to parent object's destruction", function (assert) {
    assert.expect(2);

    let warnings: any[] = [];
    console.warn = (...args: any[]) => {
      warnings.push(args);
    };

    class TestObj {
      child: TestObj | null = null;

      a = task(async () => {
        await this.child!.b.perform();
      });

      b = task(async () => {
        await defer().promise;
      });

      c = task(async () => {
        await this.child!.b.linked().perform();
      });
    }

    let child: TestObj, canceledParent: TestObj, destroyedParent: TestObj;
    run(() => {
      child = new TestObj();
      canceledParent = new TestObj();
      canceledParent.child = child;
      destroyedParent = new TestObj();
      destroyedParent.child = child;
      canceledParent.a.perform();
      destroyedParent.a.perform();
    });

    run(() => {
      destroy(destroyedParent);
      canceledParent.a.cancelAll();
    });

    assert.deepEqual(warnings, [
      [
        'ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task `a` and child task `b`. If you want child task `b` to be canceled when parent task `a` is canceled, please change `.perform()` to `.linked().perform()`. If you want child task `b` to keep running after parent task `a` is canceled, change it to `.unlinked().perform()`',
      ],
    ]);
    warnings.length = 0;

    run(() => {
      child = new TestObj();
      destroyedParent = new TestObj();
      destroyedParent.child = child;
      destroyedParent.c.perform();
    });

    run(() => {
      destroy(destroyedParent);
    });
    assert.strictEqual(warnings.length, 0);
  });
});
