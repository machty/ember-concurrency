import { Task, task, taskGroup } from 'ember-concurrency';

declare module 'ember-concurrency' {
  export type AsyncTaskFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

  export type AsyncTaskFunctionArgs<T extends AsyncTaskFunction<any, any[]>> =
    T extends (...args: infer A) => Promise<any> ? A : [];

  export type AsyncTaskFunctionReturnType<T extends AsyncTaskFunction<any, any[]>> =
    T extends (...args: any[]) => Promise<infer R> ? R : unknown;

  export interface AsyncEncapsulatedTaskDescriptor<T, Args extends any[]> {
    perform(...args: Args): Promise<T>;
  }

  export type AsyncEncapsulatedTaskDescriptorArgs<T extends AsyncEncapsulatedTaskDescriptor<any, any[]>> =
    T extends (...args: infer A) => Promise<any> ? A : [];

  export type AsyncEncapsulatedTaskDescriptorReturnType<T extends AsyncEncapsulatedTaskDescriptor<any, any[]>> =
    T extends (...args: any[]) => Promise<infer R> ? R : unknown;

  function task<T extends AsyncTaskFunction<any, any[]>>(taskFn: T):
    TaskProperty<AsyncTaskFunctionReturnType<T>, AsyncTaskFunctionArgs<T>>;
  function task<T extends AsyncEncapsulatedTaskDescriptor<any, any[]>>(taskFn: T):
    TaskProperty<AsyncEncapsulatedTaskDescriptorReturnType<T>, AsyncEncapsulatedTaskDescriptorArgs<T>>;

  function taskGroup<T extends AsyncTaskFunction<any, any[]>>(taskFn: T):
    TaskGroup<AsyncTaskFunctionReturnType<T>>;
}
