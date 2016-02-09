import Ember from 'ember';

export function subtract([a,b]/*, hash*/) {
  return a-b;
}

export default Ember.Helper.helper(subtract);

