import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip } from '@affine/component/ui/tooltip';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { UrlService } from '@affine/core/modules/url';
import { useI18n } from '@affine/i18n';
import { CloseIcon, NewIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { ContactIcon, HelpIcon, KeyboardIcon } from './icons';
import { StyledAnimateWrapper, StyledIconWrapper, StyledIsland, StyledTriggerWrapper, } from './style';
const DEFAULT_SHOW_LIST = [
    'whatNew',
    'contact',
    'shortcuts',
];
const DESKTOP_SHOW_LIST = [...DEFAULT_SHOW_LIST];
const showList = BUILD_CONFIG.isElectron
    ? DESKTOP_SHOW_LIST
    : DEFAULT_SHOW_LIST;
export const HelpIsland = () => {
    const { globalContextService, urlService } = useServices({
        GlobalContextService,
        UrlService,
    });
    const docId = useLiveData(globalContextService.globalContext.docId.$);
    const docMode = useLiveData(globalContextService.globalContext.docMode.$);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const [spread, setShowSpread] = useState(false);
    const t = useI18n();
    const openSettingModal = useCallback((tab) => {
        setShowSpread(false);
        workspaceDialogService.open('setting', {
            activeTab: tab,
        });
    }, [workspaceDialogService]);
    const openAbout = useCallback(() => openSettingModal('about'), [openSettingModal]);
    const openShortcuts = useCallback(() => openSettingModal('shortcuts'), [openSettingModal]);
    return (_jsxs(StyledIsland, { spread: spread, "data-testid": "help-island", onClick: () => {
            setShowSpread(!spread);
        }, inEdgelessPage: !!docId && docMode === 'edgeless', children: [_jsxs(StyledAnimateWrapper, { style: { height: spread ? `${showList.length * 40 + 4}px` : 0 }, children: [showList.includes('whatNew') && (_jsx(Tooltip, { content: t['com.affine.appUpdater.whatsNew'](), side: "left", children: _jsx(StyledIconWrapper, { "data-testid": "right-bottom-change-log-icon", onClick: () => {
                                urlService.openPopupWindow(BUILD_CONFIG.changelogUrl);
                            }, children: _jsx(NewIcon, {}) }) })), showList.includes('contact') && (_jsx(Tooltip, { content: t['com.affine.helpIsland.contactUs'](), side: "left", children: _jsx(StyledIconWrapper, { "data-testid": "right-bottom-contact-us-icon", onClick: openAbout, children: _jsx(ContactIcon, {}) }) })), showList.includes('shortcuts') && (_jsx(Tooltip, { content: t['com.affine.keyboardShortcuts.title'](), side: "left", children: _jsx(StyledIconWrapper, { "data-testid": "shortcuts-icon", onClick: openShortcuts, children: _jsx(KeyboardIcon, {}) }) }))] }), spread ? (_jsx(StyledTriggerWrapper, { spread: true, children: _jsx(CloseIcon, {}) })) : (_jsx(Tooltip, { content: t['com.affine.helpIsland.helpAndFeedback'](), side: "left", children: _jsx(StyledTriggerWrapper, { "data-testid": "faq-icon", children: _jsx(HelpIcon, {}) }) }))] }));
};
//# sourceMappingURL=index.js.map