import SchedulerRefresh from './refresh';
import StateTracker from './state-tracker/state-tracker';
import NullStateTracker from './state-tracker/null-state-tracker';

// Scheduler base class

// When a Task is performed, it creates an unstarted TaskInstance and
// passes it to the Scheduler to determine when it should run. The
// scheduler consults the schedulerPolicy (e.g. DropPolicy, RestartablePolicy, etc)
// to determine whether the task instance should start executing, be enqueued
// for later execution, or be immediately cancelled. As TaskInstances start
// and run to completion, the Scheduler's `refresh()` method is called to
// give it an opportunity to start (or cancel) previously enqueued task instances,
// as well as update the derived state on Tasks and TaskGroups.

// Every Task has its own Scheduler instance, unless it is part of a group,
// in which case all the Tasks in a group share a single Scheduler.

class Scheduler {
  constructor(schedulerPolicy, stateTrackingEnabled) {
    this.schedulerPolicy = schedulerPolicy;
    this.stateTrackingEnabled = stateTrackingEnabled;
    this.taskInstances = [];
  }

  cancelAll(guid, cancelRequest) {
    let cancelations = this.taskInstances
      .map((taskInstance) => {
        if (taskInstance.task.guids[guid]) {
          taskInstance.executor.cancel(cancelRequest);
        }
      })
      .filter((cancelation) => !!cancelation);

    return Promise.all(cancelations);
  }

  perform(taskInstance) {
    taskInstance.onFinalize(() => this.scheduleRefresh());
    this.taskInstances.push(taskInstance);
    this.refresh();
  }

  scheduleRefresh() {
    Promise.resolve().then(() => this.refresh());
  }

  refresh() {
    let stateTracker = this.stateTrackingEnabled
      ? new StateTracker()
      : new NullStateTracker();
    let refresh = new SchedulerRefresh(
      this.schedulerPolicy,
      stateTracker,
      this.taskInstances
    );
    this.taskInstances = refresh.process();
  }
}

export default Scheduler;
