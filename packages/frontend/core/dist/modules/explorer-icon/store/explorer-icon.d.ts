import type { IconData } from '@affine/component';
import { Store } from '@toeverything/infra';
import type { WorkspaceDBService } from '../../db';
export type ExplorerType = 'doc' | 'collection' | 'folder' | 'tag';
export declare class ExplorerIconStore extends Store {
    private readonly dbService;
    constructor(dbService: WorkspaceDBService);
    watchIcon(type: ExplorerType, id: string): import("rxjs").Observable<{
        id: string;
        icon: IconData;
    } | null>;
    getIcon(type: ExplorerType, id: string): {
        id: string;
        icon: IconData;
    } | null;
    setIcon(options: {
        where: ExplorerType;
        id: string;
        icon?: IconData;
    }): void | {
        id: string;
        icon: IconData;
    };
}
//# sourceMappingURL=explorer-icon.d.ts.map