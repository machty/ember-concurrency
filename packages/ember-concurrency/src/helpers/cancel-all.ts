import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { taskHelperClosure } from '../-private/helpers';
import type { Task } from '../index';

const CANCEL_REASON = "the 'cancel-all' template helper was invoked";

type CancelAllParams = [task: Task<any, any[]>];

export function cancelHelper(args: CancelAllParams) {
  let cancelable = args[0];
  if (!cancelable || typeof cancelable.cancelAll !== 'function') {
    assert(
      `The first argument passed to the \`cancel-all\` helper should be a Task (without quotes); you passed ${cancelable}`,
      false,
    );
  }

  return taskHelperClosure('cancel-all', 'cancelAll', [
    cancelable,
    { reason: CANCEL_REASON },
  ]);
}

export default helper(cancelHelper);
