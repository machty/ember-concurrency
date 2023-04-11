import Component from '@ember/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class CodeTemplateToggleComponent extends Component {
  tagName = '';
  id = guidFor(this);
  toggleDescription = 'Toggle JS / Template';
  showCode = true;
  _toggleTimer = null;

  maxHeight = 0;
  resizeObserver;

  didInsertElement() {
    super.didInsertElement(...arguments);
    const element = document.getElementById(this.id);
    if (!element) {
      return;
    }

    const resizeObserver = this._createResizeObserver((maxHeight) => {
      const toggle = element.querySelector('.code-template-toggle');
      if (toggle) {
        toggle.style.height = `${maxHeight}px`;
      }
    });
    this.set('resizeObserver', resizeObserver);

    const sectionToggles = element.querySelectorAll(
      '.code-template-toggle-section'
    );

    sectionToggles.forEach((sectionToggle) => {
      resizeObserver.observe(sectionToggle);
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.resizeObserver.disconnect();
  }

  @action
  toggle() {
    this.toggleProperty('showCode');
  }

  _createResizeObserver(onMaxHeightChange) {
    return new ResizeObserver((entries) => {
      const maxHeight = entries
        .map((entry) => entry.contentRect.height)
        .reduce((a, b) => Math.max(a, b));

      if (maxHeight > this.maxHeight) {
        this.maxHeight = maxHeight;
        onMaxHeightChange && onMaxHeightChange(maxHeight);
      }
    });
  }
}
