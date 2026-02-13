import type { Collection as LegacyCollectionInfo } from '@affine/env/filter';
import { Store } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterParams } from '../../collection-rules';
import type { WorkspaceService } from '../../workspace';
export interface CollectionInfo {
    id: string;
    name: string;
    rules: {
        filters: FilterParams[];
    };
    allowList: string[];
}
export declare class CollectionStore extends Store {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    private get rootYDoc();
    private get workspaceSettingYMap();
    watchCollectionDataReady(): Observable<boolean>;
    watchCollectionMetas(): Observable<{
        id: string;
        name: string;
        title: string;
    }[]>;
    watchCollectionIds(): Observable<string[]>;
    watchCollectionInfo(id: string): Observable<CollectionInfo | null>;
    createCollection(info: Partial<Omit<CollectionInfo, 'id'>>): string;
    deleteCollection(id: string): void;
    updateCollectionInfo(id: string, info: Partial<Omit<CollectionInfo, 'id'>>): void;
    migrateCollectionInfo(legacyCollectionInfo: LegacyCollectionInfo): CollectionInfo;
    migrateFilterList(filterList: LegacyCollectionInfo['filterList']): FilterParams[];
}
//# sourceMappingURL=collection.d.ts.map