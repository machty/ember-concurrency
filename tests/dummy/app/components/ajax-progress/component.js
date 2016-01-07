import Ember from 'ember';
import { process, sleep } from 'ember-processes';

export default Ember.Component.extend({
  innerProgressStyle: Ember.computed('progress', function() {
    let width = Math.floor(this.get('progress') * 100);
    return `width: ${width}%`;
  }),

  progress: 0,
  status: "Ready",
  results: null,
  query: "csp",

  wikiSearcher: process(function * (query) {
    this.set('progress', 0.1);

    let countdown = 4;
    while (countdown--) {
      this.set('status', `Gearing up for an AJAX query in  ${countdown}`);
      this.set('progress', this.get('progress') + 0.02);
      yield sleep(1000);
    }

    this.set('status', `Performing AJAX query for ${query}...`);
    this.set('progress', 0.5);

    let encodedQuery = window.encodeURIComponent("query");
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodedQuery}&callback=?`;

    let ajaxRequest = Ember.$.getJSON(url);
    try {
      let response = Ember.RSVP.resolve(ajaxRequest.promise());
      this.set('status', "Search complete!");
      this.set('progress', 1);

      let results = response[3];
      this.set('results', results);
    } catch(e) {
      // NOTE: because JSONP doesn't throw on errors,
      // this is hard to test, but w normal ajax (and
      // any rejected yielded promises), this block will get called
      this.set('status', "AJAX Failed!");
    } finally {
      ajaxRequest.abort();
    }
  }),

  actions: {
    doSearch() {
      let process = this.get('wikiSearcher');
      if (!process.isRunning) {
        process.start(this.get('query'));
      }
    },

    cancelSearch() {
      let process = this.get('wikiSearcher');
      if (process.isRunning) {
        process.kill();
        this.set('progress', 0);
        this.set('status', 'Cancelled!');
      }
    },
  },
});

