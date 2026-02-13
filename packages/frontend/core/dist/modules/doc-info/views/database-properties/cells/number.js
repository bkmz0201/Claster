import { jsx as _jsx } from "react/jsx-runtime";
import { NumberValue } from '@affine/core/components/workspace-property-types/number';
import { useLiveData } from '@toeverything/infra';
export const NumberCell = ({ cell, rowId, dataSource, onChange, }) => {
    const value = useLiveData(cell.value$);
    return (_jsx(NumberValue, { value: value, onChange: v => {
            const value = Number(v);
            if (isNaN(value)) {
                return;
            }
            dataSource.cellValueChange(rowId, cell.property.id, value);
            onChange?.(v);
        } }));
};
//# sourceMappingURL=number.js.map