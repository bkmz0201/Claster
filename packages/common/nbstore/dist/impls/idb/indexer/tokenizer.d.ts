export interface Tokenizer {
    tokenize(text: string): Token[];
}
export interface Token {
    term: string;
    start: number;
    end: number;
}
export declare class SimpleTokenizer implements Tokenizer {
    tokenize(text: string): Token[];
}
export declare class NGramTokenizer implements Tokenizer {
    private readonly n;
    constructor(n: number);
    tokenize(text: string): Token[];
}
export declare class GeneralTokenizer implements Tokenizer {
    constructor();
    tokenizeWord(word: string, lang: string): Token[];
    testLang(c: string): string;
    tokenize(text: string): Token[];
}
//# sourceMappingURL=tokenizer.d.ts.map