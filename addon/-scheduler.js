import { once } from '@ember/runloop';
import EmberObject, { set, get, setProperties } from '@ember/object';

import SchedulerRefresh from "./-private/scheduler-refresh"


const Scheduler = EmberObject.extend({

  init(...args) {
    this._super(...args);
    this.taskInstances = [];
  },

  cancelAll(reason) {
    this.taskInstances.forEach(taskInstance => taskInstance.cancel());
    this.taskInstances = [];
  },

  schedule(taskInstance) {
    taskInstance._onFinalize(() => once(this, this._reschedule));
    this.taskInstances.push(taskInstance);
    this._reschedule();
  },

  // _reschedule runs:
  // 1. When a new TaskInstance is scheduled (so that the new TaskInstance
  //    can start executing, be enqueued, or be cancelled depending on the SchedulerPolicy).
  // 2. When a prior task instance finalizes (it was cancelled/dropped/errored/completed)
  _reschedule() {
    let refresh = new SchedulerRefresh();
    this.taskInstances = refresh.process(this.taskInstances);
  },
});

function updateTaskChainCounts(task) {
  let numRunning = task.numRunning;
  let numQueued  = task.numQueued;
  let taskGroup = task.get('group');

  while (taskGroup) {
    set(taskGroup, 'numRunning', numRunning);
    set(taskGroup, 'numQueued', numQueued);
    taskGroup = taskGroup.get('group');
  }
}

export default Scheduler;

