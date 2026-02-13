import type { FilterParams } from '@affine/core/modules/collection-rules';
import type React from 'react';
export declare const Condition: ({ filter, isDraft, onDraftCompleted, icon, name, methods, onChange, value: Value, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    icon?: React.ReactNode;
    name: React.ReactNode;
    methods?: [string, React.ReactNode][];
    onChange?: (filter: FilterParams) => void;
    value?: React.ElementType<{
        filter: FilterParams;
        isDraft?: boolean;
        onDraftCompleted?: () => void;
        onChange?: (filter: FilterParams) => void;
    }>;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=condition.d.ts.map