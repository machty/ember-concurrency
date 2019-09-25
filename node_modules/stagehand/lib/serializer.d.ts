export default class Serializer {
    private nextFunctionHandle;
    private handlesByFunction;
    private functionsByHandle;
    dehydrate(root: unknown[]): unknown[];
    dehydrate(root: unknown): unknown;
    rehydrate(root: unknown[], options: RehydrateOptions): unknown[];
    rehydrate(root: unknown, options: RehydrateOptions): unknown;
    lookupFunction(handle: FunctionHandle): Function | undefined;
    releaseFunction(f: Function): void;
    private handleIdFor;
}
interface RehydrateOptions {
    hydrateFunction(handle: FunctionHandle, params: unknown[]): unknown;
}
declare const HANDLE_ID = "--stagehand-function-handle";
export interface FunctionHandle {
    [HANDLE_ID]: number;
}
export {};
