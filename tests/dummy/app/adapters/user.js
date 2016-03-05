import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  query: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(() => resolve([
        { id: 1, username: "machty" },
        { id: 2, username: "snoop" },
      ]), 200);
    });
  }
});

