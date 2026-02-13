import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Menu, SafeArea, startScopedViewTransition, } from '@affine/component';
import { NotificationList } from '@affine/core/components/notification/list';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { NotificationCountService } from '@affine/core/modules/notification';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { NotificationIcon, SettingsIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { SearchInput, WorkspaceSelector } from '../../components';
import { searchVTScope } from '../../components/search-input/style.css';
import { useGlobalEvent } from '../../hooks/use-global-events';
import * as styles from './styles.css';
/**
 * Contains `Setting`, `Workspace Selector`, `Search`
 * When scrolled:
 *   - combine Setting and Workspace Selector
 *   - hide Search
 */
export const HomeHeader = () => {
    const workspaceDialogService = useService(WorkspaceDialogService);
    const workspaceCardRef = useRef(null);
    const floatWorkspaceCardRef = useRef(null);
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const notificationCountService = useService(NotificationCountService);
    const notificationCount = useLiveData(notificationCountService.count$);
    const navSearch = useCallback(() => {
        startScopedViewTransition(searchVTScope, () => {
            workbench.open('/search');
        });
    }, [workbench]);
    const [dense, setDense] = useState(false);
    useGlobalEvent('scroll', useCallback(() => {
        if (!workspaceCardRef.current || !floatWorkspaceCardRef.current)
            return;
        const inFlowTop = workspaceCardRef.current.getBoundingClientRect().top;
        const floatTop = floatWorkspaceCardRef.current.getBoundingClientRect().top;
        setDense(inFlowTop <= floatTop);
    }, []));
    const openSetting = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'appearance',
        });
    }, [workspaceDialogService]);
    return (_jsxs(_Fragment, { children: [_jsxs(SafeArea, { top: true, className: styles.root, children: [_jsx("div", { className: styles.headerSettingRow }), _jsxs("div", { className: styles.wsSelectorAndSearch, children: [_jsx(WorkspaceSelector, { ref: workspaceCardRef }), _jsx(SearchInput, { placeholder: t['Quick search'](), onClick: navSearch })] })] }), _jsxs(SafeArea, { top: true, className: clsx(styles.root, styles.float, { dense }), children: [_jsx(WorkspaceSelector, { className: styles.floatWsSelector, ref: floatWorkspaceCardRef }), _jsx(Menu, { items: _jsx(NotificationList, {}), children: _jsxs("div", { style: {
                                position: 'relative',
                                lineHeight: 0,
                                color: cssVarV2.icon.primary,
                            }, children: [_jsx(NotificationIcon, { width: 28, height: 28 }), notificationCount > 0 && (_jsx("div", { className: styles.notificationBadge, style: {
                                        fontSize: notificationCount > 99 ? '8px' : '12px',
                                    }, children: notificationCount > 99 ? '99+' : notificationCount }))] }) }), _jsx(IconButton, { style: { transition: 'none' }, onClick: openSetting, size: 28, icon: _jsx(SettingsIcon, {}), "data-testid": "settings-button" })] })] }));
};
//# sourceMappingURL=index.js.map