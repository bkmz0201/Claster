import { jsx as _jsx } from "react/jsx-runtime";
import { track } from '@affine/track';
import { ImportIcon, PlusIcon } from '@blocksuite/icons/rc';
import { registerAffineCommand } from './registry';
export function registerAffineCreationCommands({ pageHelper, t, globalDialogService, }) {
    const unsubs = [];
    unsubs.push(registerAffineCommand({
        id: 'affine:new-page',
        category: 'affine:creation',
        label: t['com.affine.cmdk.affine.new-page'](),
        icon: _jsx(PlusIcon, {}),
        keyBinding: BUILD_CONFIG.isElectron
            ? {
                binding: '$mod+N',
                skipRegister: true,
            }
            : undefined,
        run() {
            track.$.cmdk.creation.createDoc({ mode: 'page' });
            pageHelper.createPage('page');
        },
    }));
    unsubs.push(registerAffineCommand({
        id: 'affine:new-edgeless-page',
        category: 'affine:creation',
        icon: _jsx(PlusIcon, {}),
        label: t['com.affine.cmdk.affine.new-edgeless-page'](),
        run() {
            track.$.cmdk.creation.createDoc({
                mode: 'edgeless',
            });
            pageHelper.createEdgeless();
        },
    }));
    unsubs.push(registerAffineCommand({
        id: 'affine:new-workspace',
        category: 'affine:creation',
        icon: _jsx(PlusIcon, {}),
        label: t['com.affine.cmdk.affine.new-workspace'](),
        run() {
            track.$.cmdk.workspace.createWorkspace();
            globalDialogService.open('create-workspace', {});
        },
    }));
    unsubs.push(registerAffineCommand({
        id: 'affine:import-workspace',
        category: 'affine:creation',
        icon: _jsx(ImportIcon, {}),
        label: t['com.affine.cmdk.affine.import-workspace'](),
        preconditionStrategy: () => {
            return BUILD_CONFIG.isElectron;
        },
        run() {
            track.$.cmdk.workspace.createWorkspace({
                control: 'import',
            });
            globalDialogService.open('import-workspace', undefined);
        },
    }));
    return () => {
        unsubs.forEach(unsub => unsub());
    };
}
//# sourceMappingURL=affine-creation.js.map