import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from '@affine/admin/components/ui/sonner';
import { lazy, ROUTES } from '@affine/routes';
import { withSentryReactRouterV7Routing } from '@sentry/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes as ReactRouterRoutes, useLocation, } from 'react-router-dom';
import { toast } from 'sonner';
import { SWRConfig } from 'swr';
import { TooltipProvider } from './components/ui/tooltip';
import { isAdmin, useCurrentUser, useServerConfig } from './modules/common';
import { Layout } from './modules/layout';
export const Setup = lazy(() => import(/* webpackChunkName: "setup" */ './modules/setup'));
export const Accounts = lazy(() => import(/* webpackChunkName: "accounts" */ './modules/accounts'));
export const AI = lazy(() => import(/* webpackChunkName: "ai" */ './modules/ai'));
export const About = lazy(() => import(/* webpackChunkName: "about" */ './modules/about'));
export const Settings = lazy(() => import(/* webpackChunkName: "settings" */ './modules/settings'));
export const Auth = lazy(() => import(/* webpackChunkName: "auth" */ './modules/auth'));
const Routes = window.SENTRY_RELEASE
    ? withSentryReactRouterV7Routing(ReactRouterRoutes)
    : ReactRouterRoutes;
function AuthenticatedRoutes() {
    const user = useCurrentUser();
    useEffect(() => {
        if (user && !isAdmin(user)) {
            toast.error('You are not an admin, please login the admin account.');
        }
    }, [user]);
    if (!user || !isAdmin(user)) {
        return _jsx(Navigate, { to: "/admin/auth" });
    }
    return (_jsx(Layout, { children: _jsx(Outlet, {}) }));
}
function RootRoutes() {
    const config = useServerConfig();
    const location = useLocation();
    if (!config.initialized && location.pathname !== '/admin/setup') {
        return _jsx(Navigate, { to: "/admin/setup" });
    }
    if (/^\/admin\/?$/.test(location.pathname)) {
        return _jsx(Navigate, { to: "/admin/accounts" });
    }
    return _jsx(Outlet, {});
}
export const App = () => {
    return (_jsxs(TooltipProvider, { children: [_jsx(SWRConfig, { value: {
                    revalidateOnFocus: false,
                    revalidateOnMount: false,
                }, children: _jsx(BrowserRouter, { basename: environment.subPath, children: _jsx(Routes, { children: _jsxs(Route, { path: ROUTES.admin.index, element: _jsx(RootRoutes, {}), children: [_jsx(Route, { path: ROUTES.admin.auth, element: _jsx(Auth, {}) }), _jsx(Route, { path: ROUTES.admin.setup, element: _jsx(Setup, {}) }), _jsxs(Route, { element: _jsx(AuthenticatedRoutes, {}), children: [_jsx(Route, { path: ROUTES.admin.accounts, element: _jsx(Accounts, {}) }), _jsx(Route, { path: ROUTES.admin.ai, element: _jsx(AI, {}) }), _jsx(Route, { path: ROUTES.admin.about, element: _jsx(About, {}) }), _jsx(Route, { path: ROUTES.admin.settings.index, element: _jsx(Settings, {}), children: _jsx(Route, { path: ROUTES.admin.settings.module, element: _jsx(Settings, {}) }) })] })] }) }) }) }), _jsx(Toaster, {})] }));
};
//# sourceMappingURL=app.js.map