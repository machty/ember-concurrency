export function testScheduler(policy, args) {
  let reducer = policy.makeReducer(...args);
  return [...Array(10)].map(() => reducer.step());
}
