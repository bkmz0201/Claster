import { jsx as _jsx } from "react/jsx-runtime";
import { track } from '@affine/track';
import { ContactWithUsIcon, NewIcon } from '@blocksuite/icons/rc';
import { registerAffineCommand } from './registry';
export function registerAffineHelpCommands({ t, urlService, workspaceDialogService, }) {
    const unsubs = [];
    unsubs.push(registerAffineCommand({
        id: 'affine:help-whats-new',
        category: 'affine:help',
        icon: _jsx(NewIcon, {}),
        label: t['com.affine.cmdk.affine.whats-new'](),
        run() {
            track.$.cmdk.help.openChangelog();
            urlService.openPopupWindow(BUILD_CONFIG.changelogUrl);
        },
    }));
    unsubs.push(registerAffineCommand({
        id: 'affine:help-contact-us',
        category: 'affine:help',
        icon: _jsx(ContactWithUsIcon, {}),
        label: t['com.affine.cmdk.affine.contact-us'](),
        run() {
            track.$.cmdk.help.contactUs();
            workspaceDialogService.open('setting', {
                activeTab: 'about',
            });
        },
    }));
    return () => {
        unsubs.forEach(unsub => unsub());
    };
}
//# sourceMappingURL=affine-help.js.map