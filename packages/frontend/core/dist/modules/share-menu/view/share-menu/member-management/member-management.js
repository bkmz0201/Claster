import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { useGuard } from '@affine/core/components/guard';
import { DocService } from '@affine/core/modules/doc';
import { DocGrantedUsersService, } from '@affine/core/modules/permissions';
import { useI18n } from '@affine/i18n';
import { ArrowLeftBigIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Scroller } from '../scroller';
import { MemberItem } from './member-item';
import * as styles from './member-management.css';
export const MemberManagement = ({ openPaywallModal, hittingPaywall, onClickBack, onClickInvite, }) => {
    const docGrantedUsersService = useService(DocGrantedUsersService);
    const grantedUserList = useLiveData(docGrantedUsersService.grantedUsers$);
    const grantedUserCount = useLiveData(docGrantedUsersService.grantedUserCount$);
    const docService = useService(DocService);
    const canManageUsers = useGuard('Doc_Users_Manage', docService.doc.id);
    const t = useI18n();
    useEffect(() => {
        // reset the list when mounted
        docGrantedUsersService.reset();
        docGrantedUsersService.loadMore();
    }, [docGrantedUsersService]);
    const loadMore = useCallback(() => {
        docGrantedUsersService.loadMore();
    }, [docGrantedUsersService]);
    return (_jsxs("div", { className: styles.containerStyle, children: [_jsxs("div", { className: styles.headerStyle, onClick: onClickBack, children: [_jsx(ArrowLeftBigIcon, { className: styles.iconStyle }), t['com.affine.share-menu.member-management.header']({
                        memberCount: grantedUserCount?.toString() || '??',
                    })] }), grantedUserList ? (_jsx(MemberList, { openPaywallModal: openPaywallModal, hittingPaywall: hittingPaywall, grantedUserList: grantedUserList, grantedUserCount: grantedUserCount, loadMore: loadMore, canManageUsers: !!canManageUsers })) : (_jsx(Skeleton, { className: styles.scrollableRootStyle })), _jsx("div", { className: styles.footerStyle, children: canManageUsers ? (_jsx("span", { className: styles.addCollaboratorsStyle, onClick: onClickInvite, children: t['com.affine.share-menu.member-management.add-collaborators']() })) : null })] }));
};
const MemberList = ({ openPaywallModal, hittingPaywall, grantedUserList, grantedUserCount, loadMore, canManageUsers, }) => {
    const itemContentRenderer = useCallback((_index, data) => {
        return (_jsx(MemberItem, { grantedUser: data, openPaywallModal: openPaywallModal, hittingPaywall: hittingPaywall, canManageUsers: canManageUsers }, data.user.id));
    }, [canManageUsers, hittingPaywall, openPaywallModal]);
    return (_jsx("div", { className: styles.memberListStyle, children: grantedUserList.length < 8 ? (grantedUserList.map(item => (_jsx(MemberItem, { grantedUser: item, openPaywallModal: openPaywallModal, hittingPaywall: hittingPaywall, canManageUsers: canManageUsers }, item.user.id)))) : (_jsx(Virtuoso, { components: {
                Scroller,
            }, data: grantedUserList, itemContent: itemContentRenderer, totalCount: grantedUserCount, endReached: loadMore })) }));
};
//# sourceMappingURL=member-management.js.map