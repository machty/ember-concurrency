import Ember from 'ember';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: toFunction');

test("basic", function(assert) {
  assert.expect(1);

  let value;
  Ember.run(() => {
    let fn = task(function * () {
      return 123;
    }).toFunction();

    fn().then((v) => {
      value = v;
    });
  });

  assert.equal(value, 123);
});

