let modifierNames = ['restartable', 'drop', 'enqueue', 'maxConcurrency', 'cancelOn'];
let decorators = {};

function makeDecorator(modifierName, methodName) {
  let fn = (...args) => {
    return (taskProperty) => taskProperty[methodName](...args);
  };
  decorators[modifierName] = fn;
}

for (let i = 0; i < modifierNames.length; ++i) {
  let modifierName = modifierNames[i];
  makeDecorator(modifierName, modifierName);
}

makeDecorator('performOn', 'on');

export let restartable    = decorators.restartable;
export let drop           = decorators.drop;
export let enqueue        = decorators.enqueue;
export let maxConcurrency = decorators.maxConcurrency;
export let cancelOn       = decorators.cancelOn;
export let performOn      = decorators.performOn;

