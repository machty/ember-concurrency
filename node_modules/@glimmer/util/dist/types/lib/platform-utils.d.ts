export declare type Option<T> = T | null;
export declare type Maybe<T> = Option<T> | undefined | void;
export declare type Factory<T> = new (...args: unknown[]) => T;
export declare function keys<T>(obj: T): Array<keyof T>;
export declare function unwrap<T>(val: Maybe<T>): T;
export declare function expect<T>(val: Maybe<T>, message: string): T;
export declare function unreachable(message?: string): Error;
export declare function exhausted(value: never): never;
export declare type Lit = string | number | boolean | undefined | null | void | {};
export declare const tuple: <T extends Lit[]>(...args: T) => T;
//# sourceMappingURL=platform-utils.d.ts.map