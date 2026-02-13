import { FeatureType } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { AuthService } from '../services/auth';
import type { UserFeatureStore } from '../stores/user-feature';
export declare class UserFeature extends Entity {
    private readonly authService;
    private readonly store;
    features$: LiveData<FeatureType[] | null | undefined>;
    isAdmin$: LiveData<boolean | null | undefined>;
    isEarlyAccess$: LiveData<boolean | null | undefined>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(authService: AuthService, store: UserFeatureStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
}
//# sourceMappingURL=user-feature.d.ts.map