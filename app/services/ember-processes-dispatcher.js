import Ember from 'ember';
import { csp } from 'ember-processes';

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
});

