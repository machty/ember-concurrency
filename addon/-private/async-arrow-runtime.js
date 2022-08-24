import { TaskFactory } from './task-factory';

/**
 * This builder function is called by the transpiled code from
 * `task(async () => {})`. See lib/babel-plugin-transform-ember-concurrency-async-tasks.js
 *
 * @private
 */
export function buildTask(contextFn, options, taskName, bufferPolicyName) {
  let optionsWithBufferPolicy = options;

  if (bufferPolicyName) {
    optionsWithBufferPolicy = Object.assign({}, optionsWithBufferPolicy);
    optionsWithBufferPolicy[bufferPolicyName] = true;
  }

  const result = contextFn();

  const taskFactory = new TaskFactory(
    taskName || '<unknown>',
    result.generator,
    optionsWithBufferPolicy
  );
  return taskFactory.createTask(result.context);
}
