type PromiseResult<T> = T extends Promise<infer R> ? R : never;
export type IdConverter = PromiseResult<ReturnType<typeof getIdConverter>>;
export declare function getIdConverter(storage: {
    getDocBuffer: (id: string) => Promise<Uint8Array | null>;
}, spaceId: string): Promise<{
    newIdToOldId(newId: string): string;
    oldIdToNewId(oldId: string): string;
}>;
export {};
//# sourceMappingURL=id-converter.d.ts.map