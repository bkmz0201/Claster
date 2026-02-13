import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@affine/admin/components/ui/input';
import { Label } from '@affine/admin/components/ui/label';
import { useCallback } from 'react';
export const CreateAdmin = ({ name, email, password, invalidEmail, invalidPassword, passwordLimits, onNameChange, onEmailChange, onPasswordChange, }) => {
    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange]);
    const handleEmailChange = useCallback((event) => {
        onEmailChange(event.target.value);
    }, [onEmailChange]);
    const handlePasswordChange = useCallback((event) => {
        onPasswordChange(event.target.value);
    }, [onPasswordChange]);
    return (_jsx("div", { className: "flex flex-col h-full w-full mt-24 max-lg:items-center max-lg:mt-16 max-md:mt-5 lg:pl-0", children: _jsxs("div", { className: "flex flex-col pl-1 max-lg:p-4 max-w-96 mb-5", children: [_jsxs("div", { className: "flex flex-col mb-16 max-sm:mb-6", children: [_jsx("h1", { className: "text-lg font-semibold", children: "Create Administrator Account" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "This account can also be used to log in as an AFFiNE user." })] }), _jsxs("div", { className: "flex flex-col gap-9", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", type: "text", value: name, onChange: handleNameChange, required: true })] }), _jsxs("div", { className: "grid gap-2 relative", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: email, onChange: handleEmailChange, required: true }), _jsx("p", { className: `absolute text-sm text-red-500 -bottom-6 ${invalidEmail ? '' : 'opacity-0 pointer-events-none'}`, children: "Invalid email address." })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "flex items-center", children: _jsx(Label, { htmlFor: "password", children: "Password" }) }), _jsx(Input, { id: "password", type: "password", value: password, onChange: handlePasswordChange, min: passwordLimits.minLength, max: passwordLimits.maxLength, required: true }), _jsxs("p", { className: `text-sm text-muted-foreground ${invalidPassword && 'text-red-500'}`, children: [invalidPassword ? 'Invalid password. ' : '', "Please enter", ' ', String(passwordLimits.minLength), "-", String(passwordLimits.maxLength), " digit password, it is recommended to include 2+ of: uppercase, lowercase, numbers, symbols."] })] })] })] }) }));
};
//# sourceMappingURL=create-admin.js.map