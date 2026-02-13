import { type WorkbenchService } from '@affine/core/modules/workbench';
import { Service } from '@toeverything/infra';
import type { DocCommentEntity } from '../entities/doc-comment';
export declare class CommentPanelService extends Service {
    private readonly workbenchService;
    constructor(workbenchService: WorkbenchService);
    private readonly activePendingWatchers;
    /**
     * Watch for pending comments on a doc comment entity and open the sidebar automatically
     */
    watchForPendingComments(entity: DocCommentEntity): () => void;
    /**
     * Open the sidebar and activate the comment tab
     */
    openCommentPanel(): void;
    dispose(): void;
}
//# sourceMappingURL=comment-panel-service.d.ts.map