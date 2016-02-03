import Ember from 'ember';
import { _makeIteration } from 'ember-concurrency/iteration';
import { _makeIteratorFromFunction } from 'ember-concurrency/iterators';

module('Unit: Iterations');

function * oneTwoThree() {
  yield 1;
  yield 2;
  yield 3;
}

test("stepping through a Iteration", function(assert) {
  assert.expect(5);

  let iterator = _makeIteratorFromFunction(oneTwoThree, {}, []);
  let outerValue;
  let iteration = _makeIteration(iterator, v => {
    outerValue = v;
  });

  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 1 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 2 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 3 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: true, value: undefined });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: true, value: undefined });
});

test("Iterations let you .redo() the same element over and over", function(assert) {
  assert.expect(9);

  let iterator = _makeIteratorFromFunction(oneTwoThree, {}, []);
  let outerValue;
  let iteration = _makeIteration(iterator, v => {
    outerValue = v;
  });

  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 1 });
  Ember.run(iteration, 'redo');
  assert.deepEqual(outerValue, { done: false, value: 1 });
  Ember.run(iteration, 'redo');
  assert.deepEqual(outerValue, { done: false, value: 1 });
  Ember.run(iteration, 'redo');
  assert.deepEqual(outerValue, { done: false, value: 1 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 2 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: false, value: 3 });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: true, value: undefined });
  Ember.run(iteration, 'step');
  assert.deepEqual(outerValue, { done: true, value: undefined });
  Ember.run(iteration, 'redo');
  assert.deepEqual(outerValue, { done: true, value: undefined });
});

