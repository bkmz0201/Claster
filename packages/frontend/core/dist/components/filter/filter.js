import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon } from '@blocksuite/icons/rc';
import { PropertyFilterCondition } from './conditions/property';
import { SystemFilterCondition } from './conditions/system';
import * as styles from './styles.css';
export const Filter = ({ filter, isDraft, onDraftCompleted, onDelete, onChange, }) => {
    const type = filter.type;
    const Condition = type === 'property'
        ? PropertyFilterCondition
        : type === 'system'
            ? SystemFilterCondition
            : null;
    return (_jsxs("div", { className: styles.filterItemStyle, "data-draft": isDraft, "data-type": type, children: [Condition ? (_jsx(Condition, { isDraft: isDraft, filter: filter, onChange: onChange, onDraftCompleted: onDraftCompleted })) : null, _jsx("div", { className: styles.filterItemCloseStyle, onClick: onDelete, children: _jsx(CloseIcon, {}) })] }));
};
//# sourceMappingURL=filter.js.map