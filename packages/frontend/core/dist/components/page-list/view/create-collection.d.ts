export interface CreateCollectionModalProps {
    title?: string;
    onConfirmText?: string;
    init: string;
    onConfirm: (title: string) => void;
    open: boolean;
    showTips?: boolean;
    onOpenChange: (open: boolean) => void;
}
export declare const CreateCollectionModal: ({ init, onConfirm, open, showTips, onOpenChange, title, }: CreateCollectionModalProps) => import("react/jsx-runtime").JSX.Element;
export interface CreateCollectionProps {
    onConfirmText?: string;
    init: string;
    showTips?: boolean;
    onCancel: () => void;
    onConfirm: (title: string) => void;
}
export declare const CreateCollection: ({ onConfirmText, init, showTips, onCancel, onConfirm, }: CreateCollectionProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=create-collection.d.ts.map