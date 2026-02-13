import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, Skeleton } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { useGuard } from '@affine/core/components/guard';
import { ServerService } from '@affine/core/modules/cloud';
import { DocService } from '@affine/core/modules/doc';
import { ShareInfoService } from '@affine/core/modules/share-doc';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CloudSvg } from '../cloud-svg';
import { CopyLinkButton } from './copy-link-button';
import { MembersPermission, PublicDoc } from './general-access';
import * as styles from './index.css';
import { InviteInput } from './invite-member-editor';
import { MembersRow } from './member-management';
export const LocalSharePage = (props) => {
    const t = useI18n();
    const { workspaceMetadata: { id: workspaceId }, } = props;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.localSharePage, children: [_jsxs("div", { className: styles.columnContainerStyle, style: { gap: '12px' }, children: [_jsx("div", { className: styles.descriptionStyle, style: { maxWidth: '230px' }, children: t['com.affine.share-menu.EnableCloudDescription']() }), _jsx("div", { children: _jsx(Button, { onClick: props.onEnableAffineCloud, variant: "primary", "data-testid": "share-menu-enable-affine-cloud-button", children: t['Enable AFFiNE Cloud']() }) })] }), _jsx("div", { className: styles.cloudSvgContainer, children: _jsx(CloudSvg, {}) })] }), _jsx(CopyLinkButton, { workspaceId: workspaceId, secondary: true })] }));
};
export const AFFiNESharePage = (props) => {
    const t = useI18n();
    const { workspaceMetadata: { id: workspaceId }, } = props;
    const shareInfoService = useService(ShareInfoService);
    const serverService = useService(ServerService);
    const docService = useService(DocService);
    const canManageUsers = useGuard('Doc_Users_Manage', docService.doc.id);
    const canPublish = useGuard('Doc_Publish', docService.doc.id);
    useEffect(() => {
        shareInfoService.shareInfo.revalidate();
    }, [shareInfoService]);
    const isSharedPage = useLiveData(shareInfoService.shareInfo.isShared$);
    const sharedMode = useLiveData(shareInfoService.shareInfo.sharedMode$);
    const baseUrl = serverService.server.baseUrl;
    const isLoading = isSharedPage === null || sharedMode === null || baseUrl === null;
    if (isLoading) {
        // TODO(@eyhn): loading and error UI
        return (_jsxs(_Fragment, { children: [_jsx(Skeleton, { height: 100 }), _jsx(Skeleton, { height: 40 })] }));
    }
    return (_jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.columnContainerStyle, children: [_jsxs("div", { className: styles.memberRowsStyle, children: [canManageUsers && _jsx(InviteInput, { onFocus: props.onClickInvite }), _jsx(MembersRow, { onClick: props.onClickMembers })] }), _jsx("div", { className: styles.generalAccessStyle, children: t['com.affine.share-menu.generalAccess']() }), _jsx(MembersPermission, { openPaywallModal: props.openPaywallModal, hittingPaywall: !!props.hittingPaywall, disabled: !canManageUsers }), _jsx(PublicDoc, { disabled: !canPublish })] }), _jsx(Divider, { className: styles.divider }), _jsx(CopyLinkButton, { workspaceId: workspaceId })] }));
};
export const SharePage = (props) => {
    if (props.workspaceMetadata.flavour === 'local') {
        return _jsx(LocalSharePage, { ...props });
    }
    else {
        return (
        // TODO(@eyhn): refactor this part
        _jsx(ErrorBoundary, { fallback: null, children: _jsx(Suspense, { children: _jsx(AFFiNESharePage, { ...props }) }) }));
    }
};
//# sourceMappingURL=share-page.js.map