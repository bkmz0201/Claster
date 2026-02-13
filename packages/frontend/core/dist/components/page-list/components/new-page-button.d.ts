import type { MouseEvent, PropsWithChildren } from 'react';
type NewPageButtonProps = {
    createNewDoc: (e?: MouseEvent) => void;
    createNewPage: (e?: MouseEvent) => void;
    createNewEdgeless: (e?: MouseEvent) => void;
    importFile?: () => void;
    size?: 'small' | 'default';
};
export declare const CreateNewPagePopup: ({ createNewPage, createNewEdgeless, importFile, }: NewPageButtonProps) => import("react/jsx-runtime").JSX.Element;
export declare const NewPageButton: ({ createNewDoc, createNewPage, createNewEdgeless, importFile, size, children, }: PropsWithChildren<NewPageButtonProps>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=new-page-button.d.ts.map