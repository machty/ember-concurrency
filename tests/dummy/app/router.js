import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('docs', function() {
    this.route('installation');
    this.route('writing-tasks');
    this.route('task-function-syntax');
    this.route('task-concurrency');
    this.route('task-concurrency-advanced');
    this.route('cancelation');
    this.route('child-tasks');
    this.route('lifetime');
    this.route('examples', function() {
      this.route('increment-buttons');
      this.route('loading-ui');
      this.route('autocomplete');
      this.route('task-concurrency');
      this.route('ajax-throttling');
      this.route('route-tasks', function() {
        this.route('detail', { path: ':id' });
      });
      this.route('joining-tasks');
      this.route('decorating-tasks');
      this.route('observables');
    });
    this.route('404', { path: '*path' });
  });
  this.route('experimental-prediction');
  this.route('helpers-test');
  this.route('deprecation-test');
  this.route('data-test');
});

export default Router;
