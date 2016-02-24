import Ember from 'ember';
import { Task } from './-task-property';
export function taskHelperClosure(helperName, taskMethod, _args) {
  let task = _args[0];
  let outerArgs = _args.slice(1);

  if (!(task instanceof Task)) {
    Ember.assert(`The first argument passed to the \`${helperName}\` helper should be a Task object (without quotes); you passed ${task}`, false);
  }

  return (...innerArgs) => {
    task[taskMethod](...outerArgs, ...innerArgs);
  };
}


