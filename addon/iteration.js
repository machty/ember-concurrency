import Ember from 'ember';

const NO_VALUE_YET = {};
const NEXT   = 'next';
const RETURN = 'return';

let returnSelf = Ember.K;

function _concurrentInstance(iteration) {
  this.iteration = iteration;
}

_concurrentInstance.prototype.concurrent = true;

_concurrentInstance.prototype.put = function(value, iterator) {
  this.iteration.step(-1, undefined);
  iterator.put(value);
};

export let _concurrent = {
  name: 'concurrent',
  concurrent: true,
  create(iteration) {
    return new _concurrentInstance(iteration);
  },
};

export let _enqueue = {
  name: 'enqueue',
  create: returnSelf,
  put(value, iterator) {
    iterator.put(value);
  },
};

export let _dropIntermediateValues = {
  name: 'dropIntermediateValues',
  create: returnSelf,
  put(value, iterator) {
    if (iterator.takers.length > 0) {
      iterator.put(value);
    } else {
      // no one's listening for values; just drop.
    }
  },
};

export let _keepFirstIntermediateValue = {
  name: 'keepFirstIntermediateValue',
  create: returnSelf,
  put(value, iterator) {
    if (iterator.takers.length > 0) {
      iterator.put(value);
    } else {
      if (iterator.buffer.length === 0) {
        iterator.put(value);
      }
    }
  },
};

export let _keepLastIntermediateValue = {
  name: 'keepLastIntermediateValue',
  create: returnSelf,
  put(value, iterator) {
    if (iterator.takers.length > 0) {
      iterator.put(value);
    } else {
      iterator.buffer.length = 0;
      iterator.put(value);
    }
  },
};

function _restartableInstance(iteration) {
  this.iteration = iteration;
}

_restartableInstance.prototype.put = function(value, iterator) {
  this.iteration.step(-1, undefined);
  iterator.put(value);
};

export let _restartable = {
  name: 'restartable',
  create(iteration) {
    return new _restartableInstance(iteration);
  },
};

function Iteration(iterator, sourceIteration, bufferPolicy, fn) {
  this.iterator = iterator;
  this.fn = fn;
  this.lastValue = NO_VALUE_YET;
  this.index = 0;
  this.disposables = [];
  this.rootDisposables = [];
  this.stepQueue = [];
  this.sourceIteration = sourceIteration;
  this.setBufferPolicy(bufferPolicy || _concurrent);
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

  setBufferPolicy(policy) {
    if (this.sourceIteration) {
      this.sourceIteration.setBufferPolicy(policy);
    } else {
      //Ember.assert(`The collection you're looping over doesn't support ${policy.name}`, !!this.iterator.setBufferPolicy);
      this.iterator.policy = policy.create(this);
    }
  },

  _flushQueue() {
    this.index++;
    let queue = this.stepQueue;
    if (queue.length === 0) { return; }
    this.stepQueue = [];
    this._disposeDisposables(this.disposables);

    // TODO: add tests around this, particularly when
    // two things give the iteration conflicting instructions.
    let [iterFn, nextValue] = queue.pop();
    if (iterFn) {

      if (iterFn === RETURN) {
        this._disposeDisposables(this.rootDisposables);
      }

      let value = this.iterator[iterFn](nextValue);

      if (value.then) {
        value.then(v => {
          this.lastValue = {
            done: false,
            value: v,
          };
          this._runFunctionWithIndex();
        }, () => {
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

  registerDisposable(index, disposable, isRootDisposable) {
    if (!this._indexValid(index)) { return; }
    if (isRootDisposable) {
      this.rootDisposables.push(disposable);
    } else {
      this.disposables.push(disposable);
    }
  },

  _disposeDisposables(disposables) {
    for (let i = 0, l = disposables.length; i < l; i++) {
      let d = disposables[i];
      d.dispose();
    }
    disposables.length = 0;
  }
};

export function _makeIteration(iterator, sourceIteration, bufferPolicy, fn) {
  return new Iteration(iterator, sourceIteration, bufferPolicy, fn);
}

