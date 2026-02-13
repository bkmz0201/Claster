import type { AIItemGroupConfig, AISubItemConfig } from '../components/ai-item/types';
export declare const translateSubItem: AISubItemConfig[];
export declare const toneSubItem: AISubItemConfig[];
export declare function createImageFilterSubItem(trackerOptions?: BlockSuitePresets.TrackerOptions): {
    type: "Clay style" | "Sketch style" | "Anime style" | "Pixel style";
    testId: string;
    handler: (host: import("@blocksuite/std").EditorHost) => void;
}[];
export declare function createImageProcessingSubItem(trackerOptions?: BlockSuitePresets.TrackerOptions): {
    type: "Convert to sticker" | "Remove background" | "Clearer";
    testId: string;
    handler: (host: import("@blocksuite/std").EditorHost) => void;
}[];
export declare const pageAIGroups: AIItemGroupConfig[];
export declare function buildAIImageItemGroups(): AIItemGroupConfig[];
export declare function buildAICodeItemGroups(): AIItemGroupConfig[];
//# sourceMappingURL=config.d.ts.map