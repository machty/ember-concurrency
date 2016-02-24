import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    this.sendAction('action', 3, 4);
  }
});

