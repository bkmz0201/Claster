import type { AttachmentBlockModel } from '@blocksuite/affine/model';
import type { AttachmentViewerBaseProps } from './types';
export declare function getAttachmentBlob(model: AttachmentBlockModel): Promise<Blob | null>;
export declare function download(model: AttachmentBlockModel): Promise<void>;
export declare function buildAttachmentProps(model: AttachmentBlockModel): AttachmentViewerBaseProps;
export { getAttachmentType } from '@affine/core/modules/media/utils';
//# sourceMappingURL=utils.d.ts.map