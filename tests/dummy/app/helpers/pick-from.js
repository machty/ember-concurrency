import Ember from 'ember';

export function pickFrom([list, index]/*, hash*/) {
  return list[index % list.length];
}

export default Ember.Helper.helper(pickFrom);

