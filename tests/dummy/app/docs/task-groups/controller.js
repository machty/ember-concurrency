import Ember from 'ember';
import { timeout } from 'ember-concurrency';

function * taskFn() {
  yield timeout(1500);
}

// BEGIN-SNIPPET task-groups
import { task, taskGroup } from 'ember-concurrency';

export default Ember.Controller.extend({
  chores: taskGroup().drop(),

  mowLawn:       task(taskFn).group('chores'),
  doDishes:      task(taskFn).group('chores'),
  changeDiapers: task(taskFn).group('chores'),

  tasks: Ember.computed(function() {
    return [
      this.get('mowLawn'),
      this.get('doDishes'),
      this.get('changeDiapers'),
    ];
  }),
});
// END-SNIPPET

