import Ember from 'ember';
import TaskInstance from './-task-instance';

const ComputedProperty = Ember.__loader.require("ember-metal/computed").ComputedProperty;
const { computed } = Ember;

const saturateActiveQueue = (taskHandle) => {
  while (taskHandle._activeTaskInstances.length < taskHandle._maxConcurrency) {
    let taskInstance = taskHandle._queuedTaskInstances.shift();
    if (!taskInstance) { break; }
    taskHandle._activeTaskInstances.push(taskInstance);
  }
};

const spliceTaskInstances = (taskInstances, index, count) => {
  for (let i = index; i < index + count; ++i) {
    taskInstances[i].cancel();
  }
  taskInstances.splice(index, count);
};

const enqueueTasksPolicy = {
  requiresUnboundedConcurrency: true,
  schedule(taskHandle) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] [d,e,f]
    saturateActiveQueue(taskHandle);
  }
};

const dropQueuedTasksPolicy = {
  schedule(taskHandle) {
    // [a,b,_] [c,d,e,f] becomes
    // [a,b,c] []
    saturateActiveQueue(taskHandle);
    spliceTaskInstances(taskHandle._queuedTaskInstances, 0, taskHandle._queuedTaskInstances.length);
  }
};

const cancelOngoingTasksPolicy = {
  schedule(taskHandle) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    let activeTaskInstances = taskHandle._activeTaskInstances;
    let queuedTaskInstances = taskHandle._queuedTaskInstances;
    activeTaskInstances.push(...queuedTaskInstances);
    queuedTaskInstances.length = 0;

    let numToShift = Math.max(0, activeTaskInstances.length - taskHandle._maxConcurrency);
    spliceTaskInstances(activeTaskInstances, 0, numToShift);
  }
};

const dropButKeepLatestPolicy = {
  schedule(taskHandle) {
    // [a,b,_] [c,d,e,f] becomes
    // [d,e,f] []
    saturateActiveQueue(taskHandle);
    spliceTaskInstances(taskHandle._queuedTaskInstances, 0, taskHandle._queuedTaskInstances.length - 1);
  }
};

const TaskHandle = Ember.Object.extend({
  fn: null,
  context: null,
  bufferPolicy: null,
  perform: null,
  concurrency: 0,
  isIdle: computed.equal('concurrency', 0),
  isRunning: Ember.computed.not('isIdle'),
  state: computed('isIdle', function() {
    return this.get('isIdle') ? 'idle' : 'running';
  }),
  _maxConcurrency: Infinity,
  _activeTaskInstances: null,
  _needsFlush: null,

  init() {
    this._super();
    this._activeTaskInstances = Ember.A();
    this._queuedTaskInstances = Ember.A();

    // TODO: {{perform}} helper
    this.perform = (...args) => {
      return this._perform(...args);
    };

    this._needsFlush = Ember.run.bind(this, this._scheduleFlush);

    cleanupOnDestroy(this.context, this, 'cancelAll');
  },

  cancelAll() {
    spliceTaskInstances(this._activeTaskInstances, 0, this._activeTaskInstances.length);
    spliceTaskInstances(this._queuedTaskInstances, 0, this._queuedTaskInstances.length);
  },

  _perform(...args) {
    let taskInstance = TaskInstance.create({
      fn: this.fn,
      args,
      context: this.context,
    });

    this._queuedTaskInstances.push(taskInstance);
    this._needsFlush();

    return taskInstance;
  },

  _scheduleFlush() {
    Ember.run.once(this, this._flushQueues);
  },

  _flushQueues() {
    this._activeTaskInstances = Ember.A(this._activeTaskInstances.filterBy('isFinished', false));

    this.bufferPolicy.schedule(this);

    for (let i = 0; i < this._activeTaskInstances.length; ++i) {
      let taskInstance = this._activeTaskInstances[i];
      if (!taskInstance.hasStarted) {
        taskInstance._start().then(this._needsFlush, this._needsFlush);
      }
    }

    this.set('concurrency', this._activeTaskInstances.length);
  },
});

export function TaskProperty(taskFn) {
  let tp = this;
  ComputedProperty.call(this, function() {
    return TaskHandle.create({
      fn: taskFn,
      context: this,
      bufferPolicy: tp.bufferPolicy,
      _maxConcurrency: tp._maxConcurrency,
    });
  });

  this.bufferPolicy = enqueueTasksPolicy;
  this._maxConcurrency = Infinity;
  this.eventNames = null;
}

TaskProperty.prototype = Object.create(ComputedProperty.prototype);
TaskProperty.prototype.constructor = TaskProperty;
TaskProperty.prototype.setup = function(obj, keyname) {
  let eventNames = this.eventNames;
  if (eventNames) {
    for (let i = 0; i < eventNames.length; ++i) {
      let eventName = eventNames[i];
      Ember.addListener(obj, eventName, null, makeListener(keyname));
    }
  }
};

TaskProperty.prototype.on = function() {
  this.eventNames = this.eventNames || [];
  this.eventNames.push.apply(this.eventNames, arguments);
  return this;
};

TaskProperty.prototype.restartable = function() {
  this.bufferPolicy = cancelOngoingTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

TaskProperty.prototype.enqueue = function() {
  this.bufferPolicy = enqueueTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

TaskProperty.prototype.drop = function() {
  this.bufferPolicy = dropQueuedTasksPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

TaskProperty.prototype.keepLatest = function() {
  this.bufferPolicy = dropButKeepLatestPolicy;
  this._setDefaultMaxConcurrency(1);
  return this;
};

TaskProperty.prototype.maxConcurrency = function(n) {
  this._maxConcurrency = n;
  return this;
};

TaskProperty.prototype._setDefaultMaxConcurrency = function(n) {
  if (this._maxConcurrency === Infinity) {
    this._maxConcurrency = n;
  }
};

function makeListener(taskName) {
  return function() {
    let taskHandle = this.get(taskName);
    taskHandle._perform.apply(taskHandle, arguments);
  };
}

function cleanupOnDestroy(owner, object, cleanupMethodName) {
  // TODO: find a non-mutate-y, hacky way of doing this.
  if (!owner.willDestroy.__ember_processes_destroyers__) {
    let oldWillDestroy = owner.willDestroy;
    let disposers = [];

    owner.willDestroy = function() {
      for (let i = 0, l = disposers.length; i < l; i ++) {
        disposers[i]();
      }
      oldWillDestroy.apply(owner, arguments);
    };
    owner.willDestroy.__ember_processes_destroyers__ = disposers;
  }

  owner.willDestroy.__ember_processes_destroyers__.push(() => {
    object[cleanupMethodName]();
  });
}


