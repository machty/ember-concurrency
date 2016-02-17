import Ember from 'ember';

export function progressStyleHelper([percent, id, colors]/*, hash*/) {
  let color = colors[id % colors.length];
  return new Ember.Handlebars.SafeString(`width: ${percent}%; background-color: ${color};`);
}

export default Ember.Helper.helper(progressStyleHelper);

