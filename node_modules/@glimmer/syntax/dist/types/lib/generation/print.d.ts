import * as AST from '../types/nodes';
interface PrinterOptions {
    entityEncoding: 'transformed' | 'raw';
    /**
     * Used to override the mechanism of printing a given AST.Node.
     *
     * This will generally only be useful to source -> source codemods
     * where you would like to specialize/override the way a given node is
     * printed (e.g. you would like to preserve as much of the original
     * formatting as possible).
     *
     * When the provided override returns undefined, the default built in printing
     * will be done for the AST.Node.
     *
     * @param ast the ast node to be printed
     * @param options the options specified during the print() invocation
     */
    override?(ast: AST.Node, options: PrinterOptions): void | string;
}
export default function build(ast: AST.Node, options?: PrinterOptions): string;
export {};
//# sourceMappingURL=print.d.ts.map