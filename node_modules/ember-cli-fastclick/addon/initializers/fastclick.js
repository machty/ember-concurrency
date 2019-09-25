import { schedule } from '@ember/runloop';

export function initialize() {
  if (typeof FastBoot === 'undefined') {
    schedule('afterRender', function() {
      FastClick.attach('body');
    });
  }
}

export default {
  initialize
};
