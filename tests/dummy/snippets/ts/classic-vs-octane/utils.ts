import {
  Task,
  TaskFunction,
  TaskFunctionArgs as Args,
  TaskFunctionReturnType as Return,
  EncapsulatedTaskDescriptor as Descriptor,
  EncapsulatedTaskDescriptorArgs as DescriptorArgs,
  EncapsulatedTaskDescriptorReturnType as DescriptorReturn
} from 'ember-concurrency';

type AnyTask = Task<any, any[]>;

type AnyTaskFunction = TaskFunction<any, any[]>;
type TaskFor<T extends AnyTaskFunction> = Task<Return<T>, Args<T>>;

type AnyEncapsulatedTaskDescriptor = Descriptor<any, any[]>;
type TaskForDescriptor<T extends AnyEncapsulatedTaskDescriptor> = Task<DescriptorReturn<T>, DescriptorArgs<T>>;

export function taskFor<T extends AnyTaskFunction>(task: T): TaskFor<T>;
export function taskFor<T extends AnyEncapsulatedTaskDescriptor>(task: T): TaskForDescriptor<T>;
export function taskFor(task: AnyTaskFunction | AnyEncapsulatedTaskDescriptor): AnyTask {
  return task as any;
}
