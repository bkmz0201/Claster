import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, uniReactRoot } from '@affine/component';
import { createGroupByConfig, t, ungroups, } from '@blocksuite/affine/blocks/database';
import { useMemberInfo } from '../hooks/use-member-info';
import { avatar, memberName, memberPreviewContainer, } from '../properties/member/style.css';
const MemberPreview = ({ memberId, userService, }) => {
    const userInfo = useMemberInfo(memberId, userService);
    if (!userInfo) {
        return null;
    }
    return (_jsxs("div", { className: memberPreviewContainer, children: [_jsx(Avatar, { name: userInfo.removed ? undefined : (userInfo.name ?? undefined), className: avatar, url: !userInfo.removed ? userInfo.avatar : undefined, size: 20 }), _jsx("div", { className: memberName, children: userInfo.removed ? 'Deleted user' : userInfo.name || 'Unnamed' })] }));
};
const MemberGroupView = (props) => {
    const tType = props.group.tType;
    if (!t.user.is(tType))
        return 'Ungroup';
    const memberId = props.group.value;
    if (memberId == null)
        return 'Ungroup';
    return (_jsx(MemberPreview, { memberId: memberId, userService: tType.data?.userService }));
};
const MultiMemberGroupView = (props) => {
    const tType = props.group.tType;
    if (!t.array.is(tType) || !t.user.is(tType.element))
        return 'Ungroup';
    const memberId = props.group.value;
    if (memberId == null)
        return 'Ungroup';
    return (_jsx(MemberPreview, { memberId: memberId, userService: tType.element.data?.userService }));
};
export const groupByConfigList = [
    createGroupByConfig({
        name: 'member',
        matchType: t.user.instance(),
        groupName: (type, value) => {
            if (t.user.is(type) && typeof value === 'string') {
                const userService = type.data?.userService;
                if (userService) {
                    const userInfo = userService.userInfo$(value).value;
                    if (userInfo && !userInfo?.removed) {
                        return userInfo.name ?? 'Unnamed';
                    }
                }
            }
            return '';
        },
        defaultKeys: () => {
            return [ungroups];
        },
        valuesGroup: value => {
            if (typeof value !== 'string') {
                return [ungroups];
            }
            return [
                {
                    key: value,
                    value: value,
                },
            ];
        },
        addToGroup: v => v,
        view: uniReactRoot.createUniComponent(MemberGroupView),
    }),
    createGroupByConfig({
        name: 'multi-member',
        matchType: t.array.instance(t.user.instance()),
        groupName: (_type, value) => {
            if (t.array.is(_type) &&
                t.user.is(_type.element) &&
                typeof value === 'string') {
                const userService = _type.element.data?.userService;
                if (userService) {
                    const userInfo = userService.userInfo$(value).value;
                    if (userInfo && !userInfo?.removed) {
                        return userInfo.name ?? 'Unnamed';
                    }
                }
            }
            return '';
        },
        defaultKeys: _type => {
            return [ungroups];
        },
        valuesGroup: (value, _type) => {
            if (!Array.isArray(value) || value.length === 0) {
                return [ungroups];
            }
            return value.map(id => ({
                key: id,
                value: id,
            }));
        },
        addToGroup: (value, old) => {
            if (value == null) {
                return old;
            }
            return Array.isArray(old) ? [...old, value] : [value];
        },
        removeFromGroup: (value, old) => {
            if (Array.isArray(old)) {
                return old.filter(v => v !== value);
            }
            return old;
        },
        view: uniReactRoot.createUniComponent(MultiMemberGroupView),
    }),
];
//# sourceMappingURL=index.js.map