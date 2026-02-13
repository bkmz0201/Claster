import { type Workspace } from '@affine/core/modules/workspace';
import type { ReactElement } from 'react';
import * as _Y from 'yjs';
declare global {
    /**
     * @internal debug only
     */
    var currentWorkspace: Workspace | undefined;
    var exportWorkspaceSnapshot: (docs?: string[]) => Promise<void>;
    var importWorkspaceSnapshot: () => Promise<void>;
    var Y: typeof _Y;
    interface WindowEventMap {
        'affine:workspace:change': CustomEvent<{
            id: string;
        }>;
    }
}
export declare const Component: () => ReactElement;
//# sourceMappingURL=index.d.ts.map