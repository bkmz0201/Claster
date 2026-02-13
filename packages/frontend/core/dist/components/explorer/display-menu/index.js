import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Divider, Menu, MenuSub, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import { GroupByList, GroupByName } from './group';
import { OrderByList, OrderByName } from './order';
import { DisplayProperties } from './properties';
import { QuickActionsConfig } from './quick-actions';
import * as styles from './styles.css';
const ExplorerDisplayMenu = ({ displayPreference, onDisplayPreferenceChange, }) => {
    const t = useI18n();
    const handleGroupByChange = useCallback((groupBy) => {
        onDisplayPreferenceChange({ ...displayPreference, groupBy });
    }, [displayPreference, onDisplayPreferenceChange]);
    const handleOrderByChange = useCallback((orderBy) => {
        onDisplayPreferenceChange({ ...displayPreference, orderBy });
    }, [displayPreference, onDisplayPreferenceChange]);
    return (_jsxs("div", { className: styles.displayMenuContainer, children: [_jsx(MenuSub, { items: _jsx(GroupByList, { groupBy: displayPreference.groupBy, onChange: handleGroupByChange }), children: _jsxs("div", { className: styles.subMenuSelectorContainer, children: [_jsx("span", { children: t['com.affine.explorer.display-menu.grouping']() }), _jsx("span", { className: styles.subMenuSelectorSelected, children: displayPreference.groupBy ? (_jsx(GroupByName, { groupBy: displayPreference.groupBy })) : null })] }) }), _jsx(MenuSub, { items: _jsx(OrderByList, { orderBy: displayPreference.orderBy, onChange: handleOrderByChange }), children: _jsxs("div", { className: styles.subMenuSelectorContainer, children: [_jsx("span", { children: t['com.affine.explorer.display-menu.ordering']() }), _jsx("span", { className: styles.subMenuSelectorSelected, children: displayPreference.orderBy ? (_jsx(OrderByName, { orderBy: displayPreference.orderBy })) : null })] }) }), _jsx(Divider, { space: 4, size: "thinner" }), _jsx(DisplayProperties, { displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange }), _jsx(Divider, { space: 4, size: "thinner" }), _jsx(QuickActionsConfig, { displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange })] }));
};
export const ExplorerDisplayMenuButton = ({ style, className, menuProps, displayPreference, onDisplayPreferenceChange, }) => {
    const t = useI18n();
    return (_jsx(Menu, { items: _jsx(ExplorerDisplayMenu, { displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange }), ...menuProps, children: _jsx(Button, { className: className, style: style, children: t['com.affine.explorer.display-menu.button']() }) }));
};
//# sourceMappingURL=index.js.map