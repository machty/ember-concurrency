import { schedule } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({
  classNames: ["code-template-toggle"],
  toggleDescription: "Toggle JS / Template",

  showCode: true,

  didInsertElement() {
    schedule('afterRender', null, () => {
      let sectionToggles = this.element.querySelectorAll('.code-template-toggle-section');
      let maxHeight = Math.max.apply(null, [].map.call(sectionToggles, function (el)
        {
          return el.offsetHeight;
        }));
      this.element.style.height = `${maxHeight}px`;
    });
  },

  actions: {
    toggle() {
      this.toggleProperty('showCode');
    }
  }
});
