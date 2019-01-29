/* eslint-disable no-console */
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

const originalWarn = console.warn;
let warnings;

module('Deprecations', function(hooks) {
  hooks.beforeEach(function() {
    warnings = [];
    console.warn = (w) => {
      warnings.push(w);
    };
  });

  hooks.afterEach(function() {
    console.warn = originalWarn;
  });

  test("warn if using maxConcurrency without specifying other task modifier", function(assert) {
    assert.expect(3);

    let Obj = EmberObject.extend({
      a: task(function * () { }).maxConcurrency(3),
      b: task(function * () { }).enqueue().maxConcurrency(10000),
      c: task(function * () { }).restartable().maxConcurrency(10000),
      d: task(function * () { }).drop().maxConcurrency(10000),
      e: task(function * () { }).keepLatest().maxConcurrency(10000),
      f: task(function * () { }).enqueue().maxConcurrency(10000),
      g: task(function * () { }).maxConcurrency(1),
    });

    run(() => {
      Obj.create();
    });
    warnings.sort();
    assert.equal(warnings.length, 2);
    assert.ok(warnings[0].match(/a: task/));
    assert.ok(warnings[1].match(/g: task/));
  });
});