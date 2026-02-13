import type { ReferenceParams } from '@blocksuite/affine/model';
import { Entity, LiveData } from '@toeverything/infra';
import { type To } from 'history';
import type { GlobalState } from '../../storage';
import type { WorkbenchNewTabHandler } from '../services/workbench-new-tab-handler';
import type { WorkbenchDefaultState } from '../services/workbench-view-state';
import { View } from './view';
export type WorkbenchPosition = 'beside' | 'active' | 'head' | 'tail' | number;
export type WorkbenchOpenOptions = {
    at?: WorkbenchPosition | 'new-tab';
    replaceHistory?: boolean;
    show?: boolean;
};
export declare class Workbench extends Entity {
    private readonly defaultState;
    private readonly newTabHandler;
    private readonly globalState;
    constructor(defaultState: WorkbenchDefaultState, newTabHandler: WorkbenchNewTabHandler, globalState: GlobalState);
    readonly activeViewIndex$: LiveData<number>;
    readonly basename$: LiveData<string>;
    readonly views$: LiveData<View[]>;
    activeView$: LiveData<View>;
    location$: LiveData<import("history").Location>;
    sidebarOpen$: LiveData<boolean | undefined>;
    setSidebarOpen(open: boolean): void;
    sidebarWidth$: LiveData<number | undefined>;
    setSidebarWidth(width: number): void;
    workspaceSelectorOpen$: LiveData<boolean | undefined>;
    setWorkspaceSelectorOpen(open: boolean): void;
    active(index: number | View): void;
    updateBasename(basename: string): void;
    createView(at: WorkbenchPosition | undefined, defaultLocation: To, active?: boolean): number;
    openSidebar(): void;
    closeSidebar(): void;
    toggleSidebar(): void;
    openWorkspaceSelector(): void;
    closeWorkspaceSelector(): void;
    toggleWorkspaceSelector(): void;
    open(to: To, option?: WorkbenchOpenOptions): void;
    newTab(to: To, { show, }?: {
        show?: boolean;
    }): void;
    openDoc(id: string | ({
        docId: string;
        refreshKey?: string;
        fromTab?: string;
    } & ReferenceParams), options?: WorkbenchOpenOptions): void;
    openAttachment(docId: string, blockId: string, options?: WorkbenchOpenOptions): void;
    openCollections(options?: WorkbenchOpenOptions): void;
    openCollection(collectionId: string, options?: WorkbenchOpenOptions): void;
    openAll(options?: WorkbenchOpenOptions): void;
    openTrash(options?: WorkbenchOpenOptions): void;
    openTags(options?: WorkbenchOpenOptions): void;
    openTag(tagId: string, options?: WorkbenchOpenOptions): void;
    viewAt(positionIndex: WorkbenchPosition): View | undefined;
    close(view: View): void;
    closeOthers(view: View): void;
    moveView(from: number, to: number): void;
    /**
     * resize specified view and the next view
     * @param view
     * @param percent from 0 to 1
     * @returns
     */
    resize(index: number, percent: number): void;
    private indexAt;
}
//# sourceMappingURL=workbench.d.ts.map