import Ember from 'ember';

export default function destroyApp(application) {
  Ember.run.cancel(window._breakTimerLoopsId);
  Ember.run(application, 'destroy');
}
