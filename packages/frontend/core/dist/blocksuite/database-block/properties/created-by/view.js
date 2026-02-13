import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, uniReactRoot } from '@affine/component';
import { createIcon, EditorHostKey, } from '@blocksuite/affine/blocks/database';
import { UserProvider, } from '@blocksuite/affine/shared/services';
import { css } from '@emotion/css';
import { forwardRef, useImperativeHandle, } from 'react';
import { useSignalValue } from '../../../../modules/doc-info/utils';
import { useMemberInfo } from '../../hooks/use-member-info';
import { createdByPropertyModelConfig } from './define';
const cellContainer = css({
    width: '100%',
    position: 'relative',
    gap: '6px',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
});
const memberPreviewContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    overflow: 'hidden',
});
const memberName = css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    lineHeight: '22px',
});
const avatar = css({
    flexShrink: 0,
});
const CreatedByCellComponent = (props, ref) => {
    useImperativeHandle(ref, () => ({
        beforeEnterEditMode: () => {
            return false;
        },
        beforeExitEditingMode: () => { },
        afterEnterEditingMode: () => { },
        focusCell: () => true,
        blurCell: () => true,
        forceUpdate: () => { },
    }), []);
    const host = props.cell.view.serviceGet(EditorHostKey);
    const userService = host?.std.getOptional(UserProvider);
    const memberId = useSignalValue(props.cell.value$);
    if (!memberId) {
        return null;
    }
    return (_jsx("div", { style: { overflow: 'hidden' }, children: _jsx("div", { className: cellContainer, children: _jsx(MemberPreview, { memberId: memberId, userService: userService }, memberId) }) }));
};
const MemberPreview = ({ memberId, userService, }) => {
    const userInfo = useMemberInfo(memberId, userService);
    if (!userInfo) {
        return null;
    }
    return (_jsxs("div", { className: memberPreviewContainer, children: [_jsx(Avatar, { name: userInfo.removed ? undefined : (userInfo.name ?? undefined), className: avatar, url: !userInfo.removed ? userInfo.avatar : undefined, size: 24 }), _jsx("div", { className: memberName, children: userInfo.removed ? 'Deleted user' : userInfo.name || 'Unnamed' })] }));
};
const CreatedByCell = forwardRef(CreatedByCellComponent);
export const createdByPropertyConfig = createdByPropertyModelConfig.createPropertyMeta({
    icon: createIcon('MemberIcon'),
    cellRenderer: {
        view: uniReactRoot.createUniComponent(CreatedByCell),
    },
});
//# sourceMappingURL=view.js.map