import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Button, Divider, IconButton, Input, Menu, MenuItem, MenuTrigger, Modal, notify, Scrollable, } from '@affine/component';
import { AuthPageContainer } from '@affine/component/auth-components';
import { useSignOut } from '@affine/core/components/hooks/affine/use-sign-out';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { PureWorkspaceCard } from '@affine/core/components/workspace-selector/workspace-card';
import { AuthService } from '@affine/core/modules/cloud';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { buildShowcaseWorkspace } from '@affine/core/utils/first-app-data';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { DoneIcon, NewPageIcon, SignOutIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upgrade } from '../../dialogs/setting/general-setting/plans/plan-card';
import { PageNotFound } from '../404';
import * as styles from './styles.css';
const benefitList = [
    'com.affine.upgrade-to-team-page.benefit.g1',
    'com.affine.upgrade-to-team-page.benefit.g2',
    'com.affine.upgrade-to-team-page.benefit.g3',
    'com.affine.upgrade-to-team-page.benefit.g4',
];
export const Component = () => {
    const authService = useService(AuthService);
    const authStatus = useLiveData(authService.session.status$);
    const [params] = useSearchParams();
    const recurring = params.get('recurring');
    const authIsRevalidating = useLiveData(authService.session.isRevalidating$);
    if (authStatus === 'unauthenticated' && !authIsRevalidating) {
        return _jsx(PageNotFound, { noPermission: true });
    }
    return _jsx(UpgradeToTeam, { recurring: recurring });
};
export const UpgradeToTeam = ({ recurring }) => {
    const t = useI18n();
    const workspacesList = useService(WorkspacesService).list;
    const workspaces = useLiveData(workspacesList.workspaces$);
    const [openUpgrade, setOpenUpgrade] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const authService = useService(AuthService);
    const user = useLiveData(authService.session.account$);
    const onSignOut = useSignOut();
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const workspacesService = useService(WorkspacesService);
    const profile = selectedWorkspace
        ? workspacesService.getProfile(selectedWorkspace)
        : undefined;
    const workspaceInfo = useLiveData(profile?.profile$);
    const name = workspaceInfo?.name ?? UNTITLED_WORKSPACE_NAME;
    const menuTriggerText = useMemo(() => {
        if (selectedWorkspace) {
            return name;
        }
        return t['com.affine.upgrade-to-team-page.workspace-selector.placeholder']();
    }, [name, selectedWorkspace, t]);
    const onUpgradeButtonClick = useCallback(() => {
        setOpenUpgrade(true);
    }, []);
    const onClickCreateWorkspace = useCallback(() => {
        setOpenCreate(true);
    }, []);
    const revalidate = useCallback(() => {
        profile?.revalidate();
    }, [profile]);
    const { jumpToPage, jumpToOpenInApp } = useNavigateHelper();
    const [params] = useSearchParams();
    const isTeam = workspaceInfo?.isTeam;
    const openAFFiNE = useCallback(() => {
        if (params.get('client')) {
            jumpToOpenInApp(`/workspace/${selectedWorkspace?.id}/all`);
        }
        else if (selectedWorkspace) {
            jumpToPage(selectedWorkspace.id, 'all');
        }
    }, [jumpToOpenInApp, jumpToPage, params, selectedWorkspace]);
    useEffect(() => {
        revalidate();
    }, [selectedWorkspace, revalidate]);
    useEffect(() => {
        window.addEventListener('focus', revalidate);
        return () => {
            window.removeEventListener('focus', revalidate);
        };
    }, [revalidate]);
    useEffect(() => {
        if (isTeam && selectedWorkspace) {
            return openAFFiNE();
        }
    }, [isTeam, jumpToPage, openAFFiNE, selectedWorkspace]);
    return (_jsx(AuthPageContainer, { title: t['com.affine.upgrade-to-team-page.title'](), children: _jsxs("div", { className: styles.root, children: [_jsx(Menu, { items: _jsx(WorkspaceSelector, { metas: workspaces, onSelect: setSelectedWorkspace, onClickCreateWorkspace: onClickCreateWorkspace }), contentOptions: {
                        style: {
                            width: '410px',
                        },
                    }, children: _jsx(MenuTrigger, { className: styles.menuTrigger, "data-selected": !!selectedWorkspace, children: menuTriggerText }) }), _jsx("div", { className: styles.upgradeButton, children: _jsx(Button, { variant: "primary", size: "extraLarge", onClick: onUpgradeButtonClick, disabled: !selectedWorkspace, children: t['com.affine.upgrade-to-team-page.upgrade-button']() }) }), _jsxs("div", { className: styles.contentContainer, children: [_jsx("div", { children: t['com.affine.upgrade-to-team-page.benefit.title']() }), _jsx("ul", { children: benefitList.map((benefit, index) => (_jsxs("li", { className: styles.liStyle, children: [_jsx(DoneIcon, { className: styles.doneIcon }), t.t(benefit)] }, `${benefit}:${index}`))) }), _jsx("div", { children: t['com.affine.upgrade-to-team-page.benefit.description']() }), selectedWorkspace && (_jsx(UpgradeDialog, { recurring: recurring, open: openUpgrade, onOpenChange: setOpenUpgrade, workspaceId: selectedWorkspace.id, workspaceName: name })), _jsx(CreateWorkspaceDialog, { open: openCreate, onOpenChange: setOpenCreate, onSelect: setSelectedWorkspace })] }), user ? (_jsxs("div", { className: styles.userContainer, children: [_jsx(Avatar, { url: user.avatar, name: user.label }), _jsx("span", { className: styles.email, children: user.email }), _jsx(IconButton, { onClick: onSignOut, size: "20", tooltip: t['404.signOut'](), children: _jsx(SignOutIcon, {}) })] })) : null] }) }));
};
const UpgradeDialog = ({ open, onOpenChange, workspaceId, workspaceName, recurring, }) => {
    const t = useI18n();
    const onClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);
    const currentRecurring = recurring &&
        recurring.toLowerCase() === SubscriptionRecurring.Yearly.toLowerCase()
        ? SubscriptionRecurring.Yearly
        : SubscriptionRecurring.Monthly;
    return (_jsxs(Modal, { width: 480, open: open, onOpenChange: onOpenChange, children: [_jsx("div", { className: styles.dialogTitle, children: t['com.affine.upgrade-to-team-page.upgrade-confirm.title']() }), _jsx("div", { className: styles.dialogMessage, children: _jsx(Trans, { i18nKey: "com.affine.upgrade-to-team-page.upgrade-confirm.description", components: {
                        1: _jsx("span", { style: { fontWeight: 600 } }),
                    }, values: {
                        workspaceName,
                    } }) }), _jsxs("div", { className: styles.dialogFooter, children: [_jsx(Button, { onClick: onClose, children: t['Cancel']() }), _jsx(Upgrade, { className: styles.upgradeButtonInDialog, recurring: currentRecurring, plan: SubscriptionPlan.Team, workspaceId: workspaceId, onCheckoutSuccess: onClose, checkoutInput: {
                            args: {
                                workspaceId,
                            },
                        }, children: t['com.affine.payment.upgrade']() })] })] }));
};
const WorkspaceSelector = ({ metas, onSelect, onClickCreateWorkspace, }) => {
    const t = useI18n();
    const cloudWorkspaces = useMemo(() => metas.filter(({ flavour }) => flavour === 'affine-cloud'), [metas]);
    const handleSelect = useCallback((workspace) => {
        onSelect(workspace);
    }, [onSelect]);
    return (_jsxs("div", { children: [cloudWorkspaces.length > 0 ? (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { style: { maxHeight: '40vh' }, children: cloudWorkspaces.map(workspace => (_jsx(WorkspaceItem, { meta: workspace, onSelect: handleSelect }, workspace.id))) }), _jsx(Scrollable.Scrollbar, {})] })) : (_jsx("div", { className: styles.noWorkspaceItem, children: t['com.affine.upgrade-to-team-page.no-workspace-available']() })), _jsx(Divider, { size: "thinner" }), _jsx(MenuItem, { className: styles.createWorkspaceItem, prefix: _jsx(NewPageIcon, { className: styles.itemIcon, fontSize: 28 }), onClick: onClickCreateWorkspace, children: _jsx("div", { className: styles.itemContent, children: t['com.affine.upgrade-to-team-page.workspace-selector.create-workspace']() }) })] }));
};
const WorkspaceItem = ({ meta, onSelect, }) => {
    const information = useWorkspaceInfo(meta);
    const onClick = useCallback(() => {
        onSelect(meta);
    }, [onSelect, meta]);
    if (information?.isTeam || !information?.isOwner) {
        return null;
    }
    return (_jsx(MenuItem, { className: styles.plainMenuItem, onClick: onClick, children: _jsx(PureWorkspaceCard, { className: styles.workspaceItem, workspaceMetadata: meta, avatarSize: 28 }) }));
};
const CreateWorkspaceDialog = ({ open, onOpenChange, onSelect, }) => {
    const t = useI18n();
    const onClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);
    const [name, setName] = useState('');
    const workspacesService = useService(WorkspacesService);
    const onCreate = useCallback(async () => {
        const newWorkspace = await buildShowcaseWorkspace(workspacesService, 'affine-cloud', name);
        notify.success({
            title: 'Workspace Created',
        });
        onSelect(newWorkspace.meta);
        onOpenChange(false);
    }, [name, onOpenChange, onSelect, workspacesService]);
    const onBeforeCheckout = useAsyncCallback(async () => {
        await onCreate();
    }, [onCreate]);
    return (_jsxs(Modal, { width: 480, open: open, onOpenChange: onOpenChange, children: [_jsx("div", { className: styles.dialogTitle, children: t['com.affine.upgrade-to-team-page.create-and-upgrade-confirm.title']() }), _jsxs("div", { className: styles.createConfirmContent, children: [_jsx("div", { children: t['com.affine.upgrade-to-team-page.create-and-upgrade-confirm.description']() }), _jsx(Input, { placeholder: t['com.affine.upgrade-to-team-page.create-and-upgrade-confirm.placeholder'](), value: name, onChange: setName })] }), _jsxs("div", { className: styles.dialogFooter, children: [_jsx(Button, { onClick: onClose, children: t['Cancel']() }), _jsx(Button, { variant: "primary", className: styles.upgradeButtonInDialog, onClick: onBeforeCheckout, children: t['com.affine.upgrade-to-team-page.create-and-upgrade-confirm.confirm']() })] })] }));
};
//# sourceMappingURL=index.js.map