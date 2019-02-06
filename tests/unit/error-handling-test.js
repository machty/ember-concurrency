import { run } from '@ember/runloop';
import { defer, reject } from 'rsvp';
import EmberObject from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: task error handling', function() {
  test("explicitly canceling parent task: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }),

      child: task(function * () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.get('parent').cancelAll();
    });
  });

  test("parent task canceled by restartable policy: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }).restartable(),

      child: task(function * () {
        childDefer = defer();
        yield childDefer.promise;
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform();
    });
    assert.ok(childDefer);
    run(() => {
      obj.get('parent').perform();
    });
  });

  test("parent task perform attempt canceled by drop policy: no errors", function(assert) {
    assert.expect(1);

    let childDefer;
    let Obj = EmberObject.extend({
      parent: task(function * () {
        yield this.get('child').perform();
      }).drop(),

      child: task(function * () {
        childDefer = defer();
        try {
          yield childDefer.promise;
        } catch(e) {
          assert.ok(false);
        }
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('parent').perform(1);
    });
    assert.ok(childDefer);

    run(() => {
      obj.get('parent').perform(2);
    });

    run(() => {
      obj.get('parent').cancelAll();
    });
  });

  test("task that throws error should stop", async function(assert) {
    let state = 0;
    let throwError = () => { throw "whoops"; };
    let Obj = EmberObject.extend({
      taskThatFails: task(function * () {
        yield timeout(1);
        state = 1;
        throwError();
        yield timeout(1);
        state = 2;
      })
    });

    let obj = Obj.create();
    try {
      await obj.taskThatFails.perform();
    } catch(e) {
     assert.equal(e, "whoops");
    }
    assert.ok(obj.taskThatFails.last.isError);
    assert.equal(state, 1, "stopped after error");
  });

  test("task that catches error should continue", async function(assert) {
    let state = 0;
    let throwError = () => { throw "whoops"; };
    let Obj = EmberObject.extend({
      taskThatFails: task(function * () {
        yield timeout(1);
        state = 1;
        try {
          throwError();
        } catch(e) {
          assert.equal(e, "whoops", "correct error was thrown");
        }
        yield timeout(1);
        state = 2;
      })
    });

    let obj = Obj.create();
    try {
      await obj.taskThatFails.perform();
    } catch(e) {
      assert.notOk(true, "should not have an error result for task");
    }
    assert.notOk(obj.taskThatFails.last.isError, "task should not be in error state");
    assert.equal(state, 2, "continued after error");
  });

  test("task that catches rejection in yield block should continue", async function(assert) {
    let state = 0;
    let throwError = () => { return reject("whoops"); };
    let Obj = EmberObject.extend({
      taskThatFails: task(function * () {
        yield timeout(1);
        state = 1;
        try {
          yield throwError();
        } catch(e) {
          assert.equal(e, "whoops", "correct error was thrown");
        }
        yield timeout(1);
        state = 2;
      })
    });

    let obj = Obj.create();
    try {
      await obj.taskThatFails.perform();
    } catch(e) {
      assert.notOk(true, "should not have an error result for task");
    }
    assert.notOk(obj.taskThatFails.last.isError, "task should not be in error state");
    assert.equal(state, 2, "continued after error");
  });

  test("task that catches throw in yield block should continue and should not be in error state when object is destroyed", async function(assert) {
    let state = 0;
    let throwError = () => { throw "whoops"; };
    let i=0;
    let Obj = EmberObject.extend({
      taskThatFails: task(function * () {
        while(i++ < 10) {
          yield timeout(10);
          state = 1;
          try {
            yield throwError();
          } catch(e) {
            assert.equal(e, "whoops", "correct error was thrown");
          }
          yield timeout(1);
          state = 2;
        }
      }).restartable()
    });

    let obj = Obj.create();
    try {
      let promise = obj.taskThatFails.perform();

      await timeout(50);
      obj.destroy();
      
      await promise;
    } catch(e) {
      assert.notOk(true, "should not have an error result for task");
    }
    assert.notOk(obj.taskThatFails.last.isError, "task should not be in error state");
    assert.equal(state, 2, "continued after error");
  });

});