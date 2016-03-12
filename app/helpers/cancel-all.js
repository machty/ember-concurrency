import Ember from 'ember';
import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function cancelHelper(args) {
  let cancelable = args[0];
  if (!cancelable || typeof cancelable.cancelAll !== 'function') {
    Ember.assert(`The first argument passed to the \`cancel-all\` helper should be a Task or TaskGroup (without quotes); you passed ${cancelable}`, false);
  }

  return taskHelperClosure('cancelAll', args);
}

export default Ember.Helper.helper(cancelHelper);


