import AjaxService from 'ember-ajax/services/ajax';
import config from 'dummy/config/environment';

export default AjaxService.extend({
  host: config.APP.testimonialEndpoint,
  createUrl: config.APP.createTestimonialUrl
});
