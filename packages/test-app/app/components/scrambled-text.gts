import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

// from http://stackoverflow.com/a/3943985/914123
function scramble(word: string) {
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

interface ScrambledTextSignature {
  Args: {
    text: string;
  };
}

export default class ScrambledTextComponent extends Component<ScrambledTextSignature> {
  @tracked scrambledText: string | null = null;

  constructor(owner: unknown, args: ScrambledTextSignature['Args']) {
    super(owner, args);
    this.startScrambling.perform();
  }

  // BEGIN-SNIPPET scrambled-text
  startScrambling = task(async () => {
    let text = this.args.text;
    while (true) {
      let pauseTime = 140;
      while (pauseTime > 5) {
        this.scrambledText = scramble(text);
        await timeout(pauseTime);
        pauseTime = pauseTime * 0.95;
      }
      this.scrambledText = text;
      await timeout(1500);
    }
  });
  // END-SNIPPET

  <template>{{this.scrambledText}}</template>
}
