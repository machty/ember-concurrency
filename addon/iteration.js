const NO_VALUE_YET = {};
const NEXT   = 'next';
const RETURN = 'return';

function Iteration (iterator, fn) {
  this.iterator = iterator;
  this.fn = fn;
  this.lastValue = NO_VALUE_YET;
  this.index = 0;
  this.disposables = [];
  this.stepQueue= [];
}

Iteration.prototype = {
  step(index, nextValue) {
    this._step(NEXT, index, nextValue);
  },

  _step(iterFn, index, nextValue) {
    if (!this._indexValid(index)) { return; }
    this.stepQueue.push([iterFn, nextValue]);
    Ember.run.once(this, this._flushQueue);
  },

  _flushQueue() {
    this.index++;
    let queue = this.stepQueue;
    if (queue.length === 0) { return; }
    this.stepQueue = [];
    this._disposeDisposables();

    // TODO: add tests around this, particularly when
    // two things give the iteration conflicting instructions.
    let index = this.index;
    let [iterFn, nextValue] = queue.pop();
    if (iterFn) {
      let value = this.iterator[iterFn](nextValue);
      if (value.then) {
        value.then(v => {
          this.lastValue = {
            done: false,
            value: v,
          };
          this._runFunctionWithIndex();
        }, error => {
          throw new Error("not implemented");
        });
        return;
      } else {
        this.lastValue = value;
      }
    }
    this._runFunctionWithIndex();
  },

  redo(index) {
    this._step(null, index);
  },

  break(index) {
    this._step(RETURN, index);
  },

  _runFunctionWithIndex() {
    let result = Object.assign({ index: this.index }, this.lastValue);
    this.fn(result);
  },

  _indexValid(index) {
    return (index === this.index || index === -1);
  },

  registerDisposable(index, disposable) {
    if (!this._indexValid(index)) { return; }
    this.disposables.push(disposable);
  },

  _disposeDisposables() {
    for (let i = 0, l = this.disposables.length; i < l; i++) {
      let d = this.disposables[i];
      d.dispose();
    }
    this.disposables.length = 0;
  }
};





export function _makeIteration(iterator, fn) {
  return new Iteration(iterator, fn);
}

