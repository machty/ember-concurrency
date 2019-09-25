Lets take the below testsuite and see how the reporting should be, based on the standard.

```js

it('global test', function() {

});

describe('suite 1', function() {
  describe('suite 2', function() {
    it('test2', function() {
      expect(true).to.be.true;
    });
  });

  it('test1', function() {
    expect(true).to.be.true;
    expect(true).to.be.false;
  });
});
```

The emitted events and data will be in the following order:

- **runStart**: 

```js
Suite {
  name: undefined,
  fullName: [],
  tests: [Test('global test')],
  childSuites: [Suite('suite1')],
  status: undefined,
  testCounts: {
    passed: undefined,
    failed: undefined,
    skipped: undefined,
    total: 2
  },
  runtime: undefined
}
```

- **testStart**

```js
Test {
  name: 'global test',
  suiteName: undefined,
  fullName: ['global test'],
  status: undefined,
  runtime: undefined,
  errors: undefined,
  assertions: undefined
}
```

- **testEnd**

```js
Test {
  name: 'global test',
  suiteName: undefined,
  fullName: ['global test'],
  status: 'passed',
  runtime: 1,
  errors: [],
  assertions: []
```

- **suiteStart**

```js
Suite {
  name: 'suite1',
  fullName: ['suite1'],
  tests: [Test('test1')],
  childSuites: [Suite('suite2')],
  status: undefined,
  testCounts: {
    passed: undefined,
    failed: undefined,
    skipped: undefined,
    total: 2
  },
  runtime: undefined
```

- **suiteStart**

```js
Suite {
  name: 'suite2',
  fullName: ['suite1', 'suite2'],
  tests: [Test('test2')],
  childSuites: [],
  status: undefined,
  testCounts: {
    passed: undefined,
    failed: undefined,
    skipped: undefined,
    total: 1
  },
  runtime: undefined
```

- **testStart**

```js
Test {
  name: 'test2',
  suiteName: 'suite2',
  fullName: ['suite1', 'suite2', 'test2'],
  status: undefined,
  runtime: undefined,
  errors: undefined,
  assertions: undefined
```

- **testEnd**:

```js
Test {
  name: 'test2',
  suiteName: 'suite2',
  fullName: ['suite1', 'suite2', 'test2'],
  status: `passed`,
  runtime: 1,
  errors: [],
  assertions: [{
    passed: true,
    actual: true,
    expected: true,
    message: `some message`,
    stack: undefined
  }]
```

- **suiteEnd**

```js
Suite {
  name: 'suite2',
  fullName: ['suite1', 'suite2'],
  tests: [Test('test2')],
  childSuites: [],
  status: `passed`,
  testCounts: {
    passed: 1,
    failed: 0,
    skipped: 0,
    total: 1
  },
  runtime: 1
```

- **testStart**

```js
Test {
  name: 'test1',
  suiteName: 'suite1',
  fullName: ['suite1', 'test'],
  status: undefined,
  runtime: undefined,
  errors: undefined,
  assertions: undefined
```

- **testEnd**:

```js
Test {
  name: 'test1',
  suiteName: 'suite1',
  fullName: ['suite1', 'test'],
  status: `failed`,
  runtime: 2,
  errors: [{
    passed: false,
    actual: true,
    expected: false,
    message: `some message`,
    stack: `stack trace`
  }],
  assertions: [{
    passed: true,
    actual: true,
    expected: true,
    message: `some message`,
    stack: undefined
  }, {
    passed: false,
    actual: true,
    expected: false,
    message: `some message`,
    stack: `stack trace`
  }]
```

- **suiteEnd**

```js
Suite {
  name: 'suite1',
  fullName: ['suite1'],
  tests: [Test('test1')],
  childSuites: [],
  status: `failed`,
  testCounts: {
    passed: 1,
    failed: 1,
    skipped: 0,
    total: 2
  },
  runtime: 3
```

- **runEnd**:

```js
Suite {
  name: undefined,
  fullName: [],
  tests: [Test('global test')],
  childSuites: [Suite('suite1')],
  status: `failed`,
  testCounts: {
    passed: 2,
    failed: 1,
    skipped: 0,
    total: 3
  },
  runtime: 4
}
```
