import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import track from '@affine/track';
import { FileSizeLimitProvider, } from '@blocksuite/affine/shared/services';
import { Extension } from '@blocksuite/affine/store';
export function patchFileSizeLimitExtension(framework) {
    const workspaceDialogService = framework.get(WorkspaceDialogService);
    class AffineFileSizeLimitService extends Extension {
        constructor() {
            super(...arguments);
            // 2GB
            this.maxFileSize = 2 * 1024 * 1024 * 1024;
        }
        onOverFileSize() {
            workspaceDialogService.open('setting', {
                activeTab: 'plans',
                scrollAnchor: 'cloudPricingPlan',
            });
            track.$.paywall.storage.viewPlans();
        }
        static setup(di) {
            di.override(FileSizeLimitProvider, AffineFileSizeLimitService);
        }
    }
    return AffineFileSizeLimitService;
}
//# sourceMappingURL=file-size-limit.js.map