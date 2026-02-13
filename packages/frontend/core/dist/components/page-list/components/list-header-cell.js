import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SortDownIcon, SortUpIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import { ColWrapper } from '../utils';
import * as styles from './list-header-cell.css';
export const ListHeaderCell = ({ sortKey, sortable, order, sorting, onSort, alignment, flex, style, hidden, hideInSmallContainer, children, }) => {
    const handleClick = useCallback(() => {
        if (sortable) {
            onSort?.(sortable, sortKey);
        }
    }, [sortable, sortKey, onSort]);
    return (_jsxs(ColWrapper, { flex: flex, alignment: alignment, onClick: handleClick, className: styles.headerCell, "data-sortable": sortable ? true : undefined, "data-sorting": sorting ? true : undefined, hidden: hidden, style: style, role: "columnheader", hideInSmallContainer: hideInSmallContainer, children: [children, sorting ? (_jsx("div", { className: styles.headerCellSortIcon, children: order === 'asc' ? _jsx(SortUpIcon, {}) : _jsx(SortDownIcon, {}) })) : null] }));
};
//# sourceMappingURL=list-header-cell.js.map