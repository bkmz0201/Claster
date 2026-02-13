import { ImageBlockModel } from '@blocksuite/affine/model';
import type { BlockModel } from '@blocksuite/affine/store';
import type { GfxModel } from '@blocksuite/std/gfx';
export declare function fetchImageToFile(url: string, filename: string, imageProxy?: string): Promise<File | void>;
export declare function readBlobAsURL(blob: Blob | File): Promise<string>;
export declare function canvasToBlob(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob | null>;
export declare function randomSeed(min?: number, max?: number): number;
export declare function isImage(model: GfxModel | BlockModel): model is ImageBlockModel;
//# sourceMappingURL=image.d.ts.map