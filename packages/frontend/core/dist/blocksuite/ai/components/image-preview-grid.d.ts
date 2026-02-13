import { LitElement } from 'lit';
export declare class ImagePreviewGrid extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly _urlMap;
    private readonly _urlRefCount;
    private _getFileKey;
    private _disposeUrls;
    /**
     * get the object url of the file
     * @param file - the file to get the url
     * @returns the object url
     */
    private _getObjectUrl;
    /**
     * decrement the reference count of the url
     * when the reference count is 0, revoke the url
     * @param url - the url to release
     */
    private readonly _releaseObjectUrl;
    private readonly _handleDelete;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor images: File[];
    accessor onImageRemove: ((index: number) => void) | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-preview-grid': ImagePreviewGrid;
    }
}
//# sourceMappingURL=image-preview-grid.d.ts.map