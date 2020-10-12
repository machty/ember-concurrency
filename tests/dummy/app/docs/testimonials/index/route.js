import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { all, task, timeout } from 'ember-concurrency';
import TestimonialProxy from 'dummy/testimonial-proxy';

// Sometimes the loading of the API is too fast.
const ARTIFICIAL_NETWORK_DELAY = 700;

export default Route.extend({
  fastboot: service(),
  testimonialApi: service(),

  queryParams: {
    page: { refreshModel: true }
  },

  model(params) {
    let previousTaskInstance = this.get('fetchTestimonials.lastSuccessful');
    let currentTaskInstance = this.get('fetchTestimonials').perform(params);
    // Prevent unhandled bubbling; error handled in the template
    currentTaskInstance.catch(() => {});
    return { previousTaskInstance, currentTaskInstance };
  },

  fetchTestimonials: task(function* (params) {
    yield this.waitInFastBoot();
    let endPoint = params.page === 1
      ? 'testimonials.json'
      : `testimonials-${params.page}.json`;
    let req = this.get('testimonialApi').request(endPoint);
    let [ results ] = yield all([req, timeout(ARTIFICIAL_NETWORK_DELAY)]);
    results.testimonials = results.testimonials.map(data => {
      return TestimonialProxy.build(data.testimonial);
    });
    return results;
  })
  .drop()
  .cancelOn('deactivate'),

  waitInFastBoot() {
    if (this.get('fastboot.isFastBoot')) {
      // Wait forever in FastBoot
      return new Promise(() => {});
    }
  }
});
