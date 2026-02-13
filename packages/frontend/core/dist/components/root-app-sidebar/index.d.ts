import type { Workspace } from '@affine/core/modules/workspace';
import type { Store } from '@blocksuite/affine/store';
import type { ReactElement } from 'react';
export type RootAppSidebarProps = {
    isPublicWorkspace: boolean;
    onOpenQuickSearchModal: () => void;
    onOpenSettingModal: () => void;
    currentWorkspace: Workspace;
    openPage: (pageId: string) => void;
    createPage: () => Store;
    paths: {
        all: (workspaceId: string) => string;
        trash: (workspaceId: string) => string;
        shared: (workspaceId: string) => string;
    };
};
/**
 * This is for the whole affine app sidebar.
 * This component wraps the app sidebar in `@affine/component` with logic and data.
 *
 */
export declare const RootAppSidebar: import("react").MemoExoticComponent<() => ReactElement>;
//# sourceMappingURL=index.d.ts.map