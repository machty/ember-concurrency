declare const DEHYDRATED: unique symbol;
declare const HANDLE: unique symbol;
export declare type Hydrated<T extends Dehydrated<any>> = T extends Dehydrated<infer U> ? U : never;
export declare type Dehydrated<T> = {
    [DEHYDRATED]: T;
};
declare const HANDLE_KEY = "--stagehand-function-handle";
export declare type Handle = typeof HANDLE;
export interface DehydratedHandle {
    [HANDLE_KEY]: Handle;
}
export default class FunctionHandleRegistry {
    private hydrateRemoteFunction;
    private nextFunctionHandle;
    private handlesByFunction;
    private functionsByHandle;
    constructor(hydrateRemoteFunction: (handle: Handle) => (...params: unknown[]) => unknown);
    dehydrate<T>(root: T): Dehydrated<T>;
    rehydrate<T extends Dehydrated<any>>(root: T): Hydrated<T>;
    lookupFunction(handle: Handle): Function | undefined;
    lookupHandle(f: Function): Handle | undefined;
    releaseFunction(f: Function): void;
    reset(): void;
    private lookupOrGenerateHandle;
    private generateHAndle;
}
export {};
