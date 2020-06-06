import { Task, task, taskGroup } from 'ember-concurrency';
import { taskFor } from './utils';

declare module 'ember-concurrency' {
  export type AsyncTaskFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

  export type AsyncTaskFunctionArgs<T extends AsyncTaskFunction<any, any[]>> =
    T extends (...args: infer A) => Promise<any> ? A : [];

  export type AsyncTaskFunctionReturnType<T extends AsyncTaskFunction<any, any[]>> =
    T extends (...args: any[]) => Promise<infer R> ? R : unknown;

  function task<T extends AsyncTaskFunction<any, any[]>>(taskFn: T):
    TaskProperty<AsyncTaskFunctionReturnType<T>, AsyncTaskFunctionArgs<T>>;

  function taskGroup<T extends AsyncTaskFunction<any, any[]>>(taskFn: T):
    TaskGroup<AsyncTaskFunctionReturnType<T>>;
}
