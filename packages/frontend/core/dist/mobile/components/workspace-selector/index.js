import { jsx as _jsx } from "react/jsx-runtime";
import { MobileMenu } from '@affine/component';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { track } from '@affine/track';
import { useServiceOptional } from '@toeverything/infra';
import { forwardRef, useCallback, useEffect, useState, } from 'react';
import { CurrentWorkspaceCard } from './current-card';
import { SelectorMenu } from './menu';
export const WorkspaceSelector = forwardRef(function WorkspaceSelector({ className }, ref) {
    const [open, setOpen] = useState(false);
    const workspaceManager = useServiceOptional(WorkspacesService);
    const openMenu = useCallback(() => {
        track.$.navigationPanel.workspaceList.open();
        setOpen(true);
    }, []);
    const close = useCallback(() => {
        setOpen(false);
    }, []);
    // revalidate workspace list when open workspace list
    useEffect(() => {
        if (open)
            workspaceManager?.list.revalidate();
    }, [workspaceManager, open]);
    return (_jsx(MobileMenu, { items: _jsx(SelectorMenu, { onClose: close }), rootOptions: { open }, contentOptions: {
            onInteractOutside: close,
            onEscapeKeyDown: close,
            style: { padding: 0 },
        }, children: _jsx(CurrentWorkspaceCard, { ref: ref, onClick: openMenu, className: className }) }));
});
//# sourceMappingURL=index.js.map