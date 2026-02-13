import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../button';
import { ConfirmModal, useConfirmModal, } from './confirm-modal';
export default {
    title: 'UI/Modal/Confirm Modal',
    component: ConfirmModal,
    argTypes: {},
};
export const UsingHook = () => {
    const { openConfirmModal } = useConfirmModal();
    const onConfirm = () => new Promise(resolve => setTimeout(resolve, 2000));
    const showConfirm = () => {
        openConfirmModal({
            cancelText: 'Cancel',
            confirmText: 'Confirm',
            title: 'Confirm Modal',
            children: 'Are you sure you want to confirm?',
            onConfirm,
            onCancel: () => {
                console.log('Cancelled');
            },
        });
    };
    return _jsx(Button, { onClick: showConfirm, children: "Show confirm" });
};
export const AutoClose = () => {
    const { openConfirmModal } = useConfirmModal();
    const onConfirm = () => {
        openConfirmModal({
            cancelText: 'Cancel',
            confirmText: 'Confirm',
            title: 'Confirm Modal',
            children: 'Are you sure you want to confirm?',
            onConfirm: () => console.log('Confirmed'),
            onCancel: () => {
                console.log('Cancelled');
            },
        });
    };
    return _jsx(Button, { onClick: onConfirm, children: "Show confirm" });
};
//# sourceMappingURL=confirm-modal.stories.js.map