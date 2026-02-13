import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Skeleton, Tooltip } from '@affine/component';
import { DocGrantedUsersService } from '@affine/core/modules/permissions';
import { DocRole } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import * as styles from './styles.css';
export { MemberManagement } from './member-management';
export const MembersRow = ({ onClick }) => {
    const t = useI18n();
    const docGrantedUsersService = useService(DocGrantedUsersService);
    const grantedUserList = useLiveData(docGrantedUsersService.grantedUsers$);
    const grantedUserCount = useLiveData(docGrantedUsersService.grantedUserCount$);
    const loading = useLiveData(docGrantedUsersService.isLoading$);
    const docOwner = useLiveData(docGrantedUsersService.grantedUsers$.map(users => users.find(user => user.role === DocRole.Owner)));
    const topThreeMembers = useMemo(() => grantedUserList
        ?.slice(0, Math.min(3, grantedUserList.length))
        .map(grantedUser => ({
        name: grantedUser.user.name,
        avatarUrl: grantedUser.user.avatarUrl,
        id: grantedUser.user.id,
    })), [grantedUserList]);
    const description = useMemo(() => {
        if (!grantedUserCount || !topThreeMembers || topThreeMembers.length <= 1) {
            return '';
        }
        switch (grantedUserCount) {
            case 2:
                return t['com.affine.share-menu.member-management.member-count-2']({
                    member1: topThreeMembers[0].name,
                    member2: topThreeMembers[1].name,
                });
            case 3:
                return t['com.affine.share-menu.member-management.member-count-3']({
                    member1: topThreeMembers[0].name,
                    member2: topThreeMembers[1].name,
                    member3: topThreeMembers[2].name,
                });
            default:
                return t['com.affine.share-menu.member-management.member-count-more']({
                    member1: topThreeMembers[0].name,
                    member2: topThreeMembers[1].name,
                    memberCount: (grantedUserCount - 2).toString(),
                });
        }
    }, [grantedUserCount, t, topThreeMembers]);
    useEffect(() => {
        docGrantedUsersService.reset();
        docGrantedUsersService.loadMore();
    }, [docGrantedUsersService]);
    if (grantedUserCount &&
        topThreeMembers &&
        topThreeMembers.length > 1 &&
        grantedUserCount > 1) {
        return (_jsx(Tooltip, { content: description, children: _jsxs("div", { className: clsx(styles.rowContainerStyle, 'clickable'), onClick: onClick, children: [_jsxs("div", { className: styles.memberContainerStyle, children: [_jsx("div", { className: styles.avatarsContainerStyle, children: topThreeMembers.map((member, index) => (_jsx(Avatar, { url: member.avatarUrl || '', name: member.name || '', size: 24, style: {
                                        marginLeft: index === 0 ? 0 : -8,
                                        border: `1px solid ${cssVarV2('layer/white')}`,
                                    } }, member.id))) }), _jsx("span", { className: styles.descriptionStyle, children: description })] }), _jsx("div", { className: styles.IconButtonStyle, children: _jsx(ArrowRightSmallIcon, {}) })] }) }));
    }
    if (!docOwner && loading) {
        // is loading
        return (_jsx("div", { className: styles.rowContainerStyle, children: _jsx(Skeleton, {}) }));
    }
    // TODO(@JimmFly): handle the case when there is only one member
    return (_jsxs("div", { className: clsx(styles.rowContainerStyle, 'clickable'), onClick: onClick, children: [docOwner ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.memberContainerStyle, children: [_jsx(Avatar, { url: docOwner.user.avatarUrl || '', name: docOwner.user.name, size: 24 }), _jsx("span", { title: docOwner.user.name, className: styles.memberNameStyle, children: docOwner.user.name })] }), _jsx("div", { className: styles.OwnerStyle, children: t['Owner']() })] })) : (_jsx("div", { children: t['com.affine.share-menu.invite-editor.manage-members']() })), _jsx("div", { className: styles.IconButtonStyle, children: _jsx(ArrowRightSmallIcon, {}) })] }));
};
//# sourceMappingURL=index.js.map