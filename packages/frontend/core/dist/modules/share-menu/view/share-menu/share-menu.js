import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Tooltip, useConfirmModal } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { Menu } from '@affine/component/ui/menu';
import { ServerService } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { ShareInfoService } from '@affine/core/modules/share-doc';
import { ServerDeploymentType, SubscriptionPlan } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { LockIcon, PublishIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { forwardRef, useCallback, useEffect, useMemo, useState, } from 'react';
import * as styles from './index.css';
import { InviteMemberEditor } from './invite-member-editor/invite-member-editor';
import { MemberManagement } from './member-management';
import { ShareExport } from './share-export';
import { SharePage } from './share-page';
export var ShareMenuTab;
(function (ShareMenuTab) {
    ShareMenuTab["Share"] = "share";
    ShareMenuTab["Export"] = "export";
    ShareMenuTab["Invite"] = "invite";
    ShareMenuTab["Members"] = "members";
})(ShareMenuTab || (ShareMenuTab = {}));
export const ShareMenuContent = (props) => {
    const t = useI18n();
    const [currentTab, setCurrentTab] = useState(ShareMenuTab.Share);
    const serverService = useService(ServerService);
    const isSelfhosted = useLiveData(serverService.server.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const workspaceQuotaService = useService(WorkspaceQuotaService);
    const quota = useLiveData(workspaceQuotaService.quota.quota$);
    const hittingPaywall = useMemo(() => {
        if (isSelfhosted) {
            return false;
        }
        if (quota) {
            const { name } = quota;
            return name.toLowerCase() === SubscriptionPlan.Free.toLowerCase();
        }
        return true;
    }, [isSelfhosted, quota]);
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const onValueChange = useCallback((value) => {
        setCurrentTab(value);
    }, []);
    useEffect(() => {
        workspaceQuotaService.quota.revalidate();
    }, [workspaceQuotaService]);
    const { openConfirmModal } = useConfirmModal();
    const onConfirm = useCallback(() => {
        if (!isOwner) {
            return;
        }
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
        return;
    }, [isOwner, workspaceDialogService]);
    const openPaywallModal = useCallback(() => {
        openConfirmModal({
            title: t[`com.affine.share-menu.paywall.${isOwner ? 'owner' : 'member'}.title`](),
            description: t[`com.affine.share-menu.paywall.${isOwner ? 'owner' : 'member'}.description`](),
            confirmText: t[`com.affine.share-menu.paywall.${isOwner ? 'owner' : 'member'}.confirm`](),
            onConfirm: onConfirm,
            cancelText: t['Cancel'](),
            cancelButtonOptions: {
                style: {
                    visibility: isOwner ? 'visible' : 'hidden',
                },
            },
            confirmButtonOptions: {
                variant: isOwner ? 'primary' : 'custom',
            },
        });
    }, [isOwner, onConfirm, openConfirmModal, t]);
    if (currentTab === ShareMenuTab.Members) {
        return (_jsx(MemberManagement, { openPaywallModal: openPaywallModal, hittingPaywall: !!hittingPaywall, onClickBack: () => {
                setCurrentTab(ShareMenuTab.Share);
            }, onClickInvite: () => {
                setCurrentTab(ShareMenuTab.Invite);
            } }));
    }
    if (currentTab === ShareMenuTab.Invite) {
        return (_jsx(InviteMemberEditor, { openPaywallModal: openPaywallModal, hittingPaywall: !!hittingPaywall, onClickCancel: () => {
                setCurrentTab(ShareMenuTab.Share);
            } }));
    }
    return (_jsx("div", { className: styles.containerStyle, children: _jsxs(Tabs.Root, { defaultValue: ShareMenuTab.Share, value: currentTab, onValueChange: onValueChange, children: [_jsxs(Tabs.List, { className: styles.tabList, children: [_jsx(Tabs.Trigger, { value: ShareMenuTab.Share, className: styles.tab, children: t['com.affine.share-menu.shareButton']() }), _jsx(Tabs.Trigger, { value: ShareMenuTab.Export, className: styles.tab, style: {
                                display: BUILD_CONFIG.isMobileEdition ? 'none' : undefined,
                            }, children: t['Export']() }), _jsx(Tabs.Trigger, { value: ShareMenuTab.Invite, style: { display: 'none' }, children: "invite" }), _jsx(Tabs.Trigger, { value: ShareMenuTab.Members, style: { display: 'none' }, children: "members" })] }), _jsx(Tabs.Content, { value: ShareMenuTab.Share, children: _jsx(SharePage, { hittingPaywall: !!hittingPaywall, openPaywallModal: openPaywallModal, onClickInvite: () => {
                            setCurrentTab(ShareMenuTab.Invite);
                        }, onClickMembers: () => {
                            setCurrentTab(ShareMenuTab.Members);
                        }, ...props }) }), _jsx(Tabs.Content, { value: ShareMenuTab.Export, children: _jsx(ShareExport, {}) }), _jsx(Tabs.Content, { value: ShareMenuTab.Invite, children: _jsx("div", { children: "null" }) }), _jsx(Tabs.Content, { value: ShareMenuTab.Members, children: _jsx("div", { children: "null" }) })] }) }));
};
const DefaultShareButton = forwardRef(function DefaultShareButton(_, ref) {
    const t = useI18n();
    const shareInfoService = useService(ShareInfoService);
    const shared = useLiveData(shareInfoService.shareInfo.isShared$);
    useEffect(() => {
        shareInfoService.shareInfo.revalidate();
    }, [shareInfoService]);
    return (_jsx(Tooltip, { content: shared
            ? t['com.affine.share-menu.option.link.readonly.description']()
            : t['com.affine.share-menu.option.link.no-access.description'](), children: _jsx(Button, { ref: ref, className: styles.button, variant: "primary", children: _jsxs("div", { className: styles.buttonContainer, children: [shared ? _jsx(PublishIcon, { fontSize: 16 }) : _jsx(LockIcon, { fontSize: 16 }), t['com.affine.share-menu.shareButton']()] }) }) }));
});
const LocalShareMenu = (props) => {
    return (_jsx(Menu, { items: _jsx(ShareMenuContent, { ...props }), contentOptions: {
            className: styles.localMenuStyle,
            ['data-testid']: 'local-share-menu',
            align: 'end',
        }, rootOptions: {
            modal: false,
            onOpenChange: props.onOpenShareModal,
        }, children: _jsx("div", { "data-testid": "local-share-menu-button", children: props.children || _jsx(DefaultShareButton, {}) }) }));
};
const CloudShareMenu = (props) => {
    return (_jsx(Menu, { items: _jsx(ShareMenuContent, { ...props }), contentOptions: {
            className: styles.menuStyle,
            ['data-testid']: 'cloud-share-menu',
            align: 'end',
        }, rootOptions: {
            modal: false,
            onOpenChange: props.onOpenShareModal,
        }, children: _jsx("div", { "data-testid": "cloud-share-menu-button", children: props.children || _jsx(DefaultShareButton, {}) }) }));
};
export const ShareMenu = (props) => {
    const { workspaceMetadata } = props;
    if (workspaceMetadata.flavour === 'local') {
        return _jsx(LocalShareMenu, { ...props });
    }
    return _jsx(CloudShareMenu, { ...props });
};
//# sourceMappingURL=share-menu.js.map