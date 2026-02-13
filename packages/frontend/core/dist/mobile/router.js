import { jsx as _jsx } from "react/jsx-runtime";
import { NavigateContext } from '@affine/core/components/hooks/use-navigate-helper';
import { wrapCreateBrowserRouterV6 } from '@sentry/react';
import { useEffect, useState } from 'react';
import { createBrowserRouter as reactRouterCreateBrowserRouter, redirect, useNavigate, } from 'react-router-dom';
import { RootWrapper } from './pages/root';
function RootRouter() {
    const navigate = useNavigate();
    const [ready, setReady] = useState(false);
    useEffect(() => {
        // a hack to make sure router is ready
        setReady(true);
    }, []);
    return (ready && (_jsx(NavigateContext.Provider, { value: navigate, children: _jsx(RootWrapper, {}) })));
}
export const topLevelRoutes = [
    {
        element: _jsx(RootRouter, {}),
        children: [
            {
                path: '/',
                lazy: () => import('./pages/index'),
            },
            {
                path: '/workspace/:workspaceId/*',
                lazy: () => import('./pages/workspace/index'),
            },
            {
                path: '/share/:workspaceId/:pageId',
                loader: ({ params }) => {
                    return redirect(`/workspace/${params.workspaceId}/${params.pageId}`);
                },
            },
            {
                path: '/404',
                lazy: () => import('./pages/404'),
            },
            {
                path: '/auth/:authType',
                lazy: () => import('./pages/auth'),
            },
            {
                path: '/sign-in',
                lazy: () => import('./pages/sign-in'),
            },
            {
                path: '/magic-link',
                lazy: () => import(
                /* webpackChunkName: "auth" */ '@affine/core/desktop/pages/auth/magic-link'),
            },
            {
                path: '/oauth/login',
                lazy: () => import(
                /* webpackChunkName: "auth" */ '@affine/core/desktop/pages/auth/oauth-login'),
            },
            {
                path: '/oauth/callback',
                lazy: () => import(
                /* webpackChunkName: "auth" */ '@affine/core/desktop/pages/auth/oauth-callback'),
            },
            {
                path: '/redirect-proxy',
                lazy: () => import('@affine/core/desktop/pages/redirect'),
            },
            {
                path: '/open-app/:action',
                lazy: () => import('@affine/core/desktop/pages/open-app'),
            },
            {
                path: '*',
                lazy: () => import('./pages/404'),
            },
        ],
    },
];
const createBrowserRouter = wrapCreateBrowserRouterV6(reactRouterCreateBrowserRouter);
export const router = (window.SENTRY_RELEASE ? createBrowserRouter : reactRouterCreateBrowserRouter)(topLevelRoutes, {
    future: {
        v7_normalizeFormMethod: true,
    },
});
//# sourceMappingURL=router.js.map