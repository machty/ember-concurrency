import Component from '@ember/component';
import { action } from '@ember/object';
import { cancel, schedule } from '@ember/runloop';

export default class CodeTemplateToggleComponent extends Component {
  toggleDescription = 'Toggle JS / Template';
  showCode = true;
  _toggleTimer = null;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this._toggleTimer = schedule('afterRender', null, () => {
      if (!this.element) {
        return;
      }

      let sectionToggles = this.element.querySelectorAll(
        '.code-template-toggle-section'
      );
      let maxHeight = Math.max.apply(
        null,
        [].map.call(sectionToggles, function (el) {
          return el.offsetHeight;
        })
      );

      let toggle = this.element.querySelector('.code-template-toggle');

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
