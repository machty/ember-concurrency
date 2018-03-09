import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
const { ceil, floor } = Math;

// Algorithm from https://stackoverflow.com/a/7641822/227176
function prettyDate(isoTime) {
  let date = new Date(isoTime);
  let diff = (((new Date()).getTime() - date.getTime()) / 1000);
  let dayDiff = floor(diff / 86400);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    let yearStr = `${year}`;
    let monthStr = `00${month}`.substr(-2);
    let dayStr = `00${day}`.substr(-2);
    return `${yearStr}-${monthStr}-${dayStr}`;
  }

  if (dayDiff === 0) {
    if (diff < 60) { return 'just now'; }
    if (diff < 120) { return '1 minute ago'; }
    if (diff < 3600) { return `${floor(diff / 60)} minutes ago`; }
    if (diff < 7200) { return '1 hour ago'; }
    return `${floor(diff / 3600)} hours ago`;
  }

  if (dayDiff === 1) { return 'Yesterday'; }
  if (dayDiff < 7) { return `${dayDiff} days ago`; }
  return `${ceil(dayDiff / 7)} weeks ago`;
}

const TestimonialProxy = ObjectProxy.extend({
  relativeDate: computed('content.date', {
    get() {
      return prettyDate(this.get('content.date'));
    }
  }),

  rendered: computed('content.rendered', {
    get() {
      return htmlSafe(this.get('content.rendered'));
    }
  }),

  excerpt: computed('content.excerpt', {
    get() {
      return htmlSafe(this.get('content.excerpt'));
    }
  }),

  hasMore: computed('content.{excerpt,rendered}', {
    get() {
      let excerpt = this.get('content.excerpt') || '';
      let rendered = this.get('content.rendered') || '';
      return excerpt.length < rendered.length;
    }
  })
});

TestimonialProxy.reopenClass({
  build(content) {
    let testimonial = TestimonialProxy.create({ content });
    testimonial.slug = content.slug;
    return testimonial;
  }
});

export default TestimonialProxy;
