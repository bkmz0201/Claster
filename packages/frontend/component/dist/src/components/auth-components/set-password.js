import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { useCallback, useRef, useState } from 'react';
import { Button } from '../../ui/button';
import { Wrapper } from '../../ui/layout';
import { PasswordInput } from './password-input';
export const SetPassword = ({ passwordLimits, onLater, onSetPassword, showLater = false }) => {
    const t = useI18n();
    const [passwordPass, setPasswordPass] = useState(false);
    const passwordRef = useRef('');
    return (_jsxs(_Fragment, { children: [_jsx(Wrapper, { marginTop: 30, marginBottom: 42, children: _jsx(PasswordInput, { passwordLimits: passwordLimits, onPass: useCallback(password => {
                        setPasswordPass(true);
                        passwordRef.current = password;
                    }, []), onPrevent: useCallback(() => {
                        setPasswordPass(false);
                    }, []) }) }), _jsx(Button, { variant: "primary", size: "large", disabled: !passwordPass, style: { marginRight: 20 }, onClick: useCallback(() => {
                    onSetPassword(passwordRef.current);
                }, [onSetPassword]), children: t['com.affine.auth.set.password.save']() }), showLater ? (_jsx(Button, { variant: "plain", size: "large", onClick: onLater, children: t['com.affine.auth.later']() })) : null] }));
};
//# sourceMappingURL=set-password.js.map