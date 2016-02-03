function Iteration (iterator, fn) {
  this.iterator = iterator;
  this.fn = fn;
}

Iteration.prototype.step = function() {
  let result = this.iterator.next();
  this.fn(result);
};

export function _makeIteration(iterator, fn) {
  return new Iteration(iterator, fn);
}

