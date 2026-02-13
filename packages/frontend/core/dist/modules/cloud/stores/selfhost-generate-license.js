import { generateLicenseKeyMutation } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class SelfhostGenerateLicenseStore extends Store {
    constructor(gqlService) {
        super();
        this.gqlService = gqlService;
    }
    async generateKey(sessionId, signal) {
        const data = await this.gqlService.gql({
            query: generateLicenseKeyMutation,
            variables: {
                sessionId: sessionId,
            },
            context: {
                signal,
            },
        });
        return data.generateLicenseKey;
    }
}
//# sourceMappingURL=selfhost-generate-license.js.map