export declare function assign<T, U>(obj: T, assignments: U): T & U;
export declare function assign<T, U, V>(obj: T, a: U, b: V): T & U & V;
export declare function assign<T, U, V, W>(obj: T, a: U, b: V, c: W): T & U & V & W;
export declare function assign<T, U, V, W, X>(obj: T, a: U, b: V, c: W, d: X): T & U & V & W & X;
export declare function assign<T, U, V, W, X, Y>(obj: T, a: U, b: V, c: W, d: X, e: Y): T & U & V & W & X & Y;
export declare function assign<T, U, V, W, X, Y, Z>(obj: T, a: U, b: V, c: W, d: X, e: Y, f: Z): T & U & V & W & X & Y & Z;
export declare function assign(target: any, ...args: any[]): any;
export declare function fillNulls<T>(count: number): T[];
//# sourceMappingURL=object-utils.d.ts.map