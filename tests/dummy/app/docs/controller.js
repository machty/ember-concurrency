import Ember from "ember";

const { computed } = Ember;

export default Ember.Controller.extend({
  appController: Ember.inject.controller('application'),

  tableOfContents: [
    { route: "docs",   title: "Introduction"},
    { route: "docs.getting-started", title: "Getting Started"},
    { route: "docs.writing-tasks", title: "Writing Tasks"},
    {route: "docs.task-concurrency", title: "Managing Task Concurrency"},
    { title: "Examples", route: "docs.examples",
      children: [
        {route: "docs.examples.increment-buttons", title: "Accelerating Increment Buttons"},
        {route: "docs.examples.autocomplete", title: "Auto-Search + ember-power-select"},
      ]
    },
  ],

  flatContents: computed(function(){
    var flattened = [];
    this.get('tableOfContents').forEach(function(entry) {
      flattened.push(entry);
      if (entry.children){
        flattened = flattened.concat(entry.children);
      }
    });
    return flattened;
  }),


  currentIndex: computed('appController.currentRouteName', 'flatContents', function(){
    var contents = this.get('flatContents'),
        current = this.get('appController.currentRouteName'),
        bestMatch,
        entry;

    for (var i=0; i<contents.length; i++) {
      entry = contents[i];
      if (entry.route && new RegExp('^' + entry.route.replace(/\./g, '\\.')).test(current)) {
        if (typeof(bestMatch) === 'undefined' || contents[bestMatch].route.length < entry.route.length) {
          bestMatch = i;
        }
      }
    }
    return bestMatch;
  }),

  nextTopic: computed('currentIndex', 'flatContents', function(){
    var contents = this.get('flatContents'),
        index = this.get('currentIndex');
    if (typeof(index) !== "undefined") {
      return contents[index+1];
    }
  }),

  prevTopic: computed('currentIndex', 'flatContents', function(){
    var contents = this.get('flatContents'),
        index = this.get('currentIndex');
    if (typeof(index) !== "undefined") {
      return contents[index-1];
    }
  }),
});


