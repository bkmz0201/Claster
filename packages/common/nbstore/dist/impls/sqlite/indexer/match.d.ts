export declare class Match {
    scores: Map<string, number>;
    /**
     * id -> field -> index(multi value field) -> [start, end][]
     */
    highlighters: Map<string, Map<string, Map<number, [number, number][]>>>;
    constructor();
    size(): number;
    getScore(id: string): number;
    addScore(id: string, score: number): void;
    getHighlighters(id: string, field: string): Map<number, [number, number][]> | undefined;
    addHighlighter(id: string, field: string, index: number, newRanges: [number, number][]): void;
    and(other: Match): Match;
    or(other: Match): Match;
    exclude(other: Match): Match;
    boost(boost: number): Match;
    toArray(): string[];
    private copyExtData;
}
//# sourceMappingURL=match.d.ts.map