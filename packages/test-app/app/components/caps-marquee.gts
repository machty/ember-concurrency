import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

function capitalizeAt(text: string, i: number) {
  let capsLetter = text.charAt(i).toUpperCase();
  let before = text.slice(0, i);
  let after = text.slice(i + 1);
  return before + capsLetter + after;
}

interface CapsMarqueeSignature {
  Args: {
    text: string;
  };
}

export default class CapsMarqueeComponent extends Component<CapsMarqueeSignature> {
  @tracked formattedText = '';

  constructor(owner: unknown, args: CapsMarqueeSignature['Args']) {
    super(owner, args);
    this.marqueeLoop.perform();
  }

  // BEGIN-SNIPPET caps-marquee
  marqueeLoop = task(async () => {
    let text = this.args.text;
    while (true) {
      this.formattedText = text;
      await timeout(1500);
      for (let i = 0; i < text.length; ++i) {
        this.formattedText = capitalizeAt(text, i);
        await timeout(50);
      }
    }
  });
  // END-SNIPPET

  <template>{{this.formattedText}}</template>
}
