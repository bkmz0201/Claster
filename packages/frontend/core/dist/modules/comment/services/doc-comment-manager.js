import { ObjectPool, Service } from '@toeverything/infra';
import { DocCommentEntity } from '../entities/doc-comment';
export class DocCommentManagerService extends Service {
    constructor() {
        super();
        this.std = null;
        this.pool = new ObjectPool({
            onDelete: entity => {
                entity.dispose();
            },
        });
    }
    get(docId) {
        let commentRef = this.pool.get(docId);
        if (!commentRef) {
            const props = new Proxy({
                docId,
                std: this.std,
            }, {
                get: (target, prop) => {
                    if (prop === 'std') {
                        return this.std;
                    }
                    return target[prop];
                },
            });
            const comment = this.framework.createEntity(DocCommentEntity, props);
            commentRef = this.pool.put(docId, comment);
            // todo: add LRU cache for the pool?
        }
        return commentRef;
    }
}
//# sourceMappingURL=doc-comment-manager.js.map