import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingHeader } from '@affine/component/setting-components';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';
import { SubPageProvider, useSubPageIsland } from '../../sub-page';
import { IntegrationCard, IntegrationCardContent, IntegrationCardHeader, } from './card';
import { getAllowedIntegrationList } from './constants';
import {} from './constants';
import { list } from './index.css';
export const IntegrationSetting = () => {
    const t = useI18n();
    const [opened, setOpened] = useState(null);
    const workspaceService = useService(WorkspaceService);
    const isCloudWorkspace = workspaceService.workspace.flavour !== 'local';
    console.log('isCloudWorkspace', isCloudWorkspace);
    const integrationList = useMemo(() => getAllowedIntegrationList(isCloudWorkspace), [isCloudWorkspace]);
    const handleCardClick = useCallback((card) => {
        if ('setting' in card && card.setting) {
            setOpened(card.id);
        }
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.integration.integrations'](), subtitle: _jsx(_Fragment, { children: t['com.affine.integration.setting.description']() }) }), _jsx("ul", { className: list, children: integrationList.map(item => {
                    const title = typeof item.name === 'string'
                        ? t[item.name]()
                        : t[item.name.i18nKey]();
                    const desc = typeof item.desc === 'string'
                        ? t[item.desc]()
                        : t[item.desc.i18nKey]();
                    return (_jsxs("li", { children: [_jsxs(IntegrationCard, { onClick: () => handleCardClick(item), link: 'link' in item ? item.link : undefined, children: [_jsx(IntegrationCardHeader, { icon: item.icon, title: title }), _jsx(IntegrationCardContent, { desc: desc })] }), 'setting' in item && item.setting ? (_jsx(IntegrationSettingPage, { open: opened === item.id, onClose: () => setOpened(null), children: item.setting })) : null] }, item.id));
                }) })] }));
};
const IntegrationSettingPage = ({ children, open, onClose, }) => {
    const t = useI18n();
    const island = useSubPageIsland();
    if (!island) {
        return null;
    }
    return (_jsx(SubPageProvider, { backText: t['com.affine.integration.integrations'](), island: island, open: open, onClose: onClose, children: children }));
};
//# sourceMappingURL=index.js.map