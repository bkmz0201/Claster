import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { RadioGroup } from '../radio';
import { ConfirmModal } from './confirm-modal';
import { Modal } from './modal';
import { OverlayModal } from './overlay-modal';
export default {
    title: 'UI/Modal',
    component: Modal,
    argTypes: {},
};
const Template = args => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsx(Modal, { open: open, onOpenChange: setOpen, ...args })] }));
};
export const Default = Template.bind(undefined);
Default.args = {
    title: 'Modal Title',
    description: 'If the day is done, if birds sing no more, if the wind has flagged tired, then draw the veil of darkness thick upon me, even as thou hast wrapt the earth with the coverlet of sleep and tenderly closed the petals of the drooping lotus at dusk.',
};
const wait = () => new Promise(resolve => setTimeout(resolve, 1000));
const ConfirmModalTemplate = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputStatus, setInputStatus] = useState('default');
    const handleConfirm = useCallback(async () => {
        setLoading(true);
        await wait();
        setInputStatus(inputStatus !== 'error' ? 'error' : 'success');
        setLoading(false);
    }, [inputStatus]);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Confirm Modal" }), _jsx(ConfirmModal, { open: open, onOpenChange: setOpen, onConfirm: handleConfirm, title: "Modal Title", description: "Modal description", confirmText: "Confirm", confirmButtonOptions: {
                    loading: loading,
                    variant: 'primary',
                }, children: _jsx(Input, { placeholder: "input someting", status: inputStatus }) })] }));
};
const OverlayModalTemplate = () => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Overlay Modal" }), _jsx(OverlayModal, { open: open, onOpenChange: setOpen, title: "Modal Title", description: "Modal description", confirmButtonOptions: {
                    variant: 'primary',
                }, topImage: _jsx("div", { style: {
                        width: '400px',
                        height: '300px',
                        background: '#66ccff',
                        opacity: 0.1,
                        color: '#fff',
                    } }) })] }));
};
export const Confirm = ConfirmModalTemplate.bind(undefined);
export const Overlay = OverlayModalTemplate.bind(undefined);
export const Animations = () => {
    const animations = ['fadeScaleTop', 'slideBottom', 'none'];
    const [open, setOpen] = useState(false);
    const [animation, setAnimation] = useState('fadeScaleTop');
    return (_jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsx(RadioGroup, { value: animation, onChange: setAnimation, items: animations }), _jsx(Button, { onClick: () => setOpen(true), children: "Open dialog" }), _jsxs(Modal, { contentWrapperStyle: animation === 'slideBottom'
                    ? {
                        alignItems: 'end',
                        padding: 10,
                    }
                    : {}, open: open, onOpenChange: setOpen, animation: animation, children: ["This is a dialog with animation: ", animation] })] }));
};
export const Nested = () => {
    const [openRoot, setOpenRoot] = useState(false);
    const [openNested, setOpenNested] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpenRoot(true), children: "Open Root Modal" }), _jsx(Modal, { animation: "slideBottom", open: openRoot, onOpenChange: setOpenRoot, contentOptions: {
                    style: {
                        transition: 'all .3s ease 0.1s',
                        transform: openNested
                            ? `scale(0.95) translateY(-20px)`
                            : 'scale(1) translateY(0)',
                    },
                }, children: _jsx(Button, { onClick: () => setOpenNested(true), children: "Open Nested Modal" }) }), _jsx(Modal, { animation: "slideBottom", open: openNested, onOpenChange: setOpenNested, overlayOptions: { style: { background: 'transparent' } }, children: "Nested Modal" })] }));
};
//# sourceMappingURL=modal.stories.js.map