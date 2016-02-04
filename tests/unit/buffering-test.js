import Ember from 'ember';
import { forEach } from 'ember-concurrency';
import { interval, dropIntermediateValues } from 'ember-concurrency';

const Observable = window.Rx.Observable;

const {
  range,
  just,
} = Observable;

module('Unit: buffering');

// emits 1-10 right away, then 101-110 150ms later
let rangeObservable = Observable.concat(
  range(1,10),
  range(101,10).delay(150)
);

// 1 (5ms) 2 3 (100ms) 4 5 6
let sporadicObservable = Observable.concat(
  just(1),
  just(2).delay(5),
  just(3),
  just(4).delay(100),
  just(5),
  just(6)
);

function doBufferingTest(description, observable, bufferPolicyFn, expectations) {
  test(description, function(assert) {
    QUnit.stop();
    assert.expect(1);

    let last = expectations[expectations.length-1];

    let arr = [];
    Ember.run(() => {
      let obj = Ember.Object.create();
      forEach(observable, function * (v) {
        bufferPolicyFn();

        arr.push(v);
        yield interval(10);
        if (v === last) {
          Ember.run.later(() => {
            QUnit.start();
            assert.deepEqual(arr, expectations);
          }, 20);
        }
      }).attach(obj);
    });
  });
}

doBufferingTest("dropIntermediateValues: ranges", rangeObservable, dropIntermediateValues, [1,101]);
doBufferingTest("dropIntermediateValues: sporadic", sporadicObservable, dropIntermediateValues, [1,4]);

