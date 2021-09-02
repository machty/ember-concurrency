import Component from '@ember/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { cancel, schedule } from '@ember/runloop';

export default class CodeTemplateToggleComponent extends Component {
  tagName = '';
  id = guidFor(this);
  toggleDescription = 'Toggle JS / Template';
  showCode = true;
  _toggleTimer = null;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this._toggleTimer = schedule('afterRender', null, () => {
      const element = document.getElementById(this.id);

      if (!element) {
        return;
      }

      let sectionToggles = element.querySelectorAll(
        '.code-template-toggle-section'
      );
      let maxHeight = Math.max.apply(
        null,
        [].map.call(sectionToggles, function (el) {
          return el.offsetHeight;
        })
      );

      let toggle = element.querySelector('.code-template-toggle');

      if (toggle) {
        toggle.style.height = `${maxHeight}px`;
      }
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    cancel(this._toggleTimer);
  }

  @action
  toggle() {
    this.toggleProperty('showCode');
  }
}
