import { ObjectPool, Service } from '@toeverything/infra';
import { WorkspaceProfile } from '../entities/profile';
import type { WorkspaceMetadata } from '../metadata';
export declare class WorkspaceProfileService extends Service {
    pool: ObjectPool<string, WorkspaceProfile>;
    getProfile: (metadata: WorkspaceMetadata) => WorkspaceProfile;
}
//# sourceMappingURL=profile.d.ts.map