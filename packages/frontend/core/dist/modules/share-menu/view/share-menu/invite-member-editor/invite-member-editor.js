import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Loading, Menu, MenuItem, MenuTrigger, notify, RowInput, } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DocGrantedUsersService, MemberSearchService, } from '@affine/core/modules/permissions';
import { UserFriendlyError } from '@affine/error';
import { DocRole, WorkspaceMemberStatus } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ArrowLeftBigIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { PlanTag } from '../plan-tag';
import { Scroller } from '../scroller';
import * as styles from './invite-member-editor.css';
import { MemberItem } from './member-item';
import { SelectedMemberItem } from './selected-member-item';
const getRoleName = (role, t) => {
    switch (role) {
        case DocRole.Manager:
            return t['com.affine.share-menu.option.permission.can-manage']();
        case DocRole.Editor:
            return t['com.affine.share-menu.option.permission.can-edit']();
        case DocRole.Reader:
            return t['com.affine.share-menu.option.permission.can-read']();
        default:
            return '';
    }
};
export const InviteMemberEditor = ({ openPaywallModal, hittingPaywall, onClickCancel, }) => {
    const t = useI18n();
    const [selectedMembers, setSelectedMembers] = useState([]);
    const docGrantedUsersService = useService(DocGrantedUsersService);
    const [inviteDocRoleType, setInviteDocRoleType] = useState(DocRole.Manager);
    const memberSearchService = useService(MemberSearchService);
    useEffect(() => {
        // reset the search text when the component is mounted
        memberSearchService.reset();
        memberSearchService.loadMore();
    }, [memberSearchService]);
    const debouncedSearch = useMemo(() => debounce((value) => memberSearchService.search(value), 300), [memberSearchService]);
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [composing, setComposing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const handleValueChange = useCallback((value) => {
        setSearchText(value);
        if (!composing) {
            debouncedSearch(value);
        }
    }, [composing, debouncedSearch]);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const onInvite = useAsyncCallback(async () => {
        const selectedMemberIds = selectedMembers.map(member => member.id);
        track.$.sharePanel.$.inviteUserDocRole({
            control: 'member list',
            role: inviteDocRoleType,
        });
        try {
            await docGrantedUsersService.grantUsersRole(selectedMemberIds, inviteDocRoleType);
            onClickCancel();
            notify.success({
                title: t['Invitation sent'](),
            });
        }
        catch (error) {
            const err = UserFriendlyError.fromAny(error);
            notify.error({
                title: t[`error.${err.name}`](err.data),
            });
        }
    }, [
        docGrantedUsersService,
        inviteDocRoleType,
        onClickCancel,
        selectedMembers,
        t,
    ]);
    const handleCompositionStart = useCallback(() => {
        setComposing(true);
    }, []);
    const handleCompositionEnd = useCallback(e => {
        setComposing(false);
        debouncedSearch(e.currentTarget.value);
    }, [debouncedSearch]);
    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);
    const onFocus = useCallback(() => {
        setFocused(true);
    }, []);
    const onBlur = useCallback(() => {
        setFocused(false);
    }, []);
    const handleRemoved = useCallback((memberId) => {
        setSelectedMembers(prev => prev.filter(member => member.id !== memberId));
        focusInput();
    }, [focusInput]);
    const switchToMemberManagementTab = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'workspace:members',
        });
    }, [workspaceDialogService]);
    const handleClickMember = useCallback((member) => {
        setSelectedMembers(prev => {
            if (prev.some(m => m.id === member.id)) {
                // if the member is already in the list, just return
                return prev;
            }
            return [...prev, member];
        });
        setSearchText('');
        memberSearchService.search('');
        focusInput();
    }, [focusInput, memberSearchService]);
    const handleRoleChange = useCallback((role) => {
        setInviteDocRoleType(role);
    }, []);
    return (_jsxs("div", { className: styles.containerStyle, children: [_jsxs("div", { className: styles.headerStyle, onClick: onClickCancel, children: [_jsx(ArrowLeftBigIcon, { className: styles.iconStyle }), t['com.affine.share-menu.invite-editor.header']()] }), _jsxs("div", { className: styles.memberListStyle, children: [_jsxs("div", { className: clsx(styles.InputContainer, {
                            focus: focused,
                        }), children: [_jsxs("div", { className: styles.inlineMembersContainer, children: [selectedMembers.map((member, idx) => {
                                        if (!member) {
                                            return null;
                                        }
                                        const onRemoved = () => handleRemoved(member.id);
                                        return (_jsx(SelectedMemberItem, { idx: idx, onRemoved: onRemoved, member: member }, member.id));
                                    }), _jsx(RowInput, { ref: inputRef, value: searchText, onChange: handleValueChange, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onFocus: onFocus, onBlur: onBlur, autoFocus: true, className: styles.searchInput, placeholder: selectedMembers.length
                                            ? ''
                                            : t['com.affine.share-menu.invite-editor.placeholder']() })] }), !selectedMembers.length ? null : (_jsx(RoleSelector, { openPaywallModal: openPaywallModal, hittingPaywall: hittingPaywall, inviteDocRoleType: inviteDocRoleType, onRoleChange: handleRoleChange }))] }), _jsx("div", { className: styles.resultContainer, children: _jsx(Result, { onClickMember: handleClickMember }) })] }), _jsxs("div", { className: styles.footerStyle, children: [_jsx("span", { className: styles.manageMemberStyle, onClick: switchToMemberManagementTab, children: t['com.affine.share-menu.invite-editor.manage-members']() }), _jsxs("div", { className: styles.buttonsContainer, children: [_jsx(Button, { className: styles.button, onClick: onClickCancel, children: t['Cancel']() }), _jsx(Button, { className: styles.button, variant: "primary", disabled: !selectedMembers.length, onClick: onInvite, children: t['com.affine.share-menu.invite-editor.invite']() })] })] })] }));
};
const Result = ({ onClickMember, }) => {
    const memberSearchService = useService(MemberSearchService);
    const searchText = useLiveData(memberSearchService.searchText$);
    const result = useLiveData(memberSearchService.result$);
    const isLoading = useLiveData(memberSearchService.isLoading$);
    const activeMembers = useMemo(() => {
        return result.filter(member => member.status === WorkspaceMemberStatus.Accepted);
    }, [result]);
    const itemContentRenderer = useCallback((_index, data) => {
        return _jsx(MemberItem, { member: data, onSelect: onClickMember });
    }, [onClickMember]);
    const t = useI18n();
    const loadMore = useCallback(() => {
        memberSearchService.loadMore();
    }, [memberSearchService]);
    if (!searchText) {
        return null;
    }
    if (!activeMembers || activeMembers.length === 0) {
        if (isLoading) {
            return _jsx(Loading, {});
        }
        return (_jsx("div", { className: styles.noFound, children: t['com.affine.share-menu.invite-editor.no-found']() }));
    }
    return activeMembers.length < 8 ? (_jsx("div", { children: activeMembers.map(member => (_jsx(MemberItem, { member: member, onSelect: onClickMember }, member.id))) })) : (_jsx(Virtuoso, { components: {
            Scroller,
        }, data: activeMembers, itemContent: itemContentRenderer, endReached: loadMore }));
};
const RoleSelector = ({ openPaywallModal, hittingPaywall, inviteDocRoleType, onRoleChange, }) => {
    const t = useI18n();
    const currentRoleName = useMemo(() => getRoleName(inviteDocRoleType, t), [inviteDocRoleType, t]);
    const changeToAdmin = useCallback(() => onRoleChange(DocRole.Manager), [onRoleChange]);
    const changeToWrite = useCallback(() => {
        if (hittingPaywall) {
            openPaywallModal();
            return;
        }
        onRoleChange(DocRole.Editor);
    }, [hittingPaywall, onRoleChange, openPaywallModal]);
    const changeToRead = useCallback(() => {
        if (hittingPaywall) {
            openPaywallModal();
            return;
        }
        onRoleChange(DocRole.Reader);
    }, [hittingPaywall, onRoleChange, openPaywallModal]);
    return (_jsx("div", { className: styles.roleSelectorContainer, children: _jsx(Menu, { contentOptions: {
                align: 'end',
            }, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onSelect: changeToAdmin, selected: inviteDocRoleType === DocRole.Manager, children: t['com.affine.share-menu.option.permission.can-manage']() }), _jsx(MenuItem, { onSelect: changeToWrite, selected: inviteDocRoleType === DocRole.Editor, children: _jsxs("div", { className: styles.planTagContainer, children: [t['com.affine.share-menu.option.permission.can-edit'](), hittingPaywall ? _jsx(PlanTag, {}) : null] }) }), _jsx(MenuItem, { onSelect: changeToRead, selected: inviteDocRoleType === DocRole.Reader, children: _jsxs("div", { className: styles.planTagContainer, children: [t['com.affine.share-menu.option.permission.can-read'](), hittingPaywall ? _jsx(PlanTag, {}) : null] }) })] }), children: _jsx(MenuTrigger, { className: styles.menuTriggerStyle, variant: "plain", contentStyle: {
                    width: '100%',
                }, children: currentRoleName }) }) }));
};
//# sourceMappingURL=invite-member-editor.js.map