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
      {{on 'touchstart' @press}}
      {{on 'mousedown' @press}}
      {{on 'touchend' @release}}
      {{on 'mouseleave' @release}}
      {{on 'mouseup' @release}}
      type='button'
    >
      {{yield}}
    </button>
  </template>
}
// END-SNIPPET
