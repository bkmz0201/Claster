import { AffineReference } from '@blocksuite/affine/inlines/reference';
import type { DocMode } from '@blocksuite/affine/model';
import type { BlockComponent, EditorHost } from '@blocksuite/affine/std';
import type { Block } from '@blocksuite/affine/store';
import { Entity, LiveData } from '@toeverything/infra';
import type { TemplateResult } from 'lit';
import type { AIChatBlockModel } from '../../../blocksuite/ai/blocks';
import type { WorkbenchService } from '../../workbench';
import type { ImagePreviewData } from '../view/image-preview';
export type DocReferenceInfo = {
    docId: string;
    mode?: DocMode;
    blockIds?: string[];
    elementIds?: string[];
    databaseId?: string;
    databaseDocId?: string;
    databaseRowId?: string;
    /**
     * viewport in edgeless mode
     */
    xywh?: `[${number},${number},${number},${number}]`;
};
export type PeekViewElement = HTMLElement | BlockComponent | AffineReference | HTMLAnchorElement | Block;
export interface PeekViewTarget {
    element?: PeekViewElement;
    docRef?: DocReferenceInfo;
}
export interface DocPeekViewInfo {
    type: 'doc';
    docRef: DocReferenceInfo;
}
export type ImageListPeekViewInfo = {
    type: 'image-list';
    data: ImagePreviewData;
};
export type ImagePeekViewInfo = {
    type: 'image';
    docRef: DocReferenceInfo;
};
export type AttachmentPeekViewInfo = {
    type: 'attachment';
    docRef: DocReferenceInfo & {
        filetype?: string;
    };
};
export type AIChatBlockPeekViewInfo = {
    type: 'ai-chat-block';
    docRef: DocReferenceInfo;
    host: EditorHost;
    model: AIChatBlockModel;
};
export type CustomTemplatePeekViewInfo = {
    type: 'template';
    template: TemplateResult;
};
export type ActivePeekView = {
    target: PeekViewTarget;
    info: DocPeekViewInfo | ImagePeekViewInfo | AttachmentPeekViewInfo | CustomTemplatePeekViewInfo | AIChatBlockPeekViewInfo | ImageListPeekViewInfo;
};
export type PeekViewAnimation = 'fade' | 'fadeBottom' | 'zoom' | 'none';
export type PeekViewMode = 'full' | 'fit' | 'max';
export declare class PeekViewEntity extends Entity {
    private readonly workbenchService;
    private readonly _active$;
    private readonly _show$;
    constructor(workbenchService: WorkbenchService);
    active$: LiveData<ActivePeekView | null>;
    show$: LiveData<{
        animation: boolean;
        value: boolean;
    } | null>;
    open: (targetOrInfo: ActivePeekView["target"] | ActivePeekView["info"], template?: TemplateResult, abortSignal?: AbortSignal) => Promise<void>;
    close: (animation?: boolean) => void;
}
//# sourceMappingURL=peek-view.d.ts.map