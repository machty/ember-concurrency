import Ember from 'ember';
import { forEach } from 'ember-concurrency';
import { interval, dropIntermediateValues } from 'ember-concurrency';

const Observable = window.Rx.Observable;

const {
  range,
  just,
} = Observable;

module('Unit: buffering');

test("async forEach: dropIntermediateValues", function(assert) {
  QUnit.stop();
  assert.expect(1);

  // emits 1-10 right away, then 101-110 150ms later
  let observable = Observable.concat(
    range(1,10),
    range(101,10).delay(150)
  );

  let arr = [];
  Ember.run(() => {
    let obj = Ember.Object.create();
    forEach(observable, function * (v) {
      dropIntermediateValues();

      arr.push(v);
      yield interval(10);
      if (v === 101) {
        Ember.run.later(() => {
          QUnit.start();
          assert.deepEqual(arr, [1,101]);
        }, 20);
      }
    }).attach(obj);
  });
});

test("async forEach: dropIntermediateValues", function(assert) {
  QUnit.stop();
  assert.expect(1);

  // 1 (5ms) 2 3 (100ms) 4 5 6
  let observable = Observable.concat(
    just(1),
    just(2).delay(5),
    just(3),
    just(4).delay(100),
    just(5),
    just(6)
  );

  let arr = [];
  Ember.run(() => {
    let obj = Ember.Object.create();
    forEach(observable, function * (v) {
      dropIntermediateValues();

      arr.push(v);
      yield interval(50);
      if (v === 4) {
        Ember.run.later(() => {
          QUnit.start();
          assert.deepEqual(arr, [1,4]);
        }, 20);
      }
    }).attach(obj);
  });
});



