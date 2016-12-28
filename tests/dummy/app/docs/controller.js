import Ember from "ember";

const { computed } = Ember;

export default Ember.Controller.extend({
  appController: Ember.inject.controller('application'),

  tableOfContents: [
    { route: "docs",   title: "Introduction"},
    { route: "docs.installation", title: "Installation"},
    { route: "docs.writing-tasks", title: "Your First Task"},
    { route: "docs.task-function-syntax", title: "Task Function Syntax"},
    { route: "docs.task-concurrency", title: "Managing Task Concurrency",
      children: [
        { route: "docs.task-concurrency-advanced", title: "Using maxConcurrency"},
      ]
    },
    { route: "docs.cancelation", title: "Cancelation",
      children: [
        { route: "docs.error-vs-cancelation", title: "Errors vs. Cancelation (try/catch/finally)"},
      ]
    },
    { route: "docs.child-tasks", title: "Child Tasks"},
    { route: "docs.task-groups", title: "Task Groups"},
    { route: "docs.derived-state", title: "Derived State"},
    { route: "docs.testing-debugging", title: "Testing & Debugging"},
    { title: "Examples", route: "docs.examples",
      children: [
        {route: "docs.examples.loading-ui", title: "Loading UI"},
        {route: "docs.examples.autocomplete", title: "Type-Ahead Search"},
        {route: "docs.examples.increment-buttons", title: "Accelerating Increment Buttons"},
        {route: "docs.examples.ajax-throttling", title: "AJAX Throttling"},
        {route: "docs.examples.route-tasks", title: "Route Tasks"},
        {route: "docs.examples.joining-tasks", title: "Awaiting Multiple Child Tasks"},
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


