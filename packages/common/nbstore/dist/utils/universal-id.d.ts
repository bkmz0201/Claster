export type SpaceType = 'workspace' | 'userspace';
export declare function universalId({ peer, type, id, }: {
    peer: string;
    type: SpaceType;
    id: string;
}): string;
export declare function isValidSpaceType(type: string): type is SpaceType;
export declare function isValidUniversalId(opts: Record<string, string>): boolean;
export declare function parseUniversalId(id: string): {
    peer: string;
    type: SpaceType;
    id: string;
};
//# sourceMappingURL=universal-id.d.ts.map