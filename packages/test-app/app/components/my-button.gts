import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { didCancel } from 'ember-concurrency';

interface MyButtonSignature {
  Args: {
    action: (a: number, b: number) => Promise<number> | number;
  };
}

export default class MyButtonComponent extends Component<MyButtonSignature> {
  @action onClick() {
    let val = this.args.action(3, 4);
    if (!val) {
      return;
    }
    Promise.resolve(val)
      .then((v) => {
        if (v !== 10) {
          throw new Error("returned value wasn't 10");
        }
      })
      .catch((e) => {
        if (!didCancel(e)) {
          throw e;
        }
      });
  }

  <template>
    <button {{on 'click' this.onClick}} type='button' ...attributes>
      {{yield}}
    </button>
  </template>
}
