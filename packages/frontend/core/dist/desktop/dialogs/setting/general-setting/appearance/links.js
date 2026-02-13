import { jsx as _jsx } from "react/jsx-runtime";
import { Menu, MenuItem, MenuTrigger } from '@affine/component';
import { OpenInAppService, OpenLinkMode, } from '@affine/core/modules/open-in-app';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import * as styles from './links.css';
export const OpenInAppLinksMenu = () => {
    const t = useI18n();
    const openInAppService = useService(OpenInAppService);
    const currentOpenInAppMode = useLiveData(openInAppService.openLinkMode$);
    const options = useMemo(() => Object.values(OpenLinkMode).map(mode => ({
        label: t.t(`com.affine.setting.appearance.open-in-app.${mode}`) ||
            `com.affine.setting.appearance.open-in-app.${mode}`,
        value: mode,
    })), [t]);
    return (_jsx(Menu, { items: options.map(option => {
            return (_jsx(MenuItem, { title: option.label, onSelect: () => openInAppService.setOpenLinkMode(option.value), "data-selected": currentOpenInAppMode === option.value, children: option.label }, option.value));
        }), contentOptions: {
            className: styles.menu,
            align: 'end',
        }, children: _jsx(MenuTrigger, { style: { fontWeight: 600, width: '250px' }, block: true, children: options.find(option => option.value === currentOpenInAppMode)?.label }) }));
};
//# sourceMappingURL=links.js.map