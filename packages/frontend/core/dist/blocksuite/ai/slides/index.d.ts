import type { EditorHost } from '@blocksuite/affine/std';
import { type TemplateImage } from './template';
export declare const PPTBuilder: (host: EditorHost) => {
    process: (text: string) => Promise<{
        contents: unknown[];
        images: TemplateImage[][];
    } | undefined>;
    done: (text: string) => Promise<void>;
};
//# sourceMappingURL=index.d.ts.map