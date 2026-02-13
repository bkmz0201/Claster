import type { AIItemGroupConfig } from '../../components/ai-item/types';
export declare const imageFilterSubItem: {
    type: "Clay style" | "Sketch style" | "Anime style" | "Pixel style";
    testId: string;
    handler: (host: import("@blocksuite/std").EditorHost) => void;
}[];
export declare const imageProcessingSubItem: {
    type: "Convert to sticker" | "Remove background" | "Clearer";
    testId: string;
    handler: (host: import("@blocksuite/std").EditorHost) => void;
}[];
export declare const edgelessAIGroups: AIItemGroupConfig[];
//# sourceMappingURL=actions-config.d.ts.map