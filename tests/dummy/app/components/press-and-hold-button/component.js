import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET increment-button
function increment() {
  this.sendAction('press');
}

function stopIncrementing() {
  this.sendAction('release');
}

export default Ember.Component.extend({
  tagName: 'button',

  touchStart: increment,
  mouseDown:  increment,
  touchEnd:   stopIncrementing,
  mouseLeave: stopIncrementing,
  mouseUp:    stopIncrementing,
});
// END-SNIPPET

