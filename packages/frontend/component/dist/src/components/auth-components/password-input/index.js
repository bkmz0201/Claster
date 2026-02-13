import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import {} from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { passwordStrength } from 'check-password-strength';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z, ZodIssueCode } from 'zod';
import { Input } from '../../../ui/input';
import * as styles from '../share.css';
import { ErrorIcon } from './error';
import { statusWrapper } from './style.css';
import { SuccessIcon } from './success';
import { Tag } from './tag';
const PASSWORD_STRENGTH_OPTIONS = [
    {
        id: 0,
        value: 'weak',
        minDiversity: 0,
        minLength: 0,
    },
    {
        id: 1,
        value: 'medium',
        minDiversity: 4,
        minLength: 8,
    },
    {
        id: 2,
        value: 'strong',
        minDiversity: 4,
        minLength: 10,
    },
];
export const PasswordInput = ({ passwordLimits, onPass, onPrevent, ...inputProps }) => {
    const t = useI18n();
    const [status, setStatus] = useState(null);
    const [confirmStatus, setConfirmStatus] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [password, setPassWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const validationSchema = useMemo(() => {
        const { minLength, maxLength } = passwordLimits;
        return z.string().superRefine((val, ctx) => {
            if (val.length < minLength) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    params: {
                        status: 'minimum',
                    },
                });
            }
            else if (val.length > maxLength) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    params: {
                        status: 'maximum',
                    },
                });
            }
            // https://github.com/deanilvincent/check-password-strength?tab=readme-ov-file#default-options
            const { value: status } = passwordStrength(val, PASSWORD_STRENGTH_OPTIONS);
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: 'password strength',
                path: ['strength'],
                params: {
                    status,
                },
            });
        });
    }, [passwordLimits]);
    const validatePasswords = useCallback((password, confirmPassword) => {
        const result = validationSchema.safeParse(password);
        let canSubmit = false;
        if (!result.success) {
            const issues = result.error.issues;
            const firstIssue = issues[0];
            setStatus(firstIssue.params?.status || null);
            // ignore strength error
            if (firstIssue.path.includes('strength')) {
                canSubmit = true;
            }
        }
        if (confirmPassword) {
            const isEqual = password === confirmPassword;
            if (isEqual) {
                setConfirmStatus('success');
            }
            else {
                setConfirmStatus('error');
            }
            canSubmit &&= isEqual;
        }
        else {
            canSubmit &&= false;
            setConfirmStatus(null);
        }
        setCanSubmit(canSubmit);
    }, [validationSchema]);
    const onPasswordChange = useCallback((value) => {
        const password = value.trim();
        setPassWord(password);
        validatePasswords(password, confirmPassword);
    }, [validatePasswords, confirmPassword]);
    const onConfirmPasswordChange = useCallback((value) => {
        const confirmPassword = value.trim();
        setConfirmPassword(confirmPassword);
        validatePasswords(password, confirmPassword);
    }, [validatePasswords, password]);
    useEffect(() => {
        if (canSubmit) {
            onPass(password);
        }
        else {
            onPrevent();
        }
    }, [canSubmit, password, onPass, onPrevent]);
    return (_jsxs(_Fragment, { children: [_jsx(Input, { name: "password", className: styles.input, type: "password", size: "extraLarge", style: { marginBottom: 20 }, placeholder: t['com.affine.auth.set.password.placeholder']({
                    min: String(passwordLimits.minLength),
                }), onChange: onPasswordChange, endFix: _jsx("div", { className: statusWrapper, children: status ? (_jsx(Tag, { status: status, minimum: t['com.affine.auth.set.password.message.minlength']({
                            min: String(passwordLimits.minLength),
                        }), maximum: t['com.affine.auth.set.password.message.maxlength']({
                            max: String(passwordLimits.maxLength),
                        }) })) : null }), ...inputProps }), _jsx(Input, { name: "confirmPassword", className: styles.input, type: "password", size: "extraLarge", placeholder: t['com.affine.auth.set.password.placeholder.confirm'](), onChange: onConfirmPasswordChange, endFix: _jsx("div", { className: statusWrapper, children: confirmStatus ? (confirmStatus === 'success' ? (_jsx(SuccessIcon, {})) : (_jsx(ErrorIcon, {}))) : null }), ...inputProps })] }));
};
//# sourceMappingURL=index.js.map