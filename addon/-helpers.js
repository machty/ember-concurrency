import Ember from 'ember';
import { Task } from 'ember-concurrency/-task-property';

export function taskHelperClosure(taskMethod, _args, hash) {
  let task = _args[0];
  let outerArgs = _args.slice(1);

  return Ember.run.bind(null, function(...innerArgs) {
    if (!(task instanceof Task)) {
      Ember.assert(`The first argument passed to the \`perform\` helper should be a Task object (without quotes); you passed ${task}`, false);
      return;
    }

    if (hash && hash.value) {
      let event = innerArgs.pop();
      innerArgs.push(Ember.get(event, hash.value));
    }

    return task[taskMethod](...outerArgs, ...innerArgs);
  });
}


