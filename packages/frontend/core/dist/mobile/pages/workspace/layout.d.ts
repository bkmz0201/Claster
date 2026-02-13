import type { Workspace, WorkspaceMetadata } from '@affine/core/modules/workspace';
import { type PropsWithChildren } from 'react';
declare global {
    /**
     * @internal debug only
     */
    var currentWorkspace: Workspace | undefined;
    var exportWorkspaceSnapshot: (docs?: string[]) => Promise<void>;
    var importWorkspaceSnapshot: () => Promise<void>;
    interface WindowEventMap {
        'affine:workspace:change': CustomEvent<{
            id: string;
        }>;
    }
}
export declare const WorkspaceLayout: ({ meta, children, }: PropsWithChildren<{
    meta: WorkspaceMetadata;
}>) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=layout.d.ts.map