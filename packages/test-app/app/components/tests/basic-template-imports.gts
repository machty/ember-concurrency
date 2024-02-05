import GlimmerComponent from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

import perform from 'ember-concurrency/helpers/perform';
import curryTask from 'ember-concurrency/helpers/task';
import cancelAll from 'ember-concurrency/helpers/cancel-all';

import RSVP from 'rsvp';

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
    this.value = value;
  });

  promiseTask = task(async (_event, value) => {
    this.value = value;
    await new RSVP.Promise(() => {});
  });

  <template>
    <div>
      {{#let (curryTask this.valueTask 'foo') as |curriedTask|}}
        <button
          type='button'
          id='perform-curried'
          {{on 'click' (perform curriedTask)}}
        >
          Perform Curried Value Task
        </button>
        <div id='value'>{{this.value}}</div>
      {{/let}}

      <button
        type='button'
        id='perform-promise'
        {{on 'click' (perform this.promiseTask)}}
      >
        Perform Promise Task
      </button>

      <button
        type='button'
        id='cancel-all'
        {{on 'click' (cancelAll this.promiseTask)}}
      >
        Cancel
      </button>
      <div>{{if this.promiseTask.isRunning 'running' 'idle'}}</div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BasicTemplateImports: typeof BasicTemplateImports;
  }
}
