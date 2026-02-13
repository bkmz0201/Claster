import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox, MenuItem, MenuSub } from '@affine/component';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useCallback } from 'react';
import { quickActions } from '../quick-actions.constants';
export const QuickActionsConfig = ({ displayPreference, onDisplayPreferenceChange, }) => {
    const t = useI18n();
    return (_jsx(MenuSub, { items: quickActions.map(action => {
            if (action.disabled)
                return null;
            return (_jsx(QuickActionItem, { action: action, active: displayPreference[`${action.key}`] ?? false, onClick: () => {
                    track.allDocs.header.displayMenu.editDisplayMenu({
                        control: 'quickActions',
                        type: action.key,
                    });
                    onDisplayPreferenceChange({
                        ...displayPreference,
                        [action.key]: !displayPreference[action.key],
                    });
                } }, action.key));
        }), children: t['com.affine.all-docs.quick-actions']() }));
};
const QuickActionItem = ({ action, active, onClick, }) => {
    const t = useI18n();
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    }, [onClick]);
    return (_jsx(MenuItem, { prefixIcon: _jsx(Checkbox, { checked: active }), onClick: handleClick, children: t.t(action.name) }));
};
//# sourceMappingURL=quick-actions.js.map