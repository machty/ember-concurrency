import { helper } from '@ember/component/helper';

function taskHelper([task, ...args]) {
  return task._curry(...args);
}

export default helper(taskHelper);
