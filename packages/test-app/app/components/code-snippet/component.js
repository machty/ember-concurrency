import Component from '@ember/component';
import { getCodeSnippet } from 'ember-code-snippet';
import { computed } from '@ember/object';

export default class CodeTemplateToggleComponent extends Component {
  tagName = '';

  @computed('name')
  get snippet() {
    return getCodeSnippet(this.name);
  }

  get language() {
    if (this.snippet.language === 'handlebars') {
      return 'markup';
    }

    return this.snippet.language;
  }
}
