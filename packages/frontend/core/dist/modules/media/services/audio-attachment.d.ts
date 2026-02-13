import type { AttachmentBlockModel } from '@blocksuite/affine/model';
import { type AudioMediaKey, Service } from '@toeverything/infra';
import { AudioAttachmentBlock } from '../entities/audio-attachment-block';
export declare class AudioAttachmentService extends Service {
    private readonly pool;
    get(model: AttachmentBlockModel | AudioMediaKey): import("@toeverything/infra").RcRef<AudioAttachmentBlock> | null;
}
//# sourceMappingURL=audio-attachment.d.ts.map