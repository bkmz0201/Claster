import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Modal, SafeArea } from '@affine/component';
import { CloseIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { MobileSignInPanel } from '../../components/sign-in';
export const SignInDialog = ({ close, server: initialServerBaseUrl, step, }) => {
    return (_jsxs(Modal, { fullScreen: true, animation: "slideBottom", open: true, onOpenChange: () => close(), contentOptions: {
            style: {
                padding: 0,
                overflowY: 'auto',
                backgroundColor: cssVarV2('layer/background/secondary'),
            },
        }, withoutCloseButton: true, children: [_jsx(MobileSignInPanel, { onClose: close, server: initialServerBaseUrl, initStep: step }), _jsx(SafeArea, { top: true, style: { position: 'absolute', top: 0, right: 0, paddingRight: 16 }, topOffset: 8, children: _jsx(IconButton, { size: "24", variant: "solid", icon: _jsx(CloseIcon, {}), style: { borderRadius: 8, padding: 4 }, onClick: e => {
                        e.stopPropagation();
                        close();
                    } }) })] }));
};
//# sourceMappingURL=index.js.map