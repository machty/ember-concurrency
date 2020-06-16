import {
  Task,
  TaskFunction,
  AsyncTaskFunction,
  TaskFunctionArgs as Args,
  AsyncTaskFunctionArgs as AsyncArgs,
  TaskFunctionReturnType as Return,
  AsyncTaskFunctionReturnType as AsyncReturn,
  EncapsulatedTaskDescriptor as Descriptor,
  EncapsulatedTaskDescriptorArgs as DescriptorArgs,
  EncapsulatedTaskDescriptorReturnType as DescriptorReturn,
  AsyncEncapsulatedTaskDescriptor as AsyncDescriptor,
  AsyncEncapsulatedTaskDescriptorArgs as AsyncDescriptorArgs,
  AsyncEncapsulatedTaskDescriptorReturnType as AsyncDescriptorReturn
} from 'ember-concurrency';

type AnyTask = Task<any, any[]>;

type AnyTaskFunction = TaskFunction<any, any[]>;
type TaskFor<T extends AnyTaskFunction> = Task<Return<T>, Args<T>>;

type AnyAsyncTaskFunction = AsyncTaskFunction<any, any[]>;
type TaskForAsync<T extends AnyAsyncTaskFunction> = Task<AsyncReturn<T>, AsyncArgs<T>>;

type AnyDescriptor = Descriptor<any, any[]>;
type TaskForDescriptor<T extends AnyDescriptor> = Task<DescriptorReturn<T>, DescriptorArgs<T>>;

type AnyAsyncDescriptor = AsyncDescriptor<any, any[]>;
type TaskForAsyncDescriptor<T extends AnyAsyncDescriptor> = Task<AsyncDescriptorReturn<T>, AsyncDescriptorArgs<T>>;

export function taskFor<T extends AnyTaskFunction>(task: T): TaskFor<T>;
export function taskFor<T extends AnyAsyncTaskFunction>(task: T): TaskForAsync<T>;
export function taskFor<T extends AnyDescriptor>(task: T): TaskForDescriptor<T>;
export function taskFor<T extends AnyAsyncDescriptor>(task: T): TaskForAsyncDescriptor<T>;
export function taskFor(task: AnyTaskFunction | AnyAsyncTaskFunction | AnyDescriptor| AnyAsyncDescriptor): AnyTask {
  return task as any;
}

export type JSON = string | number | boolean | null | JSONArray | JSONObject;
export interface JSONArray extends Array<JSON> {}
export interface JSONObject extends Record<string, JSON> {}
