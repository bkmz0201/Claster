import { jsx as _jsx } from "react/jsx-runtime";
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { track } from '@affine/track';
import { useCallback } from 'react';
import { ShareMenu } from './share-menu';
export { CloudSvg } from './cloud-svg';
export { ShareMenuContent } from './share-menu';
export const SharePageButton = ({ workspace, page }) => {
    const confirmEnableCloud = useEnableCloud();
    const handleOpenShareModal = useCallback((open) => {
        if (open) {
            track.$.sharePanel.$.open();
        }
    }, []);
    return (_jsx(ShareMenu, { workspaceMetadata: workspace.meta, currentPage: page, onEnableAffineCloud: () => confirmEnableCloud(workspace, {
            openPageId: page.id,
        }), onOpenShareModal: handleOpenShareModal }));
};
//# sourceMappingURL=index.js.map