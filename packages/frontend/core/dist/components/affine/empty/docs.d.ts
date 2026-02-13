import type { UniversalEmptyProps } from './types';
export interface EmptyDocsProps extends UniversalEmptyProps {
    type?: 'all' | 'trash';
    /**
     * Used for "New doc", if provided, new doc will be created with this tag.
     */
    tagId?: string;
    allowCreate?: boolean;
}
export declare const EmptyDocs: ({ type, tagId, allowCreate, ...props }: EmptyDocsProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=docs.d.ts.map