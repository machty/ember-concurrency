import Ember from 'ember';
import { forEach } from 'ember-concurrency';
import {
  interval,
} from 'ember-concurrency';

import {
  _dropIntermediateValues,
  _keepLastIntermediateValue,
  _restartable,
  _enqueue,
} from 'ember-concurrency/iteration';

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

function doBufferingTest(description, observable, bufferPolicyFn, expectations, maxConcurrency) {
  test(description, function(assert) {
    QUnit.stop();
    assert.expect(2);

    let last = expectations[expectations.length-1];

    let sem = 0;
    let maxSem = 0;
    function bumpSemaphore(inc) {
      sem = sem + inc;
      maxSem = Math.max(maxSem, sem);
    }

    let arr = [];
    Ember.run(() => {
      let obj = Ember.Object.create();
      return forEach(observable, function * (v) {
        try {
          bumpSemaphore(+1);
          yield interval(10);
          arr.push(v);
          if (v === last) {
            Ember.run.later(() => {
              QUnit.start();
              assert.equal(maxSem, maxConcurrency);
              assert.deepEqual(arr, expectations);
            }, 20);
          }
        } finally {
          bumpSemaphore(-1);
        }
      }, bufferPolicyFn).attach(obj);
    });
  });
}

doBufferingTest("no buffering: ranges", rangeObservable, null, [1,2,3,4,5,101,102,103,104,105], 5);
doBufferingTest("no buffering: sporadic", sporadicObservable, null, [1,2,3,4,5,6], 3);

doBufferingTest("enqueue: ranges", rangeObservable, _enqueue, [1,2,3,4,5,101,102,103,104,105], 1);
doBufferingTest("enqueue: sporadic", sporadicObservable, _enqueue, [1,2,3,4,5,6], 1);

doBufferingTest("dropIntermediateValues: ranges",   rangeObservable,    _dropIntermediateValues, [1,101], 1);
doBufferingTest("dropIntermediateValues: sporadic", sporadicObservable, _dropIntermediateValues, [1,4], 1);

//doBufferingTest("keepFirstIntermediateValue: ranges",   rangeObservable,    _keepFirstIntermediateValue, [1, 2, 101, 102]);
//doBufferingTest("keepFirstIntermediateValue: sporadic", sporadicObservable, _keepFirstIntermediateValue, [1,2,4,5]);

doBufferingTest("keepLastIntermediateValue: ranges",   rangeObservable,    _keepLastIntermediateValue, [1, 5, 101, 105], 1);
doBufferingTest("keepLastIntermediateValue: sporadic", sporadicObservable, _keepLastIntermediateValue, [1, 3, 4, 6], 1);

  //doBufferingTest("restartable: ranges",   rangeObservable,    _restartable, [5, 105]); // TODO: revisit this
doBufferingTest("restartable: sporadic", sporadicObservable, _restartable, [3, 6], 1);
