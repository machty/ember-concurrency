import { gt } from "@ember/object/computed";
import Mixin from "@ember/object/mixin";
import { computed } from "@ember/object";
const { alias } = computed;

const DEFAULT_STATE = {
  last: null,
  lastRunning: null,
  lastStarted: null,
  lastPerformed: null,
  lastSuccessful: null,
  lastComplete: null,
  lastErrored: null,
  lastCanceled: null,
  lastIncomplete: null,
  performCount: 0
};

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
    let { reason, resetState } = options || {};
    reason = reason || ".cancelAll() was explicitly called on the Task";

    this._scheduler.cancelAll(this._guid, reason);

    if (resetState) {
      this._resetState();
    }
  },

  _scheduler: null,

  _resetState() {
    this.setProperties(DEFAULT_STATE);
  }
};

Object.assign(mixinProps, DEFAULT_STATE);

export default Mixin.create(mixinProps);
