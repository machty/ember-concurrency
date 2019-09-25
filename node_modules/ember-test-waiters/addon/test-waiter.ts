import { ITestWaiter, WaiterName, ITestWaiterDebugInfo, Token } from './types';
import { register } from './waiter-manager';

let token: number = 0;

function getNextToken(): number {
  return token++;
}

/**
 * A class providing creation, registration and async waiting functionality.
 *
 * @public
 * @class TestWaiter<T>
 */
export default class TestWaiter<T = Token> implements ITestWaiter<T> {
  public name: WaiterName;
  private nextToken: () => T;
  private isRegistered = false;

  items = new Map<T, ITestWaiterDebugInfo>();

  /**
   * @public
   * @constructor
   * @param name {WaiterName} the name of the test waiter
   */
  constructor(name: WaiterName, nextToken?: () => T) {
    this.name = name;
    // @ts-ignore
    this.nextToken = nextToken || getNextToken;
  }

  /**
   * Will register the waiter, allowing it to be opted in to pausing async
   * operations until they're completed within your tests. You should invoke
   * it after instantiating your `TestWaiter` instance.
   *
   * **Note**, if you forget to register your waiter, it will be registered
   * for you on the first invocation of `beginAsync`.
   *
   * @private
   * @method register
   */
  private register() {
    if (!this.isRegistered) {
      register(this);
      this.isRegistered = true;
    }
  }

  /**
   * Should be used to signal the beginning of an async operation that
   * is to be waited for. Invocation of this method should be paired with a subsequent
   * `endAsync` call to indicate to the waiter system that the async operation is completed.
   *
   * @public
   * @method beginAsync
   * @param item {T} The item to register for waiting
   * @param label {string} An optional label to identify the item
   */
  beginAsync(token: T = this.nextToken(), label?: string) {
    this.register();

    if (this.items.has(token)) {
      throw new Error(`beginAsync called for ${token} but it is already pending.`);
    }

    let error = new Error();

    this.items.set(token, {
      get stack() {
        return error.stack;
      },
      label,
    });

    return token;
  }

  /**
   * Should be used to signal the end of an async operation. Invocation of this
   * method should be paired with a preceeding `beginAsync` call, which would indicate the
   * beginning of an async operation.
   *
   * @public
   * @method endAsync
   * @param item {T} The item to that was registered for waiting
   */
  endAsync(token: T) {
    if (!this.items.has(token)) {
      throw new Error(`endAsync called for ${token} but it is not currently pending.`);
    }

    this.items.delete(token);
  }

  /**
   * Used to determine if the waiter system should still wait for async
   * operations to complete.
   *
   * @public
   * @method waitUntil
   * @returns {boolean}
   */
  waitUntil(): boolean {
    return this.items.size === 0;
  }

  /**
   * Returns the `debugInfo` for each item tracking async operations in this waiter.
   *
   * @public
   * @method debugInfo
   * @returns {ITestWaiterDebugInfo}
   */
  debugInfo(): ITestWaiterDebugInfo[] {
    return [...this.items.values()];
  }
}
