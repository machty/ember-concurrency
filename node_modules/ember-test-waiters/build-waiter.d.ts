import { ITestWaiter } from 'ember-test-waiters';
/**
 * Builds and returns a test waiter. The type of the
 * returned waiter is dependent on whether the app or
 * addon is in `DEBUG` mode or not.
 *
 * @param name {string} The name of the test waiter
 * @returns {ITestWaiter}
 *
 * @example
 *
 * import Component from '@ember/component';
 * import { buildWaiter } from 'ember-test-waiters';
 *
 * if (DEBUG) {
 *   let waiter = buildWaiter('friend-waiter');
 * }
 *
 * export default class Friendz extends Component {
 *   didInsertElement() {
 *     let token = waiter.beginAsync(this);
 *
 *     someAsyncWork().then(() => {
 *       waiter.endAsync(token);
 *     });
 *   }
 * }
 */
export default function buildWaiter(name: string): ITestWaiter;
