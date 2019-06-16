class UnboundedRefreshState {
  step(taskInstance) {
    if (!taskInstance.hasStarted) {
      this.startTaskInstance(taskInstance);
    }
  }

  flush() {}
}

const SIMPLE_REFRESH_SINGLETON = new UnboundedRefreshState();

// Unbounded policy simply takes any unstarted task instances and starts them.
class UnboundedPolicy extends SchedulerPolicy {
  prepareRefresh() {
    return SIMPLE_REFRESH_SINGLETON;
  }

  processTaskInstance(taskInstance) {
    if (!taskInstance.hasStarted) {
      this.startTaskInstance(taskInstance);
    }
  }
}

export default UnboundedPolicy;
