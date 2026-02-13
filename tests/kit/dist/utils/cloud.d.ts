import type { BrowserContext, Cookie, Page } from '@playwright/test';
import { type PrismaClient } from '@prisma/client';
import type { Assertions } from 'ava';
export declare function getCurrentMailMessageCount(): Promise<any>;
export declare function getLatestMailMessage(): Promise<any>;
export declare function getTokenFromLatestMailMessage<A extends Assertions>(test?: A): Promise<string | null>;
export declare function getLoginCookie(context: BrowserContext): Promise<Cookie | undefined>;
export declare const runPrisma: <T>(cb: (prisma: PrismaClient) => Promise<T>) => Promise<T>;
export declare function addUserToWorkspace(workspaceId: string, userId: string, permission: number): Promise<void>;
export declare function createRandomUser(): Promise<{
    name: string;
    email: string;
    password: string;
    id: string;
}>;
export declare function cleanupWorkspace(workspaceId: string): Promise<void>;
export declare function switchDefaultChatModel(model: string): Promise<void>;
export declare function createRandomAIUser(): Promise<{
    name: string;
    email: string;
    password: string;
    id: string;
}>;
export declare function deleteUser(email: string): Promise<void>;
export declare function loginUser(page: Page, user: {
    email: string;
    password: string;
}, config?: {
    isElectron?: boolean;
    beforeLogin?: () => Promise<void>;
    afterLogin?: () => Promise<void>;
}): Promise<void>;
export declare function loginUserDirectly(page: Page, user: {
    email: string;
    password: string;
}, config?: {
    isElectron?: boolean;
    beforeLogin?: () => Promise<void>;
    afterLogin?: () => Promise<void>;
}): Promise<void>;
export declare function enableCloudWorkspace(page: Page): Promise<void>;
export declare function enableCloudWorkspaceFromShareButton(page: Page): Promise<void>;
export declare function enableShare(page: Page): Promise<void>;
//# sourceMappingURL=cloud.d.ts.map