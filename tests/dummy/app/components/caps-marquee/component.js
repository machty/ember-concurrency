import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

function capitalizeAt(text, i) {
  let capsLetter = text.charAt(i).toUpperCase();
  let before = text.slice(0, i);
  let after = text.slice(i + 1);
  return before + capsLetter + after;
}

export default class CapsMarqueeComponent extends Component {
  tagName = '';
  text = null;
  scrambledText = null;

  // BEGIN-SNIPPET caps-marquee
  marqueeLoop = task({ on: 'init' }, async () => {
    let text = this.text;
    while (true) {
      this.set('formattedText', text);
      await timeout(1500);
      for (let i = 0; i < text.length; ++i) {
        this.set('formattedText', capitalizeAt(text, i));
        await timeout(50);
      }
    }
  });
  // END-SNIPPET
}
