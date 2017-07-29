import Ember from 'ember';
import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function performHelper(args, hash) {
  return taskHelperClosure('perform', args, hash);
}

export default Ember.Helper.helper(performHelper);

