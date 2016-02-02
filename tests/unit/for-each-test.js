import Ember from 'ember';
import { forEach } from 'ember-concurrency';

module('Unit: forEach');

//let RootProcess = Ember.Object.extend({
  //willDestroy() {
    //// this gets called when host object is destroyed.
  //},
//});

//function task() {
  //// return an object that declares its own supervisor that exposes
  //// the mailbox

  //return supervisor(function() {
  //});

  //return liveComputed(function(key) {
    //let hostObject = this;

    //let supervisor = TaskSupervisor.create({
    //});

    //let supervisor = ForEachSupervisor.create({
    //});

    //installDestroyHandler(hostObject, function() {
      //supervisor.destroy();
    //});
  //});
//}

//function forEach() {
  //// return an object that declares its own supervisor that exposes
  //// the mailbox

  //return supervisor(function() {
  //});
//}


test("forEach throws an error if used outside of task without .attach", function(assert) {
  assert.expect(1);

  let obj;
  try {
    Ember.run(() => {
      obj = Ember.Object.create({
        foo() {
          forEach([], Ember.K);
        },
      });
    });

    Ember.run(obj, 'foo');
  } catch(e) {
    assert.equal(e.message, "You must call forEach(...).attach(this) if you're using forEach outside of a generator function");
  }
});

test("forEach.attach() prevents the exception", function(assert) {
  assert.expect(0);
  Ember.run(() => {
    let obj = Ember.Object.create();
    forEach([], Ember.K).attach(obj);
  });
});

test("forEach loops over arrays", function(assert) {
  assert.expect(1);
  let arr = [];
  Ember.run(() => {
    let obj = Ember.Object.create();
    forEach([1,2,3], v => arr.push(v)).attach(obj);
  });
  assert.deepEqual(arr, [1,2,3]);
});

test("forEach blocks on async values returned from fns, discontinues on owner destruction", function(assert) {
  assert.expect(6);
  let defer, obj;
  let val = 0;
  Ember.run(() => {
    obj = Ember.Object.create();
    forEach([1,2,3], v => {
      val = v;
      assert.ok(v !== 3, "loop should not hit the third iteration");
      defer = Ember.RSVP.defer();
      return defer.promise.then(() => v);
    }).attach(obj);
  });
  assert.equal(val, 1);
  Ember.run(defer.resolve);
  assert.equal(val, 2);
  Ember.run(obj, 'destroy');
  assert.equal(val, 2);
  Ember.run(defer.resolve);
  assert.equal(val, 2);
});


