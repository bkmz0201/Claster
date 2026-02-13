import { MarkdownAdapter } from '@blocksuite/affine/shared/adapters';
import { type DocSnapshot, type Store, Transformer } from '@blocksuite/affine/store';
import { Service } from '@toeverything/infra';
import type { DefaultServerService, WorkspaceServerService } from '../../cloud';
import { type WorkspaceService } from '../../workspace';
import { WorkspaceImpl } from '../../workspace/impls/workspace';
export declare class SnapshotHelper extends Service {
    private readonly workspaceService;
    private readonly workspaceServerService;
    private readonly defaultServerService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService, defaultServerService: DefaultServerService);
    private get serverService();
    getTempWorkspace(): WorkspaceImpl;
    getTransformer(): Transformer;
    getMarkdownAdapter(): MarkdownAdapter;
    getSnapshot(doc: Store): DocSnapshot | undefined;
    createStore(snapshot?: DocSnapshot): Promise<Store | undefined>;
    createEmptySnapshot(): Promise<DocSnapshot | undefined>;
    isDocEmpty(store?: Store): boolean;
}
//# sourceMappingURL=snapshot-helper.d.ts.map