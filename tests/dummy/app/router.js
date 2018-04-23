import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('introduction');
    this.route('installation');
    this.route('writing-tasks');

    this.route('tutorial', function() {
      this.route('discussion');
      this.route('refactor');
    });

    this.route('task-function-syntax');
    this.route('task-concurrency');
    this.route('task-concurrency-advanced');
    this.route('cancelation');
    this.route('error-vs-cancelation');
    this.route('child-tasks');
    this.route('task-groups');
    this.route('derived-state');
    this.route('events');
    this.route('task-lifecycle-events');
    this.route('testing-debugging');
    this.route('faq');
    this.route('encapsulated-task');
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
      this.route('joining-tasks-2');
      this.route('decorating-tasks');
      this.route('task-groups');
      this.route('encapsulated-task-fun');
    });
    this.route('task-cancelation-help');
    this.route('404', { path: '*path' });
  });
  this.route('experimental-prediction');
  this.route('helpers-test');
  this.route('deprecation-test');
  this.route('testing-ergo', function() {
    this.route('foo');
    this.route('foo-settimeout');
    this.route('slow');
    this.route('timer-loop');
  });
  this.route('task-injection-test');
});

export default Router;
