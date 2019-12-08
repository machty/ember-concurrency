import { helper } from '@ember/component/helper';
import { taskHelperClosure } from 'ember-concurrency/-private/helpers';

export function performHelper(args, hash) {
  return taskHelperClosure('perform', 'perform', args, hash);
}

export default helper(performHelper);

