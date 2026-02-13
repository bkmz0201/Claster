import type { Workspace } from '@affine/core/modules/workspace';
import type { Store } from '@blocksuite/affine/store';
interface PageHeaderProps {
    page: Store;
    workspace: Workspace;
}
export declare function JournalPageHeader({ page, workspace }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function NormalPageHeader({ page, workspace }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function DetailPageHeader(props: PageHeaderProps & {
    onDragging?: (dragging: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=detail-page-header.d.ts.map