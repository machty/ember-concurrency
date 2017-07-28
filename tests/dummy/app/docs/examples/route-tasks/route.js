import Route from '@ember/routing/route';
export default Route.extend({
  redirect() {
    this.transitionTo('docs.examples.route-tasks.detail', 1);
  }
});


