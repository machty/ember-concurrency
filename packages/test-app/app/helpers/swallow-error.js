import { helper } from '@ember/component/helper';

/**
 * This helper is meant to be wrapped around another action that might throw
 * an error that we want to suppress.
 *
 * While this pattern should be used sparingly, as errors should generally not be ignores, it
 * is sometimes appropriate to follow do this when working with an Ember Concurrency task that uses
 * the `.error` derived state to directly render the error from a Task. In these cases, we rarely
 * want the error to bubble up to the application itself, as we're already handling the error case.
 *
 *   ```hbs
 *   <button {{on 'click' (swallow-error this.someTaskThatMightThrow.perform)}}>
 *     Click Me
 *   </button>
 *   ```
 */
export function swallowError([fn]) {
  return function callAndSwallowError(...args) {
    try {
      const response = fn(...args);

      if (response.catch) {
        return response.catch(function () {
          // Swallow async error
        });
      }

      return response;
    } catch (e) {
      // Swallow synchronous error
    }
  };
}

export default helper(swallowError);
