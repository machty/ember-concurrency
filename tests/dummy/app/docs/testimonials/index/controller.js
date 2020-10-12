import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { or, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  testimonialApi: service(),

  queryParams: ['page'],
  page: 1,

  error: reads('model.currentTaskInstance.error'),
  isLoading: reads('model.currentTaskInstance.isRunning'),
  testimonials: or('model.{currentTaskInstance,previousTaskInstance}.value.testimonials'),
  pagination: or('model.{currentTaskInstance,previousTaskInstance}.value.pagination'),

  previousPage: computed('pagination.{previous_url,page}', {
    get() {
      if (!this.get('pagination.previous_url')) { return; }
      return this.get('pagination.page') - 1;
    }
  }),

  nextPage: computed('pagination.{next_url,page}', {
    get() {
      if (!this.get('pagination.next_url')) { return; }
      return this.get('pagination.page') + 1;
    }
  }),

  actions: {
    showTestimonial(testimonial) {
      return this.transitionToRoute('docs.testimonials.show', testimonial);
    }
  }
});
