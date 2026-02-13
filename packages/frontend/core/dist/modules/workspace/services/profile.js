import { ObjectPool, Service } from '@toeverything/infra';
import { WorkspaceProfile } from '../entities/profile';
export class WorkspaceProfileService extends Service {
    constructor() {
        super(...arguments);
        this.pool = new ObjectPool();
        this.getProfile = (metadata) => {
            const exists = this.pool.get(metadata.id);
            if (exists) {
                return exists.obj;
            }
            const profile = this.framework.createEntity(WorkspaceProfile, {
                metadata,
            });
            return this.pool.put(metadata.id, profile).obj;
        };
    }
}
//# sourceMappingURL=profile.js.map