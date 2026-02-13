import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { WorkspaceInviteLinkExpireTime, } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { CloseIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useMemo, useState } from 'react';
import { Button, IconButton } from '../../../ui/button';
import Input from '../../../ui/input';
import { Menu, MenuItem, MenuTrigger } from '../../../ui/menu';
import { notify } from '../../../ui/notification';
import * as styles from './styles.css';
const getMenuItems = (t) => [
    {
        label: t['com.affine.payment.member.team.invite.expiration-date']({
            number: '1',
        }),
        value: WorkspaceInviteLinkExpireTime.OneDay,
    },
    {
        label: t['com.affine.payment.member.team.invite.expiration-date']({
            number: '3',
        }),
        value: WorkspaceInviteLinkExpireTime.ThreeDays,
    },
    {
        label: t['com.affine.payment.member.team.invite.expiration-date']({
            number: '7',
        }),
        value: WorkspaceInviteLinkExpireTime.OneWeek,
    },
    {
        label: t['com.affine.payment.member.team.invite.expiration-date']({
            number: '30',
        }),
        value: WorkspaceInviteLinkExpireTime.OneMonth,
    },
];
export const LinkInvite = ({ invitationLink, copyTextToClipboard, generateInvitationLink, revokeInvitationLink, }) => {
    const t = useI18n();
    const [selectedValue, setSelectedValue] = useState(WorkspaceInviteLinkExpireTime.OneWeek);
    const menuItems = getMenuItems(t);
    const items = useMemo(() => {
        return menuItems.map(item => (_jsx(MenuItem, { onSelect: () => setSelectedValue(item.value), children: item.label }, item.value)));
    }, [menuItems]);
    const currentSelectedLabel = useMemo(() => menuItems.find(item => item.value === selectedValue)?.label, [menuItems, selectedValue]);
    const onGenerate = useCallback(() => {
        generateInvitationLink(selectedValue).catch(err => {
            console.error('Failed to generate invitation link: ', err);
            notify.error({
                title: 'Failed to generate invitation link',
                message: err.message,
            });
        });
    }, [generateInvitationLink, selectedValue]);
    const onCopy = useCallback(() => {
        if (!invitationLink) {
            return;
        }
        copyTextToClipboard(invitationLink.link)
            .then(() => notify.success({
            title: t['Copied link to clipboard'](),
        }))
            .catch(err => {
            console.error('Failed to copy text: ', err);
            notify.error({
                title: 'Failed to copy link to clipboard',
                message: err.message,
            });
        });
    }, [copyTextToClipboard, invitationLink, t]);
    const onReset = useCallback(() => {
        revokeInvitationLink().catch(err => {
            console.error('Failed to revoke invitation link: ', err);
            notify.error({
                title: 'Failed to revoke invitation link',
                message: err.message,
            });
        });
    }, [revokeInvitationLink]);
    const expireTime = useMemo(() => {
        return t['com.affine.payment.member.team.invite.expire-at']({
            expireTime: invitationLink?.expireTime
                ? new Date(invitationLink.expireTime).toLocaleString()
                : '',
        });
    }, [invitationLink, t]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.invitationLinkContainer, children: [_jsx("div", { className: styles.modalSubTitle, children: t['com.affine.payment.member.team.invite.link-expiration']() }), invitationLink ? (_jsx(Input, { value: expireTime, disabled: true, style: {
                            backgroundColor: cssVarV2('input/background'),
                        } })) : (_jsx(Menu, { items: items, contentOptions: {
                            style: {
                                width: 'var(--radix-dropdown-menu-trigger-width)',
                            },
                        }, children: _jsx(MenuTrigger, { style: { width: '100%' }, children: currentSelectedLabel }) }))] }), _jsxs("div", { className: styles.invitationLinkContainer, children: [_jsx("div", { className: styles.modalSubTitle, children: t['com.affine.payment.member.team.invite.invitation-link']() }), _jsxs("div", { className: styles.invitationLinkContent, children: [_jsx(Input, { value: invitationLink
                                    ? invitationLink.link
                                    : 'https://your-app.com/invite/xxxxxxxx', inputMode: "none", disabled: true, inputStyle: {
                                    fontSize: cssVar('fontXs'),
                                    color: cssVarV2(invitationLink ? 'text/primary' : 'text/placeholder'),
                                    backgroundColor: cssVarV2('layer/background/primary'),
                                } }), invitationLink ? (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: onCopy, variant: "secondary", children: t['com.affine.payment.member.team.invite.copy']() }), _jsx(IconButton, { icon: _jsx(CloseIcon, {}), onClick: onReset })] })) : (_jsx(Button, { onClick: onGenerate, variant: "secondary", children: t['com.affine.payment.member.team.invite.generate']() }))] }), _jsx("p", { className: styles.invitationLinkDescription, children: t['com.affine.payment.member.team.invite.invitation-link.description']() })] })] }));
};
//# sourceMappingURL=link-invite.js.map