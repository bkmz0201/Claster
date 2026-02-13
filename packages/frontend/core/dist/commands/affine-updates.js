import { jsx as _jsx } from "react/jsx-runtime";
import { notify } from '@affine/component';
import { updateReadyAtom } from '@affine/core/components/hooks/use-app-updater';
import { track } from '@affine/track';
import { ResetIcon } from '@blocksuite/icons/rc';
import { registerAffineCommand } from './registry';
export function registerAffineUpdatesCommands({ t, store, quitAndInstall, }) {
    const unsubs = [];
    unsubs.push(registerAffineCommand({
        id: 'affine:restart-to-upgrade',
        category: 'affine:updates',
        icon: _jsx(ResetIcon, {}),
        label: t['com.affine.cmdk.affine.restart-to-upgrade'](),
        preconditionStrategy: () => !!store.get(updateReadyAtom),
        run() {
            track.$.cmdk.updates.quitAndInstall();
            quitAndInstall().catch(err => {
                notify.error({
                    title: 'Failed to restart to upgrade',
                    message: 'Please restart the app manually to upgrade.',
                });
                console.error(err);
            });
        },
    }));
    return () => {
        unsubs.forEach(unsub => unsub());
    };
}
//# sourceMappingURL=affine-updates.js.map