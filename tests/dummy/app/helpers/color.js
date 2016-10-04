import Ember from 'ember';

export function colorString([color]/*, hash*/) {
  return new Ember.String.htmlSafe(`color: ${color};`);
}

export default Ember.Helper.helper(colorString);

