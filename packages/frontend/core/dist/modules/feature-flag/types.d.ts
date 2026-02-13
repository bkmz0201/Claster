import type { BlockSuiteFlags } from '@blocksuite/affine/shared/services';
type FeedbackType = 'discord' | 'email' | 'github';
export type FlagInfo = {
    displayName: string;
    description?: string;
    configurable?: boolean;
    defaultState?: boolean;
    /**
     * hide in the feature flag settings, but still can be controlled by the code
     */
    hide?: boolean;
    feedbackType?: FeedbackType;
    feedbackLink?: string;
} & ({
    category: 'affine';
} | {
    category: 'blocksuite';
    bsFlag: keyof BlockSuiteFlags;
});
export {};
//# sourceMappingURL=types.d.ts.map