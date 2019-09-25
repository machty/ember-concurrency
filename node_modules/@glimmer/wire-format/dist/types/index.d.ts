import { Statements, Statement, SexpOpcodes, Expressions, Expression } from '@glimmer/interfaces';
export declare function is<T>(variant: number): (value: any) => value is T;
export declare const isFlushElement: (value: any) => value is [SexpOpcodes.FlushElement];
export declare function isAttribute(val: Statement): val is Statements.Attribute;
export declare function isArgument(val: Statement): val is Statements.Argument;
export declare function isHelper(expr: Expression): expr is Expressions.Helper;
export declare const isGet: (value: any) => value is [SexpOpcodes.Get, number, string[]];
export declare const isMaybeLocal: (value: any) => value is [SexpOpcodes.MaybeLocal, string[]];
//# sourceMappingURL=index.d.ts.map