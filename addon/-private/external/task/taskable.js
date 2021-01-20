import { DEFAULT_STATE } from './default-state';
import {
  CancelRequest,
  CANCEL_KIND_EXPLICIT
} from '../task-instance/cancelation';

let guidId = 0;
function makeGuid() {
  return `ec_${guidId++}`;
}

export class Taskable {
  constructor(options) {
    this.options = options;
    Object.assign(this, options)

    this.guid = makeGuid();
    this.guids = {};
    this.guids[this.guid] = true;
    if (this.group) {
      Object.assign(this.guids, this.group.guids);
    }
  }

  cancelAll(options) {
    let { reason, cancelRequestKind, resetState } = options || {};
    reason = reason || ".cancelAll() was explicitly called on the Task";

    let cancelRequest = new CancelRequest(cancelRequestKind || CANCEL_KIND_EXPLICIT, reason);
    return this.scheduler.cancelAll(this.guid, cancelRequest).then(() => {
      if (resetState) {
        this._resetState();
      }
    });
  }

  _resetState() {
    this.setState(DEFAULT_STATE);
  }

  // override
  setState() { }
}

Object.assign(Taskable.prototype, DEFAULT_STATE);
Object.assign(Taskable.prototype, {
  numRunning: 0,
  numQueued: 0,
  isRunning: false,
  isQueued: false,
  isIdle: true,
  state: 'idle'
});
