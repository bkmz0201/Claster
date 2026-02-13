import { DebugLogger } from '@affine/debug';
import type { AttachmentFile, ErrorAttachmentFile, LocalAttachmentFile, PersistedAttachmentFile, UploadingAttachmentFile } from './types';
export declare function isPersistedAttachment(attachment: AttachmentFile): attachment is PersistedAttachmentFile;
export declare function isErrorAttachment(attachment: AttachmentFile): attachment is ErrorAttachmentFile;
export declare function isUploadingAttachment(attachment: AttachmentFile): attachment is UploadingAttachmentFile;
export declare function isLocalAttachment(attachment: AttachmentFile): attachment is LocalAttachmentFile;
export declare function getAttachmentId(attachment: AttachmentFile): string;
export declare const logger: DebugLogger;
//# sourceMappingURL=utils.d.ts.map