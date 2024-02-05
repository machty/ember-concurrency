import GlimmerComponent from '@glimmer/component';
import { task } from 'ember-concurrency';

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

interface Signature {
  Args: {
    rating: null | number;
    updateRating: (rating: number) => void;
  };
  Element: HTMLDivElement;
}

export default class BasicTemplateImports extends GlimmerComponent<Signature> {
  myTask = task(async () => {
    alert('Hello, world!');
  });

  <template>
    <div>
      <button {{on 'click' this.myTask.perform}}>
        Click Me
      </button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BasicTemplateImports: typeof BasicTemplateImports;
  }
}
