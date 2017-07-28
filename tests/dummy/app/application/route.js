import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  beforeModel() {
    if (!Ember.testing) {
      this.router.on('didTransition', () => {
        window.scrollTo(0,0);
      });
    }
  }
});

