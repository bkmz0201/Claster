import { getUserSettingsQuery, updateUserSettingsMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class UserSettingsStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async getUserSettings() {
        const result = await this.gqlService.gql({
            query: getUserSettingsQuery,
        });
        return result.currentUser?.settings;
    }
    async updateUserSettings(settings) {
        await this.gqlService.gql({
            query: updateUserSettingsMutation,
            variables: {
                input: settings,
            },
        });
    }
}
//# sourceMappingURL=user-settings.js.map