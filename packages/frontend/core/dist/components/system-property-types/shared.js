import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem } from '@affine/component';
import { FilterValueMenu } from '../filter/filter-value-menu';
export const SharedFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'true',
                        });
                    }, selected: filter.value === 'true', children: 'True' }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'false',
                        });
                    }, selected: filter.value !== 'true', children: 'False' })] }), children: _jsx("span", { children: filter.value === 'true' ? 'True' : 'False' }) }));
};
//# sourceMappingURL=shared.js.map