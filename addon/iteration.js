const NO_VALUE_YET = {};
const NEXT   = 'next';
const THROW  = 'throw';
const RETURN = 'return';
const BREAK = 'break';
const FORCE = {};

function Iteration (iterator, fn) {
  this.iterator = iterator;
  this.fn = fn;
  this.lastValue = NO_VALUE_YET;
  this.index = 0;
}

Iteration.prototype.step = function(index) {
  this._step(NEXT, index);
};

Iteration.prototype._step = function(iterFn, index) {
  if (index !== this.index) {
    return;
  }
  this.index++;
  if (iterFn) {
    this.lastValue = this.iterator[iterFn]();
  }
  this._runFunctionWithIndex();
};

Iteration.prototype.redo = function(index) {
  this._step(null, index);
};

Iteration.prototype.break = function(index) {
  this._step(RETURN, index);
};

Iteration.prototype._runFunctionWithIndex = function() {
  let result = Object.assign({ index: this.index }, this.lastValue);
  this.fn(result);
};

export function _makeIteration(iterator, fn) {
  return new Iteration(iterator, fn);
}

