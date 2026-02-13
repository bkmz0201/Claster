import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Popover, uniReactRoot } from '@affine/component';
import { createIcon, EditorHostKey, } from '@blocksuite/affine/blocks/database';
import { UserListProvider, UserProvider, } from '@blocksuite/affine/shared/services';
import { computed } from '@preact/signals-core';
import { forwardRef, useImperativeHandle, useMemo, } from 'react';
import { useSignalValue } from '../../../../modules/doc-info/utils';
import { useMemberInfo } from '../../hooks/use-member-info';
import { memberPropertyModelConfig } from './define';
import { MultiMemberSelect } from './multi-member-select';
import * as styles from './style.css';
class MemberManager {
    get readonly() {
        return this.cell.property.readonly$;
    }
    constructor(props) {
        this.memberList = computed(() => this.cell.value$.value ?? []);
        this.setMemberList = (memberList) => {
            this.cell.valueSet(memberList);
        };
        this.cell = props.cell;
        this.selectCurrentCell = props.selectCurrentCell;
        this.isEditing = props.isEditing$;
        const host = this.cell.view.serviceGet(EditorHostKey);
        this.userService = host?.std.getOptional(UserProvider);
        this.userListService = host?.std.getOptional(UserListProvider);
    }
}
const MemberCellComponent = (props, ref) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const manager = useMemo(() => new MemberManager(props), []);
    useImperativeHandle(ref, () => ({
        beforeEnterEditMode: () => {
            return true;
        },
        beforeExitEditingMode: () => { },
        afterEnterEditingMode: () => { },
        focusCell: () => true,
        blurCell: () => true,
        forceUpdate: () => { },
    }), []);
    const memberList = useSignalValue(manager.memberList);
    const isEditing = useSignalValue(manager.isEditing);
    const renderPopoverContent = () => {
        if (!manager.userService || !manager.userListService) {
            return (_jsx("div", { className: styles.memberPopoverContainer, children: "member list only works in cloud" }));
        }
        return (_jsx(MultiMemberSelect, { multiple: true, value: manager.memberList, onChange: newIds => {
                manager.setMemberList(newIds);
            }, userService: manager.userService, userListService: manager.userListService, onComplete: () => {
                //   manager.selectCurrentCell(false);
            } }));
    };
    return (_jsxs("div", { style: { overflow: 'hidden' }, children: [_jsx(Popover, { open: isEditing, onOpenChange: open => {
                    manager.selectCurrentCell(open);
                }, contentOptions: {
                    className: styles.memberPopoverContent,
                }, content: renderPopoverContent(), children: _jsx("div", {}) }), _jsx("div", { className: styles.cellContainer, children: memberList.map(memberId => (_jsx(MemberPreview, { memberId: memberId, memberManager: manager }, memberId))) })] }));
};
const MemberPreview = ({ memberId, memberManager, }) => {
    const userInfo = useMemberInfo(memberId, memberManager.userService);
    if (!userInfo) {
        return null;
    }
    return (_jsxs("div", { className: styles.memberPreviewContainer, children: [_jsx(Avatar, { name: userInfo.removed ? undefined : (userInfo.name ?? undefined), className: styles.avatar, url: !userInfo.removed ? userInfo.avatar : undefined, size: 24 }), _jsx("div", { className: styles.memberName, children: userInfo.removed ? 'Deleted user' : userInfo.name || 'Unnamed' })] }));
};
const MemberCell = forwardRef(MemberCellComponent);
export const memberPropertyConfig = memberPropertyModelConfig.createPropertyMeta({
    icon: createIcon('MultiPeopleIcon'),
    cellRenderer: {
        view: uniReactRoot.createUniComponent(MemberCell),
    },
});
//# sourceMappingURL=view.js.map