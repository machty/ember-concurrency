import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/ember-notify';
import Message from 'ember-notify/message';

export default Component.extend({
  layout: layout,

  notify: service(),
  source: oneWay('notify'),
  messages: null,
  closeAfter: 2500,

  classPrefix: computed(function() {
    return this.get('defaultClass') || 'ember-notify-default';
  }),
  classNames: ['ember-notify-cn'],
  classNameBindings: ['classPrefix'],
  messageStyle: 'foundation',

  init: function() {
    this._super();
    this.set('messages', A());
    this.get('source').setTarget(this);

    var style = this.get('messageStyle'), theme;
    switch (style) {
      case 'foundation':
        theme = FoundationTheme.create();
        break;
      case 'uikit':
          theme = UIkitTheme.create();
          break;  
      case 'foundation-5':
        theme = Foundation5Theme.create();
        break;
      case 'bootstrap':
        theme = BootstrapTheme.create();
        break;
      case 'refills':
        theme = RefillsTheme.create();
        break;
      case 'semantic-ui':
        theme = SemanticUiTheme.create();
        break;
      default:
        throw new Error(
          `Unknown messageStyle ${style}: options are 'foundation', 'refills', 'bootstrap', and 'semantic-ui'`
        );
    }
    this.set('theme', theme);
  },
  willDestroyElement: function() {
    this.get('source').setTarget(null);
  },
  show: function(message) {
    if (this.get('isDestroyed')) return;
    if (!(message instanceof Message)) {
      message = Message.create(message);
    }
    this.get('messages').pushObject(message);
    return message;
  }
});

export var Theme = EmberObject.extend({
  classNamesFor(message) {
    return message.get('type');
  }
});

export var FoundationTheme = Theme.extend({
  classNamesFor(message) {
    var type = message.get('type');
    var classNames = ['callout', type];
    if (type === 'error') classNames.push('alert');
    return classNames.join(' ');
  }
});

export var Foundation5Theme = Theme.extend({
  classNamesFor(message) {
    var type = message.get('type');
    var classNames = ['alert-box', type];
    if (type === 'error') classNames.push('alert');
    return classNames.join(' ');
  }
});

export var BootstrapTheme = Theme.extend({
  classNamesFor(message) {
    var type = message.get('type');
    if (type === 'alert' || type === 'error') type = 'danger';
    var classNames = ['alert', `alert-${type}`];
    return classNames.join(' ');
  }
});

export var RefillsTheme = Theme.extend({
  classNamesFor(message) {
    var type = message.get('type');
    var typeMapping = {
      success: 'success',
      alert: 'error',
      error: 'error',
      info: 'notice',
      warning: 'alert'
    };
    return 'flash-' + typeMapping[type];
  }
});

export var SemanticUiTheme = Theme.extend({
  classNamesFor(message){
    var type = message.get('type');
    var typeMapping = {
      success: 'success',
      alert: 'error',
      error: 'error',
      info: 'info',
      warning: 'warning'
    };
    return 'ui message ' + typeMapping[type];
  }
});

export var UIkitTheme = Theme.extend({
  classNamesFor(message){
    var type = message.get('type');
    var typeMapping = {
      success: 'success',
      alert: 'warning',
      error: 'danger',
      info: 'info',
      warning: 'warning'
    };
    return 'uk-notify-message uk-notify-message-' + typeMapping[type];
  }
});
