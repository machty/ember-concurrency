import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["code-template-toggle"],

  showCode: true,

  didInsertElement() {
    Ember.run.schedule('afterRender', null, () => {
      let maxHeight = Math.max.apply(null, Ember.$('.code-template-toggle-section').map(function ()
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

