import Component from '@ember/component';

export default Component.extend({
  classNames: ['testimonial-box'],
  attributeBindings: ['role'],
  role: 'button',

  click() {
    return this.get('onClick')(this.get('testimonial'));
  }
});
