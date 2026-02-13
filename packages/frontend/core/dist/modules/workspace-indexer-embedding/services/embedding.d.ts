import { Service } from '@toeverything/infra';
import { AdditionalAttachments } from '../entities/additional-attachments';
import { EmbeddingEnabled } from '../entities/embedding-enabled';
import { EmbeddingProgress } from '../entities/embedding-progress';
import { IgnoredDocs } from '../entities/ignored-docs';
export declare class EmbeddingService extends Service {
    embeddingEnabled: EmbeddingEnabled;
    additionalAttachments: AdditionalAttachments;
    ignoredDocs: IgnoredDocs;
    embeddingProgress: EmbeddingProgress;
}
//# sourceMappingURL=embedding.d.ts.map