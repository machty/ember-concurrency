import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { taskHelperClosure, TaskHelperClosure, OnErrorCallback } from '../-private/helpers';

function maybeReportError(onError: OnErrorCallback | null) {
  return function (e: any) {
    if (typeof onError === 'function') {
      onError(e);
    } else if (onError === null) {
      // Do nothing
    } else {
      assert(
        `The onError argument passed to the \`perform\` helper should be a function or null; you passed ${onError}`,
        false
      );
    }
  };
}

export type PerformHelperType = (
  args: [TaskHelperClosure, ...any[]],
  hash: { value?: string, onError?: OnErrorCallback }
) => (...innerArgs: any[]) => void;

const perform: PerformHelperType = (args, hash) => {
  let perform = taskHelperClosure('perform', 'perform', args, hash);

  if (hash && typeof hash.onError !== undefined) {
    return function (...innerArgs) {
      try {
        let taskInstance = perform(...innerArgs);
        return taskInstance.catch(maybeReportError(hash.onError!));
        // eslint-disable-next-line no-empty
      } catch {
        maybeReportError(hash.onError!);
      }
    };
  } else {
    return perform;
  }
};

export const performHelper = helper(perform);

export default performHelper;
