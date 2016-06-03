import Ember from 'ember';
export function taskHelperClosure(taskMethod, _args, hash) {
  let task = _args[0];
  let outerArgs = _args.slice(1);

  return Ember.run.bind(null, function(...innerArgs) {
    if (hash && hash.value) {
      let event = innerArgs.pop();
      innerArgs.push(Ember.get(event, hash.value));
    }

    return task[taskMethod](...outerArgs, ...innerArgs);
  });
}


