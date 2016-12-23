import Ember from 'ember';

export function scale([value, lowLimit, highLimit]/*, hash*/) {
  let v = 100 * (value) / (highLimit + 1000 - lowLimit);

  // the 0.001 gets around the annoying fact that {{with falsy}}
  // behaves like {{if falsy}} :(
  return v + (0.001);
}

export default Ember.Helper.helper(scale);

