import { run } from '@ember/runloop';
import { task } from 'ember-concurrency';
import { module, test } from 'qunit';

module('Unit: test environment', function () {
  test(`mock task can be created in a test`, function (assert) {
    assert.expect(1);

    let taskRan = false;

    class TestObject {
      doAsync = task(async () => {
        taskRan = true;
        await true;
      });
    }

    let myMock = new TestObject();

    run(() => {
      return myMock.doAsync.perform().then(() => {
        assert.ok(taskRan);
      });
    });
  });
});
