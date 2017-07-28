import { helper } from '@ember/component/helper';
import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function performHelper(args, hash) {
  return taskHelperClosure('perform', args, hash);
}

export default helper(performHelper);

