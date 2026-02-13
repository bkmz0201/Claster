import type { Workspace } from '@affine/core/modules/workspace';
interface ConfirmEnableCloudOptions {
    /**
     * Fired when the workspace is successfully enabled
     */
    onSuccess?: () => void;
    /**
     * Fired when workspace is successfully enabled or user cancels the operation
     */
    onFinished?: () => void;
    openPageId?: string;
    serverId?: string;
}
export declare const useEnableCloud: () => (ws: Workspace, options?: ConfirmEnableCloudOptions) => void;
export {};
//# sourceMappingURL=use-enable-cloud.d.ts.map