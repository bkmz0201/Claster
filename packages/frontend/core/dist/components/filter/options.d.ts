import { type MenuRef } from '@affine/component';
type FilterOptionsGroupChildren = React.ReactNode | ((args: {
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    menuRef: React.Ref<MenuRef>;
}) => React.ReactNode);
export declare const FilterOptionsGroup: ({ isDraft, onDraftCompleted, items, initialStep, }: {
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    items?: FilterOptionsGroupChildren[];
    initialStep?: number;
}) => import("react").ReactNode[] | undefined;
export {};
//# sourceMappingURL=options.d.ts.map