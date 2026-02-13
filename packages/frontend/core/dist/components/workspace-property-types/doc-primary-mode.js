import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, notify, PropertyValue, } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { useI18n } from '@affine/i18n';
import { EdgelessIcon, PageIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import { PropertyRadioGroup } from '../properties/widgets/radio-group';
import * as styles from './doc-primary-mode.css';
export const DocPrimaryModeValue = ({ onChange, readonly, }) => {
    const t = useI18n();
    const doc = useService(DocService).doc;
    const primaryMode = useLiveData(doc.primaryMode$);
    const DocModeItems = useMemo(() => [
        {
            value: 'page',
            label: t['Page'](),
        },
        {
            value: 'edgeless',
            label: t['Edgeless'](),
        },
    ], [t]);
    const handleChange = useCallback((mode) => {
        doc.setPrimaryMode(mode);
        notify.success({
            title: mode === 'page'
                ? t['com.affine.toastMessage.defaultMode.page.title']()
                : t['com.affine.toastMessage.defaultMode.edgeless.title'](),
            message: mode === 'page'
                ? t['com.affine.toastMessage.defaultMode.page.message']()
                : t['com.affine.toastMessage.defaultMode.edgeless.message'](),
        });
        onChange?.(mode, true);
    }, [doc, t, onChange]);
    return (_jsx(PropertyValue, { className: styles.container, hoverable: false, readonly: readonly, children: _jsx(PropertyRadioGroup, { value: primaryMode, onChange: handleChange, items: DocModeItems, disabled: readonly }) }));
};
export const DocPrimaryModeFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'page',
                        });
                    }, selected: filter.value !== 'edgeless', children: t['Page']() }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'edgeless',
                        });
                    }, selected: filter.value === 'edgeless', children: t['Edgeless']() })] }), children: _jsx("span", { children: filter.value === 'edgeless' ? t['Edgeless']() : t['Page']() }) }));
};
export const DocPrimaryModeDocListProperty = ({ doc, }) => {
    const t = useI18n();
    const primaryMode = useLiveData(doc.primaryMode$);
    return (_jsx(StackProperty, { icon: primaryMode === 'edgeless' ? _jsx(EdgelessIcon, {}) : _jsx(PageIcon, {}), children: primaryMode === 'edgeless' ? t['Edgeless']() : t['Page']() }));
};
export const DocPrimaryModeGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'edgeless'
        ? t['com.affine.edgelessMode']()
        : groupId === 'page'
            ? t['com.affine.pageMode']()
            : 'Default';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=doc-primary-mode.js.map