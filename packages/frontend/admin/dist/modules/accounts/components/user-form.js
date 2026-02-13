import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Input } from '@affine/admin/components/ui/input';
import { Label } from '@affine/admin/components/ui/label';
import { Separator } from '@affine/admin/components/ui/separator';
import { Switch } from '@affine/admin/components/ui/switch';
import { cssVarV2 } from '@toeverything/theme/v2';
import { ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useServerConfig } from '../../common';
import { RightPanelHeader } from '../../header';
import { validateEmails, validatePassword } from '../utils/csv-utils';
import { useCreateUser, useUpdateUser } from './use-user-management';
function UserForm({ title, defaultValue, onClose, onConfirm, onValidate, actions, showOption, }) {
    const serverConfig = useServerConfig();
    const defaultUser = useMemo(() => ({
        name: defaultValue?.name ?? '',
        email: defaultValue?.email ?? '',
        password: defaultValue?.password ?? '',
        features: defaultValue?.features ?? [],
    }), [defaultValue]);
    const [changes, setChanges] = useState(defaultUser);
    const setField = useCallback((field, value) => {
        setChanges(changes => ({
            ...changes,
            [field]: typeof value === 'function' ? value(changes[field]) : value,
        }));
    }, []);
    const canSave = useMemo(() => {
        return onValidate(changes);
    }, [onValidate, changes]);
    const handleConfirm = useCallback(() => {
        if (!canSave) {
            return;
        }
        // @ts-expect-error checked
        onConfirm(changes);
        setChanges(defaultUser);
    }, [canSave, changes, defaultUser, onConfirm]);
    const onFeatureChanged = useCallback((feature, checked) => {
        setField('features', (features = []) => {
            if (checked) {
                return [...features, feature];
            }
            return features.filter(f => f !== feature);
        });
    }, [setField]);
    const handleClose = useCallback(() => {
        setChanges(defaultUser);
        onClose();
    }, [defaultUser, onClose]);
    useEffect(() => {
        setChanges(defaultUser);
    }, [defaultUser]);
    return (_jsxs("div", { className: "flex flex-col h-full gap-1", children: [_jsx(RightPanelHeader, { title: title, handleClose: handleClose, handleConfirm: handleConfirm, canSave: canSave }), _jsxs("div", { className: "p-4 flex-grow overflow-y-auto space-y-[8px]", children: [_jsxs("div", { className: "flex flex-col rounded-md border", children: [_jsx(InputItem, { label: "User name", field: "name", value: changes.name, onChange: setField, placeholder: "Enter user name" }), _jsx(Separator, {}), _jsx(InputItem, { label: "Email", field: "email", value: changes.email, onChange: setField, placeholder: "Enter email address" }), showOption && (_jsxs(_Fragment, { children: [_jsx(Separator, {}), _jsx(InputItem, { label: "Password", field: "password", value: changes.password, onChange: setField, optional: true, placeholder: "Enter password" })] }))] }), _jsx("div", { className: "border rounded-md", children: serverConfig.availableUserFeatures.map((feature, i) => (_jsxs("div", { children: [_jsx(ToggleItem, { name: feature, checked: changes.features?.includes(feature) ?? false, onChange: onFeatureChanged }), i < serverConfig.availableUserFeatures.length - 1 && (_jsx(Separator, {}))] }, feature))) }), actions] })] }));
}
function ToggleItem({ name, checked, onChange, }) {
    const onToggle = useCallback((checked) => {
        onChange(name, checked);
    }, [name, onChange]);
    return (_jsxs(Label, { className: "flex items-center justify-between p-3 text-[15px] gap-2 font-medium leading-6 overflow-hidden", children: [_jsx("span", { className: "overflow-hidden text-ellipsis", title: name, children: name }), _jsx(Switch, { checked: checked, onCheckedChange: onToggle })] }));
}
function InputItem({ label, field, optional, value, onChange, placeholder, }) {
    const onValueChange = useCallback((e) => {
        onChange(field, e.target.value);
    }, [field, onChange]);
    return (_jsxs("div", { className: "flex flex-col gap-1.5 p-3", children: [_jsxs(Label, { className: "text-[15px] font-medium flex-wrap flex", style: { lineHeight: '1.6rem' }, children: [label, optional && (_jsx("span", { className: "font-normal ml-1", style: { color: cssVarV2('text/secondary') }, children: "(optional)" }))] }), _jsx(Input, { type: "text", className: "py-2 px-3 text-[15px] font-normal h-9", value: value, onChange: onValueChange, placeholder: placeholder })] }));
}
const validateCreateUser = (user) => {
    return !!user.name && !!user.email && !!user.features;
};
const validateUpdateUser = (user) => {
    return !!user.name || !!user.email;
};
export function CreateUserForm({ onComplete }) {
    const { create, creating } = useCreateUser();
    const serverConfig = useServerConfig();
    const passwordLimits = serverConfig.credentialsRequirement.password;
    useEffect(() => {
        if (creating) {
            return () => {
                onComplete();
            };
        }
        return;
    }, [creating, onComplete]);
    const handleCreateUser = useCallback((user) => {
        const emailValidation = validateEmails([user]);
        const passwordValidation = validatePassword(user.password, passwordLimits);
        if (!passwordValidation.valid || !emailValidation[0].valid) {
            toast.error(passwordValidation.error || emailValidation[0].error);
            return;
        }
        create(user);
    }, [create, passwordLimits]);
    return (_jsx(UserForm, { title: "Create User", onClose: onComplete, onConfirm: handleCreateUser, onValidate: validateCreateUser, showOption: true }));
}
export function UpdateUserForm({ user, onResetPassword, onDeleteAccount, onComplete, }) {
    const { update, updating } = useUpdateUser();
    const onUpdateUser = useCallback((updates) => {
        update({
            ...updates,
            userId: user.id,
        });
    }, [user, update]);
    useEffect(() => {
        if (updating) {
            return () => {
                onComplete();
            };
        }
        return;
    }, [updating, onComplete]);
    return (_jsx(UserForm, { title: "Update User", defaultValue: user, onClose: onComplete, onConfirm: onUpdateUser, onValidate: validateUpdateUser, actions: _jsxs(_Fragment, { children: [_jsxs(Button, { className: "w-full flex items-center justify-between text-sm font-medium px-4 py-3", variant: "outline", onClick: onResetPassword, children: [_jsx("span", { children: "Reset Password" }), _jsx(ChevronRightIcon, { size: 16 })] }), _jsxs(Button, { className: "w-full text-red-500 px-4 py-3 rounded-md flex items-center justify-between text-sm font-medium hover:text-red-500", variant: "outline", onClick: onDeleteAccount, children: [_jsx("span", { children: "Delete Account" }), _jsx(ChevronRightIcon, { size: 16 })] })] }) }));
}
//# sourceMappingURL=user-form.js.map