import { helper } from '@ember/component/helper';
import type { Task } from '..';

type TaskParams = [task: Task<any, any[]>, ...args: any[]];

function taskHelper(positional: TaskParams) {
  let [task, ...args] = positional;

  // @ts-expect-errors _curry isn't typed yet
  return task._curry(...args);
}

export default helper(taskHelper);
