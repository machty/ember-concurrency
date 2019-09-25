import { EventedTokenizer, EntityParser } from 'simple-html-tokenizer';
import * as AST from './types/nodes';
import * as HBS from './types/handlebars-ast';
import { Option } from '@glimmer/interfaces';
export declare type Element = AST.Template | AST.Block | AST.ElementNode;
export interface Tag<T extends 'StartTag' | 'EndTag'> {
    type: T;
    name: string;
    attributes: any[];
    modifiers: any[];
    comments: any[];
    selfClosing: boolean;
    loc: AST.SourceLocation;
}
export interface Attribute {
    name: string;
    parts: (AST.MustacheStatement | AST.TextNode)[];
    isQuoted: boolean;
    isDynamic: boolean;
    start: AST.Position;
    valueStartLine: number;
    valueStartColumn: number;
}
export declare abstract class Parser {
    protected elementStack: Element[];
    private source;
    currentAttribute: Option<Attribute>;
    currentNode: Option<AST.CommentStatement | AST.TextNode | Tag<'StartTag' | 'EndTag'>>;
    tokenizer: EventedTokenizer;
    constructor(source: string, entityParser?: EntityParser);
    abstract Program(node: HBS.Program): HBS.Output<'Program'>;
    abstract MustacheStatement(node: HBS.MustacheStatement): HBS.Output<'MustacheStatement'>;
    abstract Decorator(node: HBS.Decorator): HBS.Output<'Decorator'>;
    abstract BlockStatement(node: HBS.BlockStatement): HBS.Output<'BlockStatement'>;
    abstract DecoratorBlock(node: HBS.DecoratorBlock): HBS.Output<'DecoratorBlock'>;
    abstract PartialStatement(node: HBS.PartialStatement): HBS.Output<'PartialStatement'>;
    abstract PartialBlockStatement(node: HBS.PartialBlockStatement): HBS.Output<'PartialBlockStatement'>;
    abstract ContentStatement(node: HBS.ContentStatement): HBS.Output<'ContentStatement'>;
    abstract CommentStatement(node: HBS.CommentStatement): HBS.Output<'CommentStatement'>;
    abstract SubExpression(node: HBS.SubExpression): HBS.Output<'SubExpression'>;
    abstract PathExpression(node: HBS.PathExpression): HBS.Output<'PathExpression'>;
    abstract StringLiteral(node: HBS.StringLiteral): HBS.Output<'StringLiteral'>;
    abstract BooleanLiteral(node: HBS.BooleanLiteral): HBS.Output<'BooleanLiteral'>;
    abstract NumberLiteral(node: HBS.NumberLiteral): HBS.Output<'NumberLiteral'>;
    abstract UndefinedLiteral(node: HBS.UndefinedLiteral): HBS.Output<'UndefinedLiteral'>;
    abstract NullLiteral(node: HBS.NullLiteral): HBS.Output<'NullLiteral'>;
    abstract reset(): void;
    abstract finishData(): void;
    abstract tagOpen(): void;
    abstract beginData(): void;
    abstract appendToData(char: string): void;
    abstract beginStartTag(): void;
    abstract appendToTagName(char: string): void;
    abstract beginAttribute(): void;
    abstract appendToAttributeName(char: string): void;
    abstract beginAttributeValue(quoted: boolean): void;
    abstract appendToAttributeValue(char: string): void;
    abstract finishAttributeValue(): void;
    abstract markTagAsSelfClosing(): void;
    abstract beginEndTag(): void;
    abstract finishTag(): void;
    abstract beginComment(): void;
    abstract appendToCommentData(char: string): void;
    abstract finishComment(): void;
    abstract reportSyntaxError(error: string): void;
    readonly currentAttr: Attribute;
    readonly currentTag: Tag<'StartTag' | 'EndTag'>;
    readonly currentStartTag: Tag<'StartTag'>;
    readonly currentEndTag: Tag<'EndTag'>;
    readonly currentComment: AST.CommentStatement;
    readonly currentData: AST.TextNode;
    acceptTemplate(node: HBS.Program): AST.Template;
    acceptNode(node: HBS.Program): AST.Block | AST.Template;
    acceptNode<U extends HBS.Node | AST.Node>(node: HBS.Node): U;
    currentElement(): Element;
    sourceForNode(node: HBS.Node, endNode?: {
        loc: HBS.SourceLocation;
    }): string;
}
//# sourceMappingURL=parser.d.ts.map