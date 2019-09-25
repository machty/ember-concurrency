import { DEBUG } from '@glimmer/env';
import { TestWaiter } from 'ember-test-waiters';
import NoopTestWaiter from './noop-test-waiter';
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
export default function buildWaiter(name) {
    if (DEBUG) {
        return new TestWaiter(name);
    }
    return new NoopTestWaiter(name);
}
