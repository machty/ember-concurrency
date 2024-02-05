import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { taskHelperClosure } from '../-private/helpers';
import type { Task } from '..';

function maybeReportError(onError: (error: unknown) => void | null | undefined) {
  return function (e: unknown) {
    if (typeof onError === 'function') {
      onError(e);
    } else if (onError === null) {
      // Do nothing
    } else {
      assert(
        `The onError argument passed to the \`perform\` helper should be a function or null; you passed ${onError}`,
        false,
      );
    }
  };
}

type PerformParams = [task: Task<any, any[]>, ...args: any[]];

export function performHelper(args: PerformParams, hash: any) {
  let perform = taskHelperClosure('perform', 'perform', args, hash);

  if (hash && typeof hash.onError !== 'undefined') {
    return function (...innerArgs: any[]) {
      try {
        let taskInstance = perform(...innerArgs);
        return taskInstance.catch(maybeReportError(hash.onError));
        // eslint-disable-next-line no-empty
      } catch {
        maybeReportError(hash.onError);
      }
    };
  } else {
    return perform;
  }
}

export default helper(performHelper);
