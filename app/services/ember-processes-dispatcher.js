import Ember from 'ember';
import { csp, DidNotRunException } from 'ember-processes';
import { Process } from 'ember-processes';

export default Ember.Service.extend({
  _channels: null,
  _globalChannelFor(channelName) {
    this._channels = this._channels || {};
    let channel = this._channels[channelName] = this._channels[channelName] || csp.chan();
    return channel;
  },

  init() {
    this._super();
    this._tasks = {};
  },

  willDestroy(...args) {
    // TODO this needs to go / be updated
    let channels = this._channels;
    if (channels) {
      for (let channel in channels) {
        channel.close();
      }
    }
    this._super(...args);
  },

  _taskDestroyed(task) {
    delete this._tasks[Ember.guidFor(task)];
    this._taskDidFinish(task);
  },

  _taskDidFinish(task) {
    task.set('isRunning', false);
    this._updateConstraints();
  },

  _tryPerform(task, args) {
    if (!task.get('isPerformable')) {
      return Ember.RSVP.reject(new DidNotRunException());
    }

    //let constraints = task.get('_concurrencyConstraints');
    let proc = Process.create({
      owner: task._hostObject,
      generatorFunction: task._genFn,
      propertyName: "TODO",
      _task: task,
    });

    task.set('isRunning', true);
    this._updateConstraints();

    return new Ember.RSVP.Promise(r => {
      proc.start(args, returnValue => {
        this._taskDidFinish(task);
        r(returnValue);
      });
    });
  },

  _updateConstraints() {
    let groups = {};

    let taskGuids = Object.keys(this._tasks);
    for (let i = 0, l = taskGuids.length; i < l; i ++) {
      let task = this._tasks[taskGuids[i]];
      let groupName = task.get('_concurrencyGroupName');
      groups[groupName] = groups[groupName] || task.get('isRunning');
    }

    for (let i = 0, l = taskGuids.length; i < l; i ++) {
      let task = this._tasks[taskGuids[i]];
      let groupName = task.get('_concurrencyGroupName');
      task.set('isPerformable', !groups[groupName]);
    }
  },

  _registerTask(task) {
    this._tasks[Ember.guidFor(task)] = task;
  },
});

