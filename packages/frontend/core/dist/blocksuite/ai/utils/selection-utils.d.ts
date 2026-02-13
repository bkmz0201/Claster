import { type SurfaceBlockComponent } from '@blocksuite/affine/blocks/surface';
import { type EditorHost, TextSelection } from '@blocksuite/affine/std';
import { type GfxModel } from '@blocksuite/affine/std/gfx';
import { type BlockModel, type DraftModel } from '@blocksuite/affine/store';
export declare function selectedToCanvas(host: EditorHost): Promise<HTMLCanvasElement | undefined>;
export declare function allToCanvas(host: EditorHost): Promise<HTMLCanvasElement | undefined>;
export declare function elementsToCanvas(host: EditorHost, elements: GfxModel[]): Promise<HTMLCanvasElement | undefined>;
export declare function getSelectedModels(editorHost: EditorHost): BlockModel<object>[] | undefined;
export declare function traverse(model: DraftModel, drafts: DraftModel[]): void;
export declare function getTextContentFromBlockModels(editorHost: EditorHost, models: BlockModel[], type?: 'markdown' | 'plain-text'): Promise<string>;
export declare function getSelectedTextContent(editorHost: EditorHost, type?: 'markdown' | 'plain-text'): Promise<string>;
export declare function selectAboveBlocks(editorHost: EditorHost, num?: number): Promise<string>;
export declare function getSurfaceElementFromEditor(editor: EditorHost): SurfaceBlockComponent | null;
export declare const getSelections: (host: EditorHost, mode?: "flat" | "highest") => (import("@blocksuite/std").InitCommandCtx & {
    currentTextSelection?: TextSelection;
    currentBlockSelections?: import("@blocksuite/std").BlockSelection[];
    currentImageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    currentSurfaceSelection?: import("@blocksuite/std").SurfaceSelection;
} & {
    currentTextSelection?: TextSelection;
    currentBlockSelections?: import("@blocksuite/std").BlockSelection[];
    currentImageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    currentSurfaceSelection?: import("@blocksuite/std").SurfaceSelection;
    textSelection?: TextSelection;
    blockSelections?: import("@blocksuite/std").BlockSelection[];
    imageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    surfaceSelection?: import("@blocksuite/std").SurfaceSelection;
    filter?: (el: import("@blocksuite/std").BlockComponent) => boolean;
    types?: Array<"image" | "text" | "block" | "surface">;
    roles?: import("@blocksuite/store").RoleType[];
    mode?: "all" | "flat" | "highest";
} & {
    selectedBlocks: import("@blocksuite/std").BlockComponent[];
}) | (Partial<import("@blocksuite/std").InitCommandCtx & {
    currentTextSelection?: TextSelection;
    currentBlockSelections?: import("@blocksuite/std").BlockSelection[];
    currentImageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    currentSurfaceSelection?: import("@blocksuite/std").SurfaceSelection;
} & {
    currentTextSelection?: TextSelection;
    currentBlockSelections?: import("@blocksuite/std").BlockSelection[];
    currentImageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    currentSurfaceSelection?: import("@blocksuite/std").SurfaceSelection;
    textSelection?: TextSelection;
    blockSelections?: import("@blocksuite/std").BlockSelection[];
    imageSelections?: import("@blocksuite/affine-block-image").ImageSelection[];
    surfaceSelection?: import("@blocksuite/std").SurfaceSelection;
    filter?: (el: import("@blocksuite/std").BlockComponent) => boolean;
    types?: Array<"image" | "text" | "block" | "surface">;
    roles?: import("@blocksuite/store").RoleType[];
    mode?: "all" | "flat" | "highest";
} & {
    selectedBlocks: import("@blocksuite/std").BlockComponent[];
}> & import("@blocksuite/std").InitCommandCtx);
export declare const getSelectedImagesAsBlobs: (host: EditorHost) => Promise<File[]>;
export declare const getSelectedAttachments: (host: EditorHost) => Promise<{
    sourceId: string;
    name: string;
}[]>;
export declare const getSelectedNoteAnchor: (host: EditorHost, id: string) => Element | null;
export declare function getCopilotSelectedElems(host: EditorHost): GfxModel[];
export declare const imageCustomInput: (host: EditorHost) => Promise<{
    attachments: Blob[];
} | undefined>;
//# sourceMappingURL=selection-utils.d.ts.map