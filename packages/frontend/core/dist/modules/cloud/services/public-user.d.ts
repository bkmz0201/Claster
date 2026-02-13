import { LiveData, Service } from '@toeverything/infra';
import type { PublicUserStore } from '../stores/public-user';
type RemovedUserInfo = {
    id: string;
    removed: true;
};
type ExistedUserInfo = {
    id: string;
    name?: string | null;
    avatar?: string | null;
    avatarUrl?: string | null;
    removed?: false;
};
export type PublicUserInfo = RemovedUserInfo | ExistedUserInfo;
export declare class PublicUserService extends Service {
    private readonly store;
    constructor(store: PublicUserStore);
    private readonly publicUsers$;
    private readonly isLoadings$;
    private readonly errors$;
    publicUser$(id: string): LiveData<PublicUserInfo | null>;
    isLoading$(id: string): LiveData<boolean>;
    error$(id: string): LiveData<any>;
    private setPublicUser;
    private setLoading;
    private setError;
    revalidate: import("@toeverything/infra").Effect<string>;
}
export {};
//# sourceMappingURL=public-user.d.ts.map