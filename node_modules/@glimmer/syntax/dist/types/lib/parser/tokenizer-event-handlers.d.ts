import { HandlebarsNodeVisitors } from './handlebars-node-visitors';
import * as AST from '../types/nodes';
import builders from '../builders';
import traverse from '../traversal/traverse';
import print from '../generation/print';
import Walker from '../traversal/walker';
import { NodeVisitor } from '../traversal/visitor';
export declare const voidMap: {
    [tagName: string]: boolean;
};
export declare class TokenizerEventHandlers extends HandlebarsNodeVisitors {
    private tagOpenLine;
    private tagOpenColumn;
    reset(): void;
    beginComment(): void;
    appendToCommentData(char: string): void;
    finishComment(): void;
    beginData(): void;
    appendToData(char: string): void;
    finishData(): void;
    tagOpen(): void;
    beginStartTag(): void;
    beginEndTag(): void;
    finishTag(): void;
    finishStartTag(): void;
    finishEndTag(isVoid: boolean): void;
    markTagAsSelfClosing(): void;
    appendToTagName(char: string): void;
    beginAttribute(): void;
    appendToAttributeName(char: string): void;
    beginAttributeValue(isQuoted: boolean): void;
    appendToAttributeValue(char: string): void;
    finishAttributeValue(): void;
    reportSyntaxError(message: string): void;
}
/**
  ASTPlugins can make changes to the Glimmer template AST before
  compilation begins.
*/
export interface ASTPluginBuilder {
    (env: ASTPluginEnvironment): ASTPlugin;
}
export interface ASTPlugin {
    name: string;
    visitor: NodeVisitor;
}
export interface ASTPluginEnvironment {
    meta?: object;
    syntax: Syntax;
}
interface HandlebarsParseOptions {
    srcName?: string;
    ignoreStandalone?: boolean;
}
export interface PreprocessOptions {
    meta?: unknown;
    plugins?: {
        ast?: ASTPluginBuilder[];
    };
    parseOptions?: HandlebarsParseOptions;
    /**
      Useful for specifying a group of options together.
  
      When `'codemod'` we disable all whitespace control in handlebars
      (to preserve as much as possible) and we also avoid any
      escaping/unescaping of HTML entity codes.
     */
    mode?: 'codemod' | 'precompile';
}
export interface Syntax {
    parse: typeof preprocess;
    builders: typeof builders;
    print: typeof print;
    traverse: typeof traverse;
    Walker: typeof Walker;
}
export declare function preprocess(html: string, options?: PreprocessOptions): AST.Template;
export {};
//# sourceMappingURL=tokenizer-event-handlers.d.ts.map