import type { WorkspaceMetadata } from '@affine/core/modules/workspace';
import type { Store } from '@blocksuite/affine/store';
import { type PropsWithChildren } from 'react';
export interface ShareMenuProps extends PropsWithChildren {
    workspaceMetadata: WorkspaceMetadata;
    currentPage: Store;
    onEnableAffineCloud: () => void;
    onOpenShareModal?: (open: boolean) => void;
    openPaywallModal?: () => void;
    hittingPaywall?: boolean;
}
export declare enum ShareMenuTab {
    Share = "share",
    Export = "export",
    Invite = "invite",
    Members = "members"
}
export declare const ShareMenuContent: (props: ShareMenuProps) => import("react/jsx-runtime").JSX.Element;
export declare const ShareMenu: (props: ShareMenuProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=share-menu.d.ts.map