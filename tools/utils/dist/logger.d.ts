export declare const newLineSeparator: RegExp;
interface StringLike {
    toString: () => string;
}
export declare class Logger {
    private readonly tag;
    log: (...args: StringLike[]) => void;
    info: (...args: StringLike[]) => void;
    warn: (...args: StringLike[]) => void;
    error: (...args: StringLike[]) => void;
    success: (...args: StringLike[]) => void;
    constructor(tag?: string);
    getLineLogger(logLine: (...line: string[]) => void, color?: (...text: string[]) => string): (...args: StringLike[]) => void;
}
export {};
//# sourceMappingURL=logger.d.ts.map