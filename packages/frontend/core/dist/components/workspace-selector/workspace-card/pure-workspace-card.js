import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { DoneIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { WorkspaceAvatar } from '../../workspace-avatar';
import * as styles from './styles.css';
export const PureWorkspaceCard = forwardRef(({ workspaceMetadata, avatarSize = 32, className, disable, active, ...props }, ref) => {
    const information = useWorkspaceInfo(workspaceMetadata);
    const name = information?.name ?? UNTITLED_WORKSPACE_NAME;
    return (_jsxs("div", { className: clsx(styles.container, disable ? styles.disable : null, className), role: "button", tabIndex: 0, "data-testid": "workspace-card", ref: ref, ...props, children: [_jsxs("div", { className: styles.infoContainer, children: [information ? (_jsx(WorkspaceAvatar, { meta: workspaceMetadata, rounded: 3, "data-testid": "workspace-avatar", size: avatarSize, name: name, colorfulFallback: true })) : (_jsx(Skeleton, { width: avatarSize, height: avatarSize })), _jsx("div", { className: styles.workspaceTitleContainer, children: information ? (_jsx("span", { className: styles.workspaceName, children: information.name })) : (_jsx(Skeleton, { width: 100 })) })] }), active && (_jsx("div", { className: styles.activeContainer, children: _jsx(DoneIcon, { className: styles.activeIcon }) }))] }));
});
PureWorkspaceCard.displayName = 'PureWorkspaceCard';
//# sourceMappingURL=pure-workspace-card.js.map