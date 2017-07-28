import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { bind } from '@ember/runloop';
import { Task } from 'ember-concurrency/-task-property';

export function taskHelperClosure(taskMethod, _args, hash) {
  let task = _args[0];
  let outerArgs = _args.slice(1);

  return bind(null, function(...innerArgs) {
    if (!(task instanceof Task)) {
      assert(`The first argument passed to the \`perform\` helper should be a Task object (without quotes); you passed ${task}`, false);
      return;
    }

    if (hash && hash.value) {
      let event = innerArgs.pop();
      innerArgs.push(get(event, hash.value));
    }

    return task[taskMethod](...outerArgs, ...innerArgs);
  });
}


