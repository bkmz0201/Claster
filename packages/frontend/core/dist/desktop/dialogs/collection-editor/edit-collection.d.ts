import type { CollectionInfo } from '@affine/core/modules/collection';
export type EditCollectionMode = 'page' | 'rule';
export interface EditCollectionProps {
    onConfirmText?: string;
    init: CollectionInfo;
    mode?: EditCollectionMode;
    onCancel: () => void;
    onConfirm: (collection: CollectionInfo) => void;
}
export declare const EditCollection: ({ init, onConfirm, onCancel, onConfirmText, mode: initMode, }: EditCollectionProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=edit-collection.d.ts.map