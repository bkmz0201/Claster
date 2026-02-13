import type { Workspace } from '@blocksuite/affine/store';
import { type ComponentType, type MouseEvent } from 'react';
interface AffinePageReferenceProps {
    pageId: string;
    params?: URLSearchParams;
    title?: string;
    className?: string;
    Icon?: ComponentType;
    onClick?: (e: MouseEvent) => void;
}
export declare function AffinePageReference({ pageId, params, title, className, Icon, onClick: userOnClick, }: AffinePageReferenceProps): import("react/jsx-runtime").JSX.Element;
export declare function AffineSharedPageReference({ pageId, docCollection, params, title, Icon, onClick: userOnClick, }: AffinePageReferenceProps & {
    docCollection: Workspace;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map