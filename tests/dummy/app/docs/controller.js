import Ember from "ember";

const { computed } = Ember;

export default Ember.Controller.extend({
  appController: Ember.inject.controller('application'),

  tableOfContents: [
    { route: "docs",   title: "Introduction"},

    //{ route: "docs.loops",   title: "Loops"},

    { title: "Examples", route: "docs.examples",
      children: [
        {route: "docs.examples.autocomplete", title: "Auto-Search + ember-power-select"},
      ]
    },
    //{ route: 'transition-map', title: 'Transition Map',
      //children: [
        //{route: 'transition-map.route-constraints', title: 'Matching by route & model'},
        //{route: 'transition-map.value-constraints', title: 'Matching by value'},
        //{route: 'transition-map.dom-constraints', title: 'Matching by DOM context'},
        //{route: 'transition-map.initial-constraints', title: 'Matching initial renders'},
        //{route: 'transition-map.choosing-transitions', title: 'Choosing transition animations'},
        //{route: 'transition-map.debugging-constraints', title: 'Debugging transition matching'}
      //]
    //},
    //{ route: 'transitions', title: 'Transitions',
      //children: [
        //{route: 'transitions.predefined', title: "Predefined transitions"},
        //{route: 'transitions.explode', title: "explode"},
        //{route: 'transitions.defining', title: 'Defining custom transitions'},
        //{route: 'transitions.primitives', title: 'Animation Primitives'}
      //]
    //},
    //{ route: 'modal-documentation', title: 'Modal Dialogs',
      //children: [
        //{route: 'modal-documentation.modal', title: 'modal()'},
        //{route: 'modal-documentation.component', title: 'Modal Components'},
        //{route: 'modal-documentation.animation', title: 'Customizing Animation'}
      //]
    //}
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
        current = this.get('application.currentRouteName'),
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


