import { jsx as _jsx } from "react/jsx-runtime";
import { CheckboxValue } from '@affine/core/components/workspace-property-types/checkbox';
import { useLiveData } from '@toeverything/infra';
export const CheckboxCell = ({ cell, rowId, dataSource, onChange, }) => {
    const value = useLiveData(cell.value$);
    return (_jsx(CheckboxValue
    // todo(pengx17): better internal impl
    , { 
        // todo(pengx17): better internal impl
        value: value ? 'true' : 'false', onChange: v => {
            dataSource.cellValueChange(rowId, cell.property.id, v === 'true');
            onChange?.(v === 'true');
        } }));
};
//# sourceMappingURL=checkbox.js.map