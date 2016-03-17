import Ember from 'ember';

// BEGIN-SNIPPET hover-button
function sendHover() {
  this.sendAction('hover');
}

function sendRelease() {
  this.sendAction('release');
}

export default Ember.Component.extend({
  tagName: 'button',

  mouseEnter: sendHover,
  mouseLeave: sendRelease,
});
// END-SNIPPET
