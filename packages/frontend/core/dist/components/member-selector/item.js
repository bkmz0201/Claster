import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Skeleton } from '@affine/component';
import { PublicUserService } from '@affine/core/modules/cloud';
import { useI18n } from '@affine/i18n';
import { CloseIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import * as styles from './styles.css';
export const MemberItem = ({ userId, idx, focused, onRemove, style, maxWidth, }) => {
    const t = useI18n();
    const handleRemove = useCallback(e => {
        e.stopPropagation();
        onRemove?.();
    }, [onRemove]);
    const publicUserService = useService(PublicUserService);
    const member = useLiveData(publicUserService.publicUser$(userId));
    const isLoading = useLiveData(publicUserService.isLoading$(userId));
    useEffect(() => {
        if (userId) {
            publicUserService.revalidate(userId);
        }
    }, [userId, publicUserService]);
    if (!member || ('removed' in member && member.removed)) {
        return (_jsx("div", { className: styles.memberItem, "data-idx": idx, style: style, children: _jsxs("div", { style: { maxWidth: maxWidth }, "data-focused": focused, className: styles.memberItemInlineMode, children: [_jsx("div", { className: styles.memberItemLabel, children: !isLoading ? (_jsxs("span", { children: [_jsx(Skeleton, { width: "12px", height: "12px", variant: "circular" }), _jsx(Skeleton, { width: "3em" })] })) : (t['Unknown User']()) }), onRemove ? (_jsx("div", { "data-testid": "remove-tag-button", className: styles.memberItemRemove, onClick: handleRemove, children: _jsx(CloseIcon, {}) })) : null] }) }));
    }
    const { name, avatarUrl } = member;
    return (_jsx("div", { className: styles.memberItem, "data-idx": idx, title: name ?? undefined, style: style, children: _jsxs("div", { style: { maxWidth: maxWidth }, "data-focused": focused, className: styles.memberItemInlineMode, children: [_jsx(Avatar, { url: avatarUrl, name: name ?? '', size: 16, className: styles.memberItemAvatar }), _jsx("div", { className: styles.memberItemLabel, children: name }), onRemove ? (_jsx("div", { "data-testid": "remove-tag-button", className: styles.memberItemRemove, onClick: handleRemove, children: _jsx(CloseIcon, {}) })) : null] }) }));
};
//# sourceMappingURL=item.js.map