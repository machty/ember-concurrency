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
    taskInstance._onFinalize(() => this.scheduleRefresh());
    this.taskInstances.push(taskInstance);
    this.refresh();
  }

  // override
  scheduleRefresh() { }

  refresh() {
    let refresh = new SchedulerRefresh();
    this.taskInstances = refresh.process(this.schedulerPolicy, this.taskInstances);
  }
}

export default Scheduler;
