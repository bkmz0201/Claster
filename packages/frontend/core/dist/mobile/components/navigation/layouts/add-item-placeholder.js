import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationPanelTreeContext } from '@affine/core/desktop/components/navigation-panel';
import { PlusIcon } from '@blocksuite/icons/rc';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useContext } from 'react';
import { levelIndent } from '../tree/node.css';
import * as styles from './add-item-placeholder.css';
export const AddItemPlaceholder = ({ onClick, label = 'Add Item', icon = _jsx(PlusIcon, {}), className, ...attrs }) => {
    const context = useContext(NavigationPanelTreeContext);
    const level = context?.level ?? 0;
    return (_jsx("div", { className: styles.root, style: assignInlineVars({
            [levelIndent]: level * 20 + 'px',
        }), children: _jsxs("div", { onClick: onClick, className: clsx(styles.wrapper, className), ...attrs, children: [_jsx("div", { className: styles.iconWrapper, children: icon }), _jsx("span", { className: styles.label, children: label })] }) }));
};
//# sourceMappingURL=add-item-placeholder.js.map