import Ember from 'ember';

export function computeWidth([start, end, upper]/*, hash*/) {
  return (end === Infinity) ? upper - start : end - start;
}

export default Ember.Helper.helper(computeWidth);

