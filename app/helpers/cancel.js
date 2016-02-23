import Ember from 'ember';

import { taskHelperClosure } from 'ember-concurrency/utils';

export function cancelHelper(args) {
  return taskHelperClosure('cancel', 'cancelAll', args);
}

export default Ember.Helper.helper(cancelHelper);


