import Ember from 'ember';

export function colorString([color]/*, hash*/) {
  return new Ember.Handlebars.SafeString(`color: ${color};`);
}

export default Ember.Helper.helper(colorString);

