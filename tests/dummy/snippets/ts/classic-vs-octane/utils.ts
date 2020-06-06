import {
  Task,
  TaskFunction,
  TaskFunctionArgs as Args,
  TaskFunctionReturnType as Return
} from 'ember-concurrency';

type AnyTaskFunction = TaskFunction<any, any[]>;
type TaskFor<T extends AnyTaskFunction> = Task<Return<T>, Args<T>>;

export function taskFor<T extends AnyTaskFunction>(task: T): TaskFor<T> {
  return task as any;
}
