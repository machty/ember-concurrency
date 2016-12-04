import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

const originalWarn = Ember.Logger.warn;
let warnings;
module('Deprecations', {
  beforeEach() {
    warnings = [];
    Ember.Logger.warn = (w) => {
      warnings.push(w);
    };
  },
  afterEach() {
    Ember.Logger.warn = originalWarn;
  }
});

test("warn if using maxConcurrency without specifying other task modifier", function(assert) {
  assert.expect(3);

  let Obj = Ember.Object.extend({
    a: task(function * () { }).maxConcurrency(3),
    b: task(function * () { }).enqueue().maxConcurrency(10000),
    c: task(function * () { }).restartable().maxConcurrency(10000),
    d: task(function * () { }).drop().maxConcurrency(10000),
    e: task(function * () { }).keepLatest().maxConcurrency(10000),
    f: task(function * () { }).enqueue().maxConcurrency(10000),
    g: task(function * () { }).maxConcurrency(1),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
  });
  warnings.sort();
  assert.equal(warnings.length, 2);
  assert.ok(warnings[0].match(/a: task/));
  assert.ok(warnings[1].match(/g: task/));
});


