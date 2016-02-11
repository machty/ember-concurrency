import Ember from 'ember';

// BEGIN-SNIPPET increment-button
function sendPress() {
  this.sendAction('press');
}

function sendRelease() {
  this.sendAction('release');
}

export default Ember.Component.extend({
  tagName: 'button',

  touchStart: sendPress,
  mouseDown:  sendPress,
  touchEnd:   sendRelease,
  mouseLeave: sendRelease,
  mouseUp:    sendRelease,
});
// END-SNIPPET

