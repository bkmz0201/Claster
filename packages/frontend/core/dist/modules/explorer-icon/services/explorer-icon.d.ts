import { LiveData, Service } from '@toeverything/infra';
import type { ExplorerIconStore, ExplorerType } from '../store/explorer-icon';
export declare class ExplorerIconService extends Service {
    private readonly store;
    constructor(store: ExplorerIconStore);
    getIcon(type: ExplorerType, id: string): {
        id: string;
        icon: import("@affine/component").IconData;
    } | null;
    setIcon(options: Parameters<ExplorerIconStore['setIcon']>[0]): void | {
        id: string;
        icon: import("@affine/component").IconData;
    };
    icon$(type: ExplorerType, id: string): LiveData<{
        id: string;
        icon: import("@affine/component").IconData;
    } | null>;
}
//# sourceMappingURL=explorer-icon.d.ts.map