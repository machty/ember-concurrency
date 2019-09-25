import { EntityParser, TokenizerDelegate, TokenizerState } from './types';
export default class EventedTokenizer {
    private delegate;
    private entityParser;
    state: TokenizerState;
    line: number;
    column: number;
    private input;
    private index;
    private tagNameBuffer;
    constructor(delegate: TokenizerDelegate, entityParser: EntityParser);
    reset(): void;
    transitionTo(state: TokenizerState): void;
    tokenize(input: string): void;
    tokenizePart(input: string): void;
    tokenizeEOF(): void;
    flushData(): void;
    peek(): string;
    consume(): string;
    consumeCharRef(): string | undefined;
    markTagStart(): void;
    private appendToTagName(char);
    private isIgnoredEndTag();
    states: {
        [k in TokenizerState]?: (this: EventedTokenizer) => void;
    };
}
