export interface MemberLimitModalProps {
    isFreePlan: boolean;
    open: boolean;
    plan: string;
    quota: string;
    setOpen: (value: boolean) => void;
    onConfirm: () => void;
}
export declare const MemberLimitModal: ({ isFreePlan, open, plan, quota, setOpen, onConfirm, }: MemberLimitModalProps) => import("react/jsx-runtime").JSX.Element;
export declare const ConfirmDescription: ({ isFreePlan, plan, quota, }: {
    isFreePlan: boolean;
    plan: string;
    quota: string;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=member-limit-modal.d.ts.map