import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

function capitalizeAt(text, i) {
  let capsLetter = text.charAt(i).toUpperCase();
  let before = text.slice(0, i);
  let after = text.slice(i+1);
  return before + capsLetter + after;
}

export default Component.extend({
  tagName: '',
  text: null,
  scrambledText: null,
// BEGIN-SNIPPET caps-marquee
  marqueeLoop: task(function * () {
    let text = this.get('text');
    while (true) {
      this.set('formattedText', text);
      yield timeout(1500);
      for (let i = 0; i < text.length; ++i) {
        this.set('formattedText', capitalizeAt(text, i));
        yield timeout(50);
      }
    }
  }).on('init'),
// END-SNIPPET
});

