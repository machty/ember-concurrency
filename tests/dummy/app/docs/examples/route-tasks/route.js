import Ember from 'ember';
export default Ember.Route.extend({
  redirect() {
    this.transitionTo('docs.examples.route-tasks.detail', 1);
  }
});


