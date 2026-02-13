import { jsx as _jsx } from "react/jsx-runtime";
import { FrameworkScope, useLiveData } from '@toeverything/infra';
import { useLayoutEffect, useMemo } from 'react';
import { createMemoryRouter, RouterProvider, UNSAFE_LocationContext, UNSAFE_RouteContext, } from 'react-router-dom';
export const ViewRoot = ({ view, routes, }) => {
    const viewRouter = useMemo(() => createMemoryRouter(routes), [routes]);
    const location = useLiveData(view.location$);
    useLayoutEffect(() => {
        viewRouter.navigate(location).catch(err => {
            console.error('navigate error', err);
        });
    }, [location, view, viewRouter]);
    // https://github.com/remix-run/react-router/issues/7375#issuecomment-975431736
    return (_jsx(FrameworkScope, { scope: view.scope, children: _jsx(UNSAFE_LocationContext.Provider, { value: null, children: _jsx(UNSAFE_RouteContext.Provider, { value: {
                    outlet: null,
                    matches: [],
                    isDataRoute: false,
                }, children: _jsx(RouterProvider, { router: viewRouter }) }) }) }));
};
//# sourceMappingURL=view-root.js.map