import type { DocMode } from '@blocksuite/affine/model';
import { type HTMLAttributes, type ReactElement, type SVGAttributes } from 'react';
import type { AttachmentPeekViewInfo, DocReferenceInfo } from '../entities/peek-view';
type ControlButtonProps = {
    nameKey: string;
    icon: ReactElement<SVGAttributes<SVGElement>>;
    name: string;
    onClick: () => void;
    enabled: boolean;
};
export declare const ControlButton: ({ icon, nameKey, name, onClick, }: ControlButtonProps) => import("react/jsx-runtime").JSX.Element;
type DocPeekViewControlsProps = HTMLAttributes<HTMLDivElement> & {
    mode?: DocMode;
    docRef: DocReferenceInfo;
};
export declare const DefaultPeekViewControls: ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export declare const DocPeekViewControls: ({ docRef, className, ...rest }: DocPeekViewControlsProps) => import("react/jsx-runtime").JSX.Element;
type AttachmentPeekViewControls = HTMLAttributes<HTMLDivElement> & {
    mode?: DocMode;
    docRef: AttachmentPeekViewInfo['docRef'];
};
export declare const AttachmentPeekViewControls: ({ docRef, className, ...rest }: AttachmentPeekViewControls) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=peek-view-controls.d.ts.map