import { DebugLogger } from '@affine/debug';
export function isPersistedAttachment(attachment) {
    return 'fileId' in attachment;
}
export function isErrorAttachment(attachment) {
    return 'errorMessage' in attachment;
}
export function isUploadingAttachment(attachment) {
    return 'localId' in attachment && attachment.status === 'uploading';
}
export function isLocalAttachment(attachment) {
    return 'localId' in attachment;
}
export function getAttachmentId(attachment) {
    if (isPersistedAttachment(attachment)) {
        return attachment.fileId;
    }
    return attachment.localId;
}
export const logger = new DebugLogger('WorkspaceEmbedding');
//# sourceMappingURL=utils.js.map