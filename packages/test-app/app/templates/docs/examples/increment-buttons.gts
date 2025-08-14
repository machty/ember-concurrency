import { fn } from '@ember/helper'; // For currying functions (if using tasks with args)
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import cancelAll from 'ember-concurrency/helpers/cancel-all';
import CodeSnippet from '../../../components/code-snippet';
import PressAndHoldButton from '../../../components/press-and-hold-button';

export default class IncrementButtonsRouteComponent extends Component {
  @tracked count = 0;

  // BEGIN-SNIPPET increment-button-task
  incrementBy = task(async (inc) => {
    let speed = 400;
    while (true) {
      this.count += inc;
      await timeout(speed);
      speed = Math.max(50, speed * 0.8);
    }
  });
  // END-SNIPPET

  <template>
    <h3>Accelerating Increment / Decrement Buttons</h3>

    <p>
      This example demonstrates a few different concepts:
    </p>

    <ul>
      <li>
        Tricky time-based operations like acceleration are simplified by the
        sequential style of task functions
      </li>
      <li>
        You can use
        <code>taskName.perform</code>
        in place of anywhere you might want to use a classic Ember action.
      </li>
    </ul>

    <h5>Live Example</h5>

    <h1>Num: {{this.count}}</h1>

    <p>(Hold down the buttons to accelerate.)</p>

    {{! BEGIN-SNIPPET press-and-hold-buttons }}
    <p>
      <PressAndHoldButton
        @press={{fn this.incrementBy.perform -1}}
        @release={{cancelAll this.incrementBy}}
      >
        --Decrease
      </PressAndHoldButton>

      <PressAndHoldButton
        @press={{fn this.incrementBy.perform 1}}
        @release={{cancelAll this.incrementBy}}
      >
        Increase++
      </PressAndHoldButton>
    </p>
    {{! END-SNIPPET }}

    <h5>Task</h5>

    <CodeSnippet @name='increment-button-task.gts' />

    <h5>Template</h5>

    <CodeSnippet @name='press-and-hold-buttons.gts' />
  </template>
}
