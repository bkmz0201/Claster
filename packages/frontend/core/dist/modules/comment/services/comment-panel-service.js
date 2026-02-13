import {} from '@affine/core/modules/workbench';
import { Service } from '@toeverything/infra';
export class CommentPanelService extends Service {
    constructor(workbenchService) {
        super();
        this.workbenchService = workbenchService;
        this.activePendingWatchers = new Set();
    }
    /**
     * Watch for pending comments on a doc comment entity and open the sidebar automatically
     */
    watchForPendingComments(entity) {
        const subscription = entity.pendingComment$.subscribe(pendingComment => {
            // If we have a new pending comment, open the comment panel
            if (pendingComment) {
                this.openCommentPanel();
            }
        });
        const dispose = () => {
            subscription.unsubscribe();
            this.activePendingWatchers.delete(dispose);
        };
        this.activePendingWatchers.add(dispose);
        return dispose;
    }
    /**
     * Open the sidebar and activate the comment tab
     */
    openCommentPanel() {
        const workbench = this.workbenchService.workbench;
        const activeView = workbench.activeView$.value;
        if (activeView) {
            workbench.openSidebar();
            activeView.activeSidebarTab('comment');
        }
    }
    dispose() {
        // Clean up all active watchers
        for (const dispose of this.activePendingWatchers) {
            dispose();
        }
        this.activePendingWatchers.clear();
        super.dispose();
    }
}
//# sourceMappingURL=comment-panel-service.js.map