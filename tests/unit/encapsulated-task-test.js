import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import EmberObject from '@ember/object';
import { task } from 'ember-concurrency';
import { gte } from 'ember-compatibility-helpers';
import { module, test } from 'qunit';

module('Unit: EncapsulatedTask', function() {
  test("tasks can be specified via a pojos with perform methods", function(assert) {
    assert.expect(2);

    let defer;
    let Obj = EmberObject.extend({
      myTask: task({
        *perform(...args) {
          assert.deepEqual(args, [1,2,3]);
          defer = RSVP.defer();
          yield defer.promise;
          return 123;
        }
      }),
    });

    let obj;
    run(() => {
      obj = Obj.create();
      obj.get('myTask').perform(1,2,3).then(v => {
        assert.equal(v, 123);
      });
    });
    run(defer, 'resolve');
  });

  test("tasks can have their state accessed", async function(assert) {
    assert.expect(2);

    let defer;
    let Obj = EmberObject.extend({
      myTask: task({
        someProp: false,

        *perform() {
          defer = RSVP.defer();
          yield defer.promise;
          this.set('someProp', true);
        }
      }),
    });

    let obj = Obj.create();
    const taskInstance = obj.get('myTask').perform(1,2,3);
    assert.equal(taskInstance.someProp, false);

    defer.resolve();
    await taskInstance;
    assert.equal(taskInstance.someProp, true);
  });

  if (gte('3.10.0')) {
    test("encapsulated tasks work with native ES classes and decorators", function(assert) {
      assert.expect(2);

      let defer;

      class FakeGlimmerComponent {
        @(task({
          *perform(...args) {
            assert.deepEqual(args, [1,2,3]);
            defer = RSVP.defer();
            yield defer.promise;
            return 123;
          }
        })) myTask;
      }

      let obj;
      run(() => {
        obj = new FakeGlimmerComponent();
        obj.myTask.perform(1,2,3).then(v => {
          assert.equal(v, 123);
        });
      });
      run(defer, 'resolve');
    });
  }
});
