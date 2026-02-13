import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, PropertyValue } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { LongerIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import { PropertyRadioGroup } from '../properties/widgets/radio-group';
import { container } from './page-width.css';
export const PageWidthValue = ({ readonly }) => {
    const t = useI18n();
    const editorSetting = useService(EditorSettingService).editorSetting;
    const defaultPageWidth = useLiveData(editorSetting.settings$).fullWidthLayout;
    const doc = useService(DocService).doc;
    const pageWidth = useLiveData(doc.properties$.selector(p => p.pageWidth));
    const radioValue = pageWidth ?? (defaultPageWidth ? 'fullWidth' : 'standard');
    const radioItems = useMemo(() => [
        {
            value: 'standard',
            label: t['com.affine.settings.editorSettings.page.default-page-width.standard'](),
            testId: 'standard-width-trigger',
        },
        {
            value: 'fullWidth',
            label: t['com.affine.settings.editorSettings.page.default-page-width.full-width'](),
            testId: 'full-width-trigger',
        },
    ], [t]);
    const handleChange = useCallback((value) => {
        doc.record.setProperty('pageWidth', value);
    }, [doc]);
    return (_jsx(PropertyValue, { className: container, hoverable: false, readonly: readonly, children: _jsx(PropertyRadioGroup, { value: radioValue, onChange: handleChange, items: radioItems, disabled: readonly }) }));
};
export const PageWidthDocListProperty = ({ doc }) => {
    const t = useI18n();
    const pageWidth = useLiveData(doc.properties$.selector(p => p.pageWidth));
    return (_jsx(StackProperty, { icon: _jsx(LongerIcon, {}), children: pageWidth === 'standard' || !pageWidth
            ? t['com.affine.settings.editorSettings.page.default-page-width.standard']()
            : t['com.affine.settings.editorSettings.page.default-page-width.full-width']() }));
};
export const PageWidthFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'fullWidth',
                        });
                    }, selected: filter.value === 'fullWidth', children: t['com.affine.settings.editorSettings.page.default-page-width.full-width']() }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'standard',
                        });
                    }, selected: filter.value !== 'fullWidth', children: t['com.affine.settings.editorSettings.page.default-page-width.standard']() })] }), children: _jsx("span", { children: filter.value === 'fullWidth'
                ? t['com.affine.settings.editorSettings.page.default-page-width.full-width']()
                : t['com.affine.settings.editorSettings.page.default-page-width.standard']() }) }));
};
export const PageWidthGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'fullWidth'
        ? t['com.affine.settings.editorSettings.page.default-page-width.full-width']()
        : groupId === 'standard'
            ? t['com.affine.settings.editorSettings.page.default-page-width.standard']()
            : 'Default';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=page-width.js.map