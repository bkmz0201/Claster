import { Service } from '@toeverything/infra';
import { AdditionalAttachments } from '../entities/additional-attachments';
import { EmbeddingEnabled } from '../entities/embedding-enabled';
import { EmbeddingProgress } from '../entities/embedding-progress';
import { IgnoredDocs } from '../entities/ignored-docs';
export class EmbeddingService extends Service {
    constructor() {
        super(...arguments);
        this.embeddingEnabled = this.framework.createEntity(EmbeddingEnabled);
        this.additionalAttachments = this.framework.createEntity(AdditionalAttachments);
        this.ignoredDocs = this.framework.createEntity(IgnoredDocs);
        this.embeddingProgress = this.framework.createEntity(EmbeddingProgress);
    }
}
//# sourceMappingURL=embedding.js.map