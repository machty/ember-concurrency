export interface NamedEntityMap {
    [name: string]: string;
}
export interface EntityParser {
    parse(entity: string): string | undefined;
}
export interface TokenizerOptions {
    loc?: boolean;
}
export declare type Attribute = [string, string, boolean];
export interface Location {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
}
export interface TokenBase<T extends TokenType> {
    type: T;
    syntaxError?: string;
    loc?: Location;
}
export interface StartTag extends TokenBase<TokenType.StartTag> {
    tagName: string;
    attributes: Attribute[];
    selfClosing: boolean;
}
export interface EndTag extends TokenBase<TokenType.EndTag> {
    tagName: string;
}
export interface Chars extends TokenBase<TokenType.Chars> {
    chars: string;
}
export interface Comment extends TokenBase<TokenType.Comment> {
    chars: string;
}
export declare type Token = StartTag | EndTag | Chars | Comment;
export declare const enum TokenType {
    StartTag = "StartTag",
    EndTag = "EndTag",
    Chars = "Chars",
    Comment = "Comment",
}
export interface TokenMap {
    StartTag: StartTag;
    EndTag: EndTag;
    Chars: Chars;
    Comment: Comment;
}
export interface TokenizerDelegate {
    reset(): void;
    finishData(): void;
    tagOpen(): void;
    beginData(): void;
    appendToData(char: string): void;
    beginStartTag(): void;
    appendToTagName(char: string): void;
    beginAttribute(): void;
    appendToAttributeName(char: string): void;
    beginAttributeValue(quoted: boolean): void;
    appendToAttributeValue(char: string): void;
    finishAttributeValue(): void;
    markTagAsSelfClosing(): void;
    beginEndTag(): void;
    finishTag(): void;
    beginComment(): void;
    appendToCommentData(char: string): void;
    finishComment(): void;
    reportSyntaxError(error: string): void;
}
export { TokenizerState } from './generated/tokenizer-states';
