import { _makeIteratorFromFunction } from 'ember-concurrency/iterators';

module('Unit: iterators from generator functions');

test("function runs with provided `this` context", function(assert) {
  assert.expect(1);
  let obj = {};
  function * gen(v) {
    assert.equal(this, obj);
  }
  _makeIteratorFromFunction(gen, obj, [1]).next();
});

test("generator function basics", function(assert) {
  assert.expect(6);

  function * gen(v) {
    let r = yield v;
    yield r;
    yield 3;
    return 4;
  }

  let iter = _makeIteratorFromFunction(gen, {}, [1]);
  assert.deepEqual(iter.next(), { value: 1, done: false });
  assert.deepEqual(iter.next(2), { value: 2, done: false });
  assert.deepEqual(iter.next(), { value: 3, done: false });
  assert.deepEqual(iter.next(), { value: 4, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true });
});

test(".return", function(assert) {
  assert.expect(5);

  function * gen(v) {
    yield v;
    yield 2;
    yield 3;
    return 4;
  }

  let iter = _makeIteratorFromFunction(gen, {}, [1]);
  assert.deepEqual(iter.next(), { value: 1, done: false });
  assert.deepEqual(iter.next(), { value: 2, done: false });
  assert.deepEqual(iter.return(999), { value: 999, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true});
  assert.deepEqual(iter.next(), { value: undefined, done: true });
});

test("errors can throw from next", function(assert) {
  assert.expect(1);
  function * gen() {
    throw new Error("wat");
  }

  let iter = _makeIteratorFromFunction(gen, {}, []);
  try {
    iter.next();
  } catch(e) {
    assert.equal(e.message, "wat");
  }
});

// TODO test("throw errors if user tries to yield from finally hook");

module('Unit: iterators from regular functions');

test("function runs with provided `this` context", function(assert) {
  assert.expect(1);
  let obj = {};
  function gen(v) {
    assert.equal(this, obj);
  }
  _makeIteratorFromFunction(gen, obj, [1]).next();
});

test("basics", function(assert) {
  assert.expect(3);

  function gen(v) {
    return 123;
  }

  let iter = _makeIteratorFromFunction(gen, {}, [1]);
  assert.deepEqual(iter.next(), { value: 123, done: true});
  assert.deepEqual(iter.next(), { value: undefined, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true });
});

test("return() exists but is ignored", function(assert) {
  assert.expect(3);

  function gen(v) {
    return 123;
  }

  let iter = _makeIteratorFromFunction(gen, {}, [1]);
  assert.deepEqual(iter.return(999), { value: 123, done: true});
  assert.deepEqual(iter.next(), { value: undefined, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true });
});

/*
test("makeIterator return", function(assert) {
  assert.expect(5);

  function * gen(v) {
    yield v;
    yield 2;
    yield 3;
    return 4;
  }

  let obj = {};
  let iter = _makeIteratorFromFunction(gen, obj, [1]);
  assert.deepEqual(iter.next(), { value: 1, done: false });
  assert.deepEqual(iter.next(), { value: 2, done: false });
  assert.deepEqual(iter.return(999), { value: 999, done: true });
  assert.deepEqual(iter.next(), { value: undefined, done: true});
  assert.deepEqual(iter.next(), { value: undefined, done: true });
});
*/

