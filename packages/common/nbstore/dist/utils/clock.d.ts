export declare class ClockMap {
    private readonly map;
    max: Date;
    constructor(map: Map<string, Date>);
    get(id: string): Date;
    set(id: string, value: Date): void;
    setIfBigger(id: string, value: Date): boolean;
    clear(): void;
    keys(): string[];
}
//# sourceMappingURL=clock.d.ts.map