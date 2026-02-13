import { type GetUserSettingsQuery, type UpdateUserSettingsInput } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export type UserSettings = NonNullable<GetUserSettingsQuery['currentUser']>['settings'];
export type { UpdateUserSettingsInput };
export declare class UserSettingsStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    getUserSettings(): Promise<UserSettings | undefined>;
    updateUserSettings(settings: UpdateUserSettingsInput): Promise<void>;
}
//# sourceMappingURL=user-settings.d.ts.map