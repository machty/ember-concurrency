import { schedule } from '@ember/runloop';
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  classNames: ["code-template-toggle"],
  toggleDescription: "Toggle JS / Template",

  showCode: true,

  didInsertElement() {
    schedule('afterRender', null, () => {
      let maxHeight = Math.max.apply(null, this.$('.code-template-toggle-section').map(function ()
        {
          return $(this).height();
        }).get());
      this.$().css({ height: `${maxHeight}px` });
    });
  },

  actions: {
    toggle() {
      this.toggleProperty('showCode');
    }
  }
});

