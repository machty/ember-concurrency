import { TaskFactory } from './task-factory';

/**
 * Instantiate and return a Task object that is bound to (i.e. its lifetime is intertwined with)
 * the `context` param (e.g. a Component or other class defined with modern ES6 class syntax).
 *
 * @private
 */
export function buildTask(
  context,
  options,
  taskGeneratorFn,
  taskName,
  bufferPolicyName
) {
  let optionsWithBufferPolicy = options;

  if (bufferPolicyName) {
    optionsWithBufferPolicy = Object.assign({}, optionsWithBufferPolicy);
    optionsWithBufferPolicy[bufferPolicyName] = true;
  }

  const taskFactory = new TaskFactory(
    taskName || '<unknown>',
    taskGeneratorFn,
    optionsWithBufferPolicy
  );
  return taskFactory.createTask(context);
}
