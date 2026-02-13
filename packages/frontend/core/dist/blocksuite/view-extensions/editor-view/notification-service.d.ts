import { type ConfirmModalProps, type ToastOptions, type useConfirmModal } from '@affine/component';
import { type NotificationService } from '@blocksuite/affine/shared/services';
export declare class NotificationServiceImpl implements NotificationService {
    private readonly closeConfirmModal;
    private readonly openConfirmModal;
    constructor(closeConfirmModal: () => void, openConfirmModal: (props: ConfirmModalProps) => void);
    confirm: ({ title, message, confirmText, cancelText, abort, }: Parameters<NotificationService["confirm"]>[0]) => Promise<boolean>;
    prompt: ({ title, message, confirmText, placeholder, cancelText, autofill, abort, }: Parameters<NotificationService["prompt"]>[0]) => Promise<string | null>;
    toast: (message: string, options: ToastOptions) => void;
    notify: (notification: Parameters<NotificationService["notify"]>[0]) => void;
    notifyWithUndoAction: (options: Parameters<NotificationService["notifyWithUndoAction"]>[0]) => void;
}
export declare function patchNotificationService({ closeConfirmModal, openConfirmModal, }: ReturnType<typeof useConfirmModal>): import("@blocksuite/store").ExtensionType;
//# sourceMappingURL=notification-service.d.ts.map