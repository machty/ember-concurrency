import { module, test as qunitTest } from 'qunit';
import TaskInstance from 'ember-concurrency/-task-instance';

function test(description, generatorFn) {
  qunitTest(description, function(assert) {
    let done = assert.async();
    TaskInstance.create({
      _runLoop: false,
      fn: generatorFn,
      args: [assert],
      context: this,
    })._start().finally(done);
  });
}

export {
  test
};

