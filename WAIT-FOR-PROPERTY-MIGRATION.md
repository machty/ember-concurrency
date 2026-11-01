# Migrating from `waitForProperty`

`waitForProperty` is deprecated because it uses observers. Most uses do not need to watch a property: wait for the thing that changes it instead.

| You wait for | Use instead |
| --- | --- |
| [Another task](#another-task) | `allSettled([this.otherTask.last])` |
| [Data being loaded or saved](#data-being-loaded-or-saved) | The task or promise that does it |
| [An element](#an-element) | Start the task from a modifier |
| [A component argument](#a-component-argument) | Render the component when the argument exists |
| [A flag or a choice that you set](#a-flag-or-a-choice-that-you-set) | A promise that you resolve where you set it |
| [State that you do not own](#state-that-you-do-not-own) | Polling |

## Another task

```js
// Before
await waitForProperty(this, 'otherTask.isIdle');

// After
await allSettled([this.otherTask.last]);
```

`allSettled` also continues when the other task is canceled or fails, like `isIdle`. Use `await this.otherTask.last` if a cancelation or an error should stop this task too.

`last` is only the most recently started instance. `isIdle` waits for all of them. If instances overlap or are queued (`enqueue`), keep the instances that you perform and pass them all to `allSettled`.

## Data being loaded or saved

```js
// Before
await waitForProperty(store, 'templates', (templates) => templates != null);

// After
await (store.loadTask.last ?? store.loadTask.perform());
```

Any promise works, such as `await record.save()` instead of waiting for `isSaving` to be `false`.

## An element

```js
// Before
measureTask = task(async () => {
  await waitForProperty(this, 'element');
  measure(this.element);
});

// After
measureTask = task(async (element) => {
  measure(element);
});

setup = modifier((element) => {
  this.measureTask.perform(element);
});
```

```gts
<section {{this.setup}}></section>
```

## A component argument

```js
// Before
loadTask = task(async () => {
  await waitForProperty(this, 'args.profileId', (id) => !!id);
  load(this.args.profileId);
});
```

```gts
{{! After: the component starts its task when the argument exists }}
{{#if this.profileId}}
  <Profile @profileId={{this.profileId}} />
{{/if}}
```

## A flag or a choice that you set

```js
// Before
await waitForProperty(this, 'isPaused', false);

// After
#resume = () => {};
resumed = Promise.resolve();

pause() {
  this.resumed = new Promise((resolve) => (this.#resume = resolve));
}

resume() {
  this.#resume();
}

stepTask = task(async () => {
  await this.resumed;
});
```

To wait for a value, such as a choice in a modal, resolve the promise with it: `resolve(choice)`, then `const choice = await this.choice`.

## State that you do not own

If another addon sets the value and gives you no promise or event, poll:

```js
while (!this.session.isAuthenticated) {
  await timeout(100);
}
```

In tests, `settled()` waits for `timeout`, so it does not resolve until the loop ends. A test that changes the value after `await settled()` hangs. To prevent this, use `rawTimeout`, but then `settled()` does not wait for the loop.
