import type { ArticleOption } from '../types';
interface UnfoldingProps {
    fold: boolean;
    article: ArticleOption;
    initialFold?: boolean;
    onChange?: (e: boolean) => void;
    onChanged?: (e: boolean) => void;
}
export declare const Unfolding: ({ fold, article, onChange, onChanged, }: UnfoldingProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=unfolding.d.ts.map