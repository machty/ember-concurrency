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

  Ember.run(iteration, 'step', 0);
  assert.deepEqual(outerValue, { index: 1, done: false, value: 1 });
  Ember.run(iteration, 'step', 1);
  assert.deepEqual(outerValue, { index: 2, done: false, value: 2 });
  Ember.run(iteration, 'step', 2);
  assert.deepEqual(outerValue, { index: 3, done: false, value: 3 });
  Ember.run(iteration, 'step', 3);
  assert.deepEqual(outerValue, { index: 4, done: true, value: undefined });
  Ember.run(iteration, 'step', 4);
  assert.deepEqual(outerValue, { index: 5, done: true, value: undefined });
});

test("Iterations let you .redo() the same element over and over", function(assert) {
  assert.expect(9);

  let iterator = _makeIteratorFromFunction(oneTwoThree, {}, []);
  let outerValue;
  let iteration = _makeIteration(iterator, v => {
    outerValue = v;
  });

  Ember.run(iteration, 'step', 0);
  assert.deepEqual(outerValue, { index: 1, done: false, value: 1 });
  Ember.run(iteration, 'redo', 1);
  assert.deepEqual(outerValue, { index: 2, done: false, value: 1 });
  Ember.run(iteration, 'redo', 2);
  assert.deepEqual(outerValue, { index: 3, done: false, value: 1 });
  Ember.run(iteration, 'redo', 3);
  assert.deepEqual(outerValue, { index: 4, done: false, value: 1 });
  Ember.run(iteration, 'step', 4);
  assert.deepEqual(outerValue, { index: 5, done: false, value: 2 });
  Ember.run(iteration, 'step', 5);
  assert.deepEqual(outerValue, { index: 6, done: false, value: 3 });
  Ember.run(iteration, 'step', 6);
  assert.deepEqual(outerValue, { index: 7, done: true, value: undefined });
  Ember.run(iteration, 'step', 7);
  assert.deepEqual(outerValue, { index: 8, done: true, value: undefined });
  Ember.run(iteration, 'redo', 8);
  assert.deepEqual(outerValue, { index: 9, done: true, value: undefined });
});

test("Iterations let you .break() out of iteration", function(assert) {
  assert.expect(4);

  let iterator = _makeIteratorFromFunction(oneTwoThree, {}, []);
  let outerValue;
  let iteration = _makeIteration(iterator, v => {
    outerValue = v;
  });

  Ember.run(iteration, 'step', 0);
  assert.deepEqual(outerValue, { index: 1, done: false, value: 1 });
  Ember.run(iteration, 'step', 1);
  assert.deepEqual(outerValue, { index: 2, done: false, value: 2 });
  Ember.run(iteration, 'break', 2);
  assert.deepEqual(outerValue, { index: 3, done: true, value: undefined });
  Ember.run(iteration, 'step', 3);
  assert.deepEqual(outerValue, { index: 4, done: true, value: undefined });
});

test("Iterations ignore stepping functions if the wrong index is passed in", function(assert) {
  assert.expect(2);

  let iterator = _makeIteratorFromFunction(oneTwoThree, {}, []);
  let currentExpectedValue;
  let iteration = _makeIteration(iterator, v => {
    if (!currentExpectedValue) {
      assert.ok(false, "step function shouldn't have run");
    } else {
      assert.deepEqual(v, currentExpectedValue);
    }
  });

  let runAndExpect = (stepFnName, index, expectedValue) => {
    currentExpectedValue = expectedValue;
    Ember.run(iteration, stepFnName, index);
  };

  runAndExpect('step',  1, false);
  runAndExpect('step', -1, false);
  runAndExpect('step', 0, { index: 1, done: false, value: 1 });
  runAndExpect('step',  -2, false);
  runAndExpect('step', 0, false);
  runAndExpect('step', 1, { index: 2, done: false, value: 2 });
  runAndExpect('break', 0, false);
  runAndExpect('redo', 0, false);
});


