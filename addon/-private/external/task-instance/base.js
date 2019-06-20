export class BaseTaskInstance {
  setState() {}
  onStarted() {}
  onSuccess() {}
  onError() {}
  onCancel() {}
  formatCancelReason() {}
  selfCancelLoopWarning() {}
}
