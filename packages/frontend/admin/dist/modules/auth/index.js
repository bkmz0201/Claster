import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Input } from '@affine/admin/components/ui/input';
import { Label } from '@affine/admin/components/ui/label';
import { FeatureType, getUserFeaturesQuery } from '@affine/graphql';
import { useCallback, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { affineFetch } from '../../fetch-utils';
import { isAdmin, useCurrentUser, useRevalidateCurrentUser } from '../common';
import logo from './logo.svg';
export function Auth() {
    const currentUser = useCurrentUser();
    const revalidate = useRevalidateCurrentUser();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const login = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!emailRef.current || !passwordRef.current)
            return;
        affineFetch('/api/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (response) => {
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to login');
            }
            return response.json();
        })
            .then(() => affineFetch('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                operationName: getUserFeaturesQuery.op,
                query: getUserFeaturesQuery.query,
                variables: {},
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }))
            .then(res => res.json())
            .then(async ({ data: { currentUser: { features }, }, }) => {
            if (features.includes(FeatureType.Admin)) {
                toast.success('Logged in successfully');
                await revalidate();
            }
            else {
                toast.error('You are not an admin');
            }
        })
            .catch(err => {
            toast.error(`Failed to login: ${err.message}`);
        });
    }, [revalidate]);
    if (currentUser && isAdmin(currentUser)) {
        return _jsx(Navigate, { to: "/admin" });
    }
    return (_jsxs("div", { className: "w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen", children: [_jsx("div", { className: "flex items-center justify-center py-12", children: _jsxs("div", { className: "mx-auto grid w-[350px] gap-6", children: [_jsxs("div", { className: "grid gap-2 text-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Login" }), _jsx("p", { className: "text-balance text-muted-foreground", children: "Enter your email below to login to your account" })] }), _jsx("form", { onSubmit: login, action: "#", children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", ref: emailRef, placeholder: "m@example.com", autoComplete: "email", required: true })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "flex items-center", children: _jsx(Label, { htmlFor: "password", children: "Password" }) }), _jsx(Input, { id: "password", type: "password", ref: passwordRef, autoComplete: "current-password", required: true })] }), _jsx(Button, { onClick: login, type: "submit", className: "w-full", children: "Login" })] }) })] }) }), _jsx("div", { className: "hidden bg-muted lg:flex lg:justify-center", children: _jsx("img", { src: logo, alt: "Image", className: "h-1/2 object-cover dark:brightness-[0.2] dark:grayscale relative top-1/4 " }) })] }));
}
export { Auth as Component };
//# sourceMappingURL=index.js.map