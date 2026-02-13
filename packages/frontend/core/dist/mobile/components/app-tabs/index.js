import { jsx as _jsx } from "react/jsx-runtime";
import { SafeArea } from '@affine/component';
import { GlobalCacheService } from '@affine/core/modules/storage';
import { WorkbenchLink, WorkbenchService, } from '@affine/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { VirtualKeyboardService } from '../../modules/virtual-keyboard/services/virtual-keyboard';
import { cacheKey } from './constants';
import { tabs } from './data';
import * as styles from './styles.css';
import { TabItem } from './tab-item';
export const AppTabs = ({ background, fixed = true, }) => {
    const virtualKeyboardService = useService(VirtualKeyboardService);
    const virtualKeyboardVisible = useLiveData(virtualKeyboardService.visible$);
    const workbench = useService(WorkbenchService).workbench;
    const location = useLiveData(workbench.location$);
    const globalCache = useService(GlobalCacheService).globalCache;
    // always set the active tab to home when the location is changed to home
    useEffect(() => {
        if (location.pathname === '/home') {
            globalCache.set(cacheKey, 'home');
        }
    }, [globalCache, location.pathname]);
    const tab = (_jsx(SafeArea, { id: "app-tabs", bottom: true, className: styles.appTabs, bottomOffset: 2, "data-fixed": fixed, style: {
            ...assignInlineVars({
                [styles.appTabsBackground]: background,
            }),
            visibility: virtualKeyboardVisible ? 'hidden' : 'visible',
        }, children: _jsx("ul", { className: styles.appTabsInner, role: "tablist", children: tabs.map(tab => {
                if ('to' in tab) {
                    return _jsx(AppTabLink, { route: tab }, tab.key);
                }
                else {
                    return (_jsx(React.Fragment, { children: _jsx(tab.custom, { tab: tab }) }, tab.key));
                }
            }) }) }));
    return fixed ? createPortal(tab, document.body) : tab;
};
const AppTabLink = ({ route }) => {
    const Link = route.LinkComponent || WorkbenchLink;
    return (_jsx(Link, { className: styles.tabItem, to: route.to, replaceHistory: true, children: _jsx(TabItem, { id: route.key, label: route.to.slice(1), children: _jsx(route.Icon, {}) }) }, route.to));
};
//# sourceMappingURL=index.js.map