import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

// from http://stackoverflow.com/a/3943985/914123
function scramble(word) {
  var a = word.split(''),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
}

export default class ScrambledTextComponent extends Component {
  tagName = '';
  text = null;
  scrambledText = null;

  // BEGIN-SNIPPET scrambled-text
  startScrambling = task(this, { on: 'init' }, async () => {
    let text = this.text;
    while (true) {
      let pauseTime = 140;
      while (pauseTime > 5) {
        this.set('scrambledText', scramble(text));
        await timeout(pauseTime);
        pauseTime = pauseTime * 0.95;
      }
      this.set('scrambledText', text);
      await timeout(1500);
    }
  });
  // END-SNIPPET
}
