import GlimmerComponent from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

import perform from 'ember-concurrency/helpers/perform';
import curryTask from 'ember-concurrency/helpers/task';
import cancelAll from 'ember-concurrency/helpers/cancel-all';

interface Signature {
  Args: {
    rating: null | number;
    updateRating: (rating: number) => void;
  };
  Element: HTMLDivElement;
}

export default class BasicTemplateImports extends GlimmerComponent<Signature> {
  @tracked value = '';

  valueTask = task(async (value) => {
    debugger;
    this.value = value;
    await timeout(1000);
  });


  <template>
    <div>
      {{#let (curryTask this.valueTask 'foo') as |curriedTask|}}
        <button id='perform' {{on 'click' (perform curriedTask)}}>
          Perform Curried Value Task
        </button>
        <button id='cancel-all' {{on 'click' (cancelAll curriedTask)}}>
          Cancel
        </button>
        <div id='value'>{{this.value}}</div>
        <div>{{if curriedTask.isRunning 'running' 'idle'}}</div>
      {{/let}}
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BasicTemplateImports: typeof BasicTemplateImports;
  }
}
