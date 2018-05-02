import { task, timeout } from 'ember-concurrency';

class MyClass {
  constructor() { /* ... */ }
  async doAsync() { /* ... */ }
}

MyClass.prototype.doDebouncedAsync = task(function* (widget) {
  yield timeout(500);
  yield this.doAsync(widget);
}).restartable().toFunction();

let k0 = new MyClass();
let widget = { name: "Hammer" };
k0.doDebouncedAsync(widget); // gets cancelled immediately
k0.doDebouncedAsync(widget);

// concurrency constraints are scoped to the context of
// the method/function invocation (e.g. `this`), so that
// running `doDebouncedAsync` on another instance of MyClass
// won't affect/cancel any running task instances of
// `doDebouncedAsync` on other instances of MyClass.
let k1 = new MyClass();
k1.doDebouncedAsync(); // won't cancel `doDebouncedAsync` on `k0`
