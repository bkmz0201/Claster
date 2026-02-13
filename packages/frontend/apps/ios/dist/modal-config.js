import { jsx as _jsx } from "react/jsx-runtime";
import { ModalConfigContext } from '@affine/component';
import { NavigationGestureService } from '@affine/core/mobile/modules/navigation-gesture';
import { globalVars } from '@affine/core/mobile/styles/variables.css';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const ModalConfigProvider = ({ children }) => {
    const navigationGesture = useService(NavigationGestureService);
    const onOpen = useCallback(() => {
        const prev = navigationGesture.enabled$.value;
        if (prev) {
            navigationGesture.setEnabled(false);
            return () => {
                navigationGesture.setEnabled(prev);
            };
        }
        return;
    }, [navigationGesture]);
    return (_jsx(ModalConfigContext.Provider, { value: { onOpen, dynamicKeyboardHeight: globalVars.appKeyboardHeight }, children: children }));
};
//# sourceMappingURL=modal-config.js.map