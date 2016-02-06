import Ember from 'ember';
import { forEach } from 'ember-concurrency';
import {
  interval,
  dropIntermediateValues,
  keepFirstIntermediateValue,
  keepLastIntermediateValue,
  restartable,
} from 'ember-concurrency';

const Observable = window.Rx.Observable;

const {
  range,
  just,
} = Observable;

// 1 2 3 4 5 (150ms) 101 102 103 104 105
let rangeObservable = Observable.concat(
  range(1,5),
  range(101,5).delay(150)
);

// 1 (2ms) 2 3 (100ms) 4 5 6
let sporadicObservable = Observable.concat(
  just(1),
  just(2).delay(5),
  just(3),
  just(4).delay(100),
  just(5),
  just(6)
);

module('Unit: buffering');

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

        yield interval(10);
        arr.push(v);
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

doBufferingTest("no buffering: ranges", rangeObservable, Ember.K, [1,2,3,4,5,101,102,103,104,105]);
doBufferingTest("no buffering: sporadic", sporadicObservable, Ember.K, [1,2,3,4,5,6]);

doBufferingTest("dropIntermediateValues: ranges",   rangeObservable,    dropIntermediateValues, [1,101]);
doBufferingTest("dropIntermediateValues: sporadic", sporadicObservable, dropIntermediateValues, [1,4]);

doBufferingTest("keepFirstIntermediateValue: ranges",   rangeObservable,    keepFirstIntermediateValue, [1, 2, 101, 102]);
doBufferingTest("keepFirstIntermediateValue: sporadic", sporadicObservable, keepFirstIntermediateValue, [1,2,4,5]);

doBufferingTest("keepLastIntermediateValue: ranges",   rangeObservable,    keepLastIntermediateValue, [1, 5, 101, 105]);
doBufferingTest("keepLastIntermediateValue: sporadic", sporadicObservable, keepLastIntermediateValue, [1, 3, 4, 6]);

doBufferingTest("restartable: ranges",   rangeObservable,    restartable, [5, 105]); // yuno pass?
doBufferingTest("restartable: sporadic", sporadicObservable, restartable, [3, 6]);
