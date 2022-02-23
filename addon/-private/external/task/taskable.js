import { DEFAULT_STATE } from './default-state';
import {
  CancelRequest,
  CANCEL_KIND_EXPLICIT,
} from '../task-instance/cancelation';

let guidId = 0;
function makeGuid() {
  return `ec_${guidId++}`;
}

export class Taskable {
  constructor(options) {
    this.context = options.context;
    this.debug = options.debug || false;
    this.enabledModifiers = options.enabledModifiers;
    this.env = options.env;
    this.group = options.group;
    this.hasEnabledEvents = options.hasEnabledEvents;
    this.modifierOptions = options.modifierOptions;
    this.name = options.name;
    this.onStateCallback = options.onStateCallback;
    this.scheduler = options.scheduler;

    this.guid = makeGuid();
    this.guids = {};
    this.guids[this.guid] = true;
    if (this.group) {
      Object.assign(this.guids, this.group.guids);
    }
  }

  cancelAll(options) {
    let { reason, cancelRequestKind, resetState } = options || {};
    reason = reason || '.cancelAll() was explicitly called on the Task';

    let cancelRequest = new CancelRequest(
      cancelRequestKind || CANCEL_KIND_EXPLICIT,
      reason
    );
    return this.scheduler.cancelAll(this.guid, cancelRequest).then(() => {
      if (resetState) {
        this._resetState();
      }
    });
  }

  get _isAlive() {
    return true;
  }

  _resetState() {
    this.setState(DEFAULT_STATE);
  }

  // override
  setState() {}
}

Object.assign(Taskable.prototype, DEFAULT_STATE);
Object.assign(Taskable.prototype, {
  numRunning: 0,
  numQueued: 0,
  isRunning: false,
  isQueued: false,
  isIdle: true,
  state: 'idle',
});
