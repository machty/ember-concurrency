import Ember from 'ember';
import { csp } from 'ember-processes';
import { Process } from 'ember-processes';

export default Ember.Service.extend({
  _channels: null,
  _globalChannelFor(channelName) {
    this._channels = this._channels || {};
    let channel = this._channels[channelName] = this._channels[channelName] || csp.chan();
    return channel;
  },

  willDestroy(...args) {
    let channels = this._channels;
    if (channels) {
      for (let channel in channels) {
        channel.close();
      }
    }
    this._super(...args);
  },

  _tryPerform(task, args) {
    let constraints = task.get('_concurrencyConstraints');

    let proc = Process.create({
      owner: task._hostObject,
      generatorFunction: task._genFn,
      propertyName: "TODO",
    });

    proc.start(...args);
  },
});

