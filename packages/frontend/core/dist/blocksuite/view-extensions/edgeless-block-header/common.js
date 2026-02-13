import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { useSharingUrl } from '@affine/core/components/hooks/affine/use-share-url';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import {} from '@blocksuite/affine/model';
import { InformationIcon, LinkIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './edgeless-block-header.css';
export const DocInfoButton = ({ docId, trackFn, 'data-testid': dataTestId, }) => {
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const onClick = useCallback(() => {
        trackFn?.();
        workspaceDialogService.open('doc-info', { docId });
    }, [docId, trackFn, workspaceDialogService]);
    return (_jsx(IconButton, { className: styles.button, size: styles.iconSize, tooltip: t['com.affine.page-properties.page-info.view'](), "data-testid": dataTestId, onClick: onClick, children: _jsx(InformationIcon, {}) }));
};
export const CopyLinkButton = ({ pageId, blockId, mode, trackFn, 'data-testid': dataTestId, }) => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const { onClickCopyLink } = useSharingUrl({
        workspaceId: workspace.id,
        pageId,
    });
    const copyLink = useCallback(() => {
        trackFn?.();
        onClickCopyLink(mode, blockId ? [blockId] : undefined);
    }, [blockId, mode, onClickCopyLink, trackFn]);
    return (_jsx(IconButton, { className: styles.button, size: styles.iconSize, tooltip: t['com.affine.share-menu.copy'](), "data-testid": dataTestId, onClick: copyLink, children: _jsx(LinkIcon, {}) }));
};
//# sourceMappingURL=common.js.map