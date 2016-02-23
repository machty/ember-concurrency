import Ember from 'ember';

import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function cancelHelper(args) {
  return taskHelperClosure('cancel-all', 'cancelAll', args);
}

export default Ember.Helper.helper(cancelHelper);


