import { LiveData, Service } from '@toeverything/infra';
import type { UpdateUserSettingsInput, UserSettings, UserSettingsStore } from '../stores/user-settings';
export type { UserSettings };
export declare class UserSettingsService extends Service {
    private readonly store;
    constructor(store: UserSettingsStore);
    userSettings$: LiveData<{
        __typename?: "UserSettingsType";
        receiveInvitationEmail: boolean;
        receiveMentionEmail: boolean;
        receiveCommentEmail: boolean;
    } | undefined>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    updateUserSettings(settings: UpdateUserSettingsInput): Promise<void>;
}
//# sourceMappingURL=user-settings.d.ts.map