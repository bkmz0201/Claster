import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../../utils';
export function DataTableColumnHeader({ column, title, className, }) {
    if (!column.getCanSort()) {
        return _jsx("div", { className: cn(className), children: title });
    }
    // TODO(@Jimmfly): add sort
    return _jsx("div", { className: cn(className), children: title });
}
//# sourceMappingURL=data-table-column-header.js.map