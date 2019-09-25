import { IWaiter, IPendingWaiterState } from './types';
/**
 * Registers a waiter.
 *
 * @public
 * @param waiter {IWaiter} A test waiter instance
 */
export declare function register(waiter: IWaiter): void;
/**
 * Unregisters a waiter.
 *
 * @public
 * @param waiter {IWaiter} A test waiter instance
 */
export declare function unregister(waiter: IWaiter): void;
/**
 * Gets an array of all waiters current registered.
 *
 * @public
 * @returns {IWaiter[]}
 */
export declare function getWaiters(): IWaiter[];
/**
 * Clears all waiters.
 *
 * @public
 */
export declare function _reset(): void;
/**
 * Gets the current state of all waiters. Any waiters whose
 * `waitUntil` method returns false will be considered `pending`.
 *
 * @returns {IPendingWaiterState} An object containing a count of all waiters
 * pending and a `waiters` object containing the name of all pending waiters
 * and their debug info.
 */
export declare function getPendingWaiterState(): IPendingWaiterState;
/**
 * Determines if there are any pending waiters.
 *
 * @returns {boolean} `true` if there are pending waiters, otherwise `false`.
 */
export declare function hasPendingWaiters(): boolean;
