import { type Page } from '@playwright/test';
export declare class EditorUtils {
    static focusToEditor(page: Page): Promise<void>;
    static getEditorContent(page: Page, trim?: boolean): Promise<string>;
    static getNoteContent(page: Page): Promise<string>;
    static switchToEdgelessMode(page: Page): Promise<void>;
    static switchToPageMode(page: Page): Promise<void>;
    static isPageMode(page: Page): Promise<import("playwright-core").ElementHandle<HTMLElement | SVGElement>>;
    static isEdgelessMode(page: Page): Promise<import("playwright-core").ElementHandle<HTMLElement | SVGElement>>;
    static getDocTitle(page: Page): Promise<string>;
    static waitForAiAnswer(page: Page): Promise<import("playwright-core").Locator>;
    private static createAction;
    static createEdgelessText(page: Page, text: string): Promise<void>;
    static createEdgelessNote(page: Page, text: string): Promise<void>;
    static createMindmap(page: Page): Promise<string>;
    static createShape(page: Page, text: string): Promise<string>;
    static getMindMapNode(page: Page, mindmapId: string, path: number[]): Promise<{
        path: number[];
        id: string;
        text: string;
        rect: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
    }>;
    static clearAllCollections(page: Page): Promise<void>;
    static clearAllTags(page: Page): Promise<void>;
    static createDoc(page: Page, title: string, docContent: string): Promise<void>;
    static createCollectionAndDoc(page: Page, collectionName: string, docContent: string): Promise<void>;
    static createTagAndDoc(page: Page, tagName: string, docContent: string): Promise<void>;
    static selectElementInEdgeless(page: Page, elements: string[]): Promise<void>;
    static removeAll(page: Page): Promise<void>;
    static askAIWithEdgeless(page: Page, createBlock: () => Promise<void>, afterSelected?: () => Promise<void>): Promise<{
        readonly aiImageFilter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstorm: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstormMindMap: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly changeTone: (tone: "professional" | "informal" | "friendly" | "critical" | "humorous") => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly checkCodeError: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly continueWithAi: () => Promise<void>;
        readonly continueWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly createHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly explainSelection: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly findActions: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixSpelling: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateCaption: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateImage: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateOutline: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generatePresentation: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly imageProcessing: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItLonger: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItReal: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItShorter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly summarize: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly translate: (language: string) => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeArticle: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeBlogPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writePoem: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeTwitterPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly regenerateMindMap: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly expandMindMapNode: () => Promise<void>;
    }>;
    static askAIWithCode(page: Page, code: string, language: string): Promise<{
        explainCode: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        checkCodeError: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
    }>;
    static askAIWithImage(page: Page, image: {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }): Promise<{
        explainImage: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        generateImage: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        generateCaption: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        imageProcessing: (type: string) => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        imageFilter: (style: string) => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
    }>;
    static showAIMenu(page: Page): Promise<{
        readonly aiImageFilter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstorm: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstormMindMap: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly changeTone: (tone: "professional" | "informal" | "friendly" | "critical" | "humorous") => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly checkCodeError: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly continueWithAi: () => Promise<void>;
        readonly continueWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly createHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly explainSelection: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly findActions: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixSpelling: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateCaption: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateImage: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateOutline: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generatePresentation: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly imageProcessing: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItLonger: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItReal: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItShorter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly summarize: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly translate: (language: string) => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeArticle: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeBlogPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writePoem: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeTwitterPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
    }>;
    static askAIWithText(page: Page, text: string): Promise<{
        readonly aiImageFilter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstorm: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly brainstormMindMap: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly changeTone: (tone: "professional" | "informal" | "friendly" | "critical" | "humorous") => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly checkCodeError: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly continueWithAi: () => Promise<void>;
        readonly continueWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly createHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly explainSelection: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly findActions: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly fixSpelling: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateCaption: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateHeadings: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateImage: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generateOutline: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly generatePresentation: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly imageProcessing: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveGrammar: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly improveWriting: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItLonger: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItReal: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly makeItShorter: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly summarize: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly translate: (language: string) => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeArticle: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeBlogPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writePoem: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
        readonly writeTwitterPost: () => Promise<{
            answer: import("playwright-core").Locator;
            responses: Set<string>;
        }>;
    }>;
    static whatAreYourThoughts(page: Page, text: string): Promise<import("playwright-core").Locator>;
}
//# sourceMappingURL=editor-utils.d.ts.map