export declare type DeferredState = 'pending' | 'resolved' | 'rejected';
export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (error: unknown) => void;
}
export declare function defer<T = unknown>(): Readonly<Deferred<T>>;
