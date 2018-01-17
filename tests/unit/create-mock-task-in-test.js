import { get } from '@ember/object';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { task } from 'ember-concurrency';

module('Unit: test environment', function() {
  test(`mock task can be created in a test`, function (assert) {
    assert.expect(1);

    let taskRan = false;
    let myMock = {
      doAsync: task(function* () {
        taskRan = true;
        yield true;
      })
    };

    run(() => {
      return get(myMock, 'doAsync').perform()
        .then(() => {
          assert.ok(taskRan);
        });
    });
  });
});