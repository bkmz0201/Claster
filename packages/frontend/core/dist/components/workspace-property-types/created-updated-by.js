import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import { PublicUserLabel } from '@affine/core/modules/cloud/views/public-user';
import { DocService } from '@affine/core/modules/doc';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { MemberSelectorInline } from '../member-selector';
import * as styles from './created-updated-by.css';
const CreatedUsernameTip = ({ userName }) => {
    const i18n = useI18n();
    return i18n.t('com.affine.page-properties.property.createdBy.tip', {
        userName,
    });
};
const UpdatedUsernameTip = ({ userName }) => {
    const i18n = useI18n();
    return i18n.t('com.affine.page-properties.property.updatedBy.tip', {
        userName,
    });
};
const CreatedByUpdatedByAvatar = (props) => {
    const doc = props.doc;
    const userId = useLiveData(props.type === 'CreatedBy' ? doc?.createdBy$ : doc?.updatedBy$);
    if (userId) {
        return (_jsx("div", { className: styles.userWrapper, children: _jsx(PublicUserLabel, { id: userId, size: props.size, showName: props.showName, align: "center", tooltip: props.type === 'CreatedBy' ? CreatedUsernameTip : UpdatedUsernameTip }) }));
    }
    return props.emptyFallback === undefined ? (_jsx(NoRecordValue, {})) : (props.emptyFallback);
};
const NoRecordValue = () => {
    const t = useI18n();
    return (_jsx("span", { children: t['com.affine.page-properties.property-user-avatar-no-record']() }));
};
const LocalUserValue = () => {
    const t = useI18n();
    return _jsx("span", { children: t['com.affine.page-properties.local-user']() });
};
export const CreatedByValue = () => {
    const doc = useService(DocService).doc.record;
    const workspaceService = useService(WorkspaceService);
    const isCloud = workspaceService.workspace.flavour !== 'local';
    if (!isCloud) {
        return (_jsx(PropertyValue, { readonly: true, children: _jsx(LocalUserValue, {}) }));
    }
    return (_jsx(PropertyValue, { readonly: true, children: _jsx(CreatedByUpdatedByAvatar, { type: "CreatedBy", doc: doc }) }));
};
export const UpdatedByValue = () => {
    const doc = useService(DocService).doc.record;
    const workspaceService = useService(WorkspaceService);
    const isCloud = workspaceService.workspace.flavour !== 'local';
    if (!isCloud) {
        return (_jsx(PropertyValue, { readonly: true, children: _jsx(LocalUserValue, {}) }));
    }
    return (_jsx(PropertyValue, { readonly: true, children: _jsx(CreatedByUpdatedByAvatar, { type: "UpdatedBy", doc: doc }) }));
};
export const CreatedByUpdatedByFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    const menuRef = useRef(null);
    useEffect(() => {
        if (isDraft) {
            menuRef.current?.changeOpen(true);
        }
    }, [isDraft]);
    const selected = useMemo(() => filter.value?.split(',').filter(Boolean) ?? [], [filter]);
    const handleChange = useCallback((selected) => {
        onChange?.({
            ...filter,
            value: selected.join(','),
        });
    }, [filter, onChange]);
    return (_jsx(MemberSelectorInline, { placeholder: _jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: t['com.affine.filter.empty']() }), selected: selected, onChange: handleChange, ref: menuRef, onEditorClose: onDraftCompleted, menuClassName: styles.filterValueMenu }));
};
export const CreatedByDocListInlineProperty = ({ doc }) => {
    return (_jsx(CreatedByUpdatedByAvatar, { doc: doc, type: "CreatedBy", size: 20, emptyFallback: null, showName: false }));
};
export const UpdatedByDocListInlineProperty = ({ doc }) => {
    return (_jsx(CreatedByUpdatedByAvatar, { type: "UpdatedBy", doc: doc, showName: false, size: 20, emptyFallback: null }));
};
export const ModifiedByGroupHeader = ({ groupId, docCount, }) => {
    const userId = groupId;
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: _jsx("div", { className: styles.userLabelContainer, children: _jsx(PublicUserLabel, { id: userId, size: 20, showName: false, align: "center" }) }) }));
};
//# sourceMappingURL=created-updated-by.js.map