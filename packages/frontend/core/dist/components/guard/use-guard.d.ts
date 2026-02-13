import { type DocPermissionActions, type WorkspacePermissionActions } from '@affine/core/modules/permissions';
export declare const useGuard: <T extends WorkspacePermissionActions | DocPermissionActions>(action: T, ...args: T extends DocPermissionActions ? [string] : []) => boolean | undefined;
//# sourceMappingURL=use-guard.d.ts.map