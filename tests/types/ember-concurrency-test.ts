import ClassicComponent from '@ember/component';
import EmberObject, { get } from '@ember/object';
import Evented from '@ember/object/evented';
import GlimmerComponent from '@glimmer/component';
import {
  Task,
  TaskFunction,
  TaskFunctionArgs,
  TaskFunctionReturnType,
  TaskGenerator,
  TaskGroup,
  TaskGroupProperty,
  TaskInstance,
  TaskProperty,
  all,
  allSettled,
  didCancel,
  forever,
  hash,
  race,
  rawTimeout,
  task,
  taskGroup,
  timeout,
  waitForEvent,
  waitForProperty,
  waitForQueue
} from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';
import { expectTypeOf as expect } from 'expect-type';
import { taskFor } from '../dummy/snippets/ts/classic-vs-octane/utils';

declare type TestCallback = () => void | Promise<void>;
declare function module(description: string, callback: TestCallback): void;
declare function test(description: string, callback: TestCallback): void;

module('unit tests', () => {
  test('TaskGenerator', () => {
    expect<TaskGenerator<void>>().toEqualTypeOf<Generator<any, void, any>>();
    expect<TaskGenerator<string>>().toEqualTypeOf<Generator<any, string, any>>();
  });

  test('TaskFunction', () => {
    expect<TaskFunction<void, []>>().toEqualTypeOf<() => TaskGenerator<void>>();
    expect<TaskFunction<string, []>>().toEqualTypeOf<() => TaskGenerator<string>>();
    expect<TaskFunction<void, [boolean, number?]>>().toEqualTypeOf<(foo: boolean, bar?: number) => TaskGenerator<void>>();
    expect<TaskFunction<string, [boolean, number?]>>().toEqualTypeOf<(foo: boolean, bar?: number) => TaskGenerator<string>>();
  });

  test('TaskFunctionArgs', () => {
    {
      let f = function * () {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[]>();
    }

    {
      let f = function * (foo: boolean) {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[boolean]>();
    }

    {
      let f = function * (foo: boolean, bar?: number) {};
      expect<TaskFunctionArgs<typeof f>>().toEqualTypeOf<[boolean, number?]>();
    }

    {
      let f = function() {}
      // @ts-expect-error
      expect<TaskFunctionArgs<typeof f>>();
    }
  });

  test('TaskFunctionReturnType', () => {
    {
      let f = function * () {};
      expect<TaskFunctionReturnType<typeof f>>().toEqualTypeOf<void>();
    }

    {
      let f = function * () { return 'foo' };
      expect<TaskFunctionReturnType<typeof f>>().toEqualTypeOf<string>();
    }

    {
      let f = function() {}
      // @ts-expect-error
      expect<TaskFunctionReturnType<typeof f>>();
    }
  });

  test('Task', () => {
    // @ts-expect-error
    new Task(); // Task cannot be constructed

    // @ts-expect-error
    class Foo extends Task {} // Task cannot be subclassed

    let t!: Task<string, [boolean, number?]>;
    type MyTaskInstance = TaskInstance<string>;

    expect<typeof t.isRunning>().toBeBoolean();
    expect<typeof t.isQueued>().toBeBoolean;
    expect<typeof t.isIdle>().toBeBoolean();
    expect<typeof t.state>().toEqualTypeOf<'running' | 'queued' | 'idle'>();
    expect<typeof t.last>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastRunning>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastPerformed>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastSuccessful>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastComplete>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastErrored>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastCanceled>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.lastIncomplete>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof t.performCount>().toBeNumber();

    expect<typeof t.cancelAll>().toBeCallableWith();
    expect<typeof t.cancelAll>().toBeCallableWith({});
    expect<typeof t.cancelAll>().toBeCallableWith({ reason: 'why do you care' });
    expect<typeof t.cancelAll>().toBeCallableWith({ resetState: true });
    expect<typeof t.cancelAll>().toBeCallableWith({ reason: 'why do you care', resetState: true });
    expect<typeof t.cancelAll>().parameters.toEqualTypeOf<[{ reason?: string, resetState?: boolean }?]>();
    expect<typeof t.cancelAll>().returns.toEqualTypeOf<void>();

    // @ts-expect-error
    t.cancelAll(null);

    // @ts-expect-error
    t.cancelAll({ wow: false });

    expect<typeof t.perform>().toBeCallableWith(true);
    expect<typeof t.perform>().toBeCallableWith(false, 2);
    expect<typeof t.perform>().parameters.toEqualTypeOf<[boolean, number?]>();
    expect<typeof t.perform>().returns.toEqualTypeOf<MyTaskInstance>();

    // @ts-expect-error
    t.perform();

    // @ts-expect-error
    t.perform('not boolean');

    // @ts-expect-error
    t.perform(false, 'not number');

    // @ts-expect-error
    t.perform(false, 3, 'extra');
  });

  test('TaskGroup', () => {
    // @ts-expect-error
    new TaskGroup(); // TaskGroup cannot be constructed

    // @ts-expect-error
    class Foo extends TaskGroup {} // TaskGroup cannot be subclassed

    let tg!: TaskGroup<string>;
    type MyTaskInstance = TaskInstance<string>;

    expect<typeof tg.isRunning>().toBeBoolean();
    expect<typeof tg.isQueued>().toBeBoolean;
    expect<typeof tg.isIdle>().toBeBoolean();
    expect<typeof tg.state>().toEqualTypeOf<'running' | 'queued' | 'idle'>();
    expect<typeof tg.last>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastRunning>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastPerformed>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastSuccessful>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastComplete>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastErrored>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastCanceled>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.lastIncomplete>().toEqualTypeOf<MyTaskInstance | null>();
    expect<typeof tg.performCount>().toBeNumber();

    expect<typeof tg.cancelAll>().toBeCallableWith();
    expect<typeof tg.cancelAll>().toBeCallableWith({});
    expect<typeof tg.cancelAll>().toBeCallableWith({ reason: 'why do you care' });
    expect<typeof tg.cancelAll>().toBeCallableWith({ resetState: true });
    expect<typeof tg.cancelAll>().toBeCallableWith({ reason: 'why do you care', resetState: true });
    expect<typeof tg.cancelAll>().parameters.toEqualTypeOf<[{ reason?: string, resetState?: boolean }?]>();
    expect<typeof tg.cancelAll>().returns.toEqualTypeOf<void>();

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

    expect<typeof t.value>().toEqualTypeOf<string | null>();
    expect<typeof t.error>().toBeUnknown();
    expect<typeof t.isSuccessful>().toBeBoolean();
    expect<typeof t.isError>().toBeBoolean();
    expect<typeof t.isCanceled>().toBeBoolean();
    expect<typeof t.hasStarted>().toBeBoolean();
    expect<typeof t.isFinished>().toBeBoolean();
    expect<typeof t.isRunning>().toBeBoolean();
    expect<typeof t.state>().toEqualTypeOf<'dropped' | 'canceled' | 'finished' | 'running' | 'waiting'>();
    expect<typeof t.isDropped>().toBeBoolean();

    expect<typeof t.cancel>().toBeCallableWith();
    expect<typeof t.cancel>().toBeCallableWith('why do you care');
    expect<typeof t.cancel>().parameters.toEqualTypeOf<[string?]>();
    expect<typeof t.cancel>().returns.toEqualTypeOf<void>();

    expect<typeof t>().toMatchTypeOf<Promise<string>>();
    expect<typeof t>().resolves.toBeString();

    expect<typeof t.then>().toBeCallableWith();
    expect<typeof t.then>().toBeCallableWith(() => {});
    expect<typeof t.then>().toBeCallableWith(() => {}, () => {});
    expect<typeof t.then>().toBeCallableWith(
      v => expect<typeof v>().toBeString()
    );
    expect<typeof t.then>().toBeCallableWith(
      v => expect<typeof v>().toBeString(),
      e => expect<typeof e>().toBeAny()
    );

    {
      let chained = t.then(v => v.length);
      expect<typeof chained>().resolves.toBeNumber();
    }

    // @ts-expect-error
    t.then('not a function');

    // @ts-expect-error
    t.then(() => {}, () => {}, () => {});

    expect<typeof t.catch>().toBeCallableWith();
    expect<typeof t.catch>().toBeCallableWith(() => {});
    expect<typeof t.catch>().toBeCallableWith(
      e => expect<typeof e>().toBeAny()
    );

    {
      let chained = t.catch(() => 'caught');
      expect<typeof chained>().resolves.toBeString();
    }

    // @ts-expect-error
    t.catch('not a function');

    // @ts-expect-error
    t.catch(() => {}, () => {});

    expect<typeof t.finally>().toBeCallableWith();
    expect<typeof t.finally>().toBeCallableWith(() => {});

    {
      let chained = t.finally(() => 'finally');
      expect<typeof chained>().resolves.toBeString();
    }

    // @ts-expect-error
    t.finally(v => {});

    try {
      let r = await t;
      expect<typeof r>().toBeString();
    } catch(e) {
      expect<typeof e>().toBeAny();
    }
  });

  test('TaskProperty', async () => {
    // @ts-expect-error
    new TaskProperty(); // TaskProperty cannot be constructed

    // @ts-expect-error
    class Foo extends TaskProperty {} // TaskProperty cannot be subclassed

    let tp!: TaskProperty<string, [boolean, number?]>;

    expect<typeof tp.volatile>().toBeNever();
    expect<typeof tp.readOnly>().toBeNever();
    expect<typeof tp.property>().toBeNever();
    expect<typeof tp.meta>().toBeNever();

    // @ts-expect-error
    tp.volatile();

    // @ts-expect-error
    tp.readOnly();

    // @ts-expect-error
    tp.property();

    // @ts-expect-error
    tp.meta();

    expect<typeof tp.on>().toBeCallableWith();
    expect<typeof tp.on>().toBeCallableWith('init');
    expect<typeof tp.on>().toBeCallableWith('init', 'didInsertElement');
    expect<typeof tp.on>().parameters.toEqualTypeOf<string[]>();
    expect<typeof tp.on>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.on(false);

    // @ts-expect-error
    tp.on('init', false);

    expect<typeof tp.cancelOn>().toBeCallableWith();
    expect<typeof tp.cancelOn>().toBeCallableWith('init');
    expect<typeof tp.cancelOn>().toBeCallableWith('init', 'didInsertElement');
    expect<typeof tp.cancelOn>().parameters.toEqualTypeOf<string[]>();
    expect<typeof tp.cancelOn>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.cancelOn(false);

    // @ts-expect-error
    tp.cancelOn('init', false);

    expect<typeof tp.restartable>().toBeCallableWith();
    expect<typeof tp.restartable>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.restartable>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.restartable('nope');

    expect<typeof tp.enqueue>().toBeCallableWith();
    expect<typeof tp.enqueue>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.enqueue>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.enqueue('nope');

    expect<typeof tp.drop>().toBeCallableWith();
    expect<typeof tp.drop>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.drop>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.drop('nope');

    expect<typeof tp.keepLatest>().toBeCallableWith();
    expect<typeof tp.keepLatest>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.keepLatest>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.keepLatest('nope');

    expect<typeof tp.maxConcurrency>().toBeCallableWith(5);
    expect<typeof tp.maxConcurrency>().parameters.toEqualTypeOf<[number]>();
    expect<typeof tp.maxConcurrency>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.maxConcurrency();

    // @ts-expect-error
    tp.maxConcurrency('nope');

    expect<typeof tp.group>().toBeCallableWith('foo');
    expect<typeof tp.group>().parameters.toEqualTypeOf<[string]>();
    expect<typeof tp.group>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.group();

    // @ts-expect-error
    tp.group(false);

    expect<typeof tp.evented>().toBeCallableWith();
    expect<typeof tp.evented>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.evented>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.evented('nope');

    expect<typeof tp.debug>().toBeCallableWith();
    expect<typeof tp.debug>().parameters.toEqualTypeOf<[]>();
    expect<typeof tp.debug>().returns.toEqualTypeOf<typeof tp>();

    // @ts-expect-error
    tp.debug('nope');

    let O = EmberObject.extend({
      tp,

      foo() {
        let t = this.get('tp');
        expect<typeof t>().toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect<typeof t.last>().toEqualTypeOf<TaskInstance<string> | null>();
        expect<typeof t.perform>().parameters.toEqualTypeOf<[boolean, number?]>();

        let i = this.get('tp').perform(true);
        expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
        expect<typeof i.value>().toEqualTypeOf<string | null>();

        // @ts-expect-error
        this.get('tp').perform();

        // @ts-expect-error
        this.get('tp').perform('nope');

        // @ts-expect-error
        this.get('tp').perform(true, 'nope');

        // @ts-expect-error
        this.get('tp').perform(false, 5, 'nope');
      },

      bar() {
        let t = get(this, 'tp');
        expect<typeof t>().toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect<typeof t.last>().toEqualTypeOf<TaskInstance<string> | null>();
        expect<typeof t.perform>().parameters.toEqualTypeOf<[boolean, number?]>();

        let i = get(this, 'tp').perform(true);
        expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
        expect<typeof i.value>().toEqualTypeOf<string | null>();

        // @ts-expect-error
        get(this, 'tp').perform();

        // @ts-expect-error
        get(this, 'tp').perform('nope');

        // @ts-expect-error
        get(this, 'tp').perform(true, 'nope');

        // @ts-expect-error
        get(this, 'tp').perform(false, 5, 'nope');
      }
    });

    {
      let o = O.create();

      let t = o.get('tp');

      expect<typeof t>().toEqualTypeOf<Task<string, [boolean, number?]>>();
      expect<typeof t.last>().toEqualTypeOf<TaskInstance<string> | null>();

      let i = o.get('tp').perform(false, 5);
      expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
      expect<typeof i.value>().toEqualTypeOf<string | null>();

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
      let t = get(O.create(), 'tp');

      expect<typeof t>().toEqualTypeOf<Task<string, [boolean, number?]>>();
      expect<typeof t.last>().toEqualTypeOf<TaskInstance<string> | null>();

      let i = get(O.create(), 'tp').perform(false, 5);
      expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
      expect<typeof i.value>().toEqualTypeOf<string | null>();

      // @ts-expect-error
      get(O.create(), 'tp').perform();

      // @ts-expect-error
      get(O.create(), 'tp').perform('nope');

      // @ts-expect-error
      get(O.create(), 'tp').perform(true, 'nope');

      // @ts-expect-error
      get(O.create(), 'tp').perform(false, 5, 'nope');
    }
  });

  test('TaskGroupProperty', async () => {
    // @ts-expect-error
    new TaskGroupProperty(); // TaskGroupProperty cannot be constructed

    // @ts-expect-error
    class Foo extends TaskGroupProperty {} // TaskGroupProperty cannot be subclassed

    let tgp!: TaskGroupProperty<string>;

    expect<typeof tgp.volatile>().toBeNever();
    expect<typeof tgp.readOnly>().toBeNever();
    expect<typeof tgp.property>().toBeNever();
    expect<typeof tgp.meta>().toBeNever();

    // @ts-expect-error
    tgp.volatile();

    // @ts-expect-error
    tgp.readOnly();

    // @ts-expect-error
    tgp.property();

    // @ts-expect-error
    tgp.meta();

    // @ts-expect-error
    tgp.on('init');

    // @ts-expect-error
    tgp.cancelOn('init');

    expect<typeof tgp.restartable>().toBeCallableWith();
    expect<typeof tgp.restartable>().parameters.toEqualTypeOf<[]>();
    expect<typeof tgp.restartable>().returns.toEqualTypeOf<typeof tgp>();

    // @ts-expect-error
    tgp.restartable('nope');

    expect<typeof tgp.enqueue>().toBeCallableWith();
    expect<typeof tgp.enqueue>().parameters.toEqualTypeOf<[]>();
    expect<typeof tgp.enqueue>().returns.toEqualTypeOf<typeof tgp>();

    // @ts-expect-error
    tgp.enqueue('nope');

    expect<typeof tgp.drop>().toBeCallableWith();
    expect<typeof tgp.drop>().parameters.toEqualTypeOf<[]>();
    expect<typeof tgp.drop>().returns.toEqualTypeOf<typeof tgp>();

    // @ts-expect-error
    tgp.drop('nope');

    expect<typeof tgp.keepLatest>().toBeCallableWith();
    expect<typeof tgp.keepLatest>().parameters.toEqualTypeOf<[]>();
    expect<typeof tgp.keepLatest>().returns.toEqualTypeOf<typeof tgp>();

    // @ts-expect-error
    tgp.keepLatest('nope');

    expect<typeof tgp.maxConcurrency>().toBeCallableWith(5);
    expect<typeof tgp.maxConcurrency>().parameters.toEqualTypeOf<[number]>();
    expect<typeof tgp.maxConcurrency>().returns.toEqualTypeOf<typeof tgp>();

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

    let O = EmberObject.extend({
      tgp: tgp,

      foo() {
        let tg = this.get('tgp');
        expect<typeof tg>().toEqualTypeOf<TaskGroup<string>>();
        expect<typeof tg.last>().toEqualTypeOf<TaskInstance<string> | null>();

        // @ts-expect-error
        tg.perform();

        // @ts-expect-error
        this.get('tgp').perform();
      },

      bar() {
        let tg = get(this, 'tgp');
        expect<typeof tg>().toEqualTypeOf<TaskGroup<string>>();
        expect<typeof tg.last>().toEqualTypeOf<TaskInstance<string> | null>();

        // @ts-expect-error
        tg.perform();

        // @ts-expect-error
        get(this, 'tgp').perform();
      }
    });

    {
      let o = O.create();

      let tg = o.get('tgp');

      expect<typeof tg>().toEqualTypeOf<TaskGroup<string>>();
      expect<typeof tg.last>().toEqualTypeOf<TaskInstance<string> | null>();

      // @ts-expect-error
      o.get('tgp').perform();
    }

    {
      let tg = get(O.create(), 'tgp');

      expect<typeof tg>().toEqualTypeOf<TaskGroup<string>>();
      expect<typeof tg.last>().toEqualTypeOf<TaskInstance<string> | null>();

      // @ts-expect-error
      get(O.create(), 'tp').perform();
    }
  });

  test('task', function() {
    {
      let tp = task(function * () {});
      expect<typeof tp>().toEqualTypeOf<TaskProperty<void, []>>();

      let t = get({ tp }, 'tp');
      expect<typeof t>().toEqualTypeOf<Task<void, []>>();
      expect<typeof t.perform>().toBeCallableWith();
      expect<typeof t.perform>().parameters.toEqualTypeOf<[]>();
      expect<typeof t.perform>().returns.toEqualTypeOf<TaskInstance<void>>();

      let i = get({ tp }, 'tp').perform();
      expect<typeof i>().toEqualTypeOf<TaskInstance<void>>();
      expect<typeof i.value>().toEqualTypeOf<void | null>();
      expect<typeof i>().resolves.toEqualTypeOf<void>();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task(function * () { return 'foo' });
      expect<typeof tp>().toEqualTypeOf<TaskProperty<string, []>>();

      let t = get({ tp }, 'tp');
      expect<typeof t>().toEqualTypeOf<Task<string, []>>();
      expect<typeof t.perform>().toBeCallableWith();
      expect<typeof t.perform>().parameters.toEqualTypeOf<[]>();
      expect<typeof t.perform>().returns.toEqualTypeOf<TaskInstance<string>>();

      let i = get({ tp }, 'tp').perform();
      expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
      expect<typeof i.value>().toEqualTypeOf<string | null>();
      expect<typeof i>().resolves.toBeString();

      // @ts-expect-error
      get({ tp }, 'tp').perform('nope');
    }

    {
      let tp = task(function * (foo: boolean, bar?: number) {});
      expect<typeof tp>().toEqualTypeOf<TaskProperty<void, [boolean, number?]>>();

      let t = get({ tp }, 'tp');
      expect<typeof t>().toEqualTypeOf<Task<void, [boolean, number?]>>();
      expect<typeof t.perform>().toBeCallableWith(true);
      expect<typeof t.perform>().toBeCallableWith(false, 5);
      expect<typeof t.perform>().parameters.toEqualTypeOf<[boolean, number?]>();
      expect<typeof t.perform>().returns.toEqualTypeOf<TaskInstance<void>>();

      let i = get({ tp }, 'tp').perform(true);
      expect<typeof i>().toEqualTypeOf<TaskInstance<void>>();
      expect<typeof i.value>().toEqualTypeOf<void | null>();
      expect<typeof i>().resolves.toEqualTypeOf<void>();

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
      let tp = task(function * (foo: boolean, bar?: number) { return 'foo' });
      expect<typeof tp>().toEqualTypeOf<TaskProperty<string, [boolean, number?]>>();

      let t = get({ tp }, 'tp');
      expect<typeof t>().toEqualTypeOf<Task<string, [boolean, number?]>>();
      expect<typeof t.perform>().toBeCallableWith(true);
      expect<typeof t.perform>().toBeCallableWith(false, 5);
      expect<typeof t.perform>().parameters.toEqualTypeOf<[boolean, number?]>();
      expect<typeof t.perform>().returns.toEqualTypeOf<TaskInstance<string>>();

      let i = get({ tp }, 'tp').perform(false, 5);
      expect<typeof i>().toEqualTypeOf<TaskInstance<string>>();
      expect<typeof i.value>().toEqualTypeOf<string | null>();
      expect<typeof i>().resolves.toEqualTypeOf<string>();

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
      expect<typeof tgp>().toEqualTypeOf<TaskGroupProperty<unknown>>();

      let tg = get({ tgp: tgp }, 'tgp');
      expect<typeof tg>().toEqualTypeOf<TaskGroup<unknown>>();
      expect<typeof tg.last>().toEqualTypeOf<TaskInstance<unknown> | null>();

      let value = tg.last!.value;
      expect<typeof value>().toEqualTypeOf<unknown | null>();
    }

    {
      let tgp = taskGroup<string>();
      expect<typeof tgp>().toEqualTypeOf<TaskGroupProperty<string>>();

      let tg = get({ tgp: tgp }, 'tgp');
      expect<typeof tg>().toEqualTypeOf<TaskGroup<string>>();
      expect<typeof tg.last>().toEqualTypeOf<TaskInstance<string> | null>();

      let value = tg.last!.value;
      expect<typeof value>().toEqualTypeOf<string | null>();
    }
  });

  test('all', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    expect(all([])).toEqualTypeOf(Promise.all([]));
    expect(all([value])).toEqualTypeOf(Promise.all([value]));
    expect(all([task])).toEqualTypeOf(Promise.all([task]));
    expect(all([thenable])).toEqualTypeOf(Promise.all([thenable]));
    expect(all([promise])).toEqualTypeOf(Promise.all([promise]));

    expect(
      all([value, task, thenable, promise])
    ).toEqualTypeOf(
      Promise.all([value, task, thenable, promise])
    );

    {
      let result = await all([]);

      // @ts-expect-error
      result[0];
    }

    {
      let result = await all([value]);
      expect<typeof result[0]>().toBeString();

      // @ts-expect-error
      result[1];
    }

    {
      let result = await all([value, task]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();

      // @ts-expect-error
      result[2];
    }

    {
      let result = await all([value, task, thenable]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();

      // @ts-expect-error
      result[3];
    }

    {
      let result = await all([value, task, thenable, promise]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();

      // @ts-expect-error
      result[4];
    }

    {
      let result = await all([value, task, thenable, promise, value]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();

      // @ts-expect-error
      result[5];
    }

    {
      let result = await all([value, task, thenable, promise, value, task]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();

      // @ts-expect-error
      result[6];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();

      // @ts-expect-error
      result[7];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();
      expect<typeof result[7]>().toEqualTypeOf<void>();

      // @ts-expect-error
      result[8];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable, promise, value]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();
      expect<typeof result[7]>().toEqualTypeOf<void>();
      expect<typeof result[8]>().toBeString();

      // @ts-expect-error
      result[9];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable, promise, value, task]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();
      expect<typeof result[7]>().toEqualTypeOf<void>();
      expect<typeof result[8]>().toBeString();
      expect<typeof result[9]>().toBeBoolean();

      // @ts-expect-error
      result[10];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();
      expect<typeof result[7]>().toEqualTypeOf<void>();
      expect<typeof result[8]>().toBeString();
      expect<typeof result[9]>().toBeBoolean();
      expect<typeof result[10]>().toBeNumber();

      // @ts-expect-error
      result[11];
    }

    {
      let result = await all([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result[0]>().toBeString();
      expect<typeof result[1]>().toBeBoolean();
      expect<typeof result[2]>().toBeNumber();
      expect<typeof result[3]>().toEqualTypeOf<void>();
      expect<typeof result[4]>().toBeString();
      expect<typeof result[5]>().toBeBoolean();
      expect<typeof result[6]>().toBeNumber();
      expect<typeof result[7]>().toEqualTypeOf<void>();
      expect<typeof result[8]>().toBeString();
      expect<typeof result[9]>().toBeBoolean();
      expect<typeof result[10]>().toBeNumber();
      expect<typeof result[11]>().toEqualTypeOf<void>();

      // @ts-expect-error
      result[12];
    }
  });

  test('allSettled', async () => {
    let value = 'foo';
    let task!: TaskInstance<boolean>;
    let thenable!: PromiseLike<number>;
    let promise!: Promise<void>;

    expect(allSettled([])).toEqualTypeOf(Promise.allSettled([]));
    expect(allSettled([value])).toEqualTypeOf(Promise.allSettled([value]));
    expect(allSettled([task])).toEqualTypeOf(Promise.allSettled([task]));
    expect(allSettled([thenable])).toEqualTypeOf(Promise.allSettled([thenable]));
    expect(allSettled([promise])).toEqualTypeOf(Promise.allSettled([promise]));

    expect(
      allSettled([value, task, thenable, promise])
    ).toEqualTypeOf(
      Promise.allSettled([value, task, thenable, promise])
    );

    type S<T> = { state: 'fulfilled', value: T } | { state: 'rejected', reason: any };

    {
      let result = await allSettled([]);

      // @ts-expect-error
      result[0];
    }

    {
      let result = await allSettled([value]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[1];
    }

    {
      let result = await allSettled([value, task]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[2];
    }

    {
      let result = await allSettled([value, task, thenable]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[3];
    }

    {
      let result = await allSettled([value, task, thenable, promise]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[4];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[5];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[6];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[7];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();
      expect<typeof result[7]>().toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[8];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable, promise, value]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();
      expect<typeof result[7]>().toEqualTypeOf<S<void>>();
      expect<typeof result[8]>().toEqualTypeOf<S<string>>();

      // @ts-expect-error
      result[9];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable, promise, value, task]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();
      expect<typeof result[7]>().toEqualTypeOf<S<void>>();
      expect<typeof result[8]>().toEqualTypeOf<S<string>>();
      expect<typeof result[9]>().toEqualTypeOf<S<boolean>>();

      // @ts-expect-error
      result[10];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();
      expect<typeof result[7]>().toEqualTypeOf<S<void>>();
      expect<typeof result[8]>().toEqualTypeOf<S<string>>();
      expect<typeof result[9]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[10]>().toEqualTypeOf<S<number>>();

      // @ts-expect-error
      result[11];
    }

    {
      let result = await allSettled([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result[0]>().toEqualTypeOf<S<string>>();
      expect<typeof result[1]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[2]>().toEqualTypeOf<S<number>>();
      expect<typeof result[3]>().toEqualTypeOf<S<void>>();
      expect<typeof result[4]>().toEqualTypeOf<S<string>>();
      expect<typeof result[5]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[6]>().toEqualTypeOf<S<number>>();
      expect<typeof result[7]>().toEqualTypeOf<S<void>>();
      expect<typeof result[8]>().toEqualTypeOf<S<string>>();
      expect<typeof result[9]>().toEqualTypeOf<S<boolean>>();
      expect<typeof result[10]>().toEqualTypeOf<S<number>>();
      expect<typeof result[11]>().toEqualTypeOf<S<void>>();

      // @ts-expect-error
      result[12];
    }
  });

  test('didCancel', async () => {
    expect<typeof didCancel>().toBeCallableWith(null);
    expect<typeof didCancel>().toBeCallableWith(undefined);
    expect<typeof didCancel>().toBeCallableWith({});
    expect<typeof didCancel>().toBeCallableWith(new Error());
    expect<typeof didCancel>().parameters.toEqualTypeOf<[unknown]>();
    expect<typeof didCancel>().returns.toEqualTypeOf<boolean>();

    // @ts-expect-error
    didCancel();

    try {
      let t!: TaskInstance<string>;
      await t;
    } catch(e) {
      expect<typeof e>().toBeAny();

      if (didCancel(e)) {
        expect<typeof e>().not.toBeAny();
        expect<typeof e>().toMatchTypeOf<Error>();
        expect<typeof e>().toMatchTypeOf<{ name: 'TaskCancelation' }>();
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

    expect(
      hash({ value, task, thenable, promise })
    ).resolves.toEqualTypeOf<{
      value: string,
      task: boolean,
      thenable: number,
      promise: void
    }>();

    {
      let result = await hash({});

      // @ts-expect-error
      result.nope;
    }


    {
      let result = await hash({ value });
      expect<typeof result.value>().toBeString();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task });
      expect<typeof result.value>().toBeString();
      expect<typeof result.task>().toBeBoolean();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task, thenable });
      expect<typeof result.value>().toBeString();
      expect<typeof result.task>().toBeBoolean();
      expect<typeof result.thenable>().toBeNumber();

      // @ts-expect-error
      result.nope;
    }

    {
      let result = await hash({ value, task, thenable, promise });
      expect<typeof result.value>().toBeString();
      expect<typeof result.task>().toBeBoolean();
      expect<typeof result.thenable>().toBeNumber();
      expect<typeof result.promise>().toEqualTypeOf<void>();

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

    expect(
      race([value, task, thenable, promise])
    ).toEqualTypeOf(
      Promise.race([value, task, thenable, promise])
    );

    {
      let result = await race([]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toBeNever();
    }

    {
      let result = await race([value]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toBeString();
      expect<typeof result.length>().toBeNumber();
    }

    {
      let result = await race([value, task]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable, promise, value]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable, promise, value, task]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }

    {
      let result = await race([value, task, thenable, promise, value, task, thenable, promise, value, task, thenable, promise]);
      expect<typeof result>().not.toBeAny();
      expect<typeof result>().toEqualTypeOf<string | boolean | number | void>();

      // @ts-expect-error
      result.length;
    }
  });

  test('timeout', async () => {
    expect<typeof timeout>().toBeCallableWith(500);
    expect<typeof timeout>().parameters.toEqualTypeOf<[number]>();
    expect<typeof timeout>().returns.toEqualTypeOf<PromiseLike<void>>();

    // @ts-expect-error
    timeout();

    // @ts-expect-error
    timeout('nope');

    // @ts-expect-error
    timeout(500, 'nope');

    {
      let result = await timeout(500);
      expect<typeof result>().toEqualTypeOf<void>();
    }
  });

  test('rawTimeout', async () => {
    expect<typeof rawTimeout>().toBeCallableWith(500);
    expect<typeof rawTimeout>().parameters.toEqualTypeOf<[number]>();
    expect<typeof rawTimeout>().returns.toEqualTypeOf<PromiseLike<void>>();

    // @ts-expect-error
    rawTimeout();

    // @ts-expect-error
    rawTimeout('nope');

    // @ts-expect-error
    rawTimeout(500, 'nope');

    {
      let result = await rawTimeout(500);
      expect<typeof result>().toEqualTypeOf<void>();
    }
  });

  test('waitForQueue', async () => {
    expect<typeof waitForQueue>().toBeCallableWith('afterRender');
    expect<typeof waitForQueue>().parameters.toEqualTypeOf<[string]>();
    expect<typeof waitForQueue>().returns.toEqualTypeOf<PromiseLike<void>>();

    // @ts-expect-error
    waitForQueue();

    // @ts-expect-error
    waitForQueue(500);

    // @ts-expect-error
    waitForQueue('afterRender', 'nope');

    {
      let result = await waitForQueue('afterRender');
      expect<typeof result>().toEqualTypeOf<void>();
    }
  });

  test('waitForEvent', async () => {
    type Evented = {
      on(event: string, callback: (...args: any[]) => void): void;
      off(event: string, callback: (...args: any[]) => void): void;
    } | {
      one(event: string, callback: (...args: any[]) => void): void;
    } | {
      addEventListener(event: string, callback: (...args: any[]) => void): void;
      removeEventListener(event: string, callback: (...args: any[]) => void): void;
    };

    expect<typeof waitForEvent>().toBeCallableWith({
      on(event: string, callback: Function): void {},
      off(event: string, callback: Function): void {}
    }, 'foo');
    expect<typeof waitForEvent>().toBeCallableWith({
      one(event: string, callback: Function): void {}
    }, 'foo');
    expect<typeof waitForEvent>().toBeCallableWith(
      EmberObject.extend(Evented).create(),
      'foo'
    );
    expect<typeof waitForEvent>().toBeCallableWith({
      addEventListener(event: string, callback: Function): void {},
      removeEventListener(event: string, callback: Function): void {}
    }, 'foo');
    expect<typeof waitForEvent>().toBeCallableWith(document.body, 'click');
    expect<typeof waitForEvent>().parameters.toEqualTypeOf<[Evented, string]>();
    expect<typeof waitForEvent>().returns.toEqualTypeOf<PromiseLike<void>>();

    // @ts-expect-error
    waitForEvent();

    // @ts-expect-error
    waitForEvent('nope');

    // @ts-expect-error
    waitForEvent(document.body, 'click', 'nope');

    {
      let result = await waitForEvent(document.body, 'click');
      expect<typeof result>().toEqualTypeOf<void>();
    }
  });

  test('waitForProperty', async () => {
    let obj = { foo: 'foo' };

    // @ts-expect-error (it actually works – bug in expect-type?)
    expect<typeof waitForProperty>().toBeCallableWith(obj, 'foo', 'bar');
    waitForProperty(obj, 'foo', 'bar');

    expect<typeof waitForProperty>().toBeCallableWith(obj, 'foo', v => v === 'bar');

    // @ts-expect-error (it actually works – bug in expect-type?)
    expect<typeof waitForProperty>().toBeCallableWith(obj, 'foo', (v: string) => v === 'bar');
    waitForProperty(obj, 'foo', (v: string) => v === 'bar');

    expect<typeof waitForProperty>().parameters.toEqualTypeOf<[object, string, (value: unknown) => boolean]>();
    expect<typeof waitForProperty>().returns.toEqualTypeOf<PromiseLike<void>>();

    // @ts-expect-error
    waitForProperty();

    // @ts-expect-error
    waitForProperty('nope');

    // @ts-expect-error
    waitForProperty(obj, 'foo', 'bar', 'nope');

    {
      let result = await waitForProperty(obj, 'foo', 'bar');
      expect<typeof result>().toEqualTypeOf<void>();
    }

    {
      let result = await waitForProperty(obj, 'foo', v => {
        expect<typeof v>().toBeString();
        return false;
      });

      expect<typeof result>().toEqualTypeOf<void>();
    }
  });

  test('forever', async () => {
    expect<typeof forever>().toBeCallableWith();
    expect<typeof forever>().parameters.toEqualTypeOf<[]>();
    expect<typeof forever>().returns.toEqualTypeOf<PromiseLike<never>>();

    // @ts-expect-error
    forever('nope');

    {
      let result = await forever();
      expect<typeof result>().toBeNever();
    }
  });
});

module('integration tests', () => {
  type Resolved<T> = T extends PromiseLike<infer R> ? R : T;

  test('classic ember', () => {
    ClassicComponent.extend({
      myTask: task(function * (immediately: boolean, ms: number = 500) {
        if (!immediately) {
          yield timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect<typeof fetchPromise>().resolves.toEqualTypeOf<Response>();

        let response: Response = yield fetchPromise;
        expect<typeof response>().toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = yield fetchPromise;
        expect<typeof safeResponse>().toEqualTypeOf<Response>();

        return 'wow';
      }).restartable(),

      async performMyTask() {
        let myTask = this.get('myTask');

        expect<typeof myTask>().not.toBeAny();
        expect<typeof myTask>().toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect<typeof myTask.isRunning>().toBeBoolean();
        expect<typeof myTask.last>().toEqualTypeOf<TaskInstance<string> | null>();
        expect<typeof myTask.perform>().toBeCallableWith(true);
        expect<typeof myTask.perform>().toBeCallableWith(false, 500);
        expect<typeof myTask.perform>().parameters.toEqualTypeOf<[boolean, number?]>();
        expect<typeof myTask.perform>().returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect<typeof myTaskInstance>().not.toBeAny();
        expect<typeof myTaskInstance>().toEqualTypeOf<TaskInstance<string>>();
        expect<typeof myTaskInstance.isRunning>().toBeBoolean();
        expect<typeof myTaskInstance.value>().toEqualTypeOf<string | null>();
        expect<typeof myTaskInstance>().toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect<typeof result>().not.toBeAny();
        expect<typeof result>().toBeString();
        expect<typeof result.length>().toBeNumber();

        // @ts-expect-error
        myTask.perform('nope');

        // @ts-expect-error
        myTask.perform(true, 'nope');

        // @ts-expect-error
        myTask.perform(false, 500, 'nope');
      }
    });
  });

  test('octane', () => {
    class MyComponent extends GlimmerComponent {
      @restartableTask *myTask(immediately: boolean, ms: number = 500): TaskGenerator<string> {
        if (!immediately) {
          yield timeout(ms);
        }

        let fetchPromise = fetch('/api/data.json');
        expect<typeof fetchPromise>().resolves.toEqualTypeOf<Response>();

        let response: Response = yield fetchPromise;
        expect<typeof response>().toEqualTypeOf<Response>();

        let safeResponse: Resolved<typeof fetchPromise> = yield fetchPromise;
        expect<typeof safeResponse>().toEqualTypeOf<Response>();

        return 'wow';
      }

      async performMyTask() {
        let myTask = taskFor(this.myTask);

        expect<typeof myTask>().not.toBeAny();
        expect<typeof myTask>().toEqualTypeOf<Task<string, [boolean, number?]>>();
        expect<typeof myTask.isRunning>().toBeBoolean();
        expect<typeof myTask.last>().toEqualTypeOf<TaskInstance<string> | null>();
        expect<typeof myTask.perform>().toBeCallableWith(true);
        expect<typeof myTask.perform>().toBeCallableWith(false, 500);
        expect<typeof myTask.perform>().parameters.toEqualTypeOf<[boolean, number?]>();
        expect<typeof myTask.perform>().returns.toEqualTypeOf<TaskInstance<string>>();

        let myTaskInstance = myTask.perform(true);

        expect<typeof myTaskInstance>().not.toBeAny();
        expect<typeof myTaskInstance>().toEqualTypeOf<TaskInstance<string>>();
        expect<typeof myTaskInstance.isRunning>().toBeBoolean();
        expect<typeof myTaskInstance.value>().toEqualTypeOf<string | null>();
        expect<typeof myTaskInstance>().toMatchTypeOf<Promise<string>>();

        let result = await myTaskInstance;

        expect<typeof result>().not.toBeAny();
        expect<typeof result>().toBeString();
        expect<typeof result.length>().toBeNumber();

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
