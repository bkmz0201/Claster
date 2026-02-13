import type { AttachmentBlockModel } from '@blocksuite/affine/model';
export declare function getAttachmentType(model: AttachmentBlockModel): "image" | "unknown" | "pdf" | "video" | "audio";
export declare function downloadBlobToBuffer(model: AttachmentBlockModel): Promise<ArrayBuffer>;
//# sourceMappingURL=utils.d.ts.map