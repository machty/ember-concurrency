import { gt } from "@ember/object/computed";
import Mixin from "@ember/object/mixin";
import { computed } from "@ember/object";
import { DEFAULT_STATE } from "./default-state";
import { CancelRequest, CANCEL_KIND_EXPLICIT } from "./external/task-instance/cancel-request";
const { alias } = computed;

// this is a mixin of properties/methods shared between Tasks and TaskGroups
let mixinProps = {
  isRunning: gt("numRunning", 0),
  isQueued: gt("numQueued", 0),
  isIdle: computed("isRunning", "isQueued", function() {
    return !this.get("isRunning") && !this.get("isQueued");
  }),

  state: computed("isRunning", "isQueued", function() {
    if (this.get("isRunning")) {
      return "running";
    } else if (this.get("isQueued")) {
      return "queued";
    } else {
      return "idle";
    }
  }),

  _propertyName: null,
  _origin: null,
  _guid: null,
  _tags: computed(function() {
    let tags = {
      [this._guid]: true
    };
    let group = this.group;
    if (group) {
      Object.assign(tags, group.get("_tags"));
    }
    return tags;
  }),
  name: alias("_propertyName"),

  concurrency: alias("numRunning"),
  numRunning: 0,
  numQueued: 0,

  cancelAll(options) {
    let { reason, cancelRequestKind, resetState } = options || {};
    reason = reason || ".cancelAll() was explicitly called on the Task";

    let cancelRequest = new CancelRequest(cancelRequestKind || CANCEL_KIND_EXPLICIT, reason);
    this._scheduler.cancelAll(this._guid, cancelRequest);

    if (resetState) {
      this._resetState();
    }
  },

  _scheduler: null,

  _resetState() {
    this.setProperties(DEFAULT_STATE);
  },

  applyState(state) {
    this.setProperties(state);
    this.incrementProperty('performCount', state.numPerformedInc);
  },
};

Object.assign(mixinProps, DEFAULT_STATE);

export default Mixin.create(mixinProps);
