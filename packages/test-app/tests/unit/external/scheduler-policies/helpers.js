export function testScheduler(policy, numRunning, numQueued) {
  let reducer = policy.makeReducer(numRunning, numQueued);
  let total = numRunning + numQueued;
  return [...Array(total)].map(() => reducer.step());
}

export function typesFor(policy, numRunning, numQueued) {
  return testScheduler(policy, numRunning, numQueued).map((a) => a.type);
}
