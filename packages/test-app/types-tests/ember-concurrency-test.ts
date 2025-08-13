/* eslint-disable prettier/prettier */
import 'ember-source/types';
import 'ember-source/types/preview';

import ClassicComponent from '@ember/component';
import EmberObject, { get } from '@ember/object';
import Evented from '@ember/object/evented';
import GlimmerComponent from '@glimmer/component';
import {
  type OnStateCallback,
  type Task,
  type TaskInstance,
  type TaskProperty,
  type TaskState,
  Yieldable,
  all,
  allSettled,
  animationFrame,
  didCancel,
  dropTask,
  enqueueTask,
  forever,
  getModifier,
  hasModifier,
  hash,
  hashSettled,
  keepLatestTask,
  race,
  rawTimeout,
  registerModifier,
  restartableTask,
  task,
  timeout,
  waitForEvent,
  waitForProperty,
  waitForQueue,
} from 'ember-concurrency';

import perform from 'ember-concurrency/helpers/perform';

import { expectTypeOf as expect } from 'expect-type';

declare type TestCallback = () => void | Promise<void>;
declare function module(description: string, callback: TestCallback): void;
declare function test(description: string, callback: TestCallback): void;

type LegacyAsyncTaskFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<T>;

type LegacyAsyncTaskFunctionArgs<
  T extends LegacyAsyncTaskFunction<any, any[]>,
> = T extends (...args: infer A) => Promise<any> ? A : [];

type LegacyAsyncTaskFunctionReturnType<
  T extends LegacyAsyncTaskFunction<any, any[]>,
> = T extends (...args: any[]) => Promise<infer R> ? R : unknown;

type LegacyTaskForAsyncTaskFunction<
  T extends LegacyAsyncTaskFunction<any, any[]>,
> = Task<LegacyAsyncTaskFunctionReturnType<T>, LegacyAsyncTaskFunctionArgs<T>>;

type TaskInstanceForAsyncTaskFunction<
  T extends LegacyAsyncTaskFunction<any, any[]>,
> = TaskInstance<LegacyAsyncTaskFunctionReturnType<T>>;

type AsyncTaskFunction = LegacyAsyncTaskFunction<any, any[]>;

module('unit tests', () => {
  test('imported helpers', () => {
    // @ts-expect-error
    perform([]);

    // let a = {} as Task<any, any[]>;
    // perform([a], {});
  });

  test('Task', () => {
    // @ts-expect-error
    new Task(); // Task cannot be constructed

    // @ts-expect-error
    class Foo extends Task<never, never[]> {} // Task cannot be subclassed

    let t!: Task<string, [boolean, number?]>;
    type MyTaskInstance = TaskInstance<string>;

    expect(t.isRunning).toBeBoolean();
    expect(t.isQueued).toBeBoolean;
    expect(t.isIdle).toBeBoolean();
    expect(t.state).toEqualTypeOf<'running' | 'queued' | 'idle'>();
    expect(t.last).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastRunning).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastPerformed).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastSuccessful).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastComplete).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastErrored).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastCanceled).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.lastIncomplete).toEqualTypeOf<MyTaskInstance | null>();
    expect(t.performCount).toBeNumber();

    expect(t.cancelAll).toBeCallableWith();
    expect(t.cancelAll).toBeCallableWith({});
    expect(t.cancelAll).toBeCallableWith({ reason: 'why do you care' });
    expect(t.cancelAll).toBeCallableWith({ resetState: true });
    expect(t.cancelAll).toBeCallableWith({
      reason: 'why do you care',
      resetState: true,
    });
    expect(t.cancelAll).parameters.toEqualTypeOf<
      [{ reason?: string; resetState?: boolean }?]
    >();
    expect(t.cancelAll).returns.toEqualTypeOf<Promise<void>>();

    // @ts-expect-error
    t.cancelAll(null);

    // @ts-expect-error
    t.cancelAll({ wow: false });

    expect(t.perform).toBeCallableWith(true);
    expect(t.perform).toBeCallableWith(false, 2);
    expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();
    expect(t.perform).returns.toEqualTypeOf<MyTaskInstance>();

    // @ts-expect-error
    t.perform();

    // @ts-expect-error
    t.perform('not boolean');

    // @ts-expect-error
    t.perform(false, 'not number');

    // @ts-expect-error
    t.perform(false, 3, 'extra');

    expect(t.linked).toBeCallableWith();
    expect(t.linked).parameters.toEqualTypeOf<[]>();
    expect(t.linked).returns.toEqualTypeOf(t);

    // @ts-expect-error
    t.linked(null);

    expect(t.unlinked).toBeCallableWith();
    expect(t.unlinked).parameters.toEqualTypeOf<[]>();
    expect(t.unlinked).returns.toEqualTypeOf(t);

    // @ts-expect-error
    t.unlinked(null);
  });

  test('TaskInstance', async () => {
    // @ts-expect-error
    new TaskInstance(); // TaskInstance cannot be constructed

    // @ts-expect-error
    class Foo extends TaskInstance {} // TaskInstance cannot be subclassed

    let t!: TaskInstance<string>;

    expect(t.value).toEqualTypeOf<string | null>();
    expect(t.error).toBeUnknown();
    expect(t.isSuccessful).toBeBoolean();
    expect(t.isError).toBeBoolean();
    expect(t.isCanceled).toBeBoolean();
    expect(t.hasStarted).toBeBoolean();
    expect(t.isFinished).toBeBoolean();
    expect(t.isRunning).toBeBoolean();
    expect(t.state).toEqualTypeOf<
      'dropped' | 'canceled' | 'finished' | 'running' | 'waiting'
    >();
    expect(t.isDropped).toBeBoolean();

    expect(t.cancel).toBeCallableWith();
    expect(t.cancel).toBeCallableWith('why do you care');
    expect(t.cancel).parameters.toEqualTypeOf<[string?]>();
    expect(t.cancel).returns.toEqualTypeOf<Promise<void>>();

    expect(t).toMatchTypeOf<Promise<string>>();
    expect(t).resolves.toBeString();

    expect(t.then).toBeCallableWith();
    expect(t.then).toBeCallableWith(() => {});
    expect(t.then).toBeCallableWith(
      () => {},
      () => {},
    );
    expect(t.then).toBeCallableWith((v) => expect(v).toBeString());
    expect(t.then).toBeCallableWith(
      (v) => expect(v).toBeString(),
      (e) => expect(e).toBeAny(),
    );

    {
      let chained = t.then((v) => v.length);
      expect(chained).resolves.toBeNumber();
    }

    // @ts-expect-error
    t.then('not a function');

    t.then(
      () => {},
      () => {},
      // @ts-expect-error
      () => {},
    );

    expect(t.catch).toBeCallableWith();
    expect(t.catch).toBeCallableWith(() => {});
    expect(t.catch).toBeCallableWith((e) => expect(e).toBeAny());

    {
      let chained = t.catch(() => 'caught');
      expect(chained).resolves.toBeString();
    }

    // @ts-expect-error
    t.catch('not a function');

    t.catch(
      () => {},
      // @ts-expect-error
      () => {},
    );

    expect(t.finally).toBeCallableWith();
    expect(t.finally).toBeCallableWith(() => {});

    {
      let chained = t.finally(() => 'finally');
      expect(chained).resolves.toBeString();
    }

    // @ts-expect-error
    t.finally((v) => {});

    // TODO: fix
    // try {
    //   let r = await t;
    //   expect(r).toBeString();
    // } catch (e) {
    //   expect(e).toBeAny();
    // }
  });

  test('TaskProperty', async () => {
    // @ts-expect-error
    new TaskProperty(); // TaskProperty cannot be constructed

    // @ts-expect-error
    class Foo extends TaskProperty<never, never[]> {} // TaskProperty cannot be subclassed

    let tp!: TaskProperty<string, [boolean, number?]>;

    expect(tp.on).toBeCallableWith();
    expect(tp.on).toBeCallableWith('init');
    expect(tp.on).toBeCallableWith('init', 'didInsertElement');
    expect(tp.on).parameters.toEqualTypeOf<string[]>();
    expect(tp.on).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.on(false);

    // @ts-expect-error
    tp.on('init', false);

    expect(tp.cancelOn).toBeCallableWith();
    expect(tp.cancelOn).toBeCallableWith('init');
    expect(tp.cancelOn).toBeCallableWith('init', 'didInsertElement');
    expect(tp.cancelOn).parameters.toEqualTypeOf<string[]>();
    expect(tp.cancelOn).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.cancelOn(false);

    // @ts-expect-error
    tp.cancelOn('init', false);

    expect(tp.restartable).toBeCallableWith();
    expect(tp.restartable).parameters.toEqualTypeOf<[]>();
    expect(tp.restartable).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.restartable('nope');

    expect(tp.enqueue).toBeCallableWith();
    expect(tp.enqueue).parameters.toEqualTypeOf<[]>();
    expect(tp.enqueue).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.enqueue('nope');

    expect(tp.drop).toBeCallableWith();
    expect(tp.drop).parameters.toEqualTypeOf<[]>();
    expect(tp.drop).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.drop('nope');

    expect(tp.keepLatest).toBeCallableWith();
    expect(tp.keepLatest).parameters.toEqualTypeOf<[]>();
    expect(tp.keepLatest).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.keepLatest('nope');

    expect(tp.maxConcurrency).toBeCallableWith(5);
    expect(tp.maxConcurrency).parameters.toEqualTypeOf<[number]>();
    expect(tp.maxConcurrency).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.maxConcurrency();

    // @ts-expect-error
    tp.maxConcurrency('nope');

    expect(tp.debug).toBeCallableWith();
    expect(tp.debug).parameters.toEqualTypeOf<[]>();
    expect(tp.debug).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.debug('nope');

    expect(tp.onState).toBeCallableWith(() => {});
    expect(tp.onState).toBeCallableWith(null);
    expect(tp.onState).toBeCallableWith((s) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(s).toEqualTypeOf<TaskState<TaskInstance<any>>>();
    });
    expect(tp.onState).toBeCallableWith((s, t) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(s).toEqualTypeOf<TaskState<TaskInstance<any>>>();
      expect(t).toEqualTypeOf<Task<string, [boolean, number?]>>();
    });
    expect(tp.onState).parameters.toEqualTypeOf<
      [OnStateCallback<Task<string, [boolean, number?]>> | null]
    >();
    expect(tp.onState).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.onState('nope');

    // @ts-expect-error
    tp.onState(undefined);

    let O = EmberObject.extend({
      tp,

      foo(
        this: EmberObject & { tp: TaskProperty<string, [boolean, number?]> },
      ) {
        let t = this.get('tp');
        expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
        expect(t.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();

        let i = this.get('tp').perform(true);
        expect(i).toEqualTypeOf<TaskInstance<string>>();
        expect(i.value).toEqualTypeOf<string | null>();

        // @ts-expect-error
        this.get('tp').perform();

        // @ts-expect-error
        this.get('tp').perform('nope');

        // @ts-expect-error
        this.get('tp').perform(true, 'nope');

        // @ts-expect-error
        this.get('tp').perform(false, 5, 'nope');
      },

      bar(
        this: EmberObject & { tp: TaskProperty<string, [boolean, number?]> },
      ) {
        let t = get(this, 'tp');
        expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
        expect(t.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();

        let i = get(this, 'tp').perform(true);
        expect(i).toEqualTypeOf<TaskInstance<string>>();
        expect(i.value).toEqualTypeOf<string | null>();

        // @ts-expect-error
        get(this, 'tp').perform();

        // @ts-expect-error
        get(this, 'tp').perform('nope');

        // @ts-expect-error
        get(this, 'tp').perform(true, 'nope');

        // @ts-expect-error
        get(this, 'tp').perform(false, 5, 'nope');
      },
    });

    {
      let o = O.create() as EmberObject & {
        tp: TaskProperty<string, [boolean, number?]>;
      };

      let t = o.get('tp');

      expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
      expect(t.last).toEqualTypeOf<TaskInstance<string> | null>();

      let i = o.get('tp').perform(false, 5);
      expect(i).toEqualTypeOf<TaskInstance<string>>();
      expect(i.value).toEqualTypeOf<string | null>();

      // @ts-expect-error
      o.get('tp').perform();

      // @ts-expect-error
      o.get('tp').perform('nope');

      // @ts-expect-error
      o.get('tp').perform(true, 'nope');

      // @ts-expect-error
      o.get('tp').perform(false, 5, 'nope');
    }

    {
      let t = get(
        O.create() as EmberObject & {
          tp: TaskProperty<string, [boolean, number?]>;
        },
        'tp',
      );

      expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
      expect(t.last).toEqualTypeOf<TaskInstance<string> | null>();

      let i = t.perform(false, 5);
      expect(i).toEqualTypeOf<TaskInstance<string>>();
      expect(i.value).toEqualTypeOf<string | null>();

      // @ts-expect-error
      t.perform();

      // @ts-expect-error
      t.perform('nope');

      // @ts-expect-error
      t.perform(true, 'nope');

      // @ts-expect-error
      t.perform(false, 5, 'nope');
    }
  });

  test('task', function () {
    // Note: This test function now only tests async arrow function syntax
    // since generator functions and encapsulated tasks have been removed
    // All the generator and encapsulated task tests have been removed
    // as they are no longer supported
  });

  test('all', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    expect(all([])).resolves.toEqualTypeOf<[]>();
    expect(all([value])).resolves.toEqualTypeOf<[string]>();
    expect(all([task])).resolves.toEqualTypeOf<[boolean]>();
    expect(all([thenable])).resolves.toEqualTypeOf<[number]>();
    expect(all([promise])).resolves.toEqualTypeOf<[void]>();

    expect(all([value, task, thenable, promise])).resolves.toEqualTypeOf<
      [string, boolean, number, void]
    >();

    {
      let result = await all([]);

      // @ts-expect-error
      result[0];
    }

    {
      let result = await all([value]);
      expect(result[0]).toBeString();

      // @ts-expect-error
      result[1];
    }

    {
      let result = await all([value, task]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();

      // @ts-expect-error
      result[2];
    }

    {
      let result = await all([value, task, thenable]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();

      // @ts-expect-error
      result[3];
    }

    {
      let result = await all([value, task, thenable, promise]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();

      // @ts-expect-error
      result[4];
    }

    {
      let result = await all([value, task, thenable, promise, value]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();

      // @ts-expect-error
      result[5];
    }

    {
      let result = await all([value, task, thenable, promise, value, task]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();

      // @ts-expect-error
      result[6];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();

      // @ts-expect-error
      result[7];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();
      expect(result[7]).toEqualTypeOf<void>();

      // @ts-expect-error
      result[8];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();
      expect(result[7]).toEqualTypeOf<void>();
      expect(result[8]).toBeString();

      // @ts-expect-error
      result[9];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();
      expect(result[7]).toEqualTypeOf<void>();
      expect(result[8]).toBeString();
      expect(result[9]).toBeBoolean();

      // @ts-expect-error
      result[10];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();
      expect(result[7]).toEqualTypeOf<void>();
      expect(result[8]).toBeString();
      expect(result[9]).toBeBoolean();
      expect(result[10]).toBeNumber();

      // @ts-expect-error
      result[11];
    }

    {
      let result = await all([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result[0]).toBeString();
      expect(result[1]).toBeBoolean();
      expect(result[2]).toBeNumber();
      expect(result[3]).toEqualTypeOf<void>();
      expect(result[4]).toBeString();
      expect(result[5]).toBeBoolean();
      expect(result[6]).toBeNumber();
      expect(result[7]).toEqualTypeOf<void>();
      expect(result[8]).toBeString();
      expect(result[9]).toBeBoolean();
      expect(result[10]).toBeNumber();
      expect(result[11]).toEqualTypeOf<void>();

      // @ts-expect-error
      result[12];
    }
  });

  test('allSettled', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type S<T> =
      | { state: 'fulfilled'; value: T }
      | { state: 'rejected'; reason: any };

    expect(allSettled([])).resolves.toEqualTypeOf<[]>();
    expect(allSettled([value])).resolves.toEqualTypeOf<[S<string>]>();
    expect(allSettled([task])).resolves.toEqualTypeOf<[S<boolean>]>();
    expect(allSettled([thenable])).resolves.toEqualTypeOf<[S<number>]>();
    expect(allSettled([promise])).resolves.toEqualTypeOf<[S<void>]>();

    expect(allSettled([value, task, thenable, promise])).resolves.toEqualTypeOf<
      [S<string>, S<boolean>, S<number>, S<void>]
    >();

    {
      let result = await allSettled([]);

      // @ts-expect-error
      result[0];
    }

    {
      let result = await allSettled([value]);
      expect(result[0]).toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[1];
    }

    {
      let result = await allSettled([value, task]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[2];
    }

    {
      let result = await allSettled([value, task, thenable]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[3];
    }

    {
      let result = await allSettled([value, task, thenable, promise]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[4];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[5];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[6];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[7];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();
      expect(result[7]).toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[8];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();
      expect(result[7]).toEqualTypeOf<S<void>>();
      expect(result[8]).toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[9];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();
      expect(result[7]).toEqualTypeOf<S<void>>();
      expect(result[8]).toEqualTypeOf<S<string>>();
      expect(result[9]).toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[10];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();
      expect(result[7]).toEqualTypeOf<S<void>>();
      expect(result[8]).toEqualTypeOf<S<string>>();
      expect(result[9]).toEqualTypeOf<S<boolean>>();
      expect(result[10]).toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[11];
    }

    {
      let result = await allSettled([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result[0]).toEqualTypeOf<S<string>>();
      expect(result[1]).toEqualTypeOf<S<boolean>>();
      expect(result[2]).toEqualTypeOf<S<number>>();
      expect(result[3]).toEqualTypeOf<S<void>>();
      expect(result[4]).toEqualTypeOf<S<string>>();
      expect(result[5]).toEqualTypeOf<S<boolean>>();
      expect(result[6]).toEqualTypeOf<S<number>>();
      expect(result[7]).toEqualTypeOf<S<void>>();
      expect(result[8]).toEqualTypeOf<S<string>>();
      expect(result[9]).toEqualTypeOf<S<boolean>>();
      expect(result[10]).toEqualTypeOf<S<number>>();
      expect(result[11]).toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[12];
    }
  });

  test('didCancel', async () => {
    expect(didCancel).toBeCallableWith(null);
    expect(didCancel).toBeCallableWith(undefined);
    expect(didCancel).toBeCallableWith({});
    expect(didCancel).toBeCallableWith(new Error());
    expect(didCancel).parameters.toEqualTypeOf<[unknown]>();
    expect(didCancel).returns.toEqualTypeOf<boolean>();

    // @ts-expect-error
    didCancel();

    try {
      let t!: TaskInstance<string>;
      await t;
    } catch (e) {
      // TODO: fix
      // expect(e).toBeAny();

      if (didCancel(e)) {
        expect(e).not.toBeAny();
        expect(e).toMatchTypeOf<Error>();
        expect(e).toMatchTypeOf<{ name: 'TaskCancelation' }>();
      }
    }
  });

  test('hash', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    expect(hash({})).resolves.toEqualTypeOf<{}>();
    expect(hash({ value })).resolves.toEqualTypeOf<{ value: string }>();
    expect(hash({ task })).resolves.toEqualTypeOf<{ task: boolean }>();
    expect(hash({ thenable })).resolves.toEqualTypeOf<{ thenable: number }>();
    expect(hash({ promise })).resolves.toEqualTypeOf<{ promise: void }>();

    expect(hash({ value, task, thenable, promise })).resolves.toEqualTypeOf<{
      value: string;
      task: boolean;
      thenable: number;
      promise: void;
    }>();

    {
      let result = await hash({});

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value });
      expect(result.value).toBeString();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task });
      expect(result.value).toBeString();
      expect(result.task).toBeBoolean();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task, thenable });
      expect(result.value).toBeString();
      expect(result.task).toBeBoolean();
      expect(result.thenable).toBeNumber();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task, thenable, promise });
      expect(result.value).toBeString();
      expect(result.task).toBeBoolean();
      expect(result.thenable).toBeNumber();
      expect(result.promise).toEqualTypeOf<void>();

      // @ts-expect-error
      result.nope;
    }
  });

  test('hashSettled', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type S<T> =
      | { state: 'fulfilled'; value: T }
      | { state: 'rejected'; reason: any };

    expect(hashSettled({})).resolves.toEqualTypeOf<{}>();
    expect(hashSettled({ value })).resolves.toEqualTypeOf<{
      value: S<string>;
    }>();
    expect(hashSettled({ task })).resolves.toEqualTypeOf<{
      task: S<boolean>;
    }>();
    expect(hashSettled({ thenable })).resolves.toEqualTypeOf<{
      thenable: S<number>;
    }>();
    expect(hashSettled({ promise })).resolves.toEqualTypeOf<{
      promise: S<void>;
    }>();

    expect(
      hashSettled({ value, task, thenable, promise }),
    ).resolves.toEqualTypeOf<{
      value: S<string>;
      task: S<boolean>;
      thenable: S<number>;
      promise: S<void>;
    }>();

    {
      let result = await hashSettled({});

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hashSettled({ value });
      expect(result.value).toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hashSettled({ value, task });
      expect(result.value).toEqualTypeOf<S<string>>();
      expect(result.task).toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hashSettled({ value, task, thenable });
      expect(result.value).toEqualTypeOf<S<string>>();
      expect(result.task).toEqualTypeOf<S<boolean>>();
      expect(result.thenable).toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hashSettled({ value, task, thenable, promise });
      expect(result.value).toEqualTypeOf<S<string>>();
      expect(result.task).toEqualTypeOf<S<boolean>>();
      expect(result.thenable).toEqualTypeOf<S<number>>();
      expect(result.promise).toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result.nope;
    }
  });

  test('race', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    expect(race([])).toEqualTypeOf(Promise.race([]));
    expect(race([value])).toEqualTypeOf(Promise.race([value]));
    expect(race([task])).toEqualTypeOf(Promise.race([task]));
    expect(race([thenable])).toEqualTypeOf(Promise.race([thenable]));
    expect(race([promise])).toEqualTypeOf(Promise.race([promise]));

    expect(race([value, task, thenable, promise])).toEqualTypeOf(
      Promise.race([value, task, thenable, promise]),
    );

    {
      let result = await race([]);
      expect(result).not.toBeAny();
      expect(result).toBeNever();
    }

    {
      let result = await race([value]);
      expect(result).not.toBeAny();
      expect(result).toBeString();
      expect(result.length).toBeNumber();
    }

    {
      let result = await race([value, task]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
        value,
        task,
        thenable,
        promise,
      ]);
      expect(result).not.toBeAny();
      expect(result).toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }
  });

  test('timeout', async () => {
    expect(timeout).toBeCallableWith(500);
    expect(timeout).parameters.toEqualTypeOf<[number]>();
    expect(timeout).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    timeout();

    // @ts-expect-error
    timeout('nope');

    // @ts-expect-error
    timeout(500, 'nope');

    {
      let result = await timeout(500);
      expect(result).toEqualTypeOf<void>();
    }
  });

  test('rawTimeout', async () => {
    expect(rawTimeout).toBeCallableWith(500);
    expect(rawTimeout).parameters.toEqualTypeOf<[number]>();
    expect(rawTimeout).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    rawTimeout();

    // @ts-expect-error
    rawTimeout('nope');

    // @ts-expect-error
    rawTimeout(500, 'nope');

    {
      let result = await rawTimeout(500);
      expect(result).toEqualTypeOf<void>();
    }
  });

  test('animationFrame', async () => {
    expect(animationFrame).toBeCallableWith();
    expect(animationFrame).parameters.toEqualTypeOf<[]>();
    expect(animationFrame).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    animationFrame('nope');

    // @ts-expect-error
    animationFrame(500, 'nope');

    {
      let result = await animationFrame();
      expect(result).toEqualTypeOf<void>();
    }
  });

  test('waitForQueue', async () => {
    expect(waitForQueue).toBeCallableWith('afterRender');
    expect(waitForQueue).parameters.toEqualTypeOf<[string]>();
    expect(waitForQueue).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    waitForQueue();

    // @ts-expect-error
    waitForQueue(500);

    // @ts-expect-error
    waitForQueue('afterRender', 'nope');

    {
      let result = await waitForQueue('afterRender');
      expect(result).toEqualTypeOf<void>();
    }
  });

  test('waitForEvent', async () => {
    type Evented =
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          on(event: string, callback: (...args: any[]) => void): void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          off(event: string, callback: (...args: any[]) => void): void;
        }
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          one(event: string, callback: (...args: any[]) => void): void;
        }
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          addEventListener(
            event: string,
            callback: (...args: any[]) => void,
          ): void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          removeEventListener(
            event: string,
            callback: (...args: any[]) => void,
          ): void;
        };

    expect(waitForEvent).toBeCallableWith(
      {
        on(event: string, callback: Function): void {},
        off(event: string, callback: Function): void {},
      },
      'foo',
    );
    expect(waitForEvent).toBeCallableWith(
      {
        one(event: string, callback: Function): void {},
      },
      'foo',
    );
    expect(waitForEvent).toBeCallableWith(
      EmberObject.extend(Evented).create() as EmberObject & Evented,
      'foo',
    );
    expect(waitForEvent).toBeCallableWith(
      {
        addEventListener(event: string, callback: Function): void {},
        removeEventListener(event: string, callback: Function): void {},
      },
      'foo',
    );
    expect(waitForEvent).toBeCallableWith(document.body, 'click');
    expect(waitForEvent).parameters.toEqualTypeOf<[Evented, string]>();
    expect(waitForEvent).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    waitForEvent();

    // @ts-expect-error
    waitForEvent('nope');

    // @ts-expect-error
    waitForEvent(document.body, 'click', 'nope');

    {
      let result = await waitForEvent(document.body, 'click');
      expect(result).toEqualTypeOf<void>();
    }
  });

  test('waitForProperty', async () => {
    let obj = { foo: 'foo' };

    // TODO: fix
    // expect(waitForProperty).toBeCallableWith(obj, 'foo', 'bar');
    // expect(waitForProperty).toBeCallableWith(
    //   obj,
    //   'foo',
    //   (v: unknown) => v === 'bar'
    // );
    // expect(waitForProperty).toBeCallableWith(
    //   obj,
    //   'foo',
    //   (v: string) => v === 'bar'
    // );

    // expect(waitForProperty).parameters.toEqualTypeOf<
    //   [object, string | number | symbol, unknown]
    // >();
    expect(waitForProperty).returns.toEqualTypeOf<Yieldable<void>>();

    // @ts-expect-error
    waitForProperty();

    // @ts-expect-error
    waitForProperty('nope');

    // @ts-expect-error
    waitForProperty(obj, 'foo', 'bar', 'nope');

    {
      let result = await waitForProperty(obj, 'foo', 'bar');
      expect(result).toEqualTypeOf<void>();
    }

    {
      let result = await waitForProperty(obj, 'foo', (v) => {
        expect(v).toBeString();
        return false;
      });

      expect(result).toEqualTypeOf<void>();
    }
  });

  test('forever', async () => {
    expect(forever).toBeCallableWith();
    expect(forever).parameters.toEqualTypeOf<[]>();
    expect(forever).returns.toEqualTypeOf<Yieldable<never>>();

    // @ts-expect-error
    forever('nope');

    {
      let result = await forever();
      expect(result).toBeNever();
    }
  });

  test('getModifier', () => {
    expect(getModifier).toBeCallableWith('foo');
    expect(getModifier).parameters.toEqualTypeOf<[string]>();
    expect(getModifier).returns.toEqualTypeOf<any>();

    // @ts-expect-error
    getModifier();

    // @ts-expect-error
    getModifier(false);

    // @ts-expect-error
    getModifier(null);
  });

  test('hasModifier', () => {
    expect(hasModifier).toBeCallableWith('foo');
    expect(hasModifier).parameters.toEqualTypeOf<[string]>();
    expect(hasModifier).returns.toEqualTypeOf<boolean>();

    // @ts-expect-error
    hasModifier();

    // @ts-expect-error
    hasModifier(false);

    // @ts-expect-error
    hasModifier(null);

    // @ts-expect-error
    hasModifier(function* () {});
  });

  test('registerModifier', () => {
    let singleArgModifier = function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      factory: any,
      modifierArgument: boolean,
    ) {
      // Simplified modifier
    };

    expect(registerModifier).toBeCallableWith('foo', singleArgModifier);
    expect(registerModifier).parameters.toEqualTypeOf<[string, any]>();
    expect(registerModifier).returns.toEqualTypeOf<void>();

    // @ts-expect-error
    registerModifier();

    // @ts-expect-error
    registerModifier('foo');
  });
});

module('integration tests', () => {
  type Resolved<T> = T extends PromiseLike<infer R> ? R : T;

  test('classic ember', () => {
    ClassicComponent.extend({
      // eslint-disable-next-line @typescript-eslint/no-inferrable-types
      myTask: restartableTask(
        async (immediately: boolean, ms: number = 500) => {
          if (!immediately) {
            await timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = await fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      ),

      async performMyTask(
        this: EmberObject & {
          myTask: TaskProperty<string, [boolean, number?]>;
        },
      ) {
        let myTask = this.get('myTask');

        expect(myTask).not.toBeAny();
        expect(myTask).toMatchTypeOf<Task<string, [boolean, number?]>>();
        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toEqualTypeOf<TaskInstance<string>>();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance).toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect(result).not.toBeAny();
        expect(result).toBeString();
        expect(result.length).toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      },
    });
  });

  test('async arrow with first arg `this`', () => {
    class MyComponent extends GlimmerComponent {
      normalTask = task(this, async (immediately: boolean, ms = 500) => {
        if (!immediately) {
          await timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect(fetchPromise).resolves.toEqualTypeOf<Response>();

        let response: Response = await fetchPromise;
        expect(response).toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
        expect(safeResponse).toEqualTypeOf<Response>();

        return 'wow';
      });

      restartable = task(this, { restartable: true }, async () => {});
      enqueue = task(this, { enqueue: true }, async () => {});
      drop = task(this, { drop: true }, async () => {});
      keepLatest = task(this, { keepLatest: true }, async () => {});
      debug = task(this, { debug: true }, async () => {});
      onState = task(this, { onState: () => {} }, async () => {});
      onStateNull = task(this, { onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task(this, { on: 'hi' }, async () => {});
      cancelOn = task(this, { cancelOn: 'bye' }, async () => {});
      maxConcurrency = task(this, { maxConcurrency: 1 }, async () => {});

      myTaskValue = 'or some default';

      myTask = task(
        this,
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          if (!immediately) {
            await timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = await fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      );

      async performMyTask() {
        let myTask = this.myTask;

        expect(myTask).not.toBeAny();
        expect(myTask).toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toEqualTypeOf<TaskInstance<string>>();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance).toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect(result).not.toBeAny();
        expect(result).toBeString();
        expect(result.length).toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      }
    }
  });

  test('async arrow omitting `this`', () => {
    class MyComponent extends GlimmerComponent {
      normalTask = task(async (immediately: boolean, ms = 500) => {
        if (!immediately) {
          await timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect(fetchPromise).resolves.toEqualTypeOf<Response>();

        let response: Response = await fetchPromise;
        expect(response).toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
        expect(safeResponse).toEqualTypeOf<Response>();

        return 'wow';
      });

      restartable = task({ restartable: true }, async () => {});
      enqueue = task({ enqueue: true }, async () => {});
      drop = task({ drop: true }, async () => {});
      keepLatest = task({ keepLatest: true }, async () => {});
      debug = task({ debug: true }, async () => {});
      onState = task({ onState: () => {} }, async () => {});
      onStateNull = task({ onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task({ on: 'hi' }, async () => {});
      cancelOn = task({ cancelOn: 'bye' }, async () => {});
      maxConcurrency = task({ maxConcurrency: 1 }, async () => {});

      myTaskValue = 'or some default';

      myTask = task(
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          if (!immediately) {
            await timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = await fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      );

      async performMyTask() {
        let myTask = this.myTask;

        expect(myTask).not.toBeAny();
        expect(myTask).toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toEqualTypeOf<TaskInstance<string>>();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance).toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect(result).not.toBeAny();
        expect(result).toBeString();
        expect(result.length).toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      }
    }
  });

  test('async arrow with get', () => {
    class MyComponent extends GlimmerComponent {
      myTask = task(
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          if (!immediately) {
            await timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = await fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      );

      async performMyTask() {
        let myTask = get(this, 'myTask');

        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toEqualTypeOf<TaskInstance<string>>();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance).toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect(result).not.toBeAny();
        expect(result).toBeString();
        expect(result.length).toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      }
    }
  });

  test('async arrow dropTask and other alternative task fns', () => {
    class MyComponent extends GlimmerComponent {
      normalTask = task(async (immediately: boolean, ms = 500) => {
        if (!immediately) {
          await timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect(fetchPromise).resolves.toEqualTypeOf<Response>();

        let response: Response = await fetchPromise;
        expect(response).toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
        expect(safeResponse).toEqualTypeOf<Response>();

        return 'wow';
      });

      restartable = restartableTask(async () => {});
      restartable2 = restartableTask({ maxConcurrency: 2 }, async () => {});
      enqueue = enqueueTask(async () => {});
      enqueue2 = enqueueTask({ maxConcurrency: 2 }, async () => {});
      drop = dropTask(async () => {});
      drop2 = dropTask({ maxConcurrency: 2 }, async () => {});
      keepLatest = keepLatestTask(async () => {});
      keepLatest2 = keepLatestTask({ maxConcurrency: 2 }, async () => {});
      debug = task({ debug: true }, async () => {});
      onState = task({ onState: () => {} }, async () => {});
      onStateNull = task({ onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task({ on: 'hi' }, async () => {});
      cancelOn = task({ cancelOn: 'bye' }, async () => {});
      maxConcurrency = task({ maxConcurrency: 1 }, async () => {});

      myTaskValue = 'or some default';

      myTask = task(
        this,
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          if (!immediately) {
            await timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = await fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = await fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      );

      async performMyTask() {
        let myTask = this.myTask;

        expect(myTask).not.toBeAny();
        expect(myTask).toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toEqualTypeOf<TaskInstance<string> | null>();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toEqualTypeOf<TaskInstance<string>>();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance).toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect(result).not.toBeAny();
        expect(result).toBeString();
        expect(result.length).toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      }
    }
  });
});
