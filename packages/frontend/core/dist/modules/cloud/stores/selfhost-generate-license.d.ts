import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class SelfhostGenerateLicenseStore extends Store {
    private readonly gqlService;
    constructor(gqlService: GraphQLService);
    generateKey(sessionId: string, signal?: AbortSignal): Promise<string>;
}
//# sourceMappingURL=selfhost-generate-license.d.ts.map