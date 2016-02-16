import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

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
    let taskCP = task(function * (v) {
      try {
        bumpSemaphore(+1);
        yield timeout(10);
        arr.push(v);
        if (v === last) {
          Ember.run.later(() => {
            QUnit.start();
            assert.equal(maxSem, maxConcurrency, "assert expected maxConcurrency");
            assert.deepEqual(arr, expectations);
          }, 20);
        }
      } finally {
        bumpSemaphore(-1);
      }
    });

    if (bufferPolicyFn) {
      taskCP = taskCP[bufferPolicyFn]();
    }

    let Obj = Ember.Object.extend({
      myTask: taskCP
    });

    Ember.run(() => {
      let obj = Obj.create();
      observable.subscribe(v => {
        Ember.run.join(() => {
          obj.get('myTask').perform(v);
        });
      });
    });
  });
}

doBufferingTest("no buffering: ranges", rangeObservable, null, [1,2,3,4,5,101,102,103,104,105], 5);
doBufferingTest("no buffering: sporadic", sporadicObservable, null, [1,2,3,4,5,6], 3);

doBufferingTest("enqueue: ranges", rangeObservable, 'enqueue', [1,2,3,4,5,101,102,103,104,105], 1);
doBufferingTest("enqueue: sporadic", sporadicObservable, 'enqueue', [1,2,3,4,5,6], 1);

doBufferingTest("dropIntermediateValues: ranges",   rangeObservable,    'drop', [1,101], 1);
doBufferingTest("dropIntermediateValues: sporadic", sporadicObservable, 'drop', [1,4], 1);

doBufferingTest("keepLastIntermediateValue: ranges",   rangeObservable,    'keepLatest', [1, 5, 101, 105], 1);
doBufferingTest("keepLastIntermediateValue: sporadic", sporadicObservable, 'keepLatest', [1, 3, 4, 6], 1);

doBufferingTest("restartable: ranges",   rangeObservable,    'restartable', [5, 105], 1);
doBufferingTest("restartable: sporadic", sporadicObservable, 'restartable', [3, 6], 1);
