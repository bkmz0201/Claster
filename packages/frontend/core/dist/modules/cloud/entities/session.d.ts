import { Entity, LiveData } from '@toeverything/infra';
import type { AccountProfile, AuthStore } from '../stores/auth';
export interface AuthSessionInfo {
    account: AuthAccountInfo;
}
export interface AuthAccountInfo {
    id: string;
    label: string;
    email?: string;
    info?: AccountProfile | null;
    avatar?: string | null;
}
export interface AuthSessionUnauthenticated {
    status: 'unauthenticated';
}
export interface AuthSessionAuthenticated {
    status: 'authenticated';
    session: AuthSessionInfo;
}
export type AuthSessionStatus = (AuthSessionUnauthenticated | AuthSessionAuthenticated)['status'];
export declare class AuthSession extends Entity {
    private readonly store;
    session$: LiveData<AuthSessionUnauthenticated | AuthSessionAuthenticated>;
    status$: LiveData<"unauthenticated" | "authenticated">;
    account$: LiveData<AuthAccountInfo | null>;
    waitForAuthenticated: (signal?: AbortSignal) => Promise<AuthSessionAuthenticated>;
    isRevalidating$: LiveData<boolean>;
    constructor(store: AuthStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    private getSession;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
    removeAvatar(): Promise<void>;
    uploadAvatar(file: File): Promise<void>;
    updateLabel(label: string): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=session.d.ts.map