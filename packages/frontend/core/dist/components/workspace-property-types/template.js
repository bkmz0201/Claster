import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, MenuItem, PropertyValue } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { useI18n } from '@affine/i18n';
import { TemplateIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import * as styles from './template.css';
export const TemplateValue = ({ readonly }) => {
    const docService = useService(DocService);
    const isTemplate = useLiveData(docService.doc.record.properties$.selector(p => p.isTemplate));
    const onChange = useCallback((e) => {
        if (readonly)
            return;
        const value = e.target.checked;
        docService.doc.record.setProperty('isTemplate', value);
    }, [docService.doc.record, readonly]);
    const toggle = useCallback(() => {
        if (readonly)
            return;
        docService.doc.record.setProperty('isTemplate', !isTemplate);
    }, [docService.doc.record, isTemplate, readonly]);
    return (_jsx(PropertyValue, { className: styles.property, onClick: toggle, readonly: true, children: _jsx(Checkbox, { "data-testid": "toggle-template-checkbox", checked: !!isTemplate, onChange: onChange, className: styles.checkbox, disabled: readonly }) }));
};
export const TemplateDocListProperty = ({ doc }) => {
    const t = useI18n();
    const isTemplate = useLiveData(doc.properties$.selector(p => p.isTemplate));
    if (!isTemplate) {
        return null;
    }
    return (_jsx(StackProperty, { icon: _jsx(TemplateIcon, {}), children: t['Template']() }));
};
export const TemplateGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'true'
        ? t['com.affine.all-docs.group.is-template']()
        : groupId === 'false'
            ? t['com.affine.all-docs.group.is-not-template']()
            : 'Default';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
export const TemplateFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'true',
                        });
                    }, selected: filter.value === 'true', children: 'True' }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'false',
                        });
                    }, selected: filter.value !== 'true', children: 'False' })] }), children: _jsx("span", { children: filter.value === 'true' ? 'True' : 'False' }) }));
};
//# sourceMappingURL=template.js.map