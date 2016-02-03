let NO_VALUE_YET = {};

function Iteration (iterator, fn) {
  this.iterator = iterator;
  this.fn = fn;
  this.lastValue = NO_VALUE_YET;
}

Iteration.prototype.step = function() {
  let result = this.iterator.next();
  this.lastValue = result;
  this.fn(result);
};

Iteration.prototype.redo = function() {
  this.fn(this.lastValue);
};

Iteration.prototype.break = function() {
  let result = this.iterator.return();
  this.lastValue = result;
  this.fn(this.lastValue);
};

export function _makeIteration(iterator, fn) {
  return new Iteration(iterator, fn);
}

