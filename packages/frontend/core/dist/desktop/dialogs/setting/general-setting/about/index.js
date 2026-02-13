import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useAppUpdater } from '@affine/core/components/hooks/use-app-updater';
import { UrlService } from '@affine/core/modules/url';
import { appIconMap, appNames } from '@affine/core/utils/channel';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon, OpenInNewIcon } from '@blocksuite/icons/rc';
import { useServices } from '@toeverything/infra';
import { useCallback } from 'react';
import { useAppSettingHelper } from '../../../../../components/hooks/affine/use-app-setting-helper';
import { relatedLinks } from './config';
import * as styles from './style.css';
import { UpdateCheckSection } from './update-check-section';
export const AboutAffine = () => {
    const t = useI18n();
    const { appSettings, updateSettings } = useAppSettingHelper();
    const { toggleAutoCheck, toggleAutoDownload } = useAppUpdater();
    const channel = BUILD_CONFIG.appBuildType;
    const appIcon = appIconMap[channel];
    const appName = appNames[channel];
    const { urlService } = useServices({
        UrlService,
    });
    const onSwitchAutoCheck = useCallback((checked) => {
        toggleAutoCheck(checked);
        updateSettings('autoCheckUpdate', checked);
    }, [toggleAutoCheck, updateSettings]);
    const onSwitchAutoDownload = useCallback((checked) => {
        toggleAutoDownload(checked);
        updateSettings('autoDownloadUpdate', checked);
    }, [toggleAutoDownload, updateSettings]);
    const onSwitchTelemetry = useCallback((checked) => {
        updateSettings('enableTelemetry', checked);
    }, [updateSettings]);
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.aboutAFFiNE.title'](), subtitle: t['com.affine.aboutAFFiNE.subtitle'](), "data-testid": "about-title" }), _jsxs(SettingWrapper, { title: t['com.affine.aboutAFFiNE.version.title'](), children: [_jsx(SettingRow, { name: appName, desc: BUILD_CONFIG.appVersion, className: styles.appImageRow, children: _jsx("img", { src: appIcon, alt: appName, width: 56, height: 56 }) }), _jsx(SettingRow, { name: t['com.affine.aboutAFFiNE.version.editor.title'](), desc: BUILD_CONFIG.editorVersion }), BUILD_CONFIG.isElectron ? (_jsxs(_Fragment, { children: [_jsx(UpdateCheckSection, {}), _jsx(SettingRow, { name: t['com.affine.aboutAFFiNE.autoCheckUpdate.title'](), desc: t['com.affine.aboutAFFiNE.autoCheckUpdate.description'](), children: _jsx(Switch, { checked: appSettings.autoCheckUpdate, onChange: onSwitchAutoCheck }) }), _jsx(SettingRow, { name: t['com.affine.aboutAFFiNE.autoDownloadUpdate.title'](), desc: t['com.affine.aboutAFFiNE.autoDownloadUpdate.description'](), children: _jsx(Switch, { checked: appSettings.autoDownloadUpdate, onChange: onSwitchAutoDownload }) }), _jsx(SettingRow, { name: t['com.affine.aboutAFFiNE.changelog.title'](), desc: t['com.affine.aboutAFFiNE.changelog.description'](), style: { cursor: 'pointer' }, onClick: () => {
                                    urlService.openPopupWindow(BUILD_CONFIG.changelogUrl);
                                }, children: _jsx(ArrowRightSmallIcon, {}) })] })) : null, _jsx(SettingRow, { name: t['com.affine.telemetry.enable'](), desc: t['com.affine.telemetry.enable.desc'](), children: _jsx(Switch, { checked: appSettings.enableTelemetry !== false, onChange: onSwitchTelemetry }) })] }), _jsxs(SettingWrapper, { title: t['com.affine.aboutAFFiNE.contact.title'](), children: [_jsxs("a", { className: styles.link, rel: "noreferrer", href: "https://affine.pro", target: "_blank", children: [t['com.affine.aboutAFFiNE.contact.website'](), _jsx(OpenInNewIcon, { className: "icon" })] }), _jsxs("a", { className: styles.link, rel: "noreferrer", href: "https://community.affine.pro", target: "_blank", children: [t['com.affine.aboutAFFiNE.contact.community'](), _jsx(OpenInNewIcon, { className: "icon" })] })] }), _jsx(SettingWrapper, { title: t['com.affine.aboutAFFiNE.community.title'](), children: _jsx("div", { className: styles.communityWrapper, children: relatedLinks.map(({ icon, title, link }) => {
                        return (_jsxs("div", { className: styles.communityItem, onClick: () => {
                                urlService.openPopupWindow(link);
                            }, children: [icon, _jsx("p", { children: title })] }, title));
                    }) }) }), _jsxs(SettingWrapper, { title: t['com.affine.aboutAFFiNE.legal.title'](), children: [_jsxs("a", { className: styles.link, rel: "noreferrer", href: "https://affine.pro/privacy", target: "_blank", children: [t['com.affine.aboutAFFiNE.legal.privacy'](), _jsx(OpenInNewIcon, { className: "icon" })] }), _jsxs("a", { className: styles.link, rel: "noreferrer", href: "https://affine.pro/terms", target: "_blank", children: [t['com.affine.aboutAFFiNE.legal.tos'](), _jsx(OpenInNewIcon, { className: "icon" })] })] })] }));
};
//# sourceMappingURL=index.js.map