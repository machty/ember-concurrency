import Ember from 'ember';
import { taskHelperClosure } from 'ember-concurrency/-helpers';

const CANCEL_REASON = "the 'cancel-all' template helper was invoked";

export function cancelHelper(args) {
  let cancelable = args[0];
  if (!cancelable || typeof cancelable.cancelAll !== 'function') {
    Ember.assert(`The first argument passed to the \`cancel-all\` helper should be a Task or TaskGroup (without quotes); you passed ${cancelable}`, false);
  }

  return taskHelperClosure('cancelAll', [cancelable, CANCEL_REASON]);
}

export default Ember.Helper.helper(cancelHelper);


