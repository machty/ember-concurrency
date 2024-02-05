import Component from '@glimmer/component';
import { getCodeSnippet } from 'ember-code-snippet';
import { cached } from "@glimmer/tracking";

import CodeBlock from 'ember-prism/components/code-block';

type Signature = {
  Args: {
    name: string;
  }
}

export default class CodeTemplateToggleComponent extends Component<Signature> {
  @cached
  get snippet() {
    return getCodeSnippet(this.args.name);
  }

  get language() {
    if (this.snippet.language === 'handlebars') {
      return 'markup';
    }

    return this.snippet.language;
  }

  <template>
    <CodeBlock
      @code={{this.snippet.source}}
      @language={{this.language}}
      class='code-snippet'
    />
  </template>
}
