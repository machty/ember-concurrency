import { on } from '@ember/modifier';
import Component from '@glimmer/component';

interface PressAndHoldButtonSignature {
  Args: {
    press: () => void;
    release: () => void;
  };
  Blocks: {
    default: [];
  };
}

// BEGIN-SNIPPET increment-button
export default class PressAndHoldButtonComponent extends Component<PressAndHoldButtonSignature> {
  <template>
    <button
      {{! template-lint-disable no-pointer-down-event-binding }}
      {{on 'pointerdown' @press}}
      {{on 'pointerup' @release}}
      {{on 'pointercancel' @release}}
      {{on 'pointerleave' @release}}
      type='button'
    >
      {{yield}}
    </button>
  </template>
}
// END-SNIPPET
