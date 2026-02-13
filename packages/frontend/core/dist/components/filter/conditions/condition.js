import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu, MenuItem } from '@affine/component';
import clsx from 'clsx';
import { FilterOptionsGroup } from '../options';
import * as styles from './styles.css';
export const Condition = ({ filter, isDraft, onDraftCompleted, icon, name, methods, onChange, value: Value, }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: clsx(styles.filterTypeStyle, styles.ellipsisTextStyle), children: [icon && _jsx("div", { className: styles.filterTypeIconStyle, children: icon }), name] }), _jsx(FilterOptionsGroup, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, initialStep: methods && methods.length > 1 ? 0 : 1, items: [
                    methods &&
                        (({ onDraftCompleted, menuRef }) => {
                            return (_jsx(Menu, { ref: menuRef, rootOptions: {
                                    onClose: onDraftCompleted,
                                }, items: methods.map(([method, name]) => (_jsx(MenuItem, { onClick: () => {
                                        onChange?.({
                                            ...filter,
                                            method,
                                        });
                                    }, selected: filter.method === method, children: name }, method))), children: _jsx("div", { className: clsx(styles.switchStyle, styles.ellipsisTextStyle), "data-testid": "filter-method", children: methods.find(([method]) => method === filter.method)?.[1] ?? 'unknown' }) }, 'method'));
                        }),
                    Value &&
                        (({ isDraft, onDraftCompleted }) => (_jsx("div", { className: clsx(styles.filterValueStyle, styles.ellipsisTextStyle), "data-testid": "filter-value", children: _jsx(Value, { filter: filter, isDraft: isDraft, onDraftCompleted: onDraftCompleted, onChange: onChange }) }, 'value'))),
                ] })] }));
};
//# sourceMappingURL=condition.js.map