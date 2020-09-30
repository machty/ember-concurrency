import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import { setOwner } from '@ember/application';
import EmberObject from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { gte } from 'ember-compatibility-helpers';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit: EncapsulatedTask', function(hooks) {
  setupTest(hooks);

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

    test("tasks can be specified via a native classes with perform methods", function(assert) {
      assert.expect(3);

      let defer, serviceCalled;

      this.owner.register('service:test-service', Service.extend({
        call() {
          serviceCalled = true;
        }
      }));

      class MyCoolEncapsulatedTaskClass {
        @service testService;

        *perform(...args) {
          assert.deepEqual(args, [1,2,3]);
          defer = RSVP.defer();
          yield defer.promise;
          this.testService.call();
          return 123;
        }
      }

      class FakeGlimmerComponent {
        @(task(MyCoolEncapsulatedTaskClass)) myTask;
      }

      let obj;
      run(() => {
        obj = new FakeGlimmerComponent();
        setOwner(obj, this.owner);

        obj.myTask.perform(1,2,3).then(v => {
          assert.ok(serviceCalled, 'expected service method to have been called');
          assert.equal(v, 123);
        });
      });
      run(defer, 'resolve');
    });

    test("tasks can be specified via an anonymous native class with perform method", function(assert) {
      assert.expect(3);

      let defer, serviceCalled;

      this.owner.register('service:test-service', Service.extend({
        call() {
          serviceCalled = true;
        }
      }));

      class FakeGlimmerComponent {
        @(task(class {
          @service testService;

          *perform(...args) {
            assert.deepEqual(args, [1,2,3]);
            defer = RSVP.defer();
            yield defer.promise;
            this.testService.call();
            return 123;
          }
        })) myTask;
      }

      let obj;
      run(() => {
        obj = new FakeGlimmerComponent();
        setOwner(obj, this.owner);

        obj.myTask.perform(1,2,3).then(v => {
          assert.ok(serviceCalled, 'expected service method to have been called');
          assert.equal(v, 123);
        });
      });
      run(defer, 'resolve');
    });
  }
});
