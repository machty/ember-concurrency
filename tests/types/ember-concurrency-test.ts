/* eslint-disable prettier/prettier */
import 'ember-source/types';
import 'ember-source/types/preview';

import ClassicComponent from '@ember/component';
import EmberObject, { get } from '@ember/object';
import Evented from '@ember/object/evented';
import GlimmerComponent from '@glimmer/component';
import {
  EncapsulatedTask,
  EncapsulatedTaskDescriptor,
  EncapsulatedTaskDescriptorArgs,
  EncapsulatedTaskDescriptorReturnType,
  EncapsulatedTaskProperty,
  EncapsulatedTaskState,
  OnStateCallback,
  Task,
  TaskForTaskFunction,
  TaskForEncapsulatedTaskDescriptor,
  TaskInstanceForTaskFunction,
  TaskInstanceForEncapsulatedTaskDescriptor,
  TaskFactory,
  TaskFunction,
  TaskFunctionArgs,
  TaskFunctionReturnType,
  TaskGenerator,
  TaskGroup,
  TaskGroupProperty,
  TaskInstance,
  TaskModifier,
  TaskProperty,
  TaskState,
  Yieldable,
  all,
  allSettled,
  animationFrame,
  didCancel,
  forever,
  getModifier,
  hasModifier,
  hash,
  hashSettled,
  race,
  rawTimeout,
  registerModifier,
  restartableTask,
  task,
  taskGroup,
  timeout,
  waitForEvent,
  waitForProperty,
  waitForQueue,
  lastValue,
  TaskForAsyncTaskFunction,
  dropTask,
  enqueueTask,
  keepLatestTask,
} from 'ember-concurrency';
import { expectTypeOf as expect } from 'expect-type';
import { taskFor } from 'ember-concurrency-ts';

declare type TestCallback = () => void | Promise<void>;
declare function module(description: string, callback: TestCallback): void;
declare function test(description: string, callback: TestCallback): void;

type LegacyAsyncTaskFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<T>;

type LegacyAsyncTaskFunctionArgs<
  T extends LegacyAsyncTaskFunction<any, any[]>
> = T extends (...args: infer A) => Promise<any> ? A : [];

type LegacyAsyncTaskFunctionReturnType<
  T extends LegacyAsyncTaskFunction<any, any[]>
> = T extends (...args: any[]) => Promise<infer R> ? R : unknown;

type LegacyTaskForAsyncTaskFunction<
  T extends LegacyAsyncTaskFunction<any, any[]>
> = Task<LegacyAsyncTaskFunctionReturnType<T>, LegacyAsyncTaskFunctionArgs<T>>;

type TaskInstanceForAsyncTaskFunction<
  T extends LegacyAsyncTaskFunction<any, any[]>
> = TaskInstance<LegacyAsyncTaskFunctionReturnType<T>>;

type AsyncTaskFunction = LegacyAsyncTaskFunction<any, any[]>;

module('unit tests', () => {
  test('TaskGenerator', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect<TaskGenerator<void>>().toEqualTypeOf<Generator<any, void, any>>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect<TaskGenerator<string>>().toEqualTypeOf<
      Generator<any, string, any>
    >();
  });

  test('TaskFunction', () => {
    expect<TaskFunction<void, []>>().toEqualTypeOf<() => TaskGenerator<void>>();
    expect<TaskFunction<string, []>>().toEqualTypeOf<
      () => TaskGenerator<string>
    >();
    expect<TaskFunction<void, [boolean, number?]>>().toEqualTypeOf<
      (foo: boolean, bar?: number) => TaskGenerator<void>
    >();
    expect<TaskFunction<string, [boolean, number?]>>().toEqualTypeOf<
      (foo: boolean, bar?: number) => TaskGenerator<string>
    >();
  });

  test('TaskFunctionArgs', () => {
    {
      let f = function* () {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[]>();
    }

    {
      let f = function* (foo: boolean) {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[boolean]>();
    }

    {
      let f = function* (foo: boolean, bar?: number) {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[boolean, number?]>();
    }

    {
      let f = function () {};
      // @ts-expect-error
      expect<TaskFunctionArgs<typeof f>>();
    }
  });

  test('TaskFunctionReturnType', () => {
    {
      let f = function* () {};
      expect<TaskFunctionReturnType<typeof f>>().toEqualTypeOf<void>();
    }

    {
      let f = function* () {
        return 'foo';
      };
      expect<TaskFunctionReturnType<typeof f>>().toEqualTypeOf<string>();
    }

    {
      let f = function () {};
      // @ts-expect-error
      expect<TaskFunctionReturnType<typeof f>>();
    }
  });

  test('TaskForTaskFunction', () => {
    {
      let f = function* () {};
      expect<TaskForTaskFunction<typeof f>>().toEqualTypeOf<Task<void, []>>();
    }

    {
      let f = function* (foo: boolean) {};
      expect<TaskForTaskFunction<typeof f>>().toEqualTypeOf<
        Task<void, [boolean]>
      >();
    }

    {
      let f = function* (foo: boolean, bar?: number) {};
      expect<TaskForTaskFunction<typeof f>>().toEqualTypeOf<
        Task<void, [boolean, number?]>
      >();
    }

    {
      let f = function* () {
        return 'foo';
      };
      expect<TaskForTaskFunction<typeof f>>().toEqualTypeOf<Task<string, []>>();
    }

    {
      let f = function* (foo: boolean, bar?: number) {
        return 'foo';
      };
      expect<TaskForTaskFunction<typeof f>>().toEqualTypeOf<
        Task<string, [boolean, number?]>
      >();
    }

    {
      let f = function () {};
      // @ts-expect-error
      expect<TaskForTaskFunction<typeof f>>();
    }
  });

  test('TaskInstanceForTaskFunction', () => {
    {
      let f = function* () {};
      expect<TaskInstanceForTaskFunction<typeof f>>().toEqualTypeOf<
        TaskInstance<void>
      >();
    }

    {
      let f = function* (foo: boolean) {};
      expect<TaskInstanceForTaskFunction<typeof f>>().toEqualTypeOf<
        TaskInstance<void>
      >();
    }

    {
      let f = function* (foo: boolean, bar?: number) {};
      expect<TaskInstanceForTaskFunction<typeof f>>().toEqualTypeOf<
        TaskInstance<void>
      >();
    }

    {
      let f = function* () {
        return 'foo';
      };
      expect<TaskInstanceForTaskFunction<typeof f>>().toEqualTypeOf<
        TaskInstance<string>
      >();
    }

    {
      let f = function* (foo: boolean, bar?: number) {
        return 'foo';
      };
      expect<TaskInstanceForTaskFunction<typeof f>>().toEqualTypeOf<
        TaskInstance<string>
      >();
    }

    {
      let f = function () {};
      // @ts-expect-error
      expect<TaskInstanceForTaskFunction<typeof f>>();
    }
  });

  test('EncapsulatedTaskDescriptor', () => {
    expect<EncapsulatedTaskDescriptor<void, []>>().toEqualTypeOf<{
      perform(): TaskGenerator<void>;
    }>();
    expect<EncapsulatedTaskDescriptor<string, []>>().toEqualTypeOf<{
      perform(): TaskGenerator<string>;
    }>();
    expect<
      EncapsulatedTaskDescriptor<void, [boolean, number?]>
    >().toEqualTypeOf<{
      perform(foo: boolean, bar?: number): TaskGenerator<void>;
    }>();
    expect<
      EncapsulatedTaskDescriptor<string, [boolean, number?]>
    >().toEqualTypeOf<{
      perform(foo: boolean, bar?: number): TaskGenerator<string>;
    }>();
  });

  test('EncapsulatedTaskDescriptorArgs', () => {
    {
      let d = { foo: 'foo', *perform() {} };
      expect<EncapsulatedTaskDescriptorArgs<typeof d>>().toEqualTypeOf<[]>();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean) {} };
      expect<EncapsulatedTaskDescriptorArgs<typeof d>>().toEqualTypeOf<
        [boolean]
      >();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean, bar?: number) {} };
      expect<EncapsulatedTaskDescriptorArgs<typeof d>>().toEqualTypeOf<
        [boolean, number?]
      >();
    }

    {
      let d = { foo: 'foo', perform() {} };
      // @ts-expect-error
      expect<EncapsulatedTaskDescriptorArgs<typeof d>>();
    }
  });

  test('EncapsulatedTaskDescriptorReturnType', () => {
    {
      let d = { foo: 'foo', *perform() {} };
      expect<
        EncapsulatedTaskDescriptorReturnType<typeof d>
      >().toEqualTypeOf<void>();
    }

    {
      let d = {
        foo: 'foo',
        *perform() {
          return 'foo';
        },
      };
      expect<
        EncapsulatedTaskDescriptorReturnType<typeof d>
      >().toEqualTypeOf<string>();
    }

    {
      let d = { perform() {} };
      // @ts-expect-error
      expect<EncapsulatedTaskDescriptorReturnType<typeof d>>();
    }
  });

  test('EncapsulatedTaskState', () => {
    {
      let d = {};
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{}>();
    }

    {
      let d = { foo: 'foo' };
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{
        foo: string;
      }>();
    }

    {
      let d = { foo: 'foo', value: 123 };
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{
        foo: string;
      }>();
    }

    {
      let d = { *perform() {} };
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{}>();
    }

    {
      let d = {
        foo: 'foo',
        *perform() {
          return 'foo';
        },
      };
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{
        foo: string;
      }>();
    }

    {
      let d = {
        foo: 'foo',
        value: 123,
        *perform() {
          return 'foo';
        },
      };
      expect<EncapsulatedTaskState<typeof d>>().toEqualTypeOf<{
        foo: string;
      }>();
    }
  });

  test('TaskForEncapsulatedTaskDescriptor', () => {
    {
      let d = { foo: 'foo', *perform() {} };
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>().toEqualTypeOf<
        EncapsulatedTask<void, [], { foo: string }>
      >();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean) {} };
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>().toEqualTypeOf<
        EncapsulatedTask<void, [boolean], { foo: string }>
      >();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean, bar?: number) {} };
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>().toEqualTypeOf<
        EncapsulatedTask<void, [boolean, number?], { foo: string }>
      >();
    }

    {
      let d = {
        foo: 'foo',
        *perform() {
          return 'foo';
        },
      };
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>().toEqualTypeOf<
        EncapsulatedTask<string, [], { foo: string }>
      >();
    }

    {
      let d = {
        foo: 'foo',
        *perform(foo: boolean, bar?: number) {
          return 'foo';
        },
      };
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>().toEqualTypeOf<
        EncapsulatedTask<string, [boolean, number?], { foo: string }>
      >();
    }

    {
      let d = { foo: 'foo', perform() {} };
      // @ts-expect-error
      expect<TaskForEncapsulatedTaskDescriptor<typeof d>>();
    }
  });

  test('TaskInstanceForEncapsulatedTaskDescriptor', () => {
    {
      let d = { foo: 'foo', *perform() {} };
      expect<
        TaskInstanceForEncapsulatedTaskDescriptor<typeof d>
      >().toEqualTypeOf<TaskInstance<void> & { foo: string }>();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean) {} };
      expect<
        TaskInstanceForEncapsulatedTaskDescriptor<typeof d>
      >().toEqualTypeOf<TaskInstance<void> & { foo: string }>();
    }

    {
      let d = { foo: 'foo', *perform(foo: boolean, bar?: number) {} };
      expect<
        TaskInstanceForEncapsulatedTaskDescriptor<typeof d>
      >().toEqualTypeOf<TaskInstance<void> & { foo: string }>();
    }

    {
      let d = {
        foo: 'foo',
        *perform() {
          return 'foo';
        },
      };
      expect<
        TaskInstanceForEncapsulatedTaskDescriptor<typeof d>
      >().toEqualTypeOf<TaskInstance<string> & { foo: string }>();
    }

    {
      let d = {
        foo: 'foo',
        *perform(foo: boolean, bar?: number) {
          return 'foo';
        },
      };
      expect<
        TaskInstanceForEncapsulatedTaskDescriptor<typeof d>
      >().toEqualTypeOf<TaskInstance<string> & { foo: string }>();
    }

    {
      let d = { foo: 'foo', perform() {} };
      // @ts-expect-error
      expect<TaskInstanceForEncapsulatedTaskDescriptor<typeof d>>();
    }
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

  test('EncapsulatedTask', () => {
    // @ts-expect-error
    new EncapsulatedTask(); // EncapsulatedTask cannot be constructed

    // @ts-expect-error
    class Foo extends EncapsulatedTask<never, never[], { foo: string }> {} // EncapsulatedTask cannot be subclassed

    let t!: EncapsulatedTask<string, [boolean, number?], { foo: string }>;
    type MyTaskInstance = TaskInstance<string> & { foo: string };

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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(t.last!.foo).not.toBeAny();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(t.last!.foo).toBeString();

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

  test('TaskGroup', () => {
    // @ts-expect-error
    new TaskGroup(); // TaskGroup cannot be constructed

    // @ts-expect-error
    class Foo extends TaskGroup {} // TaskGroup cannot be subclassed

    let tg!: TaskGroup<string>;
    type MyTaskInstance = TaskInstance<string>;

    expect(tg.isRunning).toBeBoolean();
    expect(tg.isQueued).toBeBoolean;
    expect(tg.isIdle).toBeBoolean();
    expect(tg.state).toEqualTypeOf<'running' | 'queued' | 'idle'>();
    expect(tg.last).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastRunning).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastPerformed).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastSuccessful).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastComplete).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastErrored).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastCanceled).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.lastIncomplete).toEqualTypeOf<MyTaskInstance | null>();
    expect(tg.performCount).toBeNumber();

    expect(tg.cancelAll).toBeCallableWith();
    expect(tg.cancelAll).toBeCallableWith({});
    expect(tg.cancelAll).toBeCallableWith({ reason: 'why do you care' });
    expect(tg.cancelAll).toBeCallableWith({ resetState: true });
    expect(tg.cancelAll).toBeCallableWith({
      reason: 'why do you care',
      resetState: true,
    });
    expect(tg.cancelAll).parameters.toEqualTypeOf<
      [{ reason?: string; resetState?: boolean }?]
    >();
    expect(tg.cancelAll).returns.toEqualTypeOf<Promise<void>>();

    // @ts-expect-error
    tg.cancelAll(null);

    // @ts-expect-error
    tg.cancelAll({ wow: false });

    // @ts-expect-error
    tg.perform();
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
      () => {}
    );
    expect(t.then).toBeCallableWith((v) => expect(v).toBeString());
    expect(t.then).toBeCallableWith(
      (v) => expect(v).toBeString(),
      (e) => expect(e).toBeAny()
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
      () => {}
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
      () => {}
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

    expect(tp.group).toBeCallableWith('foo');
    expect(tp.group).parameters.toEqualTypeOf<[string]>();
    expect(tp.group).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.group();

    // @ts-expect-error
    tp.group(false);

    expect(tp.evented).toBeCallableWith();
    expect(tp.evented).parameters.toEqualTypeOf<[]>();
    expect(tp.evented).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.evented('nope');

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
        this: EmberObject & { tp: TaskProperty<string, [boolean, number?]> }
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
        this: EmberObject & { tp: TaskProperty<string, [boolean, number?]> }
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
        'tp'
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

  test('EncapsulatedTaskProperty', async () => {
    // @ts-expect-error
    new EncapsulatedTaskProperty(); // EncapsulatedTaskProperty cannot be constructed

    // @ts-expect-error
    class Foo extends EncapsulatedTaskProperty<never, never[], {}> {} // EncapsulatedTaskProperty cannot be subclassed

    let tp!: EncapsulatedTaskProperty<
      string,
      [boolean, number?],
      { foo: string }
    >;

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

    expect(tp.group).toBeCallableWith('foo');
    expect(tp.group).parameters.toEqualTypeOf<[string]>();
    expect(tp.group).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.group();

    // @ts-expect-error
    tp.group(false);

    expect(tp.evented).toBeCallableWith();
    expect(tp.evented).parameters.toEqualTypeOf<[]>();
    expect(tp.evented).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.evented('nope');

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
      expect(t).toEqualTypeOf<
        EncapsulatedTask<string, [boolean, number?], { foo: string }>
      >();
    });
    expect(tp.onState).parameters.toEqualTypeOf<
      [
        OnStateCallback<
          EncapsulatedTask<string, [boolean, number?], { foo: string }>
        > | null
      ]
    >();
    expect(tp.onState).returns.toEqualTypeOf(tp);

    // @ts-expect-error
    tp.onState('nope');

    // @ts-expect-error
    tp.onState(undefined);

    let O = EmberObject.extend({
      tp,

      foo(
        this: EmberObject & {
          tp: EncapsulatedTaskProperty<
            string,
            [boolean, number?],
            { foo: string }
          >;
        }
      ) {
        let t = this.get('tp');
        expect(t).toMatchTypeOf<
          EncapsulatedTask<string, [boolean, number?], { foo: string }>
        >();
        expect(t.last).toEqualTypeOf<
          (TaskInstance<string> & { foo: string }) | null
        >();
        expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();

        let i = this.get('tp').perform(true);
        expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
        expect(i.value).toEqualTypeOf<string | null>();
        expect(i.foo).not.toBeAny();
        expect(i.foo).toBeString();

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
        this: EmberObject & {
          tp: EncapsulatedTaskProperty<
            string,
            [boolean, number?],
            { foo: string }
          >;
        }
      ) {
        let t = get(this, 'tp');
        expect(t).toMatchTypeOf<
          EncapsulatedTask<string, [boolean, number?], { foo: string }>
        >();
        expect(t.last).toEqualTypeOf<
          (TaskInstance<string> & { foo: string }) | null
        >();
        expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();

        let i = get(this, 'tp').perform(true);
        expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
        expect(i.value).toEqualTypeOf<string | null>();
        expect(i.foo).not.toBeAny();
        expect(i.foo).toBeString();

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
        tp: EncapsulatedTaskProperty<
          string,
          [boolean, number?],
          { foo: string }
        >;
      };

      let t = o.get('tp');

      expect(t).toMatchTypeOf<
        EncapsulatedTask<string, [boolean, number?], { foo: string }>
      >();
      expect(t.last).toEqualTypeOf<
        (TaskInstance<string> & { foo: string }) | null
      >();

      let i = o.get('tp').perform(false, 5);
      expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

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
          tp: EncapsulatedTaskProperty<
            string,
            [boolean, number?],
            { foo: string }
          >;
        },
        'tp'
      );

      expect(t).toMatchTypeOf<
        EncapsulatedTask<string, [boolean, number?], { foo: string }>
      >();
      expect(t.last).toEqualTypeOf<
        (TaskInstance<string> & { foo: string }) | null
      >();

      let i = t.perform(false, 5);
      expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

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

  test('TaskGroupProperty', async () => {
    // @ts-expect-error
    new TaskGroupProperty(); // TaskGroupProperty cannot be constructed

    // @ts-expect-error
    class Foo extends TaskGroupProperty {} // TaskGroupProperty cannot be subclassed

    let tgp!: TaskGroupProperty<string>;

    // @ts-expect-error
    tgp.on('init');

    // @ts-expect-error
    tgp.cancelOn('init');

    expect(tgp.restartable).toBeCallableWith();
    expect(tgp.restartable).parameters.toEqualTypeOf<[]>();
    expect(tgp.restartable).returns.toEqualTypeOf(tgp);

    // @ts-expect-error
    tgp.restartable('nope');

    expect(tgp.enqueue).toBeCallableWith();
    expect(tgp.enqueue).parameters.toEqualTypeOf<[]>();
    expect(tgp.enqueue).returns.toEqualTypeOf(tgp);

    // @ts-expect-error
    tgp.enqueue('nope');

    expect(tgp.drop).toBeCallableWith();
    expect(tgp.drop).parameters.toEqualTypeOf<[]>();
    expect(tgp.drop).returns.toEqualTypeOf(tgp);

    // @ts-expect-error
    tgp.drop('nope');

    expect(tgp.keepLatest).toBeCallableWith();
    expect(tgp.keepLatest).parameters.toEqualTypeOf<[]>();
    expect(tgp.keepLatest).returns.toEqualTypeOf(tgp);

    // @ts-expect-error
    tgp.keepLatest('nope');

    expect(tgp.maxConcurrency).toBeCallableWith(5);
    expect(tgp.maxConcurrency).parameters.toEqualTypeOf<[number]>();
    expect(tgp.maxConcurrency).returns.toEqualTypeOf(tgp);

    // @ts-expect-error
    tgp.maxConcurrency();

    // @ts-expect-error
    tgp.maxConcurrency('nope');

    // @ts-expect-error
    tgp.group('nope');

    // @ts-expect-error
    tgp.evented();

    // @ts-expect-error
    tgp.debug();

    // @ts-expect-error
    tgp.onState();

    let O = EmberObject.extend({
      tgp: tgp,

      foo(this: EmberObject & { tgp: TaskGroupProperty<string> }) {
        let tg = this.get('tgp');
        expect(tg).toMatchTypeOf<TaskGroup<string>>();
        expect(tg.last).toEqualTypeOf<TaskInstance<string> | null>();

        // @ts-expect-error
        tg.perform();

        // @ts-expect-error
        this.get('tgp').perform();
      },

      bar(this: EmberObject & { tgp: TaskGroupProperty<string> }) {
        let tg = get(this, 'tgp');
        expect(tg).toMatchTypeOf<TaskGroup<string>>();
        expect(tg.last).toEqualTypeOf<TaskInstance<string> | null>();

        // @ts-expect-error
        tg.perform();

        // @ts-expect-error
        get(this, 'tgp').perform();
      },
    });

    {
      let o = O.create() as EmberObject & { tgp: TaskGroupProperty<string> };

      let tg = o.get('tgp');

      expect(tg).toMatchTypeOf<TaskGroup<string>>();
      expect(tg.last).toEqualTypeOf<TaskInstance<string> | null>();

      // @ts-expect-error
      o.get('tgp').perform();
    }

    {
      let tg = get(
        O.create() as EmberObject & { tgp: TaskGroupProperty<string> },
        'tgp'
      );

      expect(tg).toMatchTypeOf<TaskGroup<string>>();
      expect(tg.last).toEqualTypeOf<TaskInstance<string> | null>();

      // @ts-expect-error
      tg.perform();
    }
  });

  test('task', function () {
    {
      let tp = task(function* () {});
      expect(tp).toEqualTypeOf<TaskProperty<void, []>>();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<void, []>>();
      expect(t.perform).toBeCallableWith();
      expect(t.perform).parameters.toEqualTypeOf<[]>();
      expect(t.perform).returns.toEqualTypeOf<TaskInstance<void>>();

      let i = get({ tp }, 'tp').perform();
      expect(i).toEqualTypeOf<TaskInstance<void>>();
      expect(i.value).toEqualTypeOf<void | null>();
      expect(i).resolves.toEqualTypeOf<void>();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task(function* () {
        return 'foo';
      });
      expect(tp).toEqualTypeOf<TaskProperty<string, []>>();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<string, []>>();
      expect(t.perform).toBeCallableWith();
      expect(t.perform).parameters.toEqualTypeOf<[]>();
      expect(t.perform).returns.toEqualTypeOf<TaskInstance<string>>();

      let i = get({ tp }, 'tp').perform();
      expect(i).toEqualTypeOf<TaskInstance<string>>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i).resolves.toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task(function* (foo: boolean, bar?: number) {});
      expect(tp).toEqualTypeOf<TaskProperty<void, [boolean, number?]>>();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<void, [boolean, number?]>>();
      expect(t.perform).toBeCallableWith(true);
      expect(t.perform).toBeCallableWith(false, 5);
      expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();
      expect(t.perform).returns.toEqualTypeOf<TaskInstance<void>>();

      let i = get({ tp }, 'tp').perform(true);
      expect(i).toEqualTypeOf<TaskInstance<void>>();
      expect(i.value).toEqualTypeOf<void | null>();
      expect(i).resolves.toEqualTypeOf<void>();

      // @ts-expect-error
      get({ tp }, 'tp').perform();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(true, 'nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(false, 5, 'nope');
    }

    {
      let tp = task(function* (foo: boolean, bar?: number) {
        return 'foo';
      });
      expect(tp).toEqualTypeOf<TaskProperty<string, [boolean, number?]>>();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
      expect(t.perform).toBeCallableWith(true);
      expect(t.perform).toBeCallableWith(false, 5);
      expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();
      expect(t.perform).returns.toEqualTypeOf<TaskInstance<string>>();

      let i = get({ tp }, 'tp').perform(false, 5);
      expect(i).toEqualTypeOf<TaskInstance<string>>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i).resolves.toEqualTypeOf<string>();

      // @ts-expect-error
      get({ tp }, 'tp').perform();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(true, 'nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(false, 5, 'nope');
    }

    {
      let tp = task({ foo: 'foo', *perform() {} });
      expect(tp).toMatchTypeOf<TaskProperty<void, []>>();
      expect(tp).toEqualTypeOf<
        EncapsulatedTaskProperty<void, [], { foo: string }>
      >();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<void, []>>();
      expect(t).toMatchTypeOf<EncapsulatedTask<void, [], { foo: string }>>();
      expect(t.perform).toBeCallableWith();
      expect(t.perform).parameters.toEqualTypeOf<[]>();
      expect(t.perform).returns.toMatchTypeOf<TaskInstance<void>>();
      expect(t.perform).returns.toEqualTypeOf<
        TaskInstance<void> & { foo: string }
      >();

      let i = get({ tp }, 'tp').perform();
      expect(i).toMatchTypeOf<TaskInstance<void>>();
      expect(i).toEqualTypeOf<TaskInstance<void> & { foo: string }>();
      expect(i.value).toEqualTypeOf<void | null>();
      expect(i).resolves.toEqualTypeOf<void>();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task({
        foo: 'foo',
        *perform() {
          return 'foo';
        },
      });
      expect(tp).toMatchTypeOf<TaskProperty<string, []>>();
      expect(tp).toEqualTypeOf<
        EncapsulatedTaskProperty<string, [], { foo: string }>
      >();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<string, []>>();
      expect(t).toMatchTypeOf<EncapsulatedTask<string, [], { foo: string }>>();
      expect(t.perform).toBeCallableWith();
      expect(t.perform).parameters.toEqualTypeOf<[]>();
      expect(t.perform).returns.toMatchTypeOf<TaskInstance<string>>();
      expect(t.perform).returns.toEqualTypeOf<
        TaskInstance<string> & { foo: string }
      >();

      let i = get({ tp }, 'tp').perform();
      expect(i).toMatchTypeOf<TaskInstance<string>>();
      expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i).resolves.toBeString();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task({ foo: 'foo', *perform(foo: boolean, bar?: number) {} });
      expect(tp).toMatchTypeOf<TaskProperty<void, [boolean, number?]>>();
      expect(tp).toEqualTypeOf<
        EncapsulatedTaskProperty<void, [boolean, number?], { foo: string }>
      >();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<void, [boolean, number?]>>();
      expect(t).toMatchTypeOf<
        EncapsulatedTask<void, [boolean, number?], { foo: string }>
      >();
      expect(t.perform).toBeCallableWith(true);
      expect(t.perform).toBeCallableWith(false, 5);
      expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();
      expect(t.perform).returns.toMatchTypeOf<TaskInstance<void>>();
      expect(t.perform).returns.toEqualTypeOf<
        TaskInstance<void> & { foo: string }
      >();

      let i = get({ tp }, 'tp').perform(true);
      expect(i).toMatchTypeOf<TaskInstance<void>>();
      expect(i).toEqualTypeOf<TaskInstance<void> & { foo: string }>();
      expect(i.value).toEqualTypeOf<void | null>();
      expect(i).resolves.toEqualTypeOf<void>();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(true, 'nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(false, 5, 'nope');
    }

    {
      let tp = task({
        foo: 'foo',
        *perform(foo: boolean, bar?: number) {
          return 'foo';
        },
      });
      expect(tp).toMatchTypeOf<TaskProperty<string, [boolean, number?]>>();
      expect(tp).toEqualTypeOf<
        EncapsulatedTaskProperty<string, [boolean, number?], { foo: string }>
      >();

      let t = get({ tp }, 'tp');
      expect(t).toMatchTypeOf<Task<string, [boolean, number?]>>();
      expect(t).toMatchTypeOf<
        EncapsulatedTask<string, [boolean, number?], { foo: string }>
      >();
      expect(t.perform).toBeCallableWith(true);
      expect(t.perform).toBeCallableWith(false, 5);
      expect(t.perform).parameters.toEqualTypeOf<[boolean, number?]>();
      expect(t.perform).returns.toMatchTypeOf<TaskInstance<string>>();
      expect(t.perform).returns.toEqualTypeOf<
        TaskInstance<string> & { foo: string }
      >();

      let i = get({ tp }, 'tp').perform(false, 5);
      expect(i).toMatchTypeOf<TaskInstance<string>>();
      expect(i).toEqualTypeOf<TaskInstance<string> & { foo: string }>();
      expect(i.value).toEqualTypeOf<string | null>();
      expect(i).resolves.toEqualTypeOf<string>();
      expect(i.foo).not.toBeAny();
      expect(i.foo).toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(true, 'nope');

      // @ts-expect-error
      get({ tp }, 'tp').perform(false, 5, 'nope');
    }
  });

  test('taskGroup', () => {
    {
      let tgp = taskGroup();
      expect(tgp).toEqualTypeOf<TaskGroupProperty<unknown>>();

      let tg = get({ tgp: tgp }, 'tgp');
      expect(tg).toMatchTypeOf<TaskGroup<unknown>>();
      expect(tg.last).toEqualTypeOf<TaskInstance<unknown> | null>();

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let value = tg.last!.value;
      expect(value).toEqualTypeOf<unknown | null>();
    }

    {
      let tgp = taskGroup<string>();
      expect(tgp).toEqualTypeOf<TaskGroupProperty<string>>();

      let tg = get({ tgp: tgp }, 'tgp');
      expect(tg).toMatchTypeOf<TaskGroup<string>>();
      expect(tg.last).toEqualTypeOf<TaskInstance<string> | null>();

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let value = tg.last!.value;
      expect(value).toEqualTypeOf<string | null>();
    }
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
      hashSettled({ value, task, thenable, promise })
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
      Promise.race([value, task, thenable, promise])
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
            callback: (...args: any[]) => void
          ): void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          removeEventListener(
            event: string,
            callback: (...args: any[]) => void
          ): void;
        };

    expect(waitForEvent).toBeCallableWith(
      {
        on(event: string, callback: Function): void {},
        off(event: string, callback: Function): void {},
      },
      'foo'
    );
    expect(waitForEvent).toBeCallableWith(
      {
        one(event: string, callback: Function): void {},
      },
      'foo'
    );
    expect(waitForEvent).toBeCallableWith(
      EmberObject.extend(Evented).create() as EmberObject & Evented,
      'foo'
    );
    expect(waitForEvent).toBeCallableWith(
      {
        addEventListener(event: string, callback: Function): void {},
        removeEventListener(event: string, callback: Function): void {},
      },
      'foo'
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
    expect(getModifier).returns.toEqualTypeOf<TaskModifier<
      unknown,
      unknown[]
    > | null>();

    // @ts-expect-error
    getModifier();

    // @ts-expect-error
    getModifier(false);

    // @ts-expect-error
    getModifier(null);

    // @ts-expect-error
    getModifier(function* () {});
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
    let taskDef = function* () {
      return 42;
    };
    let encapDef = {
      *perform() {
        return 'boo!';
      },
    };

    let singleArgModifier = function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      factory: TaskFactory<any, any[]>,
      modifierArgument: boolean
    ) {
      factory.setTaskDefinition(taskDef);
      factory.setTaskDefinition(encapDef);
    };
    let arrayArgModifier = function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      factory: TaskFactory<any, any[]>,
      arrayArg: string[]
    ) {
      factory.setTaskDefinition(taskDef);
      factory.setTaskDefinition(encapDef);
    };

    expect(registerModifier).toBeCallableWith('foo', singleArgModifier);
    expect(registerModifier).toBeCallableWith('foo', arrayArgModifier);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(registerModifier).parameters.toEqualTypeOf<
      [string, TaskModifier<any, any[]>]
    >();
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
      myTask: task(function* (immediately: boolean, ms: number = 500) {
        if (!immediately) {
          yield timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect(fetchPromise).resolves.toEqualTypeOf<Response>();

        let response: Response = yield fetchPromise;
        expect(response).toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = yield fetchPromise;
        expect(safeResponse).toEqualTypeOf<Response>();

        return 'wow';
      }).restartable(),

      async performMyTask(
        this: EmberObject & {
          myTask: TaskProperty<string, [boolean, number?]>;
        }
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

  test('classic ember (encapsulated task)', () => {
    ClassicComponent.extend({
      myTask: task({
        foo: 'foo',

        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        *perform(immediately: boolean, ms: number = 500) {
          expect(this).not.toBeAny();
          expect(this.foo).not.toBeAny();
          expect(this.foo).toBeString();

          if (!immediately) {
            yield timeout(ms);
          }

          let fetchPromise = fetch('/api/data.json');
          expect(fetchPromise).resolves.toEqualTypeOf<Response>();

          let response: Response = yield fetchPromise;
          expect(response).toEqualTypeOf<Response>();

          let safeResponse: Resolved<typeof fetchPromise> = yield fetchPromise;
          expect(safeResponse).toEqualTypeOf<Response>();

          return 'wow';
        },
      }).restartable(),

      async performMyTask(
        this: EmberObject & {
          myTask: EncapsulatedTaskProperty<
            string,
            [boolean, number?],
            EncapsulatedTaskState<{ foo: string }>
          >;
        }
      ) {
        let myTask = this.get('myTask');

        expect(myTask).not.toBeAny();
        expect(myTask).toMatchTypeOf<Task<string, [boolean, number?]>>();
        expect(myTask).toMatchTypeOf<
          EncapsulatedTask<string, [boolean, number?], { foo: string }>
        >();
        expect(myTask.isRunning).toBeBoolean();
        expect(myTask.last).toMatchTypeOf<TaskInstance<string> | null>();
        expect(myTask.last).toEqualTypeOf<
          (TaskInstance<string> & { foo: string }) | null
        >();
        expect(myTask.perform).toBeCallableWith(true);
        expect(myTask.perform).toBeCallableWith(false, 500);
        expect(myTask.perform).parameters.toEqualTypeOf<[boolean, number?]>();
        expect(myTask.perform).returns.toMatchTypeOf<TaskInstance<string>>();
        expect(myTask.perform).returns.toEqualTypeOf<
          TaskInstance<string> & { foo: string }
        >();

        let myTaskInstance = myTask.perform(true);

        expect(myTaskInstance).not.toBeAny();
        expect(myTaskInstance).toMatchTypeOf<TaskInstance<string>>();
        expect(myTaskInstance).toEqualTypeOf<
          TaskInstance<string> & { foo: string }
        >();
        expect(myTaskInstance.isRunning).toBeBoolean();
        expect(myTaskInstance.value).toEqualTypeOf<string | null>();
        expect(myTaskInstance.foo).not.toBeAny();
        expect(myTaskInstance.foo).toBeString();
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

  test('octane', () => {
    class MyComponent extends GlimmerComponent {
      @taskGroup
      foo!: TaskGroup<never>;

      @task({ restartable: true }) restartable = function* () {};
      @task({ enqueue: true }) enqueue = function* () {};
      @task({ drop: true }) drop = function* () {};
      @task({ keepLatest: true }) keepLatest = function* () {};
      @task({ evented: true }) evented = function* () {};
      @task({ debug: true }) debug = function* () {};
      @task({ onState: () => {} }) onState = function* () {};
      @task({ onState: null }) onStateNull = function* () {};

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      @task({ on: 'hi' }) on = function* () {};
      @task({ cancelOn: 'bye' }) cancelOn = function* () {};
      @task({ maxConcurrency: 1 }) maxConcurrency = function* () {};
      @task({ group: 'foo' }) group = function* () {};

      @lastValue('myTask') myTaskValue = 'or some default';

      @restartableTask *myTask(
        immediately: boolean,
        ms = 500
      ): TaskGenerator<string> {
        // We want to assert `this` is not implicitly `any`, but due `this`
        // being a weird internal type in here, neither of the following
        // assertions would pass here. But the fact that the second assertion
        // errors is a pretty good indication that it is in fact *not* `any`.
        // In any case, asserting on `this.foo` is a more useful test, which
        // does pass.

        // @ts-expect-error
        expect(this).not.toBeAny();

        // @ts-expect-error:
        expect(this).toBeAny();

        // this is probably what we ultimately cares about
        expect(this.foo).not.toBeAny();
        expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

        if (!immediately) {
          yield timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect(fetchPromise).resolves.toEqualTypeOf<Response>();

        let response: Response = yield fetchPromise;
        expect(response).toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = yield fetchPromise;
        expect(safeResponse).toEqualTypeOf<Response>();

        return 'wow';
      }

      async performMyTask() {
        let myTask = taskFor(this.myTask);

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

  test('async arrow with first arg `this`', () => {
    class MyComponent extends GlimmerComponent {
      @taskGroup
      foo!: TaskGroup<never>;

      normalTask = task(this, async (immediately: boolean, ms = 500) => {
        // expect(this).toEqualTypeOf<MyComponent>();
        expect(this.foo).not.toBeAny();
        expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
      evented = task(this, { evented: true }, async () => {});
      debug = task(this, { debug: true }, async () => {});
      onState = task(this, { onState: () => {} }, async () => {});
      onStateNull = task(this, { onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task(this, { on: 'hi' }, async () => {});
      cancelOn = task(this, { cancelOn: 'bye' }, async () => {});
      maxConcurrency = task(this, { maxConcurrency: 1 }, async () => {});
      group = task(this, { group: 'foo' }, async () => {});

      @lastValue('myTask') myTaskValue = 'or some default';

      myTask = task(
        this,
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          // expect(this).toEqualTypeOf<MyComponent>();
          expect(this.foo).not.toBeAny();
          expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
        }
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
      @taskGroup
      foo!: TaskGroup<never>;

      normalTask = task(async (immediately: boolean, ms = 500) => {
        // expect(this).toEqualTypeOf<MyComponent>();
        expect(this.foo).not.toBeAny();
        expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
      evented = task({ evented: true }, async () => {});
      debug = task({ debug: true }, async () => {});
      onState = task({ onState: () => {} }, async () => {});
      onStateNull = task({ onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task({ on: 'hi' }, async () => {});
      cancelOn = task({ cancelOn: 'bye' }, async () => {});
      maxConcurrency = task({ maxConcurrency: 1 }, async () => {});
      group = task({ group: 'foo' }, async () => {});

      @lastValue('myTask') myTaskValue = 'or some default';

      myTask = task(
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          // expect(this).toEqualTypeOf<MyComponent>();
          expect(this.foo).not.toBeAny();
          expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
        }
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
        }
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
      @taskGroup
      foo!: TaskGroup<never>;

      normalTask = task(async (immediately: boolean, ms = 500) => {
        // expect(this).toEqualTypeOf<MyComponent>();
        expect(this.foo).not.toBeAny();
        expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
      evented = task({ evented: true }, async () => {});
      debug = task({ debug: true }, async () => {});
      onState = task({ onState: () => {} }, async () => {});
      onStateNull = task({ onState: null }, async () => {});

      // Note: these options work even when strictFunctionTypes is enabled, but
      // turning it on in this repo breaks other things in addon/index.d.ts
      on = task({ on: 'hi' }, async () => {});
      cancelOn = task({ cancelOn: 'bye' }, async () => {});
      maxConcurrency = task({ maxConcurrency: 1 }, async () => {});
      group = task({ group: 'foo' }, async () => {});

      @lastValue('myTask') myTaskValue = 'or some default';

      myTask = task(
        this,
        { restartable: true },
        // TODO: Seems strange that this was necessary
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        async (immediately: boolean, ms: number | undefined = 500) => {
          // expect(this).toEqualTypeOf<MyComponent>();
          expect(this.foo).not.toBeAny();
          expect(this.foo).toEqualTypeOf<TaskGroup<never>>();

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
        }
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
