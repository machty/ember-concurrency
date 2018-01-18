import EmberObject from '@ember/object';
import { later, run, join } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

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

module('Unit: buffering', function() {
  function doBufferingTest(description, observable, bufferPolicyFn, expectations, maxConcurrency) {
    test(description, function(assert) {
      let start = assert.async();
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
            later(() => {
              assert.equal(maxSem, maxConcurrency, "assert expected maxConcurrency");
              assert.deepEqual(arr, expectations);
              start();
            }, 20);
          }
        } finally {
          bumpSemaphore(-1);
        }
      });

      taskCP = bufferPolicyFn(taskCP);

      let Obj = EmberObject.extend({
        myTask: taskCP
      });

      run(() => {
        let obj = Obj.create();
        observable.subscribe(v => {
          join(() => {
            obj.get('myTask').perform(v);
          });
        });
      });
    });
  }

  doBufferingTest("default buffering: ranges",   rangeObservable,    (t) => t, [1,2,3,4,5,101,102,103,104,105], 5);
  doBufferingTest("default buffering: sporadic", sporadicObservable, (t) => t, [1,2,3,4,5,6], 3);

  doBufferingTest("enqueue: ranges",      rangeObservable,    (t) => t.enqueue(),                   [1,2,3,4,5,101,102,103,104,105], 1);
  doBufferingTest("enqueue: sporadic",    sporadicObservable, (t) => t.enqueue(),                   [1,2,3,4,5,6], 1);
  doBufferingTest("enqueue(3): ranges",   rangeObservable,    (t) => t.enqueue().maxConcurrency(3), [1,2,3,4,5,101,102,103,104,105], 3);
  doBufferingTest("enqueue(3): sporadic", sporadicObservable, (t) => t.enqueue().maxConcurrency(3), [1,2,3,4,5,6], 3);
  doBufferingTest("enqueue(2): ranges",   rangeObservable,    (t) => t.enqueue().maxConcurrency(2), [1,2,3,4,5,101,102,103,104,105], 2);
  doBufferingTest("enqueue(2): sporadic", sporadicObservable, (t) => t.enqueue().maxConcurrency(2), [1,2,3,4,5,6], 2);

  doBufferingTest("drop: ranges",      rangeObservable,    (t) => t.drop(), [1,101], 1);
  doBufferingTest("drop: sporadic",    sporadicObservable, (t) => t.drop(), [1,4], 1);
  doBufferingTest("drop(3): ranges",   rangeObservable,    (t) => t.drop().maxConcurrency(3), [1,2,3,101,102,103], 3);
  doBufferingTest("drop(3): sporadic", sporadicObservable, (t) => t.drop().maxConcurrency(3), [1,2,3,4,5,6], 3);
  doBufferingTest("drop(2): ranges",   rangeObservable,    (t) => t.drop().maxConcurrency(2), [1,2,101,102], 2);
  doBufferingTest("drop(2): sporadic", sporadicObservable, (t) => t.drop().maxConcurrency(2), [1,2,4,5], 2);

  doBufferingTest("keepLatest: ranges",      rangeObservable,    (t) => t.keepLatest(),                   [1,5,101,105], 1);
  doBufferingTest("keepLatest: sporadic",    sporadicObservable, (t) => t.keepLatest(),                   [1,3,4,6],1);
  doBufferingTest("keepLatest(3): ranges",   rangeObservable,    (t) => t.keepLatest().maxConcurrency(3), [1,2,3,5,101,102,103,105], 3);
  doBufferingTest("keepLatest(3): sporadic", sporadicObservable, (t) => t.keepLatest().maxConcurrency(3), [1,2,3,4,5,6], 3);
  doBufferingTest("keepLatest(2): ranges",   rangeObservable,    (t) => t.keepLatest().maxConcurrency(2), [1,2,5,101,102,105], 2);
  doBufferingTest("keepLatest(2): sporadic", sporadicObservable, (t) => t.keepLatest().maxConcurrency(2), [1,2,3,4,5,6], 2);

  doBufferingTest("restartable: ranges",      rangeObservable,     (t) => t.restartable(), [5, 105], 5);
  doBufferingTest("restartable: sporadic",    sporadicObservable,  (t) => t.restartable(), [3, 6], 2);
  doBufferingTest("restartable(3): ranges",   rangeObservable,     (t) => t.restartable().maxConcurrency(3), [3,4,5,103,104,105], 5);
  doBufferingTest("restartable(3): sporadic", sporadicObservable,  (t) => t.restartable().maxConcurrency(3), [1,2,3,4,5,6], 3);
});