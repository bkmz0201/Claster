import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Checkbox, Loading, Switch, Tooltip } from '@affine/component';
import { SettingHeader } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AFFINE_FLAGS, FeatureFlagService, } from '@affine/core/modules/feature-flag';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon, DiscordIcon, EmailIcon, GithubIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Suspense, useCallback, useState } from 'react';
import { ExperimentalFeatureArts } from './arts';
import * as styles from './index.css';
const ExperimentalFeaturesPrompt = ({ onConfirm, }) => {
    const t = useI18n();
    const [checked, setChecked] = useState(false);
    const onChange = useCallback((_, checked) => {
        setChecked(checked);
    }, []);
    return (_jsxs("div", { className: styles.promptRoot, "data-testid": "experimental-prompt", children: [_jsx("div", { className: styles.promptTitle, children: t['com.affine.settings.workspace.experimental-features.prompt-header']() }), _jsx("div", { className: styles.promptArt, children: _jsx(ExperimentalFeatureArts, {}) }), _jsxs("div", { className: styles.promptWarning, children: [_jsx("div", { className: styles.promptWarningTitle, children: t['com.affine.settings.workspace.experimental-features.prompt-warning-title']() }), t['com.affine.settings.workspace.experimental-features.prompt-warning']()] }), _jsx("div", { className: styles.spacer }), _jsxs("label", { className: styles.promptDisclaimer, children: [_jsx(Checkbox, { checked: checked, onChange: onChange, "data-testid": "experimental-prompt-disclaimer" }), t['com.affine.settings.workspace.experimental-features.prompt-disclaimer']()] }), _jsx("div", { className: styles.promptDisclaimerConfirm, children: _jsx(Button, { disabled: !checked, onClick: onConfirm, variant: "primary", "data-testid": "experimental-confirm-button", children: t['com.affine.settings.workspace.experimental-features.get-started']() }) })] }));
};
const FeedbackIcon = ({ type }) => {
    switch (type) {
        case 'discord':
            return _jsx(DiscordIcon, { fontSize: 16 });
        case 'email':
            return _jsx(EmailIcon, { fontSize: 16 });
        case 'github':
            return _jsx(GithubIcon, { fontSize: 16 });
        default:
            return null;
    }
};
const feedbackLink = {
    discord: BUILD_CONFIG.discordUrl,
    email: 'mailto:support@toeverything.info',
    github: 'https://github.com/toeverything/AFFiNE/issues',
};
const ExperimentalFeaturesItem = ({ flag, flagKey, }) => {
    const value = useLiveData(flag.$);
    const t = useI18n();
    const onChange = useCallback((checked) => {
        flag.set(checked);
    }, [flag]);
    const link = flag.feedbackType
        ? flag.feedbackLink
            ? flag.feedbackLink
            : feedbackLink[flag.feedbackType]
        : undefined;
    if (flag.configurable === false || flag.hide) {
        return null;
    }
    return (_jsxs("div", { className: styles.rowContainer, children: [_jsxs("div", { className: styles.switchRow, children: [t[flag.displayName](), _jsx(Switch, { "data-testid": flagKey, checked: value, onChange: onChange })] }), !!flag.description && (_jsx(Tooltip, { content: t[flag.description](), children: _jsx("div", { className: styles.description, children: t[flag.description]() }) })), !!flag.feedbackType && (_jsxs("a", { className: styles.feedback, href: link, target: "_blank", rel: "noreferrer", children: [_jsx(FeedbackIcon, { type: flag.feedbackType }), _jsx("span", { children: "Discussion about this feature" }), _jsx(ArrowRightSmallIcon, { fontSize: 20, className: styles.arrowRightIcon })] }))] }));
};
const ExperimentalFeaturesMain = () => {
    const t = useI18n();
    const { featureFlagService } = useServices({ FeatureFlagService });
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.settings.workspace.experimental-features.header.plugins'](), subtitle: t['com.affine.settings.workspace.experimental-features.header.subtitle']() }), _jsx("div", { className: styles.settingsContainer, "data-testid": "experimental-settings", children: Object.keys(AFFINE_FLAGS).map(key => (_jsx(ExperimentalFeaturesItem, { flagKey: key, flag: featureFlagService.flags[key] }, key))) })] }));
};
// TODO(@Peng): save to workspace meta instead?
const experimentalFeaturesDisclaimerAtom = atomWithStorage('affine:experimental-features-disclaimer', false);
export const ExperimentalFeatures = () => {
    const [enabled, setEnabled] = useAtom(experimentalFeaturesDisclaimerAtom);
    const handleConfirm = useAsyncCallback(async () => {
        setEnabled(true);
    }, [setEnabled]);
    if (!enabled) {
        return _jsx(ExperimentalFeaturesPrompt, { onConfirm: handleConfirm });
    }
    else {
        return (_jsx(Suspense, { fallback: _jsx(Loading, {}), children: _jsx(ExperimentalFeaturesMain, {}) }));
    }
};
//# sourceMappingURL=index.js.map