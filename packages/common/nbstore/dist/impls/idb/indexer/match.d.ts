export declare class Match {
    scores: Map<number, number>;
    /**
     * nid -> field -> index(multi value field) -> [start, end][]
     */
    highlighters: Map<number, Map<string, Map<number, [number, number][]>>>;
    constructor();
    size(): number;
    getScore(id: number): number;
    addScore(id: number, score: number): void;
    getHighlighters(id: number, field: string): Map<number, [number, number][]> | undefined;
    addHighlighter(id: number, field: string, index: number, newRanges: [number, number][]): void;
    and(other: Match): Match;
    or(other: Match): Match;
    exclude(other: Match): Match;
    boost(boost: number): Match;
    toArray(): number[];
    private copyExtData;
}
//# sourceMappingURL=match.d.ts.map