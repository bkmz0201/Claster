import { PreconditionStrategy, registerAffineCommand, } from '@affine/core/commands';
import { useSharingUrl } from '@affine/core/components/hooks/affine/use-share-url';
import { useIsActiveView } from '@affine/core/modules/workbench';
import { track } from '@affine/track';
import { useEffect } from 'react';
export function useRegisterCopyLinkCommands({ workspaceMeta, docId, }) {
    const isActiveView = useIsActiveView();
    const workspaceId = workspaceMeta.id;
    const isCloud = workspaceMeta.flavour !== 'local';
    const { onClickCopyLink } = useSharingUrl({
        workspaceId,
        pageId: docId,
    });
    useEffect(() => {
        if (!isActiveView) {
            return;
        }
        const unsubs = [];
        unsubs.push(registerAffineCommand({
            id: `affine:share-private-link:${docId}`,
            category: 'affine:general',
            preconditionStrategy: PreconditionStrategy.Never,
            keyBinding: {
                binding: '$mod+Shift+c',
            },
            label: '',
            icon: null,
            run() {
                track.$.cmdk.general.copyShareLink();
                isActiveView && isCloud && onClickCopyLink();
            },
        }));
        return () => {
            unsubs.forEach(unsub => unsub());
        };
    }, [docId, isActiveView, isCloud, onClickCopyLink]);
}
//# sourceMappingURL=use-register-copy-link-commands.js.map