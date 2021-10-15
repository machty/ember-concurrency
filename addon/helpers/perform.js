import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { taskHelperClosure } from 'ember-concurrency/-private/helpers';

function maybeReportError(onError) {
  return function (e) {
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

export function performHelper(args, hash) {
  let perform = taskHelperClosure('perform', 'perform', args, hash);

  if (hash && typeof hash.onError !== 'undefined') {
    return function (...innerArgs) {
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
