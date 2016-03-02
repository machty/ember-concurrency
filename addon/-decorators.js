let modifierNames = ['restartable', 'drop', 'enqueue', 'maxConcurrency'];
let decorators = {};

for (let i = 0; i < modifierNames.length; ++i) {
  let modifierName = modifierNames[i];
  let fn = (...args) => {
    return (taskProperty) => taskProperty[modifierName](...args);
  };
  decorators[modifierName] = fn;
}

export let restartable    = decorators.restartable;
export let drop           = decorators.drop;
export let enqueue        = decorators.enqueue;
export let maxConcurrency = decorators.maxConcurrency;

