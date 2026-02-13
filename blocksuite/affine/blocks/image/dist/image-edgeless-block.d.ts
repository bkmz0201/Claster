import type { BlockCaptionEditor } from '@blocksuite/affine-components/caption';
import { ResourceController } from '@blocksuite/affine-components/resource';
import { type ImageBlockModel } from '@blocksuite/affine-model';
import { GfxBlockComponent } from '@blocksuite/std';
export declare class ImageEdgelessBlockComponent extends GfxBlockComponent<ImageBlockModel> {
    static styles: import("lit").CSSResult;
    resourceController: ResourceController;
    get blobUrl(): string | null;
    convertToCardView: () => void;
    copy: () => void;
    download: () => void;
    refreshData: () => void;
    private _handleError;
    connectedCallback(): void;
    renderGfxBlock(): import("lit-html").TemplateResult<1>;
    accessor captionEditor: BlockCaptionEditor | null;
    accessor resizableImg: HTMLDivElement;
}
export declare const ImageEdgelessBlockInteraction: import("@blocksuite/store").ExtensionType;
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-image': ImageEdgelessBlockComponent;
    }
}
//# sourceMappingURL=image-edgeless-block.d.ts.map