import type { ArticleId, ArticleOption, OnboardingStatus } from './types';
interface PaperStepsProps {
    show?: boolean;
    article: ArticleOption;
    status: OnboardingStatus;
    onFoldChange?: (id: ArticleId, v: boolean) => void;
    onFoldChanged?: (id: ArticleId, v: boolean) => void;
    onOpenApp?: () => void;
}
export declare const PaperSteps: ({ show, article, status, onFoldChange, onFoldChanged, onOpenApp, }: PaperStepsProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=paper-steps.d.ts.map