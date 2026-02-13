import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Loading, notify, useConfirmModal } from '@affine/component';
import { InviteTeamMemberModal, MemberLimitModal, } from '@affine/component/member-components';
import { SettingRow } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { Upload } from '@affine/core/components/pure/file-upload';
import { ServerService, SubscriptionService, WorkspaceSubscriptionService, } from '@affine/core/modules/cloud';
import { WorkspaceMembersService, WorkspacePermissionService, } from '@affine/core/modules/permissions';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { WorkspaceShareSettingService } from '@affine/core/modules/share-setting';
import { copyTextToClipboard } from '@affine/core/utils/clipboard';
import { emailRegex } from '@affine/core/utils/email-regex';
import { UserFriendlyError } from '@affine/error';
import { ServerDeploymentType, SubscriptionPlan } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ExportIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MemberList } from './member-list';
import * as styles from './styles.css';
const parseCSV = async (blob) => {
    try {
        const textContent = await blob.text();
        const emails = textContent
            .split('\n')
            .map(email => email.trim())
            .filter(email => email.length > 0 && emailRegex.test(email));
        return emails;
    }
    catch (error) {
        console.error('Error parsing CSV:', error);
        throw new Error('Failed to parse CSV');
    }
};
export const CloudWorkspaceMembersPanel = ({ onChangeSettingState, isTeam, }) => {
    const workspaceShareSettingService = useService(WorkspaceShareSettingService);
    const subscription = useService(WorkspaceSubscriptionService).subscription;
    const workspaceSubscription = useLiveData(subscription.subscription$);
    const inviteLink = useLiveData(workspaceShareSettingService.sharePreview.inviteLink$);
    const serverService = useService(ServerService);
    const hasPaymentFeature = useLiveData(serverService.server.features$.map(f => f?.payment));
    const isSelfhosted = useLiveData(serverService.server.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const membersService = useService(WorkspaceMembersService);
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const isAdmin = useLiveData(permissionService.permission.isAdmin$);
    const isOwnerOrAdmin = isOwner || isAdmin;
    useEffect(() => {
        permissionService.permission.revalidate();
    }, [permissionService]);
    useEffect(() => {
        membersService.members.revalidate();
    }, [membersService]);
    const workspaceQuotaService = useService(WorkspaceQuotaService);
    useEffect(() => {
        workspaceQuotaService.quota.revalidate();
    }, [workspaceQuotaService]);
    const isLoading = useLiveData(workspaceQuotaService.quota.isRevalidating$);
    const error = useLiveData(workspaceQuotaService.quota.error$);
    const workspaceQuota = useLiveData(workspaceQuotaService.quota.quota$);
    const subscriptionService = useService(SubscriptionService);
    const plan = useLiveData(subscriptionService.subscription.pro$.map(s => s?.plan));
    const t = useI18n();
    const [openInvite, setOpenInvite] = useState(false);
    const [openMemberLimit, setOpenMemberLimit] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const { openConfirmModal, closeConfirmModal } = useConfirmModal();
    const goToTeamBilling = useCallback(() => {
        onChangeSettingState({
            activeTab: isSelfhosted ? 'workspace:license' : 'workspace:billing',
        });
    }, [isSelfhosted, onChangeSettingState]);
    const [idempotencyKey, setIdempotencyKey] = useState(nanoid());
    const resume = useAsyncCallback(async () => {
        try {
            setIsMutating(true);
            await subscription.resumeSubscription(idempotencyKey, SubscriptionPlan.Team);
            await subscription.waitForRevalidation();
            // refresh idempotency key
            setIdempotencyKey(nanoid());
            closeConfirmModal();
            notify.success({
                title: t['com.affine.payment.resume.success.title'](),
                message: t['com.affine.payment.resume.success.team.message'](),
            });
        }
        catch (err) {
            const error = UserFriendlyError.fromAny(err);
            notify.error({
                title: error.name,
                message: error.message,
            });
        }
        finally {
            setIsMutating(false);
        }
    }, [subscription, idempotencyKey, closeConfirmModal, t]);
    const openInviteModal = useCallback(() => {
        if (isTeam && workspaceSubscription?.canceledAt) {
            openConfirmModal({
                title: t['com.affine.payment.member.team.retry-payment.title'](),
                description: t[`com.affine.payment.member.team.disabled-subscription.${isOwner ? 'owner' : 'admin'}.description`](),
                confirmText: t[isOwner
                    ? 'com.affine.payment.member.team.disabled-subscription.resume-subscription'
                    : 'Got it'](),
                cancelText: t['Cancel'](),
                cancelButtonOptions: {
                    style: {
                        visibility: isOwner ? 'visible' : 'hidden',
                    },
                },
                onConfirm: isOwner ? resume : undefined,
                confirmButtonOptions: {
                    variant: 'primary',
                    loading: isMutating,
                },
            });
            return;
        }
        setOpenInvite(true);
    }, [
        isMutating,
        isOwner,
        isTeam,
        openConfirmModal,
        resume,
        t,
        workspaceSubscription?.canceledAt,
    ]);
    const onGenerateInviteLink = useCallback(async (expireTime) => {
        const { link } = await membersService.generateInviteLink(expireTime);
        workspaceShareSettingService.sharePreview.revalidate();
        return link;
    }, [membersService, workspaceShareSettingService.sharePreview]);
    const onRevokeInviteLink = useCallback(async () => {
        const success = await membersService.revokeInviteLink();
        workspaceShareSettingService.sharePreview.revalidate();
        return success;
    }, [membersService, workspaceShareSettingService.sharePreview]);
    const onInviteBatchConfirm = useAsyncCallback(async ({ emails, }) => {
        setIsMutating(true);
        const uniqueEmails = deduplicateEmails(emails);
        if (!isTeam &&
            workspaceQuota &&
            uniqueEmails.length >
                workspaceQuota.memberLimit - workspaceQuota.memberCount) {
            setOpenMemberLimit(true);
            setIsMutating(false);
            return;
        }
        const results = await membersService.inviteMembers(uniqueEmails);
        const unSuccessInvites = results.reduce((acc, result) => {
            if (!result.sentSuccess) {
                acc.push(result.email);
            }
            return acc;
        }, []);
        if (results) {
            notify({
                title: t['com.affine.payment.member.team.invite.notify.title']({
                    successCount: (uniqueEmails.length - unSuccessInvites.length).toString(),
                    failedCount: unSuccessInvites.length.toString(),
                }),
                message: _jsx(NotifyMessage, { unSuccessInvites: unSuccessInvites }),
            });
            setOpenInvite(false);
            membersService.members.revalidate();
            workspaceQuotaService.quota.revalidate();
        }
        setIsMutating(false);
    }, [isTeam, membersService, t, workspaceQuota, workspaceQuotaService.quota]);
    const onImportCSV = useAsyncCallback(async (file) => {
        setIsMutating(true);
        const emails = await parseCSV(file);
        onInviteBatchConfirm({ emails });
        setIsMutating(false);
    }, [onInviteBatchConfirm]);
    const handleUpgradeConfirm = useCallback(() => {
        onChangeSettingState({
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
        track.$.settingsPanel.workspace.viewPlans({
            control: 'inviteMember',
        });
    }, [onChangeSettingState]);
    const desc = useMemo(() => {
        if (!workspaceQuota)
            return null;
        if (isTeam) {
            return _jsx("span", { children: t['com.affine.payment.member.team.description']() });
        }
        return (_jsxs("span", { children: [t['com.affine.payment.member.description2'](), hasPaymentFeature && isOwner ? (_jsx("div", { className: styles.goUpgradeWrapper, onClick: handleUpgradeConfirm, children: _jsx("span", { className: styles.goUpgrade, children: t['com.affine.payment.member.description.choose-plan']() }) })) : null] }));
    }, [
        handleUpgradeConfirm,
        hasPaymentFeature,
        isOwner,
        isTeam,
        t,
        workspaceQuota,
    ]);
    const title = useMemo(() => {
        if (isTeam) {
            return `${t['Members']()} (${workspaceQuota?.memberCount})`;
        }
        return `${t['Members']()} (${workspaceQuota?.memberCount}/${workspaceQuota?.memberLimit})`;
    }, [isTeam, t, workspaceQuota?.memberCount, workspaceQuota?.memberLimit]);
    if (workspaceQuota === null) {
        if (isLoading) {
            return _jsx(MembersPanelFallback, {});
        }
        else {
            return (_jsx("span", { className: styles.errorStyle, children: error
                    ? UserFriendlyError.fromAny(error).message
                    : 'Failed to load members' }));
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx(SettingRow, { name: title, desc: desc, spreadCol: !!isOwnerOrAdmin, children: isOwnerOrAdmin ? (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: openInviteModal, children: t['Invite Members']() }), !isTeam ? (_jsx(MemberLimitModal, { isFreePlan: !plan, open: openMemberLimit, plan: workspaceQuota.humanReadable.name ?? '', quota: workspaceQuota.humanReadable.memberLimit ?? '', setOpen: setOpenMemberLimit, onConfirm: handleUpgradeConfirm })) : null, _jsx(InviteTeamMemberModal, { open: openInvite, setOpen: setOpenInvite, onConfirm: onInviteBatchConfirm, isMutating: isMutating, copyTextToClipboard: copyTextToClipboard, onGenerateInviteLink: onGenerateInviteLink, onRevokeInviteLink: onRevokeInviteLink, importCSV: _jsx(ImportCSV, { onImport: onImportCSV }), invitationLink: inviteLink })] })) : null }), _jsx("div", { className: styles.membersPanel, children: _jsx(MemberList, { isOwner: !!isOwner, isAdmin: !!isAdmin, goToTeamBilling: goToTeamBilling }) })] }));
};
const NotifyMessage = ({ unSuccessInvites, }) => {
    const t = useI18n();
    if (unSuccessInvites.length === 0) {
        return t['Invitation sent hint']();
    }
    return (_jsxs("div", { children: [t['com.affine.payment.member.team.invite.notify.fail-message'](), unSuccessInvites.map((email, index) => (_jsx("div", { children: email }, `${index}:${email}`)))] }));
};
export const MembersPanelFallback = () => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx(SettingRow, { name: t['Members'](), desc: t['com.affine.payment.member.description2']() }), _jsx("div", { className: styles.membersPanel, children: _jsx(MemberListFallback, { memberCount: 1 }) })] }));
};
const MemberListFallback = ({ memberCount }) => {
    // prevent page jitter
    const height = useMemo(() => {
        if (memberCount) {
            // height and margin-bottom
            return memberCount * 58 + (memberCount - 1) * 6;
        }
        return 'auto';
    }, [memberCount]);
    const t = useI18n();
    return (_jsxs("div", { style: {
            height,
        }, className: styles.membersFallback, children: [_jsx(Loading, { size: 20 }), _jsx("span", { children: t['com.affine.settings.member.loading']() })] }));
};
const ImportCSV = ({ onImport }) => {
    const t = useI18n();
    return (_jsx(Upload, { accept: "text/csv", fileChange: onImport, children: _jsx(Button, { className: styles.importButton, prefix: _jsx(ExportIcon, {}), variant: "secondary", children: t['com.affine.payment.member.team.invite.import-csv']() }) }));
};
function deduplicateEmails(emails) {
    const seenEmails = new Set();
    return emails.filter(email => {
        const lowerCaseEmail = email.trim().toLowerCase();
        if (seenEmails.has(lowerCaseEmail)) {
            return false;
        }
        else {
            seenEmails.add(lowerCaseEmail);
            return true;
        }
    });
}
//# sourceMappingURL=cloud-members-panel.js.map