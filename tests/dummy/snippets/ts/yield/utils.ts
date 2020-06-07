import {
  Task,
  TaskFunction,
  AsyncTaskFunction,
  TaskFunctionArgs as Args,
  AsyncTaskFunctionArgs as AsyncArgs,
  TaskFunctionReturnType as Return,
  AsyncTaskFunctionReturnType as AsyncReturn
} from 'ember-concurrency';

type AnyTask = Task<any, any[]>;

type AnyTaskFunction = TaskFunction<any, any[]>;
type TaskFor<T extends AnyTaskFunction> = Task<Return<T>, Args<T>>;

type AnyAsyncTaskFunction = AsyncTaskFunction<any, any[]>;
type AsyncTaskFor<T extends AnyAsyncTaskFunction> = Task<AsyncReturn<T>, AsyncArgs<T>>;

export function taskFor<T extends AnyTaskFunction>(task: T): TaskFor<T>;
export function taskFor<T extends AnyAsyncTaskFunction>(task: T): AsyncTaskFor<T>;
export function taskFor(task: AnyTaskFunction | AnyAsyncTaskFunction): AnyTask {
  return task as any;
}

export type JSON = string | number | boolean | null | JSONArray | JSONObject;
export interface JSONArray extends Array<JSON> {}
export interface JSONObject extends Record<string, JSON> {}
