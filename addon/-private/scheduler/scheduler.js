import { once } from '@ember/runloop';
import SchedulerRefresh from "../scheduler-refresh"

class Scheduler {
  constructor(schedulerPolicy) {
    this.schedulerPolicy = schedulerPolicy;
    this.taskInstances = [];
  }

  cancelAll(reason) {
    this.taskInstances.forEach(taskInstance => taskInstance.cancel(reason));
  }

  perform(taskInstance) {
    taskInstance._onFinalize(() => once(this, this._reschedule));
    this.taskInstances.push(taskInstance);
    this._reschedule();
  }

  _reschedule() {
    let refresh = new SchedulerRefresh();
    this.taskInstances = refresh.process(this.schedulerPolicy, this.taskInstances);
  }
}

export default Scheduler;
