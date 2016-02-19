import Ember from 'ember';

export function capsBool([bool]/*, hash*/) {
  return bool ? "YES" : "no";
}

export default Ember.Helper.helper(capsBool);

