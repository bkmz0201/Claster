import type { FrameworkProvider } from '@toeverything/infra';
import type { TemplateResult } from 'lit';
import type { AIItemConfig } from './components/ai-item/types';
import { AIContext } from './utils/context';
import type { AffineAIPanelWidget } from './widgets/ai-panel/ai-panel';
import type { AffineAIPanelWidgetConfig } from './widgets/ai-panel/type';
export declare function buildErrorResponseConfig(panel: AffineAIPanelWidget): {
    name: string;
    items: {
        name: string;
        icon: TemplateResult<1>;
        testId: string;
        showWhen: () => boolean;
        handler: () => void;
    }[];
}[];
export declare function buildFinishConfig<T extends keyof BlockSuitePresets.AIActions>(panel: AffineAIPanelWidget, id: T, ctx: AIContext): {
    responses: {
        name: string;
        testId: string;
        items: AIItemConfig[];
    }[];
    actions: never[];
};
export declare function buildErrorConfig(panel: AffineAIPanelWidget): {
    upgrade: () => void;
    login: () => void;
    cancel: () => void;
    responses: {
        name: string;
        items: {
            name: string;
            icon: TemplateResult<1>;
            testId: string;
            showWhen: () => boolean;
            handler: () => void;
        }[];
    }[];
};
export declare function buildGeneratingConfig(generatingIcon?: TemplateResult<1>): {
    generatingIcon: TemplateResult<1>;
};
export declare function buildCopyConfig(panel: AffineAIPanelWidget): {
    allowed: boolean;
    onCopy: () => Promise<boolean>;
};
export declare function buildAIPanelConfig(panel: AffineAIPanelWidget, framework: FrameworkProvider): AffineAIPanelWidgetConfig;
//# sourceMappingURL=ai-panel.d.ts.map