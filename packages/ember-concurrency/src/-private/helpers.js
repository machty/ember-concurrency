import { get } from '@ember/object';
import { assert } from '@ember/debug';

export function taskHelperClosure(helperName, taskMethod, _args, hash) {
  let task = _args[0];
  let outerArgs = _args.slice(1);

  return function (...innerArgs) {
    if (!task || typeof task[taskMethod] !== 'function') {
      assert(
        `The first argument passed to the \`${helperName}\` helper should be a Task object (without quotes); you passed ${task}`,
        false
      );
      return;
    }

    if (hash && hash.value) {
      let event = innerArgs.pop();
      innerArgs.push(get(event, hash.value));
    }

    return task[taskMethod](...outerArgs, ...innerArgs);
  };
}
