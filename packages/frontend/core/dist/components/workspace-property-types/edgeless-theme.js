import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, PropertyValue } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { useI18n } from '@affine/i18n';
import { EdgelessIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import { PropertyRadioGroup } from '../properties/widgets/radio-group';
import * as styles from './edgeless-theme.css';
const getThemeOptions = (t) => [
    {
        value: 'system',
        label: t['com.affine.themeSettings.auto'](),
    },
    {
        value: 'light',
        label: t['com.affine.themeSettings.light'](),
    },
    {
        value: 'dark',
        label: t['com.affine.themeSettings.dark'](),
    },
];
export const EdgelessThemeValue = ({ onChange, readonly, }) => {
    const t = useI18n();
    const doc = useService(DocService).doc;
    const edgelessTheme = useLiveData(doc.properties$).edgelessColorTheme;
    const handleChange = useCallback((theme) => {
        doc.record.setProperty('edgelessColorTheme', theme);
        onChange?.(theme, true);
    }, [doc, onChange]);
    const themeItems = useMemo(() => getThemeOptions(t), [t]);
    return (_jsx(PropertyValue, { className: styles.container, hoverable: false, readonly: readonly, children: _jsx(PropertyRadioGroup, { value: edgelessTheme || 'system', onChange: handleChange, items: themeItems, disabled: readonly }) }));
};
export const EdgelessThemeDocListProperty = ({ doc }) => {
    const t = useI18n();
    const edgelessTheme = useLiveData(doc.properties$.selector(p => p.edgelessColorTheme));
    return (_jsx(StackProperty, { icon: _jsx(EdgelessIcon, {}), children: edgelessTheme === 'system' || !edgelessTheme
            ? t['com.affine.themeSettings.auto']()
            : edgelessTheme === 'light'
                ? t['com.affine.themeSettings.light']()
                : t['com.affine.themeSettings.dark']() }));
};
export const EdgelessThemeFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'system',
                        });
                    }, selected: filter.value === 'system', children: t['com.affine.themeSettings.auto']() }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'light',
                        });
                    }, selected: filter.value === 'light', children: t['com.affine.themeSettings.light']() }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'dark',
                        });
                    }, selected: filter.value === 'dark', children: t['com.affine.themeSettings.dark']() })] }), children: _jsx("span", { children: filter.value === 'system'
                ? t['com.affine.themeSettings.auto']()
                : filter.value === 'light'
                    ? t['com.affine.themeSettings.light']()
                    : t['com.affine.themeSettings.dark']() }) }));
};
export const EdgelessThemeGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'light'
        ? t['com.affine.themeSettings.light']()
        : groupId === 'dark'
            ? t['com.affine.themeSettings.dark']()
            : groupId === 'system'
                ? t['com.affine.themeSettings.auto']()
                : 'Default';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=edgeless-theme.js.map