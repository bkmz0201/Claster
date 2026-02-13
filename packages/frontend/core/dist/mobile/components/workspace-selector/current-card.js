import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from '@affine/component';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceAvatar } from '@affine/core/components/workspace-avatar';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import { useServiceOptional } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { card, dropdownIcon, label } from './card.css';
export const CurrentWorkspaceCard = forwardRef(function CurrentWorkspaceCard({ onClick, className, ...attrs }, ref) {
    const currentWorkspace = useServiceOptional(WorkspaceService)?.workspace;
    const info = useWorkspaceInfo(currentWorkspace?.meta);
    const name = info?.name ?? UNTITLED_WORKSPACE_NAME;
    return (_jsxs("div", { ref: ref, onClick: onClick, className: clsx(card, className), ...attrs, children: [currentWorkspace ? (_jsx(WorkspaceAvatar, { meta: currentWorkspace?.meta, rounded: 3, "data-testid": "workspace-avatar", size: 40, name: name, colorfulFallback: true }, currentWorkspace?.id)) : (_jsx(Avatar, { size: 40, rounded: 3, colorfulFallback: true })), _jsxs("div", { className: label, children: [name, _jsx(ArrowDownSmallIcon, { className: dropdownIcon })] })] }));
});
//# sourceMappingURL=current-card.js.map