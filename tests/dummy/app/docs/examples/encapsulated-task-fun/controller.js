import Controller from '@ember/controller';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET encapsulated-task-fun-controller
import { task, timeout, all } from 'ember-concurrency';

function * sharedFn() {
  yield timeout(Math.random() * 2000);
  return randomWord();
}

export default Controller.extend({
  doStuff: task({
    perform: function * () {
      return all([
        this.get('foo').perform(),
        this.get('bar').perform(),
        this.get('baz').perform(),
      ]);
    },

    foo: task(sharedFn),
    bar: task(sharedFn),
    baz: task(sharedFn),
  }).restartable(),
});
// END-SNIPPET

