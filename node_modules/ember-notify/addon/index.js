import { computed } from '@ember/object';
import { isHTMLSafe } from '@ember/string';
import { merge } from '@ember/polyfills';
import Service from '@ember/service';
import Message from './message';

function aliasToShow(type) {
  return function(message, options) {
    return this.show(type, message, options);
  };
}

var Notify = Service.extend({

  info: aliasToShow('info'),
  success: aliasToShow('success'),
  warning: aliasToShow('warning'),
  alert: aliasToShow('alert'),
  error: aliasToShow('error'),

  init() {
    this._super(...arguments);
    this.pending = [];
  },

  show(type, text, options) {
    var assign = assign || merge;

    // If the text passed is `SafeString`, convert it
    if (isHTMLSafe(text)) {
      text = text.toString();
    }
    if (typeof text === 'object') {
      options = text;
      text = null;
    }
    var message = Message.create(assign({
      text: text,
      type: type
    }, options));
    var target = this.get('target');
    if (target) {
      target.show(message);
    }
    else {
      this.pending.push(message);
    }
    return message;
  },

  setTarget(target) {
    this.set('target', target);
    if (target) {
      this.pending.map(message => target.show(message));
      this.pending = [];
    }
  }

}).reopenClass({
  // set to true to disable testing optimizations that are enabled when Ember.testing is true
  testing: false
});

export default Notify.reopenClass({
  property() {
    return computed(function() {
      return Notify.create();
    });
  }
});
