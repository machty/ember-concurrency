import { isGeneratorIterator } from 'ember-concurrency/utils';

function GeneratorFunctionIterator(iter) {
  this.iter = iter;
}

GeneratorFunctionIterator.prototype.next = function(nextValue) {
  return this.iter.next(nextValue);
};

GeneratorFunctionIterator.prototype.return = function(returnValue) {
  return this.iter.return(returnValue);
};


function RegularFunctionIterator(value) {
  this.value = value;
  this.hasEmittedValue = false;
}

RegularFunctionIterator.prototype.next = function() {
  if (this.hasEmittedValue) {
    return {
      done: true,
      value: undefined,
    };
  } else {
    this.hasEmittedValue = true;
    return {
      done: true,
      value: this.value,
    };
  }
};

RegularFunctionIterator.prototype.return = function(value) {
  return this.next(value);
};

// maybe these guys should have returns instead of breaks.
// and then

export function _makeIteratorFromFunction(fn, context, args) {
  let value = fn.apply(context, args);

  if (isGeneratorIterator(value)) {
    return new GeneratorFunctionIterator(value);
  } else {
    return new RegularFunctionIterator(value);
  }
}
