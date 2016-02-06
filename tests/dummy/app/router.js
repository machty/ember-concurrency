import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('docs', function() {
    this.route('backpressure', function() {
    });
    this.route('loops');
  });

  this.route('ajax');
  this.route('color');
  this.route('yielding');
  this.route('tasks');
  this.route('music');
  this.route('auto-complete');
});

export default Router;
