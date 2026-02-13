import { type UserFriendlyError } from '@affine/error';
import { LiveData, Service } from '@toeverything/infra';
import type { SelfhostGenerateLicenseStore } from '../stores/selfhost-generate-license';
export declare class SelfhostGenerateLicenseService extends Service {
    private readonly store;
    constructor(store: SelfhostGenerateLicenseStore);
    licenseKey$: LiveData<string | null>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<UserFriendlyError | null>;
    generateLicenseKey: import("@toeverything/infra").Effect<string>;
}
//# sourceMappingURL=selfhost-generate-license.d.ts.map