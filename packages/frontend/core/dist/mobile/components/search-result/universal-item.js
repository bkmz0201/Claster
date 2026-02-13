import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { SearchResLabel } from './search-res-label';
import * as styles from './universal-item.css';
export const UniversalSearchResultItem = ({ id, item, category, }) => {
    return (_jsxs(WorkbenchLink, { to: `/${category}/${id}`, className: styles.item, children: [_jsx("div", { className: styles.iconWrapper, children: item.icon &&
                    (typeof item.icon === 'function' ? _jsx(item.icon, {}) : item.icon) }), _jsx("div", { className: styles.content, children: _jsx(SearchResLabel, { item: item }) }), _jsx(ArrowRightSmallIcon, { fontSize: "16px", className: styles.suffixIcon })] }));
};
//# sourceMappingURL=universal-item.js.map