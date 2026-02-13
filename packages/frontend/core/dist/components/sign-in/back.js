import { jsx as _jsx } from "react/jsx-runtime";
import { BackButton } from '@affine/component/auth-components';
import { useCallback } from 'react';
export function Back({ changeState }) {
    const onClick = useCallback(() => {
        changeState(prev => ({
            ...prev,
            step: 'signIn',
        }));
    }, [changeState]);
    return _jsx(BackButton, { onClick: onClick });
}
//# sourceMappingURL=back.js.map