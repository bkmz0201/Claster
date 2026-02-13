import { Entity, LiveData } from '@toeverything/infra';
export type FontData = {
    family: string;
    fullName: string;
    postscriptName: string;
    style: string;
};
export declare class SystemFontFamily extends Entity {
    constructor();
    readonly searchText$: LiveData<string | null>;
    readonly isLoading$: LiveData<boolean>;
    readonly fontList$: LiveData<FontData[]>;
    readonly result$: LiveData<FontData[]>;
    loadFontList: import("@toeverything/infra").Effect<unknown>;
    search(searchText: string): void;
    clearSearch(): void;
}
//# sourceMappingURL=system-font-family.d.ts.map