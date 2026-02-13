import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, MobileMenu } from '@affine/component';
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { DocService } from '@affine/core/modules/doc';
import { ShareMenuContent } from '@affine/core/modules/share-menu';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { ShareiOsIcon } from '@blocksuite/icons/rc';
import { useServices } from '@toeverything/infra';
import * as styles from './page-header-share-button.css';
export const PageHeaderShareButton = () => {
    const { workspaceService, docService } = useServices({
        WorkspaceService,
        DocService,
    });
    const workspace = workspaceService.workspace;
    const doc = docService.doc.blockSuiteDoc;
    const confirmEnableCloud = useEnableCloud();
    if (workspace.meta.flavour === 'local') {
        return null;
    }
    return (_jsx(MobileMenu, { items: _jsx("div", { className: styles.content, children: _jsx(ShareMenuContent, { workspaceMetadata: workspace.meta, currentPage: doc, onEnableAffineCloud: () => confirmEnableCloud(workspace, {
                    openPageId: doc.id,
                }) }) }), children: _jsx(IconButton, { size: 24, style: { padding: 10 }, icon: _jsx(ShareiOsIcon, {}) }) }));
};
//# sourceMappingURL=page-header-share-button.js.map