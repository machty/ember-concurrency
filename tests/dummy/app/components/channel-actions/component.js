import Ember from 'ember';
import { csp, process, sleep } from 'ember-processes';

const { computed } = Ember;

let { INVOKE, ACTION } = Ember.__loader.require('ember-routing-htmlbars/keywords/closure-action');


let GeneratorFunction = (function * () {}).constructor;


let delay = (ms) => {
  return new Ember.RSVP.Promise(r => {
    Ember.run.later(r, ms);
  });
};

function action() {
  let channelPath, handler;
  if (arguments.length === 2) {
    channelPath = arguments[0];
    handler = arguments[1];
  } else if (arguments.length === 1) {
    channelPath = arguments[0];
    if (typeof channelPath === 'function') {
      handler = channelPath;
      channelPath = null;
    } else {
      handler = Ember.K; // arguments[0];
    }
  }

  return Ember.computed(function() {
    return (...args) => {
      if (channelPath) {
        let chan = this.get(channelPath);

        // TODO: add to js-csp so we can subscribe to

        //csp.putAsync(chan, { handler, args });
        //return;
        if (csp.offer(chan, { handler, args })) {
          // sent
          // TODO: use this to mark this action as active?
        } else {
          // failed or closed.
          // TODO: what to do with this?
        }
      } else {
        handler.apply(this, args);
      }
    };
  });
}

export default Ember.Component.extend({
  foo: 123,
  borf: action('sharedActionsChannel', function () {
    this.set('foo', Math.random());
  }),

  genAction: action('sharedActionsChannel', function * () {
    this.set('foo', 'foo');
    yield sleep(500);
    this.set('foo', 'bar');
    yield sleep(500);
    this.set('foo', 'baz');
  }),


  sharedActionsChannel: computed(function () {
    return csp.chan();
  }),

  init() {
    this._super();
    this.get('mainLoop').start();
  },

  restart: action(),
  doSomethingElse: action(),
  branch: action(),

  // maybe this is an argument for letting hbs helper
  // construct the action object, so we don't
  // have to declare a bunch of restart() and doSomethingElse()s
  // on the object.
  // {{action-button text="wat" action=borf}}

  mainLoop: process(function * () {
    for (;;) {
      let { handler, args } = yield this.get('sharedActionsChannel');

      // basically, actions will go to any taker...
      // they shouldn't have to specify their action unless
      // they go straight to a service.
      // otherwise, they have an implicit channel and
      // this loop gets to ask directly for them.

      //let { name, handler, args } = yield until('').autorun();
      //let { name, handler, args } = yield until('action0', 'restart', 'wattles').autorun();
      //
      // if you autostart the action will automatically be invoked.
      // this also






      if (handler instanceof GeneratorFunction) {
        yield * handler.apply(this, args);
      } else {
        yield handler.apply(this, args);
      }
      //yield sleep(1000);
    }
  }),





  //nextStep: action(['stepOne', 'stepTwo', 'stepThree'], function),
});

