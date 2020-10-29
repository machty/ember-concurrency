import Component from '@ember/component';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class CodeTemplateToggleComponent extends Component {
  toggleDescription = "Toggle JS / Template";
  showCode = true;

  didInsertElement() {
    schedule('afterRender', null, () => {
      let sectionToggles = this.element.querySelectorAll('.code-template-toggle-section');
      let maxHeight = Math.max.apply(null, [].map.call(sectionToggles, function (el)
        {
          return el.offsetHeight;
        }));
      this.element.querySelector(".code-template-toggle").style.height = `${maxHeight}px`;
    });
  }

  @action
  toggle() {
    this.toggleProperty('showCode');
  }
}
