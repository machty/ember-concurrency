import Ember from 'ember';
import { Task } from 'ember-concurrency/-task-property';

import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function performHelper(args, hash) {
  let task = args[0];
  if (!(task instanceof Task)) {
    Ember.assert(`The first argument passed to the \`perform\` helper should be a Task object (without quotes); you passed ${task}`, false);
  }

  return taskHelperClosure('perform', args, hash);
}

export default Ember.Helper.helper(performHelper);


