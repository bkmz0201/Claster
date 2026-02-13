export declare function delay(ms: number): Promise<unknown>;
export type AffineTextEvent = {
    type: 'attachment' | 'message';
    data: string;
};
type AffineTextStream = AsyncIterable<AffineTextEvent>;
type toTextStreamOptions = {
    timeout?: number;
    signal?: AbortSignal;
};
export declare function toTextStream(eventSource: EventSource, { timeout, signal }?: toTextStreamOptions): AffineTextStream;
export {};
//# sourceMappingURL=event-source.d.ts.map