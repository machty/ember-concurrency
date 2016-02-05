import Ember from 'ember';

import { timeout } from 'ember-concurrency';

function capitalizeSingleLetter(text, i) {
  let capsLetter = text.charAt(i).toUpperCase();
  let before = text.slice(0, i);
  let after = text.slice(i+1);
  return before + capsLetter + after;
}

export default Ember.Component.extend({
  tagName: '',
  text: null,
  scrambledText: null,
  marqueeLoop: Ember.on('init', function * () {
    return; // REMOVE ME

    let text = this.get('text');

    while (true) {
      this.set('formattedText', text);
      yield timeout(2500);
      for (let i = 0; i < text.length; ++i) {
        this.set('formattedText', capitalizeSingleLetter(text, i));
        let distanceFromCenter = Math.abs(text.length/2.0 - i) / text.length;
        yield timeout(50 + distanceFromCenter * 250);
      }
    }
  }),
});


