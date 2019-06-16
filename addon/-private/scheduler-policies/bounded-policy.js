class BoundedPolicy extends SchedulerPolicy {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
  }

  // processTaskInstance(taskInstance) {
  //   if (!taskInstance.hasStarted) {
  //     this.startTaskInstance(taskInstance);
  //   }

  //   // Maybe the synchronicity of tasks is also delegated to scheduler.
  //   // Unbounded tasks can always run immediately and synchronously.
  //   // Bounded tasks might delayed, queued, etc.

  //   // TODO: more efficient way to do this processing?
  //   // numQueued only needs to be tracked for enqueuing buffer policies.
  //   // otherwise 

  //   if (taskInstance.hasStarted) {
  //     activeTaskInstances.push(taskInstance);
  //   } else {
  //     queuedTaskInstances.push(taskInstance);
  //   }

  // }
}
