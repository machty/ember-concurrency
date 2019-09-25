import * as AST from '../types/nodes';
export interface SyntaxError extends Error {
    location: AST.SourceLocation;
    constructor: SyntaxErrorConstructor;
}
export interface SyntaxErrorConstructor {
    new (message: string, location: AST.SourceLocation): SyntaxError;
    readonly prototype: SyntaxError;
}
/**
 * Subclass of `Error` with additional information
 * about location of incorrect markup.
 */
declare const SyntaxError: SyntaxErrorConstructor;
export default SyntaxError;
//# sourceMappingURL=syntax-error.d.ts.map