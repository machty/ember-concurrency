import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
module('Acceptance: Scenarios', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});


test('BORF', function(assert) {
  assert.ok(false, "OMG");
  visit('/scenarios/nested-outlets/middle/inner');

  andThen(function(){
    visit('/scenarios/nested-outlets/middle2');
    Ember.run.later(function(){
      equal(find('#inner-index').length, 1, "inner view exists during animation");
    }, 30);
  });
});

