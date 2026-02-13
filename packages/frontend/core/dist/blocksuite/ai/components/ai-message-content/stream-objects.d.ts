import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import type { PeekViewService } from '@affine/core/modules/peek-view';
import type { ColorScheme } from '@blocksuite/affine/model';
import { type BlockStdScope, type EditorHost, ShadowlessElement } from '@blocksuite/affine/std';
import type { ExtensionType } from '@blocksuite/affine/store';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import type { Signal } from '@preact/signals-core';
import type { AffineAIPanelState } from '../../widgets/ai-panel/type';
import type { DocDisplayConfig } from '../ai-chat-chips';
import type { StreamObject } from '../ai-chat-messages';
declare const ChatContentStreamObjects_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatContentStreamObjects extends ChatContentStreamObjects_base {
    static styles: import("lit").CSSResult;
    accessor answer: StreamObject[];
    accessor host: EditorHost | null | undefined;
    accessor std: BlockStdScope | null | undefined;
    accessor state: AffineAIPanelState;
    accessor width: Signal<number | undefined> | undefined;
    accessor extensions: ExtensionType[];
    accessor affineFeatureFlagService: FeatureFlagService;
    accessor theme: Signal<ColorScheme>;
    accessor independentMode: boolean | undefined;
    accessor notificationService: NotificationService;
    accessor docDisplayService: DocDisplayConfig;
    accessor peekViewService: PeekViewService;
    accessor onOpenDoc: (docId: string, sessionId?: string) => void;
    private renderToolCall;
    private renderToolResult;
    private renderRichText;
    protected render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=stream-objects.d.ts.map