import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddFilter } from './add-filter';
import { Filter } from './filter';
import * as styles from './styles.css';
export const Filters = ({ filters, className, onChange, defaultDraftFilter, }) => {
    const [draftFilter, setDraftFilter] = useState(defaultDraftFilter ?? null);
    // When draftChange and draftCompleted are triggered consecutively,
    // we might save an outdated draft filter value.
    // Using a ref helps us avoid this issue by always accessing the latest value.
    const draftFilterRef = useRef(draftFilter);
    useEffect(() => {
        draftFilterRef.current = draftFilter;
    }, [draftFilter]);
    const handleDelete = (index) => {
        onChange?.(filters.filter((_, i) => i !== index));
    };
    const handleChange = (index, filter) => {
        onChange?.(filters.map((f, i) => (i === index ? filter : f)));
    };
    const handleDraftCompleted = useCallback(() => {
        if (draftFilterRef.current) {
            onChange?.(filters.concat(draftFilterRef.current));
            setDraftFilter(null);
        }
    }, [onChange, filters]);
    const handleAdd = useCallback((filter) => {
        // Add a small delay to ensure the previous menu is closed before opening the next one
        setTimeout(() => {
            setDraftFilter(filter);
        }, 50);
    }, []);
    return (_jsxs("div", { className: clsx(styles.container, className), children: [filters.map((filter, index) => {
                return (_jsx(Filter
                // oxlint-disable-next-line no-array-index-key
                , { filter: filter, onDelete: () => {
                        handleDelete(index);
                    }, onChange: filter => {
                        handleChange(index, filter);
                    } }, index));
            }), draftFilter && (_jsx(Filter, { filter: draftFilter, isDraft: true, onDelete: () => {
                    setDraftFilter(null);
                }, onChange: filter => {
                    setDraftFilter(filter);
                }, onDraftCompleted: handleDraftCompleted })), _jsx(AddFilter, { variant: filters.length === 0 && draftFilter === null
                    ? 'button'
                    : 'icon-button', onAdd: handleAdd })] }));
};
//# sourceMappingURL=filters.js.map