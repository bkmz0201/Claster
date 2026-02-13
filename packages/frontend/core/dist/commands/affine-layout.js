import { jsx as _jsx } from "react/jsx-runtime";
import { track } from '@affine/track';
import { SidebarIcon } from '@blocksuite/icons/rc';
import { registerAffineCommand } from './registry';
export function registerAffineLayoutCommands({ t, appSidebarService, }) {
    const unsubs = [];
    unsubs.push(registerAffineCommand({
        id: 'affine:toggle-left-sidebar',
        category: 'affine:layout',
        icon: _jsx(SidebarIcon, {}),
        label: () => appSidebarService.sidebar.open$.value
            ? t['com.affine.cmdk.affine.left-sidebar.collapse']()
            : t['com.affine.cmdk.affine.left-sidebar.expand'](),
        keyBinding: {
            binding: '$mod+/',
        },
        run() {
            track.$.navigationPanel.$.toggle({
                type: appSidebarService.sidebar.open$.value ? 'collapse' : 'expand',
            });
            appSidebarService.sidebar.toggleSidebar();
        },
    }));
    return () => {
        unsubs.forEach(unsub => unsub());
    };
}
//# sourceMappingURL=affine-layout.js.map