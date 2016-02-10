import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('docs', function() {
    this.route('getting-started');
    this.route('writing-tasks');
    this.route('examples', function() {
      this.route('autocomplete');
      this.route('task-concurrency');
    });
  });
});

export default Router;
