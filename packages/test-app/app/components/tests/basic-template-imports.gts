import GlimmerComponent from '@glimmer/component';
import { on } from '@ember/modifier';
import { task } from 'ember-concurrency';

interface Signature {
  Blocks: {
    default: [];
  };
  Args: {};
  Element: HTMLDivElement;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BasicTemplateImports extends GlimmerComponent<Signature> {
  myTask = task(async () => {
    alert('hey');
  });

  <template>
    <div>
      <button type='button' {{on 'click' this.myTask.perform}}>Click Me</button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BasicTemplateImports: typeof BasicTemplateImports;
  }
}
