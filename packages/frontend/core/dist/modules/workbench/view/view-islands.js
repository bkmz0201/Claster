import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * # View Islands
 *
 * This file defines some components that allow each UI area to be defined inside each View route as shown below,
 * and the Workbench is responsible for rendering these areas into their containers.
 *
 * ```tsx
 * const MyView = () => {
 *   return <>
 *     <ViewHeader>
 *       ...
 *     </ViewHeader>
 *     <ViewBody>
 *       ...
 *     </ViewBody>
 *     <ViewSidebarTab tabId="my-tab" icon={<MyIcon />}>
 *       ...
 *     </ViewSidebarTab>
 *   </>
 * }
 *
 * const viewRoute = [
 *   {
 *     path: '/my-view',
 *     component: MyView,
 *   }
 * ]
 * ```
 *
 * Each Island is divided into `Target` and `Provider`.
 * The `Provider` wraps the content to be rendered, while the `Target` is placed where it needs to be rendered.
 * Then you get a view portal.
 */
import { createIsland } from '@affine/core/utils/island';
import { useLiveData, useService } from '@toeverything/infra';
import { createContext, forwardRef, useContext, useEffect, useState, } from 'react';
import { ViewService } from '../services/view';
import { WorkbenchService } from '../services/workbench';
/**
 * A registry context will be placed at the top level of the workbench.
 *
 * The `View` will create islands and place them in the registry,
 * while `Workbench` can use the KEY to retrieve and display the islands.
 */
const ViewIslandRegistryContext = createContext({});
const ViewIslandSetContext = createContext(null);
const ViewIsland = ({ id, children, }) => {
    const setter = useContext(ViewIslandSetContext);
    if (!setter) {
        throw new Error('ViewIslandProvider must be used inside ViewIslandRegistryProvider');
    }
    const [island] = useState(createIsland);
    useEffect(() => {
        setter(prev => ({ ...prev, [id]: island }));
        return () => {
            setter(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        };
    }, [id, island, setter]);
    return _jsx(island.Provider, { children: children });
};
const ViewIslandTarget = forwardRef(function ViewIslandTarget({ id, children, ...otherProps }, ref) {
    const island = useContext(ViewIslandRegistryContext)[id];
    if (!island) {
        return _jsx("div", { ref: ref, ...otherProps });
    }
    return (_jsx(island.Target, { ref: ref, ...otherProps, children: children }));
});
export const ViewIslandRegistryProvider = ({ children, }) => {
    const [contextValue, setContextValue] = useState({});
    return (_jsx(ViewIslandRegistryContext.Provider, { value: contextValue, children: _jsx(ViewIslandSetContext.Provider, { value: setContextValue, children: children }) }));
};
export const ViewBody = ({ children }) => {
    const view = useService(ViewService).view;
    return _jsx(ViewIsland, { id: `${view.id}:body`, children: children });
};
export const ViewBodyTarget = forwardRef(function ViewBodyTarget({ viewId, ...otherProps }, ref) {
    return _jsx(ViewIslandTarget, { id: `${viewId}:body`, ...otherProps, ref: ref });
});
export const ViewHeader = ({ children }) => {
    const view = useService(ViewService).view;
    return _jsx(ViewIsland, { id: `${view.id}:header`, children: children });
};
export const ViewHeaderTarget = forwardRef(function ViewHeaderTarget({ viewId, ...otherProps }, ref) {
    return _jsx(ViewIslandTarget, { id: `${viewId}:header`, ...otherProps, ref: ref });
});
export const ViewSidebarTab = ({ children, tabId, icon, unmountOnInactive = true, }) => {
    const view = useService(ViewService).view;
    const workbench = useService(WorkbenchService).workbench;
    const sidebarOpened = useLiveData(workbench.sidebarOpen$);
    const activeTab = useLiveData(view.activeSidebarTab$);
    const isActive = activeTab?.id === tabId && sidebarOpened;
    useEffect(() => {
        view.addSidebarTab(tabId);
        return () => {
            view.removeSidebarTab(tabId);
        };
    }, [tabId, view]);
    return (_jsxs(_Fragment, { children: [_jsx(ViewIsland, { id: `${view.id}:sidebar:${tabId}:icon`, children: icon }), _jsx(ViewIsland, { id: `${view.id}:sidebar:${tabId}:body`, children: unmountOnInactive && !isActive ? null : children })] }));
};
export const ViewSidebarTabIconTarget = forwardRef(function ViewSidebarTabIconTarget({ viewId, tabId, ...otherProps }, ref) {
    return (_jsx(ViewIslandTarget, { ref: ref, id: `${viewId}:sidebar:${tabId}:icon`, ...otherProps }));
});
export const ViewSidebarTabBodyTarget = forwardRef(function ViewSidebarTabBodyTarget({ viewId, tabId, ...otherProps }, ref) {
    return (_jsx(ViewIslandTarget, { ref: ref, id: `${viewId}:sidebar:${tabId}:body`, ...otherProps }));
});
//# sourceMappingURL=view-islands.js.map