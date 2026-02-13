import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, notify } from '@affine/component';
import {} from '@blocksuite/affine/shared/services';
import { computed, signal } from '@preact/signals-core';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, } from 'react';
import { useSignalValue } from '../../../../../modules/doc-info/utils';
import { Spinner } from '../../../components/loading';
import { useMemberInfo } from '../../../hooks/use-member-info';
import * as styles from './style.css';
class MemberManager {
    constructor(ops) {
        this.ops = ops;
        this.selectedMembers = computed(() => {
            if (this.ops.multiple) {
                return this.ops.value.value;
            }
            return this.ops.value.value ? [this.ops.value.value] : [];
        });
        this.selectedMemberId = signal(null);
        this.filteredMembers = computed(() => {
            const isSearching = this.userListService.searchText$.value !== '';
            if (isSearching) {
                return this.ops.userListService.users$.value.filter(member => !member.removed && !this.selectedMembers.value.includes(member.id));
            }
            else {
                const currentUser = this.ops.userService.currentUserInfo$.value;
                return [
                    ...(currentUser ? [currentUser] : []),
                    ...this.ops.userListService.users$.value.filter(member => member.id !== currentUser?.id),
                ].filter(member => !member.removed && !this.selectedMembers.value.includes(member.id));
            }
        });
        this.search = (searchText) => {
            this.userListService.search(searchText);
        };
        this.selectMember = (memberId) => {
            if (this.ops.multiple) {
                if (this.selectedMembers.value.includes(memberId)) {
                    notify.error({
                        title: 'Member already exists',
                        message: 'The member has already been selected',
                    });
                    return;
                }
                this.ops.onChange([...this.selectedMembers.value, memberId]);
                this.moveSelectionAfterSelect(memberId);
                this.ops.userListService.search('');
            }
            else {
                this.ops.onChange(memberId);
            }
        };
        this.moveSelectionAfterSelect = (selectedId) => {
            const members = this.filteredMembers.value;
            const currentIndex = members.findIndex(member => member.id === selectedId);
            if (currentIndex === -1) {
                return;
            }
            const updatedMembers = this.filteredMembers.value;
            const nextMember = updatedMembers[currentIndex + 1];
            if (nextMember) {
                this.selectedMemberId.value = nextMember.id;
                return;
            }
            const prevMember = updatedMembers[currentIndex - 1];
            if (prevMember) {
                this.selectedMemberId.value = prevMember.id;
                return;
            }
            this.selectedMemberId.value = null;
        };
        this.removeMember = (memberId, e) => {
            e?.stopPropagation();
            if (this.ops.multiple) {
                this.ops.onChange(this.ops.value.value.filter(id => id !== memberId));
            }
            else {
                this.ops.onChange(undefined);
            }
        };
        this.complete = () => {
            this.ops.onComplete();
        };
        this.getSelectedIndex = () => {
            if (!this.selectedMemberId.value)
                return -1;
            const members = this.filteredMembers.value;
            return members.findIndex(member => member.id === this.selectedMemberId.value);
        };
        this.moveSelectionUp = () => {
            const members = this.filteredMembers.value;
            if (members.length === 0)
                return;
            const currentIndex = this.getSelectedIndex();
            let newIndex = currentIndex > 0 ? currentIndex - 1 : members.length - 1;
            this.selectedMemberId.value = members[newIndex].id;
        };
        this.moveSelectionDown = () => {
            const members = this.filteredMembers.value;
            if (members.length === 0)
                return;
            const currentIndex = this.getSelectedIndex();
            let newIndex = currentIndex < members.length - 1 ? currentIndex + 1 : 0;
            this.selectedMemberId.value = members[newIndex].id;
        };
        this.scrollSelectedIntoView = (memberListRef) => {
            if (!memberListRef.current)
                return;
            const selectedElement = memberListRef.current.querySelector(`[data-selected="true"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                });
            }
        };
        this.confirmSelection = () => {
            if (this.selectedMemberId.value &&
                this.filteredMembers.value.some(v => v.id === this.selectedMemberId.value)) {
                this.selectMember(this.selectedMemberId.value);
            }
        };
    }
    get userService() {
        return this.ops.userService;
    }
    get userListService() {
        return this.ops.userListService;
    }
}
export const MemberListItem = (props) => {
    const { member, memberManager, isSelected } = props;
    const handleClick = () => {
        memberManager.selectMember(member.id);
    };
    const handleMouseEnter = () => {
        memberManager.selectedMemberId.value = member.id;
    };
    return (_jsxs("div", { className: clsx(styles.memberItem, isSelected && styles.memberSelectedItem), onClick: handleClick, onMouseEnter: handleMouseEnter, "data-selected": isSelected ? 'true' : 'false', children: [_jsx("div", { className: styles.avatar, children: _jsx(Avatar, { name: member.removed ? undefined : (member.name ?? undefined), url: member.avatar, size: 24 }) }), _jsx("div", { className: styles.memberName, children: member.name })] }));
};
export const MemberPreview = ({ memberId, memberManager, onDelete, }) => {
    const userInfo = useMemberInfo(memberId, memberManager.userService);
    if (!userInfo) {
        return null;
    }
    return (_jsxs("div", { className: styles.memberPreviewContainer, children: [_jsx(Avatar, { name: userInfo.removed ? undefined : (userInfo.name ?? undefined), className: styles.avatar, url: !userInfo.removed ? userInfo.avatar : undefined, size: 16 }), _jsx("div", { className: styles.memberName, children: userInfo.removed ? 'Deleted user' : userInfo.name || 'Unnamed' }), onDelete && (_jsx("div", { className: styles.memberDeleteIcon, onClick: onDelete, children: "\u2715" }))] }));
};
export const MultiMemberSelect = props => {
    const inputRef = useRef(null);
    const memberListRef = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memberManager = useMemo(() => new MemberManager(props), []);
    const isLoading = useSignalValue(memberManager.userListService.isLoading$);
    const selectedMembers = useSignalValue(memberManager.selectedMembers);
    const filteredMemberList = useSignalValue(memberManager.filteredMembers);
    const selectedMemberId = useSignalValue(memberManager.selectedMemberId);
    useEffect(() => {
        memberManager.search('');
        const input = inputRef.current;
        if (input) {
            input.focus();
            const handleKeyDown = (e) => {
                e.stopPropagation();
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    memberManager.moveSelectionDown();
                    memberManager.scrollSelectedIntoView(memberListRef);
                }
                else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    memberManager.moveSelectionUp();
                    memberManager.scrollSelectedIntoView(memberListRef);
                }
                else if (e.key === 'Enter') {
                    e.preventDefault();
                    memberManager.confirmSelection();
                }
                else if (e.key === 'Backspace' &&
                    memberManager.userListService.searchText$.value === '') {
                    const selectedMembers = memberManager.selectedMembers.value;
                    const lastId = selectedMembers[selectedMembers.length - 1];
                    if (lastId) {
                        memberManager.removeMember(lastId);
                    }
                }
                else if (e.key === 'Escape') {
                    memberManager.complete();
                }
            };
            input.addEventListener('keydown', handleKeyDown);
            return () => {
                input.removeEventListener('keydown', handleKeyDown);
            };
        }
        return;
    }, [memberManager]);
    const handleInputChange = (event) => {
        memberManager.search(event.target.value);
    };
    return (_jsxs("div", { "data-peek-view-wrapper": "true", className: styles.multiMemberSelectContainer, onClick: () => inputRef.current?.focus(), children: [_jsxs("div", { className: styles.memberInputContainer, children: [selectedMembers.map(memberId => (_jsx(MemberPreview, { memberId: memberId, memberManager: memberManager, onDelete: () => memberManager.removeMember(memberId) }, memberId))), _jsx("input", { ref: inputRef, className: styles.memberSearchInput, placeholder: selectedMembers.length > 0 ? '' : 'Search members...', value: memberManager.userListService.searchText$.value, onChange: handleInputChange })] }), _jsx("div", { className: styles.memberListContainer, ref: memberListRef, children: isLoading ? (_jsxs("div", { className: styles.loadingContainer, children: [_jsx(Spinner, {}), "Loading..."] })) : filteredMemberList.length === 0 ? (_jsx("div", { className: styles.noResultContainer, children: "No results" })) : (filteredMemberList.map(member => (_jsx(MemberListItem, { member: member, memberManager: memberManager, isSelected: member.id === selectedMemberId }, member.id)))) })] }));
};
//# sourceMappingURL=index.js.map