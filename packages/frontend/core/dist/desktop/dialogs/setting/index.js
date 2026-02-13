import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading, Scrollable } from '@affine/component';
import { WorkspaceDetailSkeleton } from '@affine/component/setting-components';
import { Modal } from '@affine/component/ui/modal';
import { AuthService, DefaultServerService, ServersService, } from '@affine/core/modules/cloud';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { createIsland } from '@affine/core/utils/island';
import { ServerDeploymentType } from '@affine/graphql';
import { Trans } from '@affine/i18n';
import { ContactWithUsIcon } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { debounce } from 'lodash-es';
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { flushSync } from 'react-dom';
import { AccountSetting } from './account-setting';
import { GeneralSetting } from './general-setting';
import { IssueFeedbackModal } from './issue-feedback-modal';
import { SettingSidebar } from './setting-sidebar';
import { StarAFFiNEModal } from './star-affine-modal';
import * as style from './style.css';
import { SubPageContext, SubPageTarget, } from './sub-page';
import { WorkspaceSetting } from './workspace-setting';
const isWorkspaceSetting = (key) => key.startsWith('workspace:');
const CenteredLoading = () => {
    return (_jsx("div", { className: style.centeredLoading, children: _jsx(Loading, { size: 24 }) }));
};
const SettingModalInner = ({ activeTab: initialActiveTab = 'appearance', onCloseSetting, scrollAnchor: initialScrollAnchor, }) => {
    const [subPageIslands, setSubPageIslands] = useState([]);
    const [settingState, setSettingState] = useState({
        activeTab: initialActiveTab,
        scrollAnchor: initialScrollAnchor,
    });
    const globalContextService = useService(GlobalContextService);
    const currentServerId = useLiveData(globalContextService.globalContext.serverId.$);
    const serversService = useService(ServersService);
    const defaultServerService = useService(DefaultServerService);
    const currentServer = useLiveData(currentServerId ? serversService.server$(currentServerId) : null) ?? defaultServerService.server;
    const loginStatus = useLiveData(currentServer.scope.get(AuthService).session.status$);
    const isSelfhosted = useLiveData(currentServer.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const modalContentRef = useRef(null);
    const modalContentWrapperRef = useRef(null);
    useLayoutEffect(() => {
        let animationFrameId;
        const onResize = debounce(() => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                if (!modalContentRef.current || !modalContentWrapperRef.current)
                    return;
                const wrapperWidth = modalContentWrapperRef.current.offsetWidth;
                const wrapperHeight = modalContentWrapperRef.current.offsetHeight;
                const contentWidth = modalContentRef.current.offsetWidth;
                const wrapper = modalContentWrapperRef.current;
                wrapper?.style.setProperty('--setting-modal-width', `${wrapperWidth}px`);
                wrapper?.style.setProperty('--setting-modal-height', `${wrapperHeight}px`);
                wrapper?.style.setProperty('--setting-modal-content-width', `${contentWidth}px`);
                wrapper?.style.setProperty('--setting-modal-gap-x', `${(wrapperWidth - contentWidth) / 2}px`);
            });
        }, 200);
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onResize);
        };
    }, []);
    const onTabChange = useCallback((key) => {
        setSettingState({ activeTab: key });
    }, [setSettingState]);
    const [openIssueFeedbackModal, setOpenIssueFeedbackModal] = useState(false);
    const [openStarAFFiNEModal, setOpenStarAFFiNEModal] = useState(false);
    const handleOpenIssueFeedbackModal = useCallback(() => {
        setOpenIssueFeedbackModal(true);
    }, [setOpenIssueFeedbackModal]);
    const handleOpenStarAFFiNEModal = useCallback(() => {
        setOpenStarAFFiNEModal(true);
    }, [setOpenStarAFFiNEModal]);
    const addSubPageIsland = useCallback(() => {
        const island = createIsland();
        setSubPageIslands(prev => [...prev, island]);
        const dispose = () => {
            setSubPageIslands(prev => prev.filter(i => i !== island));
        };
        return { island, dispose };
    }, []);
    const contextValue = useMemo(() => ({
        islands: subPageIslands,
        addIsland: addSubPageIsland,
    }), [subPageIslands, addSubPageIsland]);
    useEffect(() => {
        if (isSelfhosted &&
            (settingState.activeTab === 'plans' ||
                settingState.activeTab === 'workspace:billing')) {
            setSettingState({ activeTab: 'workspace:license' });
        }
    }, [isSelfhosted, settingState.activeTab]);
    useEffect(() => {
        if (settingState.scrollAnchor) {
            flushSync(() => {
                const target = modalContentRef.current?.querySelector(`#${settingState.scrollAnchor}`);
                if (target) {
                    target.scrollIntoView();
                }
            });
        }
        modalContentWrapperRef.current?.scrollTo({ top: 0 });
    }, [settingState]);
    return (_jsxs(FrameworkScope, { scope: currentServer.scope, children: [_jsx(SettingSidebar, { activeTab: settingState.activeTab, onTabChange: onTabChange }), _jsx(SubPageContext.Provider, { value: contextValue, children: _jsxs(Scrollable.Root, { children: [_jsxs(Scrollable.Viewport, { "data-testid": "setting-modal-content", className: style.wrapper, ref: modalContentWrapperRef, "data-setting-page": true, "data-open": true, children: [_jsxs("div", { className: style.centerContainer, children: [_jsx("div", { ref: modalContentRef, className: style.content, children: _jsx(Suspense, { fallback: _jsx(WorkspaceDetailSkeleton, {}), children: settingState.activeTab === 'account' &&
                                                    loginStatus === 'authenticated' ? (_jsx(AccountSetting, { onChangeSettingState: setSettingState })) : isWorkspaceSetting(settingState.activeTab) ? (_jsx(WorkspaceSetting, { activeTab: settingState.activeTab, onCloseSetting: onCloseSetting, onChangeSettingState: setSettingState })) : !isWorkspaceSetting(settingState.activeTab) ? (_jsx(GeneralSetting, { activeTab: settingState.activeTab, onChangeSettingState: setSettingState })) : null }) }), _jsxs("div", { className: style.footer, children: [_jsx(ContactWithUsIcon, { fontSize: 16 }), _jsx(Trans, { i18nKey: 'com.affine.settings.suggestion-2', components: {
                                                        1: (_jsx("span", { className: style.link, onClick: handleOpenStarAFFiNEModal })),
                                                        2: (_jsx("span", { className: style.link, onClick: handleOpenIssueFeedbackModal })),
                                                    } })] }), _jsx(StarAFFiNEModal, { open: openStarAFFiNEModal, setOpen: setOpenStarAFFiNEModal }), _jsx(IssueFeedbackModal, { open: openIssueFeedbackModal, setOpen: setOpenIssueFeedbackModal })] }), _jsx(Scrollable.Scrollbar, {})] }), _jsx(SubPageTarget, {})] }) })] }));
};
export const SettingDialog = ({ close, activeTab, scrollAnchor, }) => {
    return (_jsx(Modal, { width: 1280, height: 920, contentOptions: {
            ['data-testid']: 'setting-modal',
            style: {
                maxHeight: '85vh',
                maxWidth: 'calc(100dvw - 100px)',
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
            },
        }, open: true, onOpenChange: () => close(), closeButtonOptions: {
            style: { right: 14, top: 14 },
        }, children: _jsx(Suspense, { fallback: _jsx(CenteredLoading, {}), children: _jsx(SettingModalInner, { activeTab: activeTab, onCloseSetting: close, scrollAnchor: scrollAnchor }) }) }));
};
//# sourceMappingURL=index.js.map