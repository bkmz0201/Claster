import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowLeftSmallIcon, ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import * as styles from './pagination.css';
export const Pagination = ({ totalCount, countPerPage, pageNum, onPageChange, }) => {
    const handlePageClick = useCallback((e) => {
        const newOffset = (e.selected * countPerPage) % totalCount;
        onPageChange(newOffset, e.selected);
    }, [countPerPage, onPageChange, totalCount]);
    const pageCount = useMemo(() => Math.ceil(totalCount / countPerPage), [countPerPage, totalCount]);
    return (_jsx(ReactPaginate, { onPageChange: handlePageClick, pageRangeDisplayed: 3, marginPagesDisplayed: 2, pageCount: pageCount, forcePage: pageNum, previousLabel: _jsx(ArrowLeftSmallIcon, {}), nextLabel: _jsx(ArrowRightSmallIcon, {}), pageClassName: styles.pageItem, previousClassName: clsx(styles.pageItem, 'label'), nextClassName: clsx(styles.pageItem, 'label'), breakLabel: "...", breakClassName: styles.pageItem, containerClassName: styles.pagination, activeClassName: "active", renderOnZeroPageCount: null }));
};
//# sourceMappingURL=pagination.js.map