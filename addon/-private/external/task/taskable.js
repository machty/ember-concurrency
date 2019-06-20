import { DEFAULT_STATE } from './default-state';
import { CancelRequest, CANCEL_KIND_EXPLICIT } from '../task-instance/cancelation';

let guidId = 0;
function makeGuid() {
  return `ec_${guidId++}`;
}

export class Taskable {
  constructor(context, scheduler, group) {
    this.context = context;
    this.scheduler = scheduler;
    this.group = group;
    this.guid = makeGuid();
    this.guids = {};
    this.guids[this.guid] = true;
    if (group) {
      Object.assign(this.guids, group.guids);
    }
  }

  cancelAll(options) {
    let { reason, cancelRequestKind, resetState } = options || {};
    reason = reason || ".cancelAll() was explicitly called on the Task";

    let cancelRequest = new CancelRequest(cancelRequestKind || CANCEL_KIND_EXPLICIT, reason);
    this.scheduler.cancelAll(this.guid, cancelRequest);

    if (resetState) {
      this._resetState();
    }
  }

  _resetState() {
    this.setProperties(DEFAULT_STATE);
  }

  // override
  setState() { }
}

Object.assign(Taskable.prototype, DEFAULT_STATE);
