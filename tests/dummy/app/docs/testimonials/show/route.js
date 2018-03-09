import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import TestimonialProxy from 'dummy/testimonial-proxy';

export default Route.extend({
  testimonialApi: service(),

  model(params) {
    return this.get('fetchModel').perform(params);
  },

  fetchModel: task(function* (params) {
    const testimonialApi = this.get('testimonialApi');
    let data = yield testimonialApi.request(`testimonials/${params.slug}.json`);
    return TestimonialProxy.build(data.testimonial);
  })
  .drop()
  .cancelOn('deactivate')
});
