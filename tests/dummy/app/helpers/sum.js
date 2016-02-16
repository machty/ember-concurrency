import Ember from 'ember';

export function sum([a,b]/*, hash*/) {
  return a+b;
}

export default Ember.Helper.helper(sum);

