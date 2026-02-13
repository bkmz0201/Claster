import { type DocPermissionActions, type WorkspacePermissionActions } from '@affine/core/modules/permissions';
import type React from 'react';
export declare const Guard: <T extends WorkspacePermissionActions | DocPermissionActions>(props: {
    permission: T;
    children: (can: boolean | undefined) => React.ReactNode;
} & (T extends DocPermissionActions ? {
    docId: string;
} : {})) => React.ReactNode;
//# sourceMappingURL=guard.d.ts.map