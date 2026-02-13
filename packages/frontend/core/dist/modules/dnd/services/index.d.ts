import { type fromExternalData, type toExternalData } from '@affine/component';
import type { AffineDNDData } from '@affine/core/types/dnd';
import { DNDAPIExtension } from '@blocksuite/affine/shared/services';
import { Service } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { EditorSettingService } from '../../editor-setting';
import type { WorkspaceService } from '../../workspace';
export declare class DndService extends Service {
    private readonly docsService;
    private readonly workspaceService;
    private readonly editorSettingService;
    constructor(docsService: DocsService, workspaceService: WorkspaceService, editorSettingService: EditorSettingService);
    private setupBlocksuiteAdapter;
    private readonly resolvers;
    getBlocksuiteDndAPI(sourceDocId?: string): DNDAPIExtension | null;
    fromExternalData: fromExternalData<AffineDNDData>;
    toExternalData: toExternalData<AffineDNDData>;
    private readonly resolveUriList;
    /**
     * @deprecated Blocksuite DND is now using pragmatic-dnd as well
     */
    private readonly resolveBlocksuiteExternalData;
    private readonly resolveHTML;
    private readonly resolveBlockSnapshot;
}
//# sourceMappingURL=index.d.ts.map