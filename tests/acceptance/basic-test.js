import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

function delayPromise(ms) {
  return new Ember.RSVP.Promise(r => {
    Ember.run.later(r, ms);
  });
}

module('Acceptance: Scenarios', {
  setup: function() {
    App = startApp();
    //injectTransitionSpies(App);
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('terminates properly on teardown', function() {
  expect(0);
  visit('/color');
  return delayPromise(100);
});

