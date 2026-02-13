import type { Page } from '@playwright/test';
interface CreateWorkspaceParams {
    name: string;
}
export declare function openWorkspaceListModal(page: Page): Promise<void>;
export declare function createLocalWorkspace(params: CreateWorkspaceParams, page: Page, skipOpenWorkspaceListModal?: boolean, serverId?: string): Promise<void>;
export {};
//# sourceMappingURL=workspace.d.ts.map