import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { AFFINE_FLAGS, FeatureFlagService, } from '@affine/core/modules/feature-flag';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';
import { SwipeDialog } from '../swipe-dialog';
import * as styles from './styles.css';
export const ExperimentalFeatureSetting = () => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(SettingGroup, { title: "Experimental", children: _jsx(RowLayout, { label: 'Experimental Features', onClick: () => setOpen(true), children: _jsx(ArrowRightSmallIcon, { fontSize: 22 }) }) }), _jsx(SwipeDialog, { open: open, onOpenChange: setOpen, title: "Experimental Features", children: _jsx(ExperimentalFeatureList, {}) })] }));
};
const ExperimentalFeatureList = () => {
    const featureFlagService = useService(FeatureFlagService);
    return (_jsx("ul", { className: styles.content, children: Object.keys(AFFINE_FLAGS).map(key => (_jsx(ExperimentalFeaturesItem, { flagKey: key, flag: featureFlagService.flags[key] }, key))) }));
};
const ExperimentalFeaturesItem = ({ flag, flagKey, }) => {
    const t = useI18n();
    const value = useLiveData(flag.$);
    const onChange = useCallback((checked) => {
        flag.set(checked);
    }, [flag]);
    if (flag.configurable === false || flag.hide) {
        return null;
    }
    return (_jsxs("li", { children: [_jsxs("div", { className: styles.itemBlock, children: [t[flag.displayName](), _jsx(Switch, { "data-testid": flagKey, checked: value, onChange: onChange })] }), flag.description ? (_jsx("div", { className: styles.itemDescription, children: t[flag.description]() })) : null] }));
};
//# sourceMappingURL=index.js.map