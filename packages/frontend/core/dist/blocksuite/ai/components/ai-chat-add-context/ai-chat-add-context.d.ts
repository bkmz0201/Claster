import { ShadowlessElement } from '@blocksuite/affine/std';
import type { ChatChip, DocDisplayConfig } from '../ai-chat-chips';
import type { SearchMenuConfig } from './type';
declare const AIChatAddContext_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIChatAddContext extends AIChatAddContext_base {
    static styles: import("lit").CSSResult;
    accessor docId: string | undefined;
    accessor independentMode: boolean | undefined;
    accessor addChip: (chip: ChatChip) => Promise<void>;
    accessor addImages: (images: File[]) => void;
    accessor docDisplayConfig: DocDisplayConfig;
    accessor searchMenuConfig: SearchMenuConfig;
    accessor portalContainer: HTMLElement | null;
    accessor addButton: HTMLDivElement;
    private abortController;
    render(): import("lit-html").TemplateResult<1>;
    private readonly toggleAddDocMenu;
}
export {};
//# sourceMappingURL=ai-chat-add-context.d.ts.map